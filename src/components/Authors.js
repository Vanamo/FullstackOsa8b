import React, { useState } from 'react'

const Authors = (props) => {
  const [name, setName] = useState("")
  const [birthyear, setBirthyear] = useState("")

  if (!props.show) {
    return null
  }
  if (props.authors.loading) {
    return <div>loading...</div>
  }
  const authors = props.authors.data.allAuthors

  const submit = async e => {
    e.preventDefault()

    const birthyearInt = parseInt(birthyear)
    await props.editAuthor({
      variables: { name, setBornTo: birthyearInt }
    })

    setName("")
    setBirthyear("")
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>

      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          name
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          born
          <input
            value={birthyear}
            onChange={({ target }) => setBirthyear(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default Authors