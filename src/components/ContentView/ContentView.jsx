import { Spin, Alert } from 'antd'

import CardList from '../CardList/CardList'
import ErrorIndicator from '../Error-indicator/Error-indicator'
import './ContentView.css'

export default function ContentView({ loading, error, totalResults, films, sessionId }) {
  const hasData = !(loading || error)
  const displayContent =
    totalResults === 0 || films.length === 0 ? (
      <Alert message="Not found" description="No films have been found at your request" type="info" />
    ) : (
      <CardList films={films} sessionId={sessionId} />
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
