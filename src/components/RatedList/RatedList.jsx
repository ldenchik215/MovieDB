import React, { useState, useEffect } from 'react'

import { getRatedMovies } from '../Services/Servises'
import ContentView from '../ContentView/ContentView'
import GenresContext from '../../context/GenresContext'
import PagePagination from '../Pagination/PagePagination'

export default function RatedList({ fillCards, genresList, sessionId, loading, setLoading, error, setError }) {
  const [ratedFilms, setRatedFilms] = useState([])
  const [totalResults, setTotalResults] = useState(0)
  const [pageCurrent, setPageCurrent] = useState(1)
  //const [error, setError] = useState(false)

  function onError() {
    setError(true)
    setLoading(false)
  }

  useEffect(() => {
    setLoading(true)
    async function fetchData() {
      try {
        const ratedMovies = await getRatedMovies(sessionId, pageCurrent)

        setRatedFilms(fillCards(ratedMovies.results))
        setTotalResults(ratedMovies.total_results)
        setLoading(false)
      } catch (err) {
        onError(err)
      }
    }

    fetchData()

    return () => {
      setLoading(true)
    }
  }, [pageCurrent])

  return (
    <div className="content">
      <GenresContext.Provider value={genresList}>
        <ContentView
          loading={loading}
          error={error}
          totalResults={totalResults}
          films={ratedFilms}
          sessionId={sessionId}
        />
      </GenresContext.Provider>
      <PagePagination setPageCurrent={setPageCurrent} pageCurrent={pageCurrent} totalResults={totalResults} />
    </div>
  )
}
