/*eslint no-unused-vars: "warn"*/
import React, { useState, useEffect, useCallback } from 'react'
import { Spin } from 'antd'

import { getMovieDBGenre, getMovieDBSearch } from './components/Services/Servises'
import CardList from './components/CardList/CardList'
import ErrorIndicator from './components/Error-indicator/Error-indicator'

export default function App() {
  const [films, setFilms] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  function onError(err) {
    setError(true)
    setLoading(false)
    console.log(err)
  }

  const fillCard = (filmData, genres) => {
    return {
      id: filmData.id,
      posterPath: filmData.poster_path,
      title: filmData.title,
      overview: filmData.overview,
      voteAverage: filmData.vote_average,
      releaseDate: filmData.release_date,
      genres,
    }
  }

  const filmsOnPage = useCallback(async (page = 1) => {
    setLoading(true)

    try {
      const moviesList = await getMovieDBSearch('return', page)
      const genresList = await getMovieDBGenre()

      const displayFilms = []

      for (let i = 0; i < 6; i += 1) {
        const genres = moviesList[i].genre_ids.map((id) => {
          const genre = genresList.filter((item) => item.id === id)
          return genre[0]
        })

        displayFilms.push(fillCard(moviesList[i], genres))
      }

      setFilms(displayFilms)
      setLoading(false)
    } catch (err) {
      onError(err)
    }
  }, [])

  useEffect(() => {
    filmsOnPage(4)
  }, [filmsOnPage])

  const hasData = !(loading || error)

  const errorMsg = error ? <ErrorIndicator /> : null
  const spiner = loading ? <Spin size="large" fullscreen /> : null
  const content = hasData ? <CardList films={films} /> : null

  return (
    <>
      {errorMsg}
      {spiner}
      {content}
    </>
  )
}
