import { gql, useLazyQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import { ALL_BOOKS } from '../graphql'

const Books = (props) => {
  const [getBooks, { data, loading, error }] = useLazyQuery(ALL_BOOKS)
  const [currentGenre, setCurrentGenre] = useState(null)

  useEffect(() => {
    getBooks()
  }, [])

  const filterByGenre = (genre) => {
    return async () => {
      setCurrentGenre(genre)
      await getBooks({
        variables: { genre }
      })
    }
  }

  const allGenres = async () => {
    setCurrentGenre(null)
    await getBooks()
  }

  if (!props.show) {
    return null
  }

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error!</div>

  return (
    <div>
      <h2>books {currentGenre && `(genre: ${currentGenre})`}</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {data?.allBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {data?.genres.map(genre => <button key={genre} onClick={filterByGenre(genre)}>{genre}</button>)}
        <button onClick={allGenres}>All genres</button>
      </div>
    </div>
  )
}

export default Books