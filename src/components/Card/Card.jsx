/*eslint no-unused-vars: "warn"*/
import { format } from 'date-fns'
import { Tag, Rate, ConfigProvider, Typography } from 'antd'

import './Card.css'

export default function CardFilm({ filmData = {}, text }) {
  const {
    title = 'The way back',
    voteAverage,
    releaseDate = 'March 5, 2020',
    posterPath,
    overview = null,
    genre = [],
  } = filmData

  return (
    <a href="http://localhost:3000/#" className="card">
      <div className="poster">
        <img src={`http://image.tmdb.org/t/p/w200${posterPath}`} alt="poster" />
      </div>
      <div className="card-header">
        <div className="title-warapper">
          <h4 title={title}>{title}</h4>
          <div className="rate">{voteAverage ? voteAverage.toFixed(1) : '0.0'}</div>
        </div>
        <div className="date">{format(releaseDate, 'MMMM d, yyyy')}</div>
        {genre.map((item) => (
          <Tag className="genre">{item}</Tag>
        ))}
        {/*<Tag className="genre">Action</Tag>
        <Tag className="genre">Drama</Tag>*/}
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
        {overview || text}
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
