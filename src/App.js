/*eslint no-unused-vars: "warn"*/
import React, { useState, useEffect, useCallback } from 'react'

import { getMovieDBGenre, getMovieDBSearch } from './components/Services/Servises'
import CardList from './components/CardList/CardList'

export default function App() {
  const [films, setFilms] = useState([])

  const filmsOnPage = useCallback(async (page = 1) => {
    const dataFilms = await getMovieDBSearch('return', page)
    const genres = await getMovieDBGenre()

    const moviesList = dataFilms.results
    const displayFilms = []
    const genresList = genres

    for (let i = 0; i < 6; i += 1) {
      const genre = moviesList[i].genre_ids.map((id) => {
        const gen = genresList.filter((item) => item.id === id)
        return gen[0]
      })

      displayFilms.push({
        id: moviesList[i].id,
        posterPath: moviesList[i].poster_path,
        title: moviesList[i].title,
        overview: moviesList[i].overview,
        voteAverage: moviesList[i].vote_average,
        releaseDate: moviesList[i].release_date,
        genre,
      })
    }

    setFilms(displayFilms)
  }, [])

  useEffect(() => {
    filmsOnPage(2)
  }, [filmsOnPage])

  return <CardList films={films} />
}
