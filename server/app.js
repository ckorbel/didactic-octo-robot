const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema/schema");
// const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./config/db");

const app = express();

// allow cors
app.use(cors());

//Body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

db.authenticate()
  .then(() => console.log("db connected"))
  .catch(err => console.log(err));

// connect to postgresql in the future

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

app.listen(4000, () => console.log(`now listening on port 4000`));
