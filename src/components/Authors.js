import React, { useState } from "react";
import Select from "react-select";

const Authors = props => {
  const [birthyear, setBirthyear] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);

  if (!props.show) {
    return null;
  }
  if (props.authors.loading) {
    return <div>loading...</div>;
  }
  const authors = props.authors.data.allAuthors;

  const options = authors.map(a => {
    return { value: a.name, label: a.name };
  });

  const submit = async e => {
    e.preventDefault();

    const birthyearInt = parseInt(birthyear);
    await props.editAuthor({
      variables: { name: selectedOption.value, setBornTo: birthyearInt }
    });

    setSelectedOption(null);
    setBirthyear("");
  };

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th />
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map(a => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <Select
          value={selectedOption}
          onChange={selectedOption => setSelectedOption(selectedOption)}
          options={options}
        />
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
  );
};

export default Authors;
