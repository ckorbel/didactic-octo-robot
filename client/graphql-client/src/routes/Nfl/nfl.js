import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { GET_NFL_TEAMS_QUERY } from "../../queries/queries";
import TeamDetails from "./TeamDetails";

const NFLPage = props => {
  const [team, setTeam] = useState(null);
  const { loading, error, data } = useQuery(GET_NFL_TEAMS_QUERY);

  const renderAllTeams = () => {
    const { nflteams } = data || {};
    if (nflteams) {
      return (
        <div>
          <ul>
            {nflteams.map(team => {
              return (
                <ul key={team.id}>
                  <li>
                    {team.city}
                    {team.name}
                  </li>
                  <li>
                    <img src={`${team.logo}`} style={{ width: "50px" }} />
                  </li>
                  <button onClick={() => setTeam(team.id)}>Team Details</button>
                </ul>
              );
            })}
          </ul>
        </div>
      );
    }
  };

  if (loading) return null;
  if (error) return `Error! ${error}`;

  return (
    <div>
      <h1>Nfl Page</h1>
      {renderAllTeams()}
      <TeamDetails teamId={team} />
    </div>
  );
};

export default NFLPage;
