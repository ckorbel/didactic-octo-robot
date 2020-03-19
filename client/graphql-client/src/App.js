import React from "react";
import AppolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import BookList from "./components/BookList";
import AddBook from "./components/AddBook";
import NFLPage from "./routes/Nfl/nfl";

const client = new AppolloClient({
  uri: "http://localhost:4000/graphql"
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Route exact path="/" component={NFLPage} />
        <Route exact path="/add-book" component={AddBook} />
      </Router>
    </ApolloProvider>
  );
}

export default App;
