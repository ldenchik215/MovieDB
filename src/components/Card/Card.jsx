/*eslint no-unused-vars: "warn"*/
//import { useState, useEffect } from 'react'

import { format } from 'date-fns'
import { Tag, Rate, ConfigProvider, Typography } from 'antd'

import './Card.css'

export default function Card({ filmData = {} }) {
  const { title, voteAverage, releaseDate, posterPath, overview = null, genre = [] } = filmData

  return (
    <a href="http://localhost:3000/#" className="card">
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
      <div className="card-header">
        <div className="title-warapper">
          <h4 title={title}>{title}</h4>
          <div className="rate">{voteAverage ? voteAverage.toFixed(1) : '0.0'}</div>
        </div>
        <div className="date">{releaseDate ? format(releaseDate, 'MMMM d, yyyy') : 'No release date'}</div>
        {genre.map((item) => (
          <Tag className="genre" key={item.id}>
            {item.name}
          </Tag>
        ))}
      </div>
      <Typography.Paragraph
        ellipsis={{
          rows: 5,
          expanded: false,
        }}
        className="overview"
        style={{
          margin: '7px 0px 0px 0px',
        }}
      >
        {overview}
      </Typography.Paragraph>
      <ConfigProvider
        theme={{
          components: {
            Rate: {
              starSize: 15,
              marginXS: 7,
            },
          },
        }}
      >
        <Rate count={10} defaultValue={2.5} disabled allowHalf starSize={15} />
      </ConfigProvider>
    </a>
  )
}
