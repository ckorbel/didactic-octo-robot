import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { GET_NFL_PLAYERS_ON_TEAM } from "../../queries/queries";

const TeamDetails = ({ teamId }) => {
  const { loading, error, data } = useQuery(GET_NFL_PLAYERS_ON_TEAM, {
    variables: { id: teamId }
  });
  console.log(teamId, data);
  const displayTeamDetails = () => {
    const { nflteam } = data || {};
    if (teamId && nflteam) {
      return (
        <div>
          <ul>
            {nflteam.players.map(player => {
              return <li key={player.id}>{player.name}</li>;
            })}
          </ul>
        </div>
      );
    }
  };
  if (loading) return null;
  if (error) return `Error! ${error}`;
  return <div>{displayTeamDetails()}</div>;
};

export default TeamDetails;
