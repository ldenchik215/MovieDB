/*eslint no-unused-vars: "warn"*/
import React, { useState, useEffect } from 'react'
import { Spin, Alert } from 'antd'

import { getMovieDBGenre, getMovieDBSearch, getMovieDBPopular } from '../Services/Servises'
import GenresContext from '../../context/GenresContext'
import Search from '../Search/Search'
import CardList from '../CardList/CardList'
import PagePagination from '../Pagination/PagePagination'
import ErrorIndicator from '../Error-indicator/Error-indicator'
import './App.css'

export default function App() {
  const [films, setFilms] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [pageCurrent, setPageCurrent] = useState(1)
  const [totalResults, setTotalResults] = useState(0)
  const [genresList, setGenresList] = useState([])

  function onError(err) {
    setError(true)
    setLoading(false)
  }

  const fillCard = (filmData) => {
    return {
      id: filmData.id,
      posterPath: filmData.poster_path,
      title: filmData.title,
      overview: filmData.overview,
      voteAverage: filmData.vote_average,
      releaseDate: filmData.release_date,
      genreIds: filmData.genre_ids,
    }
  }

  const onSearch = async (inputValue = '', page = 1) => {
    setLoading(true)
    setError(false)

    try {
      const moviesList = inputValue.trim() ? await getMovieDBSearch(inputValue, page) : await getMovieDBPopular(page)

      const displayFilms = moviesList.results.map((movie) => fillCard(movie))

      setTotalResults(moviesList.total_results)
      setFilms(displayFilms)
      setLoading(false)
    } catch (err) {
      onError(err)
    }
  }

  useEffect(() => {
    async function fetchData() {
      const genres = await getMovieDBGenre()
      setGenresList(genres)
    }

    fetchData()
  }, [])

  return (
    <>
      <main className="content">
        <Search onSearch={onSearch} pageCurrent={pageCurrent} setPageCurrent={setPageCurrent} />
        <GenresContext.Provider value={genresList}>
          <ContentView loading={loading} error={error} totalResults={totalResults} films={films} />
        </GenresContext.Provider>
      </main>
      <PagePagination setPageCurrent={setPageCurrent} pageCurrent={pageCurrent} totalResults={totalResults} />
    </>
  )
}

function ContentView({ loading, error, totalResults, films }) {
  const hasData = !(loading || error)
  const displayContent =
    totalResults === 0 ? (
      <Alert message="Not found" description="No films have been found at your request" type="info" />
    ) : (
      <CardList films={films} />
    )

  const errorMsg = error ? <ErrorIndicator /> : null
  const spiner = loading ? (
    <div className="spiner-warapper">
      <Spin size="large" />
    </div>
  ) : null
  const content = hasData ? displayContent : null

  return (
    <>
      {errorMsg}
      {spiner}
      {content}
    </>
  )
}
