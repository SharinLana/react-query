import axios from "axios";
import { useQuery } from "react-query";

const fetchHeroDetails = (heroId) => {
  return axios.get(`http://localhost:4000/superheroes/${heroId}`);
};

export const useSuperHeroesData = (heroId) => {
  return useQuery(["super-hero", heroId], () => fetchHeroDetails(heroId));
  // Notes:
  // ["super-hero", heroId]: a unique key + an id of a particular hero (eg.: ["super-hero","2"], or ["super-hero","3"])
};
