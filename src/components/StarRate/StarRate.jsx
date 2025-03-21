import React, { useState } from 'react'
import { Rate, ConfigProvider } from 'antd'

import { postRating } from '../Services/Servises'

export default function StarRate({ movieId, rating, sessionId }) {
  const [starCount, setStarCount] = useState(rating)

  const onChange = (rate) => {
    setStarCount(rate)
    postRating(movieId, rate, sessionId)
    localStorage.setItem(movieId, rate)
  }

  return (
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
      <Rate
        count={10}
        defaultValue={0}
        allowHalf
        allowClear={false}
        starSize={15}
        onChange={onChange}
        value={Number(starCount)}
      />
    </ConfigProvider>
  )
}
