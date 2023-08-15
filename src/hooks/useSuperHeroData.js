import axios from "axios";
import { useQuery, useQueryClient } from "react-query";

const fetchHeroDetails = (heroId) => {
  return axios.get(`http://localhost:4000/superheroes/${heroId}`);
};

// Receive the data for each super hero from cache using the useQueryClient hook
export const useSuperHeroData = (heroId) => {
  const queryClient = useQueryClient();

  return useQuery(["super-hero", heroId], () => fetchHeroDetails(heroId), {
    initialData: () => {
      const hero = queryClient
        .getQueryData("super-heroes") // get data for all super heroes
        ?.data?.find((hero) => hero.id === parseInt(heroId));

      if (hero) {
        return { data: hero };
      } else {
        return undefined;
      }
    },
  });
  // Notes:
  // ["super-hero", heroId]: a unique key + an id of a particular hero (eg.: ["super-hero","2"], or ["super-hero","3"])
};
