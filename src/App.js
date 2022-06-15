import { useState } from 'react'
import { useApplicationContext } from './ApplicationContext'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import { useApolloClient } from '@apollo/client'


const App = () => {
  const { token, setToken, page, setPage, error } = useApplicationContext()
  const client = useApolloClient()

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token && <button onClick={() => setPage('add')}>add book</button>}
        {!token ?
          <button onClick={() => setPage('login')}>login</button> :
          <button onClick={logout}>logout</button>
        }
        {error && <div>{error}</div>}
      </div>

      <Authors show={page === 'authors'} />

      <Books show={page === 'books'} />

      <NewBook show={page === 'add'} />

      <Login show={page === 'login'} />
    </div>
  )
}

export default App;
