import { gql, useQuery, useMutation } from '@apollo/client'
import { ALL_AUTHORS, UPDATE_AUTHOR } from '../graphql'
import { useState } from 'react'


const Authors = (props) => {
  const [authorName, setAuthorName] = useState('')
  const [authorBorn, setAuthorBorn] = useState('')

  const { data, loading, error } = useQuery(ALL_AUTHORS)


  const [updateAuthor] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [ALL_AUTHORS]
  })



  const handleChooseAuthor = (author) => {
    setAuthorName(author.name)
    setAuthorBorn(author.born ?? '')
  }

  const handleUpdate = async () => {
    const setBornTo = authorBorn.length > 0 ? parseInt(authorBorn) : null
    await updateAuthor({
      variables: {
        name: authorName,
        setBornTo
      }
    })
    cancelEdit()
  }

  const cancelEdit = () => {
    setAuthorName('')
    setAuthorBorn(null)
  }

  if (!props.show) {
    return null
  }

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error!</div>

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
            <th></th>
          </tr>
          {data.allAuthors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
              <td><button onClick={() => handleChooseAuthor(a)}>Edit</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      {authorName && <>
        <div>
          <h3>Edit author <button onClick={cancelEdit}>Cancel</button></h3>
          <p>Name: {authorName}</p>
          <p>Born:
            <input
              type="number"
              value={authorBorn}
              onChange={({ target }) => setAuthorBorn(target.value)}
            />
          </p>
          <button onClick={handleUpdate}>Update</button>
        </div>
      </>}
    </div>
  )
}

export default Authors