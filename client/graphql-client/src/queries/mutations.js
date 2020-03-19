import { gql } from "apollo-boost";

const ADD_NFL_TEAM = gql`
  mutation($name: String!, $logo: String!, $location: String!) {
    addNflTeam(name: $name, logo: $logo, location: $location) {
      name
      id
      logo
      location
    }
  }
`;

const ADD_NFL_PLAYER = gql`
  mutation($name: String!, $position: String!, $currentTeamId: String!) {
    addNflPlayer(
      name: $name
      position: $position
      currentTeamId: $currentTeamId
    ) {
      name
      position
      currentTeam {
        name
        logo
        location
      }
    }
  }
`;

const UPDATE_NFL_PLAYER = gql`
  mutation(
    $id: ID!
    $name: String!
    $position: String!
    $currentTeamId: String!
  ) {
    updateNFlPlayer(
      id: $id
      name: $name
      position: $position
      currentTeamId: $currentTeamId
    ) {
      name
      position
      currentTeam {
        name
      }
    }
  }
`;

export { ADD_NFL_TEAM, ADD_NFL_PLAYER };
