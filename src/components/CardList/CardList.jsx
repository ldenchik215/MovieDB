/*eslint no-unused-vars: "warn"*/
import React from 'react'

import Card from '../Card/Card'
import './CardList.css'

export default function CardList({ films = [] }) {
  return (
    <div className="card-list">
      {films.map((film) => (
        <Card filmData={film} key={film.id} />
      ))}
    </div>
  )
}
