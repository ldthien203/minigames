const updateQueryParams = (key, value, searchParams, onSearchParams) => {
  const newParams = new URLSearchParams(searchParams)
  if (value) {
    newParams.set(key, value)
  } else {
    newParams.delete(key)
  }

  onSearchParams(newParams)
}

export default updateQueryParams
