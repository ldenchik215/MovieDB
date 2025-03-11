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
  const res = await fetch(`${apiBase}${url}`, option)
  if (!res.ok) {
    throw new Error(`Could not fetch ${url}, received ${res.status}`)
  }

  return await res.json()
}

export async function getMovieDBGenre() {
  const genresList = await getResource('/genre/movie/list')
  return genresList.genres
}

export async function getMovieDBSearch(query, page) {
  const data = await getResource(`/search/movie?query=${query}&page=${page}`)
  return data.results
}
