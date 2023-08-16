import React from "react";
import axios from "axios";
import { useQuery } from "react-query";

const fetchColors = () => {
  return axios.get(`http://localhost:4000/colors`);
};

export const InfiniteQueriesPage = () => {
  const { isLoading, isError, error, data } = useQuery(
    ["colors-infinite"],
    fetchColors()
  );

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <div>
      {data?.data.map((color) => {
        return (
          <div key={color.id}>
            <h3>
              {color.id} - {color.label}
            </h3>
          </div>
        );
      })}
      <button>Load more...</button>
    </div>
  );
};
