import { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react'

// ─────────────────────────────────────────────────────────────
// IDIOMAS · español (predeterminado), inglés e italiano.
//  · Todo texto traducible se escribe como { es, en, it }.
//  · useLocalized(data) / t(valor) lo resuelven al idioma activo,
//    recorriendo objetos y arrays. Si falta una traducción, se usa
//    el español.
// ─────────────────────────────────────────────────────────────

export const LANGS = [
  { code: 'es', short: 'ES', name: 'Español' },
  { code: 'en', short: 'EN', name: 'English' },
  { code: 'it', short: 'IT', name: 'Italiano' },
]
export const DEFAULT_LANG = 'es'

const CODES = LANGS.map((l) => l.code)
const STORAGE_KEY = 'rgs-lang'

const PAGE_TITLE = {
  es: 'Ramiro Gonzalez Sales | Entrenador de Fútbol · Licencia Pro',
  en: 'Ramiro Gonzalez Sales | Football Coach · Pro Licence',
  it: 'Ramiro Gonzalez Sales | Allenatore di Calcio · Licenza Pro',
}

const isPlainObject = (v) => v !== null && typeof v === 'object' && Object.getPrototypeOf(v) === Object.prototype
const isDict = (v) => 'es' in v && Object.keys(v).every((k) => CODES.includes(k))

export function localize(value, lang) {
  if (Array.isArray(value)) return value.map((v) => localize(v, lang))
  if (!isPlainObject(value)) return value
  if (isDict(value)) return localize(value[lang] ?? value[DEFAULT_LANG], lang)
  const out = {}
  for (const k in value) out[k] = localize(value[k], lang)
  return out
}

function readStored() {
  try {
    const v = localStorage.getItem(STORAGE_KEY)
    return CODES.includes(v) ? v : DEFAULT_LANG
  } catch {
    return DEFAULT_LANG
  }
}

const LanguageContext = createContext({ lang: DEFAULT_LANG, setLang: () => {} })

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(readStored)

  const setLang = useCallback((code) => {
    if (!CODES.includes(code)) return
    setLangState(code)
    try { localStorage.setItem(STORAGE_KEY, code) } catch { /* sin storage: solo esta visita */ }
  }, [])

  useEffect(() => {
    document.documentElement.lang = lang
    document.title = PAGE_TITLE[lang]
  }, [lang])

  const value = useMemo(() => ({ lang, setLang }), [lang, setLang])
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export const useLang = () => useContext(LanguageContext)

/* t({ es, en, it }) → texto en el idioma activo */
export function useT() {
  const { lang } = useLang()
  return useCallback((v) => localize(v, lang), [lang])
}

/* Datos completos (coachData, careerData…) resueltos al idioma activo */
export function useLocalized(data) {
  const { lang } = useLang()
  return useMemo(() => localize(data, lang), [data, lang])
}
