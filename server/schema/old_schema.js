const graphql = require("graphql");
const _ = require("lodash");
const Book = require("../models/book");
const Author = require("../models/author");
const NflTeam = require("../models/postgres/Nflteam");
const NflPlayer = require("../models/nflplayer");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
} = graphql;

const NflTeamType = new GraphQLObjectType({
  name: "NflTeam",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    logo: { type: GraphQLString },
    location: { type: GraphQLString },
    players: {
      type: new GraphQLList(NflPlayerType),
      resolve(parent, args) {
        console.log(parent, args);
        // return NflPlayer.find({ currentTeamId: parent.id });
      }
    }
  })
});

const NflPlayerType = new GraphQLObjectType({
  name: "NflPlayer",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    position: { type: GraphQLString },
    currentTeam: {
      type: NflTeamType,
      resolve(parent, args) {
        console.log(parent, args);
        return NflTeam.findById(parent.authorId);
      }
    }
  })
});

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        // console.log(parent);
        // return _.find(authors, { id: parent.authorId });
        return Author.findById(parent.authorId);
      }
    }
  })
});

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return Book.find({ authorId: parent.id });
      }
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // code to get data from db
        // return _.find(books, { id: args.id });
        return Book.findById(args.id);
      }
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return Book.find({});
      }
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // return _.find(authors, { id: args.id });
        return Author.findById(args.id);
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        return Author.find({});
      }
    },
    nflplayer: {
      type: NflPlayerType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return NflPlayer.findById(args.id);
      }
    },
    nflplayers: {
      type: NflPlayerType,
      resolve(parent, args) {
        console.log(parent, args);
        return NflPlayer.find({});
      }
    },

    nflplayerByPosition: {
      type: NflPlayerType,
      args: { position: { type: GraphQLString } },
      resolve(parent, args) {
        // JUST A MESS
        // console.log(parent, args.position);
        // console.log(NflPlayer.find({ position: args.position }));
        //Customer.find({ email: /foo\.bar/ }, null, { limit: 1 });
        NflPlayer.find()
          .populate("position")
          .exec((err, players) => {
            players = players.filter(player => {
              console.log(player);
              return player.position === args.position;
            });
          });
      }
    },

    nflteam: {
      type: NflTeamType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        console.log(parent, args);
        return NflTeam.findById(args.id);
      }
    },
    nflteams: {
      type: new GraphQLList(NflTeamType),
      resolve(parent, args) {
        console.log(parent, args);
        return NflTeam.find({});
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) }
      },
      resolve(parent, args) {
        let author = new Author({
          name: args.name,
          age: args.age
        });
        console.log(author);
        return author.save();
      }
    },

    addBook: {
      type: BookType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        genre: { type: new GraphQLNonNull(GraphQLString) },
        authorId: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parent, args) {
        let book = new Book({
          name: args.name,
          genre: args.genre,
          authorId: args.authorId
        });
        console.log(book);
        return book.save();
      }
    },

    addNflTeam: {
      type: NflTeamType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        logo: { type: GraphQLString },
        city: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args) {
        console.log(parent, args);
        const { name, city, logo } = args;
        let team = new NflTeam({
          name,
          city,
          logo
        });
        return team.save();
      }
    },

    addNflPlayer: {
      type: NflPlayerType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        position: { type: new GraphQLNonNull(GraphQLString) },
        currentTeamId: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parent, args) {
        const { name, position, currentTeamId } = args;
        let player = new NflPlayer({
          name,
          position,
          currentTeamId
        });
        console.log(player);
        return player.save();
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
