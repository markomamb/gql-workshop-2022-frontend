import { useState } from 'react'
import { useApplicationContext } from './ApplicationContext'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import { useApolloClient, useSubscription } from '@apollo/client'
import { ALL_BOOKS, BOOK_ADDED_SUB } from './graphql'


const App = () => {
  const { token, setToken, page, setPage, error } = useApplicationContext()
  const client = useApolloClient()

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  useSubscription(BOOK_ADDED_SUB, {
    onSubscriptionData: ({ subscriptionData }) => {
      const book = subscriptionData.data.bookAdded
      client.cache.updateQuery({ query: ALL_BOOKS }, ({ allBooks, genres }) => {
        return {
          allBooks: allBooks.concat(book),
          genres
        }
      })
      alert(`Book '${book.title}' was added.`)
    }
  })

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
