import { Pagination } from 'antd'

import './PagePagination.css'

export default function PagePagination({ setPageCurrent, pageCurrent, totalResults }) {
  const onChange = (page) => {
    setPageCurrent(page)
  }

  return (
    <Pagination
      className="pagination"
      align="center"
      defaultCurrent={1}
      current={pageCurrent}
      total={totalResults}
      showSizeChanger={false}
      pageSize={20}
      onChange={onChange}
    />
  )
}
