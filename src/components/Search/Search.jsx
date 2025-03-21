import { useCallback, useEffect } from 'react'
import { Input } from 'antd'
import debounce from 'lodash.debounce'

import './Search.css'

export default function Search({ onSearch, pageCurrent, setPageCurrent, searchValue, setSearchValue }) {
  const debouncedSearch = useCallback(debounce(onSearch, 1000), [])

  useEffect(() => {
    debouncedSearch(searchValue, pageCurrent)
    return () => {
      debouncedSearch.cancel()
    }
  }, [debouncedSearch, pageCurrent])

  const onChange = (event) => {
    setSearchValue(event.target.value)
    debouncedSearch(event.target.value)
    setPageCurrent(1)
  }

  return <Input className="search" placeholder="Type to search..." onChange={onChange} value={searchValue} />
}
