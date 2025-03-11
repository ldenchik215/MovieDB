/*eslint no-unused-vars: "warn"*/

import { format } from 'date-fns'
import { Tag, Rate, ConfigProvider } from 'antd'

import './Card.css'

export default function Card({ filmData = {} }) {
  const { title, voteAverage, releaseDate, posterPath, overview = null, genres = [] } = filmData

  const truncateText = (text, maxLength = 199) => {
    let trancText = text.slice(0, maxLength)
    trancText = trancText.length < maxLength ? trancText : `${trancText.slice(0, trancText.lastIndexOf(' '))}...`

    return trancText
  }

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
      <div className="card-inner-wrapper">
        <div className="card-header">
          <div className="title-warapper">
            <h4 title={title}>{title}</h4>
            <div className="rate">{voteAverage ? voteAverage.toFixed(1) : '0.0'}</div>
          </div>
          <div className="date">{releaseDate ? format(releaseDate, 'MMMM d, yyyy') : 'No release date'}</div>
          {genres.map((item) => (
            <Tag className="genres" key={item.id}>
              {item.name}
            </Tag>
          ))}
        </div>
        <p className="overview">{truncateText(overview)}</p>
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
      </div>
    </a>
  )
}
