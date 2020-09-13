export default (error) => {
  if (typeof location !== 'undefined') {
    if (error && error.response && error.response.status === 401) {
      location.replace('/login')
    }
  }
  return Promise.reject(error)
}
