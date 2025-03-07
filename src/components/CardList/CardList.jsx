/*eslint no-unused-vars: "warn"*/
import React, { useState, useEffect } from 'react'

import { getMovieDBGenre, getMovieDBSearch } from '../Services/Servises'
import Card from '../Card/Card'
import './CardList.css'

export default function CardList() {
  const text =
    'A former basketball all-star, who has lost his wife and family foundation in a struggle with addiction attempts to regain his soul  and salvation by becoming the coach of a disparate ethnically mixed high ... A former basketball all-star, who has lost his wife and family foundation in a struggle with addiction attempts to regain his soul  and salvation by becoming the coach of a disparate ethnically mixed high ...'

  const [filmData, setFilmData] = useState({
    id: null,
    posterPath: null,
    title: null,
    overview: text,
    voteAverage: null,
    releaseDate: null,
    genre: [],
  })

  async function getDataFilms() {
    const data = await getMovieDBSearch('return')
    const genreList = await getMovieDBGenre()
    const genre = data.results[0].genre_ids.map((id) => {
      const gen = genreList.genres.filter((item) => item.id === id)
      return gen[0].name
    })
    console.log(genreList.genres[0].id, data.results[0].genre_ids, genreList.genres, genre)

    setFilmData({
      id: data.results[0].id,
      posterPath: data.results[0].poster_path,
      title: data.results[0].title,
      overview: data.results[0].overview,
      voteAverage: data.results[0].vote_average,
      releaseDate: data.results[0].release_date,
      genre,
    })
  }

  useEffect(() => {
    getDataFilms()
  }, [])

  return (
    <div className="card-list">
      <Card filmData={filmData} />
      <Card filmData={filmData} />
      <Card text={text} />
      <Card />
      <Card />
      <Card />
    </div>
  )
}
