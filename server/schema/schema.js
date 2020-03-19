const graphql = require("graphql");
const NflTeam = require("../models/postgres/Nflteam");
const NflPlayer = require("../models/postgres/Nflplayer");

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
        return NflPlayer.find({ currentTeamId: parent.id });
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
        return NflTeam.findByPk(parent.currentTeamId);
      }
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    nflteam: {
      type: NflTeamType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        console.log(parent, args);
        return NflTeam.findByPk(args.id);
      }
    },
    nflteams: {
      type: new GraphQLList(NflTeamType),
      resolve(parent, args) {
        console.log(parent, args);
        return NflTeam.findAll();
      }
    },
    nflplayer: {
      type: NflPlayerType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        console.log(parent, args);
        return NflPlayer.findByPk(args.id);
      }
    },
    nflplayers: {
      type: new GraphQLList(NflPlayerType),
      resolve(parent, args) {
        return NflPlayer.findAll();
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addNflTeam: {
      type: NflTeamType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        logo: { type: GraphQLString },
        location: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args) {
        console.log(parent, args);
        const { name, location, logo } = args;
        const nflTeam = NflTeam.create({
          name,
          logo,
          location
        });
        console.log(nflTeam);
        return nflTeam;
      }
    },
    addNflPlayer: {
      type: NflPlayerType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        position: { type: new GraphQLNonNull(GraphQLString) },
        currentTeamId: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args) {
        console.log(parent, args);
        const { name, position, currentTeamId } = args;
        const nflPlayer = NflPlayer.create({
          name,
          position,
          currentTeamId
        });
        console.log(nflPlayer);
        return nflPlayer;
      }
    },
    updateNFlPlayer: {
      type: NflPlayerType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        position: { type: new GraphQLNonNull(GraphQLString) },
        currentTeamId: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args) {
        const { name, position, currentTeamId, id } = args || {};
        NflPlayer.update(
          {
            name,
            position,
            currentTeamId
          },
          {
            where: {
              id: id
            }
          }
        )
          .then(player => {
            return player;
          })
          .catch(err => {
            return err;
          });
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
