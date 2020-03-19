import React from "react";
import { graphql } from "react-apollo";
import { useQuery } from "@apollo/react-hooks";
import { GET_BOOK_QUERY } from "../queries/old_queries";

const BookDetails = ({ bookId }) => {
  const { selected } = bookId || {};
  const { loading, error, data } = useQuery(GET_BOOK_QUERY, {
    variables: { id: selected }
  });

  const displayBookDetails = () => {
    const { book } = data || {};
    if (selected && book) {
      return (
        <div>
          <div>
            <p>{book.name}</p>
            <p>{book.genre}</p>
            <p>{book.author.name}</p>
          </div>
          <ul className="other-books">
            {book.author.books.map(book => {
              return <li key={book.id}>{book.name}</li>;
            })}
          </ul>
        </div>
      );
    }
    return <p>No book selected</p>;
  };
  if (loading) return null;
  if (error) return `Error! ${error}`;
  return <div id="book-details">{displayBookDetails()}</div>;
};

export default graphql(GET_BOOK_QUERY)(BookDetails);
