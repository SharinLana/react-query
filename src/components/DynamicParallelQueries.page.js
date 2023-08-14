import axios from "axios";
import { useQueries } from "react-query";

// heroId is the dynamic part of the query
const fetchSuperHero = (heroId) => {
  return axios.get(`http://localhost:4000/superheroes/${heroId}`);
};

// { heroIds } as a prop came from App.js
export const DynamicParallelQueriesPage = ({ heroIds }) => {
  const queryResults = useQueries(
    heroIds.map((heroId) => {
      return {
        queryKey: ["superHero", heroId],
        queryFn: () => fetchSuperHero(heroId),
      };
    })
  );

  console.log({ queryResults });
  /* queryResults: Array(2):
    0: {status: 'success', isLoading: false, isSuccess: true, isError: false, isIdle: false, …}
    1: {status: 'success', isLoading: false, isSuccess: true, isError: false, isIdle: false, …}
  */

  return (
    <div>
      <h2>Dynamic parallel queries</h2>
    </div>
  );
};
