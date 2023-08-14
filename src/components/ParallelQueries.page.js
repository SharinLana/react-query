import axios from "axios";
import { useQuery } from "react-query";

const fetchSuperHeroes = () => {
  return axios.get("http://localhost:4000/superheroes");
};

const fetchFriends = () => {
  return axios.get("http://localhost:4000/friends");
};

export const ParallelQueriesPage = () => {
  const { data: superHeroes } = useQuery("heroes", fetchSuperHeroes);
  const { data: friends } = useQuery("friends", fetchFriends);

  return (
    <div>
      <h2>Parallel queries page</h2>
      <h4>Super Heroes</h4>
      {superHeroes.data.map((hero) => (
        <div key={hero.id}>{hero.name}</div>
      ))}
      <br />
      <h4>Friends</h4>
      {friends.data.map((friend) => (
        <div key={friend.id}>{friend.name}</div>
      ))}
    </div>
  );
};
