import React from "react";
import axios from "axios";
import { useInfiniteQuery } from "react-query";

const fetchColors = ({ pageParam = 1 }) => {
  return axios.get(`http://localhost:4000/colors?_limit=2&_page=${pageParam}`);
};

export const InfiniteQueriesPage = () => {
  const { isLoading, isError, error, data, hasNextPage, fetchNextPage } =
    useInfiniteQuery(
      ["colors-infinite"],
      ({ pageParam }) => fetchColors({ pageParam }), // pageParam is a built-in parameter
      {
        getNextPageParam: (_lastPage, pages) => {
          // I put an underscore mark before the lastPage to deactivate it
          if (pages.length < 4) {
            return pages.length + 1;
          } else {
            return undefined;
          }
          // this option returns the hasNextPage and fetchNextPage constants (see above)
          // hasNextPage is a boolean
          // fetchNextPage is a function
        },
      }
    );

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <div>
      {data?.pages.map((group, i) => {
        return (
          <React.Fragment key={i}>
            {group.data.map((color) => {
              return (
                <h3 key={color.id}>
                  {color.id} = {color.label}
                </h3>
              );
            })}
          </React.Fragment>
        );
      })}
      <button disabled={!hasNextPage} onClick={fetchNextPage}>
        Load more...
      </button>
    </div>
  );
};
