import { useState, useEffect } from 'react'
import { getDocs, query, orderBy } from 'firebase/firestore'
import { isFirebaseConfigured, playerInstagramCol } from '../lib/firebase'

// Publicaciones de Instagram cargadas desde /admin, ordenadas por `order`.
export default function useInstagram() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(isFirebaseConfigured)

  useEffect(() => {
    if (!isFirebaseConfigured) return
    getDocs(query(playerInstagramCol(), orderBy('order', 'asc')))
      .then((snap) => setPosts(snap.docs.map((d) => ({ id: d.id, ...d.data() }))))
      .catch(() => setPosts([]))
      .finally(() => setLoading(false))
  }, [])

  return { posts, loading }
}
