import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "react-query";

const fetchData = () => {
  return axios.get("http://localhost:4000/superheroes");
};

const addDataToDB = (hero) => {
  return axios.post("http://localhost:4000/superheroes", hero);
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

export const useAddDataToDB = () => {
  const queryClient = useQueryClient();
  return useMutation(addDataToDB, {
    // !USING MUTATION RESPONSE TECHNIQUE TO UPDATE THE QUERY DATA
    // onSuccess: (data) => {
    //   // queryClient.invalidateQueries("super-heroes"); // use the key from the func that fetches all the heroes
    //   queryClient.setQueryData("super-heroes", (oldQueryData) => {
    //     return {
    //       ...oldQueryData, // the data from cache
    //       data: [...oldQueryData.data, data.data],
    //     };
    //   });
    // },

    // ! OPTIMISTIC UPDATES TECHNIQUE
    onMutate: async (hero) => {
      await queryClient.cancelQueries("super-heroes");
      const previousData = queryClient.getQueryData("super-heroes");

      queryClient.setQueryData("super-heroes", (oldQueryData) => {
        return {
          data: [
            ...oldQueryData.data, // the data from cache
            { id: oldQueryData?.data?.length + 1, ...hero }, // may use any other technique to set the id for the new hero
          ],
        };
      });

      return { previousData };
    },

    onError: (_error, hero, context) => {
      queryClient.setQueryData("super-heroes", context.previousData);
    },
    onSettled: () => {
      queryClient.invalidateQueries("super-heroes"); // fetch the updated data
    },
  });
};
