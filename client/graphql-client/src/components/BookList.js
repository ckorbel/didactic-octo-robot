import React, { useState } from "react";
import { graphql } from "react-apollo";
// import styled from 'styled-components';
import { BOOKS_QUERY } from "../queries/old_queries";
import BookDetails from "./BookDetails";

// const BookListStyled

const BookList = ({ data }) => {
  const [selected, setSelected] = useState(null);
  const renderBooks = () => {
    if (data.loading) {
      return <div>Loading books...</div>;
    } else {
      return data.books.map(book => {
        return (
          <li key={book.id} onClick={() => setSelected({ selected: book.id })}>
            {book.name}
          </li>
        );
      });
    }
  };
  console.log(selected);
  return (
    <>
      <ul>{renderBooks()}</ul>
      <BookDetails bookId={selected} />
    </>
  );
};

export default graphql(BOOKS_QUERY)(BookList);
