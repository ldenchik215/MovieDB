import React, { useContext } from 'react'
import { format } from 'date-fns'
import { Tag } from 'antd'

import GenresContext from '../../context/GenresContext'
import './Card.css'
import StarRate from '../StarRate/StarRate'

export default function Card({ filmData, sessionId }) {
  const { title, voteAverage, releaseDate, posterPath, overview = null, genreIds = [], rating, id } = filmData
  const genresList = useContext(GenresContext)

  const rateStyle = {
    borderColor: '#E90000',
  }

  if (voteAverage > 3) {
    rateStyle.borderColor = '#E97E00'
  }

  if (voteAverage > 5) {
    rateStyle.borderColor = '#E9D100'
  }

  if (voteAverage > 7) {
    rateStyle.borderColor = '#66E900'
  }

  const genres = genreIds.map((genreId) => {
    const genre = genresList.filter((item) => item.id === genreId)
    return genre[0]
  })

  const truncateText = (text, maxLength = 199) => {
    let trancText = text.slice(0, maxLength)
    trancText = trancText.length < maxLength ? trancText : `${trancText.slice(0, trancText.lastIndexOf(' '))}...`

    return trancText
  }

  return (
    <div href="http://localhost:3000/#" className="card">
      <div className="poster">
        <img
          src={
            posterPath
              ? `http://image.tmdb.org/t/p/w200${posterPath}`
              : 'https://www.kino-teatr.ru/static/images/no_poster.jpg'
          }
          alt="poster"
        />
      </div>
      <div className="card-inner-wrapper">
        <div className="card-header">
          <div className="title-warapper">
            <h4 title={title}>{title}</h4>
            <div className="rate" style={rateStyle}>
              {voteAverage ? voteAverage.toFixed(1) : '0.0'}
            </div>
          </div>
          <div className="date">{releaseDate ? format(releaseDate, 'MMMM d, yyyy') : 'No release date'}</div>
          {genres.map((item) => (
            <Tag className="genres" key={item.id}>
              {item.name}
            </Tag>
          ))}
        </div>
        <p className="overview">{truncateText(overview)}</p>
        <StarRate rating={rating} sessionId={sessionId} movieId={id} />
      </div>
    </div>
  )
}
