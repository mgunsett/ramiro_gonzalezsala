import { useState, useEffect, useRef } from 'react'
import { Box, Flex, Grid, Text, Input, Button, Image, IconButton, Spinner, useToast } from '@chakra-ui/react'
import { FiUpload, FiTrash2, FiArrowUp, FiArrowDown, FiSave } from 'react-icons/fi'
import { addDoc, deleteDoc, doc, getDocs, orderBy, query, updateDoc, writeBatch } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'
import { db, storage, playerInstagramCol, INSTAGRAM_STORAGE_DIR } from '../../lib/firebase'

// ─────────────────────────────────────────────────────────────
// Carga manual de publicaciones de Instagram (mantenimiento semanal).
// Cada publicación: imagen + enlace opcional al post. Sin enlace, la
// imagen lleva al perfil. La landing muestra las 5 primeras.
// ─────────────────────────────────────────────────────────────

const MAX_MB = 5
const label = { fontFamily: 'mono', fontSize: '10px', color: 'brand.gray', textTransform: 'uppercase', letterSpacing: 'widest' }

export default function InstagramAdmin() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [busy, setBusy] = useState(false)
  const [links, setLinks] = useState({})
  const fileRef = useRef(null)
  const toast = useToast()

  const load = async () => {
    const snap = await getDocs(query(playerInstagramCol(), orderBy('order', 'asc')))
    const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }))
    setPosts(list)
    setLinks(Object.fromEntries(list.map((p) => [p.id, p.link || ''])))
    setLoading(false)
  }
  useEffect(() => { load().catch(() => setLoading(false)) }, [])

  const upload = async (e) => {
    const files = Array.from(e.target.files || [])
    e.target.value = ''
    if (!files.length) return
    setBusy(true)
    try {
      // Las nuevas van primero: se corre el orden de las existentes
      const batch = writeBatch(db)
      posts.forEach((p) => batch.update(doc(playerInstagramCol(), p.id), { order: p.order + files.length }))
      await batch.commit()
      for (const [i, file] of files.entries()) {
        if (!file.type.startsWith('image/')) throw new Error(`"${file.name}" no es una imagen.`)
        if (file.size > MAX_MB * 1024 * 1024) throw new Error(`"${file.name}" pesa más de ${MAX_MB} MB.`)
        const path = `${INSTAGRAM_STORAGE_DIR()}/${Date.now()}_${i}_${file.name.replace(/\s+/g, '_')}`
        const sRef = ref(storage, path)
        await uploadBytes(sRef, file)
        const url = await getDownloadURL(sRef)
        await addDoc(playerInstagramCol(), { url, path, link: '', order: i, created_at: new Date().toISOString() })
      }
      toast({ title: files.length > 1 ? `${files.length} publicaciones agregadas` : 'Publicación agregada', status: 'success', duration: 3000 })
      await load()
    } catch (err) {
      toast({ title: err.message, status: 'error', duration: 5000 })
      await load()
    } finally {
      setBusy(false)
    }
  }

  const saveLink = async (p) => {
    const link = (links[p.id] || '').trim()
    if (link && !/^https:\/\/(www\.)?instagram\.com\//.test(link)) {
      toast({ title: 'El enlace tiene que empezar con https://www.instagram.com/', status: 'warning', duration: 4000 })
      return
    }
    await updateDoc(doc(playerInstagramCol(), p.id), { link })
    toast({ title: 'Enlace guardado', status: 'success', duration: 2000 })
    await load()
  }

  const move = async (i, dir) => {
    const j = i + dir
    if (j < 0 || j >= posts.length) return
    const batch = writeBatch(db)
    batch.update(doc(playerInstagramCol(), posts[i].id), { order: posts[j].order })
    batch.update(doc(playerInstagramCol(), posts[j].id), { order: posts[i].order })
    await batch.commit()
    await load()
  }

  const remove = async (p) => {
    setBusy(true)
    try {
      await deleteDoc(doc(playerInstagramCol(), p.id))
      if (p.path) await deleteObject(ref(storage, p.path)).catch(() => {})
      toast({ title: 'Publicación eliminada', status: 'info', duration: 2500 })
      await load()
    } finally {
      setBusy(false)
    }
  }

  return (
    <Box bg="rgba(11,17,24,0.6)" border="1px solid" borderColor="brand.linea" borderRadius="xl" p={{ base: 4, md: 6 }} mb={8}>
      <Flex justify="space-between" align={{ base: 'flex-start', sm: 'center' }} direction={{ base: 'column', sm: 'row' }} gap={3} mb={5}>
        <Box>
          <Text fontFamily="heading" fontSize="2xl" lineHeight={1}>Instagram</Text>
          <Text fontFamily="mono" fontSize="12px" color="brand.gray" mt={1}>
            La landing muestra las 5 primeras. La primera va en grande.
          </Text>
        </Box>
        <Input ref={fileRef} type="file" accept="image/*" multiple display="none" onChange={upload} />
        <Button leftIcon={<FiUpload />} onClick={() => fileRef.current?.click()} isLoading={busy} loadingText="Subiendo"
          bg="brand.celeste" color="brand.ink" fontFamily="mono" fontSize="sm" letterSpacing="wider" _hover={{ bg: 'brand.celesteLight' }}>
          Subir imágenes
        </Button>
      </Flex>

      {loading ? (
        <Flex justify="center" py={8}><Spinner color="brand.celeste" /></Flex>
      ) : posts.length === 0 ? (
        <Text fontFamily="mono" fontSize="sm" color="brand.gray" py={6} textAlign="center">
          Todavía no hay publicaciones. Subí capturas o fotos de sus posts y, si querés, pegá el enlace de cada uno.
        </Text>
      ) : (
        <Grid gap={3}>
          {posts.map((p, i) => (
            <Grid key={p.id} templateColumns={{ base: '64px 1fr', md: '72px 1fr auto' }} gap={3} alignItems="center"
              p={2} border="1px solid" borderColor={i < 5 ? 'rgba(76,184,242,0.4)' : 'brand.linea'} borderRadius="md">
              <Image src={p.url} alt="" boxSize={{ base: '64px', md: '72px' }} objectFit="cover" borderRadius="sm" />
              <Box minW={0}>
                <Text {...label} mb={1}>{i < 5 ? `Visible · posición ${i + 1}` : 'Oculta (fuera de las 5 primeras)'}</Text>
                <Flex gap={2}>
                  <Input size="sm" value={links[p.id] || ''} placeholder="https://www.instagram.com/p/... (opcional)"
                    onChange={(e) => setLinks((l) => ({ ...l, [p.id]: e.target.value }))}
                    bg="brand.ink" borderColor="brand.linea" fontFamily="mono" fontSize="12px" />
                  <IconButton size="sm" aria-label="Guardar enlace" icon={<FiSave />} onClick={() => saveLink(p)}
                    isDisabled={(links[p.id] || '') === (p.link || '')} />
                </Flex>
              </Box>
              <Flex gap={1} gridColumn={{ base: '1 / -1', md: 'auto' }} justify="flex-end">
                <IconButton size="sm" variant="ghost" aria-label="Subir" icon={<FiArrowUp />} onClick={() => move(i, -1)} isDisabled={i === 0 || busy} />
                <IconButton size="sm" variant="ghost" aria-label="Bajar" icon={<FiArrowDown />} onClick={() => move(i, 1)} isDisabled={i === posts.length - 1 || busy} />
                <IconButton size="sm" variant="ghost" colorScheme="red" aria-label="Eliminar" icon={<FiTrash2 />} onClick={() => remove(p)} isDisabled={busy} />
              </Flex>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  )
}
