import { gql, useMutation } from '@apollo/client'
import { ALL_AUTHORS, UPDATE_AUTHOR } from '../graphql'
import { useState, useEffect } from 'react'
import { LOGIN } from '../graphql'
import { useApplicationContext } from '../ApplicationContext'


const Login = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { setToken, setError } = useApplicationContext()

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      setError(error.graphQLErrors[0].message)
    }
  })

  const submit = async (event) => {
    event.preventDefault()

    login({ variables: { username, password } })
    setPassword('')
    setUsername('')
  }

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('books-user-token', token)
    }
  }, [result.data])

  if (!props.show) {
    return null
  }

  if (result.loading) return <div>Loading...</div>

  return (
    <div style={{ margin: '5px' }}>
      <form onSubmit={submit}>
        <p>Username: <input value={username} onChange={evt => setUsername(evt.target.value)} /></p>
        <p>Password: <input type='password' value={password} onChange={evt => setPassword(evt.target.value)} /></p>
        <button type='submit'>Login</button>
      </form>
    </div>
  )
}

export default Login