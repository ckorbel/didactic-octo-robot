import { gql } from "apollo-boost";

const AUTHORS_QUERY = gql`
  {
    authors {
      name
      id
    }
  }
`;

const BOOKS_QUERY = gql`
  {
    books {
      id
      name
    }
  }
`;

const GET_BOOK_QUERY = gql`
  query($id: ID) {
    book(id: $id) {
      id
      name
      genre
      author {
        id
        name
        age
        books {
          name
          id
        }
      }
    }
  }
`;

const BOOK_MUTATION = gql`
  mutation($name: String!, $genre: String!, $authorId: ID!) {
    addBook(name: $name, genre: $genre, authorId: $authorId) {
      name
      id
    }
  }
`;

const GET_NFL_TEAMS_QUERY = gql`
  {
    nflteams {
      name
      id
      logo
      city
    }
  }
`;

const GET_NFL_PLAYERS_ON_TEAM = gql`
  query($id: ID!) {
    nflteam(id: $id) {
      name
      players {
        id
        name
      }
    }
  }
`;

export {
  AUTHORS_QUERY,
  BOOKS_QUERY,
  BOOK_MUTATION,
  GET_BOOK_QUERY,
  GET_NFL_TEAMS_QUERY,
  GET_NFL_PLAYERS_ON_TEAM
};
