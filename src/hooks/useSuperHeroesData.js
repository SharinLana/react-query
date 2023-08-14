import axios from "axios";
import { useQuery } from "react-query";

const fetchData = () => {
  return axios.get("http://localhost:4000/superheroes");
};

export const useSuperHeroesData = (onSuccess, onError) => {
  return useQuery("super-heroes", fetchData, {
    // staleTime: 10000, // during this time the data will NOT be fetched again from the DB, it will remain stale.
    // //If the data in the DB has been updated during this time, it will not be fetched and displayed until the staleTime is up.
    // refetchOnMount: true, // true - refetch data on every page mount; false - do NOT refetch data on mount; "always" - always refetch data on mount
    // refetchOnWindowFocus: true, // updates (refetches) the data every time when the mouse is focused on the page; other options: false, "always"
    // refetchInterval: 2000, // fetches data every 2 seconds. Inactive when the window is out of focus
    // enabled: false, // prevents data fetching on the page load
    onSuccess: onSuccess,
    onError: onError,
    // select: (data) => {
    //   const heroNames = data.data.map((hero) => hero.name);
    //   // or you can use the filter() or reduce(), or any other methods here to format the result
    //   return heroNames;
    // },
  });
};
