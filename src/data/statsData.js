// ─────────────────────────────────────────────────────────────
// DATOS · Diversidad de jugadores dirigidos + Trayectoria como jugador
// ⚠️ Textos y cifras EXACTOS de las placas del portfolio original.
// ─────────────────────────────────────────────────────────────

import tiroFederal from '@assets/clubes/tiro_federal.webp'
import castellana from '@assets/clubes/castellana.webp'
import terlizzi from '@assets/clubes/terlizzi.webp'
import puertoSanMartin from '@assets/clubes/puerto_san_martin.webp'
import gimnasiaEr from '@assets/clubes/gimnasia_er.webp'
import guarani from '@assets/clubes/guarani.webp'
import sanTelmo from '@assets/clubes/san_telmo.webp'
import cittanovese from '@assets/clubes/cittanovese.webp'
import altamura from '@assets/clubes/altamura.webp'
import corigliano from '@assets/clubes/corigliano.webp'
import lignano from '@assets/clubes/lignano.webp'
import pdha from '@assets/clubes/pdha.webp'
import matino from '@assets/clubes/matino.webp'

export const diversity = {
  title: { es: 'DIVERSIDAD DE JUGADORES DIRIGIDOS', en: 'DIVERSITY OF PLAYERS COACHED', it: 'DIVERSITÀ DEI GIOCATORI ALLENATI' },
  // "Más de 20 nacionalidades | +30 ligas del mundo | 60 jugadores con pasado en
  //  selecciones de 16 países | 27 futbolistas promovidos al primer equipo"
  stats: [
    { lead: { es: 'Más de', en: 'More than', it: 'Più di' }, value: 20, prefix: '', label: { es: 'nacionalidades', en: 'nationalities', it: 'nazionalità' } },
    { value: 30, prefix: '+', label: { es: 'ligas del mundo', en: 'leagues worldwide', it: 'campionati nel mondo' } },
    { value: 60, prefix: '', label: { es: 'jugadores con pasado en selecciones de 16 países', en: 'players with national-team experience from 16 countries', it: 'giocatori con esperienza in nazionale di 16 paesi' } },
    { value: 27, prefix: '', label: { es: 'futbolistas promovidos al primer equipo', en: 'players promoted to the first team', it: 'calciatori promossi in prima squadra' } },
  ],
  // Ligas del mapa (código del país en worldMap.json). Nombres deducidos de los logos de la placa.
  // side/slot: ubicación de la insignia alrededor del mapa (como en la placa).
  leagues: [
    { code: 'NLD', name: 'Eredivisie',         side: 'left',   slot: 0 },
    { code: 'BEL', name: 'Jupiler Pro League', side: 'left',   slot: 1 },
    { code: 'GBR', name: 'Premier League',     side: 'left',   slot: 2 },
    { code: 'MEX', name: 'Liga MX',            side: 'left',   slot: 3 },
    { code: 'BRA', name: 'Brasileirão',        side: 'left',   slot: 4 },
    { code: 'ARG', name: 'Liga Profesional',   side: 'left',   slot: 5 },
    { code: 'PRT', name: 'Liga Portugal',      side: 'bottom', slot: 0 },
    { code: 'ESP', name: 'LaLiga',             side: 'bottom', slot: 1 },
    { code: 'FRA', name: 'Ligue 1',            side: 'bottom', slot: 2 },
    { code: 'ITA', name: 'Serie A',            side: 'bottom', slot: 3 },
    { code: 'GRC', name: 'Super League',       side: 'bottom', slot: 4 },
    { code: 'DEU', name: 'Bundesliga',         side: 'right',  slot: 0 },
    { code: 'TUR', name: 'Süper Lig',          side: 'right',  slot: 1 },
    { code: 'JPN', name: 'J.League',           side: 'right',  slot: 2 },
    { code: 'KOR', name: 'K League',           side: 'right',  slot: 3 },
    { code: 'AUS', name: 'A-League',           side: 'right',  slot: 4 },
  ],
}

// Código de país (bandera); el nombre visible sale de COUNTRY_NAME
const AR = 'AR'
const IT = 'IT'

export const COUNTRY_NAME = {
  AR: 'Argentina',
  IT: { es: 'Italia', en: 'Italy', it: 'Italia' },
}

export const playerCareer = {
  title: { es: 'TRAYECTORIA COMO JUGADOR', en: 'PLAYING CAREER', it: 'CARRIERA DA CALCIATORE' },
  clubs: [
    { year: 2007, club: 'TIRO FEDERAL',       country: AR, crest: tiroFederal },
    { year: 2010, club: 'CASTELLANA CALCIO',  country: IT, crest: castellana },
    { year: 2011, club: 'TERLIZZI CALCIO',    country: IT, crest: terlizzi },
    { year: 2014, club: 'PUERTO SAN MARTIN',  country: AR, crest: puertoSanMartin },
    { year: 2015, club: 'GIMNASIA ER',        country: AR, crest: gimnasiaEr },
    { year: 2016, club: 'GUARANI A. FRANCO',  country: AR, crest: guarani },
    { year: 2016, club: 'SAN TELMO',          country: AR, crest: sanTelmo },
    { year: 2017, club: 'CITTANOVESE CALCIO', country: IT, crest: cittanovese },
    { year: 2018, club: 'ALTAMURA CALCIO',    country: IT, crest: altamura },
    { year: 2019, club: 'CORIGLIANO CALCIO',  country: IT, crest: corigliano },
    { year: 2019, club: 'LIGNANO CALCIO',     country: IT, crest: lignano },
    { year: 2020, club: 'PDHA CALCIO',        country: IT, crest: pdha },
    { year: 2020, club: 'MATINO CALCIO',      country: IT, crest: matino },
  ],
}
