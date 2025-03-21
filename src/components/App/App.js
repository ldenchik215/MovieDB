import React, { useState, useEffect } from 'react'
import { Tabs } from 'antd'

import { getMovieDBGenre, getMovieDBSearch, getMovieDBPopular, getGuestSessionId } from '../Services/Servises'
import GenresContext from '../../context/GenresContext'
import Search from '../Search/Search'
import PagePagination from '../Pagination/PagePagination'
import ContentView from '../ContentView/ContentView'
import RatedList from '../RatedList/RatedList'
import './App.css'

export default function App() {
  const [sessionId, setSesionId] = useState(null)
  const [films, setFilms] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [pageCurrent, setPageCurrent] = useState(1)
  const [totalResults, setTotalResults] = useState(0)
  const [genresList, setGenresList] = useState([])
  const [searchValue, setSearchValue] = useState('')

  function onError() {
    setError(true)
    setLoading(false)
  }

  const fillCards = (filmsArray = []) => {
    const result = filmsArray.map((movie) => {
      const rating = localStorage.getItem(movie.id)

      return {
        id: movie.id,
        posterPath: movie.poster_path,
        title: movie.title,
        overview: movie.overview,
        voteAverage: movie.vote_average,
        releaseDate: movie.release_date,
        genreIds: movie.genre_ids,
        rating,
      }
    })

    return result
  }

  const onSearch = async (inputValue = '', page = 1) => {
    setLoading(true)
    setError(false)

    try {
      const moviesList = inputValue.trim() ? await getMovieDBSearch(inputValue, page) : await getMovieDBPopular(page)

      const displayFilms = await fillCards(moviesList.results)

      setTotalResults(moviesList.total_results)
      setFilms(displayFilms)
      setLoading(false)
    } catch (err) {
      onError(err)
    }
  }

  useEffect(() => {
    async function fetchData() {
      const guestSesionId = await getGuestSessionId()
      const genres = await getMovieDBGenre()

      setGenresList(genres)
      setSesionId(guestSesionId)
    }

    localStorage.clear()
    fetchData()

    return setLoading(true)
  }, [])

  const tabs = [
    {
      key: '1',
      label: 'Search',
      children: (
        <div className="content">
          <Search
            onSearch={onSearch}
            pageCurrent={pageCurrent}
            setPageCurrent={setPageCurrent}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
          />
          <GenresContext.Provider value={genresList}>
            <ContentView
              loading={loading}
              error={error}
              totalResults={totalResults}
              films={films}
              sessionId={sessionId}
            />
          </GenresContext.Provider>
          <PagePagination setPageCurrent={setPageCurrent} pageCurrent={pageCurrent} totalResults={totalResults} />
        </div>
      ),
    },

    {
      key: '2',
      label: 'Rated',
      children: (
        <RatedList
          genresList={genresList}
          loading={loading}
          setLoading={setLoading}
          error={error}
          setError={setError}
          totalResults={totalResults}
          fillCards={fillCards}
          sessionId={sessionId}
        />
      ),
    },
  ]

  return <Tabs defaultActiveKey="1" items={tabs} centered destroyInactiveTabPane />
}
