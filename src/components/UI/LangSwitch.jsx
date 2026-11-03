import { Box, Flex, Text, Menu, MenuButton, MenuList, MenuOptionGroup, MenuItemOption } from '@chakra-ui/react'
import { LANGS, useLang, useT } from '../../i18n/LanguageContext'

// ─────────────────────────────────────────────────────────────
// Selector de idioma (ES / EN / IT) · navbar y footer.
// Botón chico con globo + código; al abrir, lista con el nombre de
// cada idioma en su propia lengua y un nodo celeste en el activo.
// ─────────────────────────────────────────────────────────────

const EASE_OUT = 'cubic-bezier(0.23, 1, 0.32, 1)'
const HOVER = '@media (hover: hover) and (pointer: fine)'
const LABEL = { es: 'Idioma', en: 'Language', it: 'Lingua' }

function GlobeIcon(props) {
  return (
    <Box as="svg" viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="M3.5 12h17M12 3.5c2.4 2.3 3.6 5.1 3.6 8.5s-1.2 6.2-3.6 8.5c-2.4-2.3-3.6-5.1-3.6-8.5s1.2-6.2 3.6-8.5z"
        fill="none" stroke="currentColor" strokeWidth="1.6" />
    </Box>
  )
}

export default function LangSwitch({ placement = 'bottom-end', full = false }) {
  const { lang, setLang } = useLang()
  const t = useT()
  const current = LANGS.find((l) => l.code === lang)

  return (
    <Menu placement={placement} gutter={8} autoSelect={false}>
      {({ isOpen }) => (
        <>
          <MenuButton
            aria-label={`${t(LABEL)}: ${current.name}`}
            h={full ? '48px' : '42px'}
            px={full ? 4 : 3}
            border="1px solid"
            borderColor={isOpen ? 'brand.celeste' : 'brand.linea'}
            color={isOpen ? 'brand.celeste' : 'brand.bone'}
            fontFamily="mono"
            fontWeight="700"
            fontSize={full ? '16px' : '15px'}
            letterSpacing="0.08em"
            transition={`color 160ms ease, border-color 160ms ease, transform 140ms ease-out`}
            _active={{ transform: 'scale(0.97)' }}
            _focusVisible={{ outline: '2px solid', outlineColor: 'brand.celesteLight', outlineOffset: '3px' }}
            sx={{ [HOVER]: { '&:hover': { borderColor: 'brand.celeste', color: 'brand.celeste' } } }}
          >
            <Flex as="span" align="center" gap={2}>
              <GlobeIcon boxSize="17px" />
              <span>{current.short}</span>
              <Box as="svg" viewBox="0 0 12 12" boxSize="10px" aria-hidden="true"
                transform={isOpen ? 'rotate(180deg)' : 'none'} transition={`transform 200ms ${EASE_OUT}`}>
                <path d="M2 4.5l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.6" />
              </Box>
            </Flex>
          </MenuButton>

          <MenuList
            minW="180px"
            py={1.5}
            bg="brand.carbon"
            border="1px solid"
            borderColor="brand.celeste"
            borderRadius={0}
            boxShadow="0 18px 40px rgba(0,0,0,0.55)"
            zIndex={1100}
          >
            <MenuOptionGroup type="radio" value={lang} onChange={setLang}>
              {LANGS.map((l) => (
                <MenuItemOption
                  key={l.code}
                  value={l.code}
                  lang={l.code}
                  icon={<Box boxSize="7px" borderRadius="full" bg="brand.celeste" boxShadow="0 0 8px rgba(76,184,242,0.7)" />}
                  iconSpacing={3}
                  bg="transparent"
                  color={l.code === lang ? 'brand.bone' : 'brand.gray'}
                  px={4}
                  py={2.5}
                  _hover={{ bg: 'brand.celesteAlpha', color: 'brand.bone' }}
                  _focus={{ bg: 'brand.celesteAlpha', color: 'brand.bone' }}
                >
                  <Flex align="baseline" gap={3}>
                    <Text as="span" fontFamily="mono" fontWeight="700" fontSize="15px" letterSpacing="0.08em"
                      color={l.code === lang ? 'brand.celeste' : 'inherit'} w="22px">
                      {l.short}
                    </Text>
                    <Text as="span" fontSize="15px">{l.name}</Text>
                  </Flex>
                </MenuItemOption>
              ))}
            </MenuOptionGroup>
          </MenuList>
        </>
      )}
    </Menu>
  )
}
