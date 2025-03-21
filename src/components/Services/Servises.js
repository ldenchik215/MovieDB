const apiBase = 'https://api.themoviedb.org/3'

async function getResource(url) {
  const option = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YjhkYTYzZGZhY2Q5N2ViOTU2OGNlMzI0YWJjMDc5MCIsIm5iZiI6MTc0MDcxMjA5NC4zMzcsInN1YiI6IjY3YzEyODllYjZjN2UzNDI1Y2EyNjc5NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1mu-52XSc1fomRitIo_qb6njmlPV1okncCTm6AnmQxY',
    },
  }

  try {
    const res = await fetch(`${apiBase}${url}`, option)

    if (res.status === 404) {
      return []
    }

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, received !!! Error status ${res.status}`)
    }

    return await res.json()
  } catch (err) {
    console.error(err)
    return null
  }
}

export async function getMovieDBGenre() {
  const genresList = await getResource('/genre/movie/list')
  return genresList.genres
}

export async function getMovieDBSearch(query, page = 1) {
  const data = await getResource(`/search/movie?query=${query}&page=${page}&sort_by=title.asc`)
  return data
}

export async function getMovieDBPopular(page = 1) {
  const data = await getResource(`/movie/popular?page=${page}&sort_by=title.asc`)
  return data
}

export async function getGuestSessionId() {
  const id = await getResource('/authentication/guest_session/new')
  return id.guest_session_id
}

export async function getRatedMovies(sessionId, page = 1) {
  const data = await getResource(`/guest_session/${sessionId}/rated/movies?page=${page}`)
  return data
}

export async function postRating(movieId, rating, sessionId) {
  const option = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json;charset=utf-8',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YjhkYTYzZGZhY2Q5N2ViOTU2OGNlMzI0YWJjMDc5MCIsIm5iZiI6MTc0MDcxMjA5NC4zMzcsInN1YiI6IjY3YzEyODllYjZjN2UzNDI1Y2EyNjc5NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1mu-52XSc1fomRitIo_qb6njmlPV1okncCTm6AnmQxY',
    },
    body: JSON.stringify({
      value: rating,
    }),
  }

  try {
    const res = await fetch(`${apiBase}/movie/${movieId}/rating?guest_session_id=${sessionId}`, option)
    if (!res.ok) {
      throw new Error(
        `Could not fetch /movie/${movieId}/rating?guest_session_id=${sessionId}, received !!! ${res.status}`,
      )
    }

    return await res.json()
  } catch (err) {
    console.log(err)
    return null
  }
}
