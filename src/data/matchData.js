export function docToMatch(data) {
  return {
    home:      { name: data.home_team, shield: data.home_shield || null },
    away:      { name: data.away_team, shield: data.away_shield || null },
    homeScore: data.home_score ?? null,
    awayScore: data.away_score ?? null,
    date:      data.match_date,
    stadium:   data.stadium || '',
    competition: data.competition || '',
  }
}

// Sin datos por defecto: los partidos se cargan desde /admin (Firestore,
// players/ramiro_gonzalezsala/matches/{last|next}). Si no hay datos,
// la pestaña de partidos del Hero no se muestra (nunca datos inventados).
export const defaultMatches = {
  last: null,
  next: null,
}
