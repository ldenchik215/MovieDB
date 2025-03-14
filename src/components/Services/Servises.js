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
    if (!res.ok) {
      console.log('not ok')
      throw new Error(`Could not fetch ${url}, received !!! ${res.status}`)
    }

    return await res.json()
  } catch (err) {
    console.log(err)
    return []
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
