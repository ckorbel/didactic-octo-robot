import React, { useState, useEffect } from "react";
import { Query, Mutation } from "react-apollo";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { AUTHORS_QUERY, BOOK_MUTATION, BOOKS_QUERY } from "../queries/queries";

const Authors = () => {
  return (
    <Query query={AUTHORS_QUERY}>
      {({ loading, error, data }) => {
        if (loading) return "Loading...";
        if (error) return `Error! ${error.message}`;
        return data.authors.map(author => {
          return (
            <option key={author.id} value={author.id}>
              {author.name}
            </option>
          );
        });
      }}
    </Query>
  );
};

const AddBook = props => {
  const [addBook] = useMutation(BOOK_MUTATION);
  const [bookData, setBookData] = useState({
    name: "",
    genre: "",
    authorId: ""
  });

  const submitNewBook = e => {
    e.preventDefault();
    const { name, genre, authorId } = bookData;
    addBook({
      variables: {
        name,
        genre,
        authorId
      },
      refetchQueries: [{ query: BOOKS_QUERY }]
    }); // optimistic updates??
  };

  return (
    <div style={{ border: "1px solid red" }}>
      <form className="add-book" onSubmit={submitNewBook}>
        <div className="field">
          <label>Book Name</label>
          <input
            type="text"
            onChange={e => setBookData({ ...bookData, name: e.target.value })}
          />
        </div>
        <div className="field">
          <label>Genre:</label>
          <input
            type="text"
            onChange={e => setBookData({ ...bookData, genre: e.target.value })}
          />
        </div>
        <div className="field">
          <label>Author:</label>
          <select
            onChange={e =>
              setBookData({ ...bookData, authorId: e.target.value })
            }
          >
            <Authors />
          </select>
        </div>
        <button type="submit">Add New Book</button>
      </form>
    </div>
  );
};

export default AddBook;
