import React from "react";
import { useParams } from "react-router-dom";
import { useSuperHeroesData } from "../hooks/useSuperHeroData";

export const RQSuperHeroPage = () => {
  const { heroId } = useParams();
  const { isLoading, isError, error, data } = useSuperHeroesData(heroId);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <div>
      {data?.data.name} - {data?.data.alterEgo}
    </div>
  );
};
