import React, { useState } from "react";
import axios from "axios";
import { useQuery } from "react-query";

const fetchColors = (pageNumber) => {
  return axios.get(`http://localhost:4000/colors?_limit=2&_page=${pageNumber}`);
};

export const PaginatedQueriesPage = () => {
  const [pageNumber, setPageNumber] = useState(1);

  const { isLoading, isError, error, data } = useQuery(
    ["colors", pageNumber],
    () => fetchColors(pageNumber),
    {
      keepPreviousData: true, // to use cached data and prevent the Loading... message on every click
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
      {data?.data.map((color) => {
        return (
          <div key={color.id}>
            <h3>
              {color.id} - {color.label}
            </h3>
          </div>
        );
      })}
      <div>
        <button
          onClick={() => setPageNumber((page) => page - 1)}
          disabled={pageNumber === 1}
        >
          Prev
        </button>
        <button
          onClick={() => setPageNumber((page) => page + 1)}
          disabled={pageNumber === 4}
        >
          Next
        </button>
      </div>
    </div>
  );
};
