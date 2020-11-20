import { useEffect } from 'react'

export default (props: { token: string; setToken: Function }) => {
  const { token, setToken } = props

  if (token) {
    setToken('Authorization', `Bearer ${token}`)
  }

  useEffect(() => {
    setToken('Authorization', `Bearer ${token}`)
  }, [token])
}
