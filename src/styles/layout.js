// Margen lateral común a todas las secciones, para que la web quede alineada.
// En escritorio: 9vw, y en pantallas muy anchas el contenido se limita a 1600px
// (el margen crece para mantenerlo centrado).
export const GUTTER_LG = 'max(9vw, calc((100vw - 1600px) / 2))'

export const PAGE_PX = { base: 5, md: 10, lg: GUTTER_LG }
