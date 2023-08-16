import React, { useState } from "react";
import { useAddDataToDB } from "../hooks/useSuperHeroesData";

export const PostingDataPage = () => {
  const [name, setName] = useState("");
  const [alterEgo, setAlterEgo] = useState("");

  const { mutate: addHero, isLoading, isError, error } = useAddDataToDB();

  const handlePostRequest = () => {
    const hero = { name, alterEgo };
    addHero(hero);
  };

  return (
    <>
      <h2>Posting data</h2>
      <input
        type="text"
        placeholder="Hero name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Alter ego"
        value={alterEgo}
        onChange={(e) => setAlterEgo(e.target.value)}
      />
      <button onClick={handlePostRequest}>Submit</button>
    </>
  );
};
