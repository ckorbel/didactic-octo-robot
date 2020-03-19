import { gql } from "apollo-boost";

const GET_NFL_TEAM_QUERY = gql`
  query($id: ID) {
    nflteam(id: $id) {
      name
      logo
      id
      location
    }
  }
`;

const GET_NFL_PLAYER_QUERY = gql`
  query($id: ID) {
    nflplayer(id: $id) {
      name
      position
      currentTeam {
        name
        location
        logo
      }
    }
  }
`;

export { GET_NFL_TEAM_QUERY, GET_NFL_PLAYER_QUERY };
