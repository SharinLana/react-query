## React Query demo (comparison with the traditional database connection method)

> The SuperHeroes.page.js file holds the code with the traditional database connection method (through axios). The RQSuperHeroes.page.js file contains the code that handles the connection to the db via React Query.

### INSTALLATION

1. `npx create-react-app react-query-demo --use npm`
2. `npm i json-server` (to mock the database)
3. in the root folder, create a file db.json and fill it with dummy data
4. in the package.json file, create a new script to launch the database:

`"serve-json": "json-server --watch db.json --port 4000"`

5. `npm run serve-json`
6. go to the http://localhost:4000/superheroes to view the data from the db.json file
7. create components, that will contain the traditional and React Query approach to handle the data (SuperHeroes.page.js and RQSuperHeroes.page.js), and using react-router-dom, navigate to the pages
8. install axios and react-query packages:

`npm i axios react-query`

### FETCHING DATA

#### Traditional way (see the SuperHeroes.page.js file)

1. Import useState, useEffect and axios:

```
import React, { useState, useEffect } from "react";
import axios from "axios";
```

2. Set up constants to handle the state of the data and loading process:

```
export const SuperHeroesPage = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <h2>Axios Super Heroes Page</h2>
    </>
  );
};

```

3. using useEffect an axios, fetch the data and set the constants accordingly:

```
export const SuperHeroesPage = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:4000/superheroes")
      .then((res) => {
        setData(res.data);
        setIsLoading(false);
      })
  }, []);

  return (
    <>
      <h2>Axios Super Heroes Page</h2>
    </>
  );
};

```

4. display the data on the page:

```
export const SuperHeroesPage = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:4000/superheroes")
      .then((res) => {
        setData(res.data);
        setIsLoading(false);
      })
  }, []);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  return (
    <>
      <h2>Axios Super Heroes Page</h2>
      {data.map((hero) => {
        return <div key={hero.name}>{hero.name}</div>;
      })}
    </>
  );
};

```

Done!

#### With React Query (see the App.js and RQSuperHeroes.page.js files)

1. in the App.js, import QueryClientProvider and QueryClient

`import { QueryClientProvider, QueryClient } from "react-query"`

2. wrap the App jsx code with the QueryClientProvider:

```
function App() {
  return (
    <QueryClientProvider >
      <BrowserRouter>
        ...
      </BrowserRouter>
    </QueryClientProvider>
  );
}
```

3. create an instance of the QueryClient:

`const queryClient = new QueryClient()`

4. pass the queryClient to the QueryClientProvider as a prop:

`<QueryClientProvider client={queryClient}>`

5. in the RQSuperHeroes.page.js, import axios and a useQuery hook:

```
import axios from "axios";
import { useQuery } from "react-query";
```

6. useQuery hook takes in 2 arguments: a unique key and a callback function that returns the fetched data:

```
export const RQSuperHeroesPage = () => {
  useQuery("super-heroes", () => {
    return axios.get("http://localhost:4000/superheroes");
  });

  return (
    <>
      <h2>React Query Super Heroes</h2>
    </>
  );
};
```

7. the result of fetching data with useQuery is a destructured object which constants are the same as were used in the SuperHeroes.page.js:

```
const { isLoading, data } = useQuery("super-heroes", () => {
    return axios.get("http://localhost:4000/superheroes");
});

```

8. now you can display the data using these constants:

```
export const RQSuperHeroesPage = () => {
  const { isLoading, data } = useQuery("super-heroes", () => {
    return axios.get("http://localhost:4000/superheroes");
  });

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  return (
    <>
      <h2>React Query Super Heroes</h2>
      {data?.data.map((hero) => {
        return <div key={hero.name}>{hero.name}</div>;
      })}
    </>
  );
};

```

9. refactor the code by moving the callback function outside:

```

const fetchData = () => {
  return axios.get("http://localhost:4000/superheroes");
};

export const RQSuperHeroesPage = () => {
  const { isLoading, data, isError, error } = useQuery("super-heroes", fetchData);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <>
      <h2>React Query Super Heroes</h2>
      {data?.data.map((hero) => {
        return <div key={hero.name}>{hero.name}</div>;
      })}
    </>
  );
};

```

Done!

### ERROR HANDLING

#### Traditional way (see the SuperHeroes.page.js file)

1. we use useState and catch block to handle the errors (to check the result in the browser, modify the path string):

```
export const SuperHeroesPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:4000/superheroes")
      .then((res) => {
        setData(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        isLoading(false);
      });
  }, []);

  if (error) {
    return <h2>{error}</h2>
  }

};

```

Done!

#### With React Query (see the RQSuperHeroes.page.js file)

1. useQuery provides us with a specific constants for error handling: isError and error. Use them to check if the error exists and get the error message:

```
export const RQSuperHeroesPage = () => {
  const { isLoading, data, isError, error } = useQuery("super-heroes", fetchData);

  if (isError) {
    return <h2>{error.message}</h2>;
  }
};

```

Done!

### REACT QUERY DEVTOOLS

1. in the App.js, import ReactQueryDevtools

`import { ReactQueryDevtools } from "react-query/devtools"`

2. in the App jsx code, BEFORE the closing </ QueryClientProvider> tag, place the <ReactQueryDevtools /> with the props: initialIsOpen={false} => do not open by default,
   position="bottom-right" => position on the screen

```
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        ...
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
  );
}
```

3. After that, a flower icon will appear on the screen in the browser. Click on it to activate the devtools panel and reload the page.

Done!

### RQ CACHING DATA

React Query automatically caches data for 5 minutes. If you need to change this time, add the following argument to the useQuery hook:

```
const { isLoading, data, isError, error } = useQuery("super-heroes", fetchData, {
  cacheTime: 6000  // <= this one! set to 6 seconds
});
```

It will change the caching time accordingly

#### staleTime

If your data do not change at all or changes rarely, it's a good practice to block the fetching request for it to save the memory. It can be done with staleTime property.

```
const { isLoading, data, isError, error, isFetching } = useQuery("super-heroes", fetchData, {
    staleTime: 100000
  });

  console.log(isFetching) // to check the status of fetching (true or false)
```

During this time the data will NOT be fetched again from the database, it will remain stale. If the data in the DB has been updated during this time, it will not be fetched and displayed on the screen until the staleTime is up.
The default value of the staleTime is 0.

#### refetchOnMount

- true - refetch data on every page mount;
- false - do NOT refetch data on mount;
- "always" - always refetch data on mount

#### refetchOnWindowFocus

- true - update (refetch) the data every time when the mouse is focused on the page;
  other options: false, "always"

#### refetchInterval

If you are dealing with data that changes very frequently (every second, perhaps), then you may use the refetchInterval property to make sure that the data is always fresh.

- refetchInterval: 2000 // will fetch data every 2 seconds.

NOTE: this feature is inactive if the window is out of focus.
If you need the data to be refetched even when the window lost the focus, use

#### refetchIntervalInBackground: true

### FETCH DATA ON A BUTTON CLICK

1. use enabled:false configuration to prevent the data fetching process on the page load

```
const { isLoading, data, isError, error, isFetching } = useQuery(
    "super-heroes",
    fetchData,
    {
      enabled: false, // to prevent the fetching data on the page load
    }
  );
```

2. add a refetch const to the list of the destructured properties of the useQuery:

```
const { isLoading, data, isError, error, isFetching, refetch } = useQuery(
    "super-heroes",
    fetchData,
    {
      enabled: false, // to prevent the fetching data on the page load
    }
  );
```

3. create a button and pass this property onClick:

```
return (
    <>
      <button onClick={refetch}>Fetch heroes</button>
      {data?.data.map((hero) => {
        return <div key={hero.name}>{hero.name}</div>;
      })}
    </>
  );
```

### PERFORM SIDE EFFECTS AFTER DATA FETCHING

1. create 2 functions inside of the functional component:

```
  const onSuccess = (data) => {
    console.log("Performing side effect after successful data fetching", data);
  };

  const onError = (err) => {
    console.log("Performing side effect after encountering error", err);
  };
```

2. pass them to the useQuery:

```
  const { isLoading, data, isError, error, isFetching, refetch } = useQuery(
    "super-heroes",
    fetchData,
    {
      onSuccess: onSuccess,
      onError: onError,
    }
  );
```

3. check the result in the console (modify the api path to get an error side effect)

### TRANSFORM DATA INTO A SUITABLE FORMAT (EG. AN ARRAY OF NAMES ONLY) ON FETCHING

1. Use option 'select' to fetch and format the data (for example, form an array of user names):

```
const { isLoading, data, isError, error, isFetching, refetch } = useQuery(
    "super-heroes",
    fetchData,
    {
      select: (data) => {
        const heroNames = data.data.map((hero) => hero.name);
        // you can also use the filter() or reduce(), or any other methods here to format the result
        return heroNames;
      },
    }
  );

```

2. Now data = an array filled with names. Map through this array in the JSX code to display the names:

```
return (
    <>
      <h2>React Query Super Heroes</h2>
      {data.map((heroName) => {
      return <div key={heroName}>{heroName}</div>;
      })}
    </>
  );

```

### CUSTOM QUERY HOOK

1. Create a new file useSuperHeroesData.js (preferably in the new folder) that will contain a custom query hook. The hook should return the useQuery hook with all the parameters that you think is necessary:

```
  import axios from "axios";
  import { useQuery } from "react-query";

  const fetchData = () => {
    return axios.get("http://localhost:4000/superheroes");
  };

  export const useSuperHeroesData = (onSuccess, onError) => {
    return useQuery("super-heroes", fetchData, {
      onSuccess: onSuccess,
      onError: onError,
      select: (data) => {
        const heroNames = data.data.map((hero) => hero.name);
        return heroNames;
      },
    });
  };
```

2. Import the hook into the component and call it there, passing all the required arguments (separately or as an object - it's up to you):

```
  import React from "react";
  import { useSuperHeroesData } from "../hooks/useSuperHeroesData";

  export const RQSuperHeroesPage = () => {
    const onSuccess = (data) => {
    console.log("Performing side effect after successful data fetching", data);
    };

    const onError = (err) => {
      console.log("Performing side effect after encountering error", err);
    };

    const { isLoading, data, isError, error, isFetching, refetch } =
        useSuperHeroesData(onSuccess, onError);

    return (
      <>
        <h2>React Query Super Heroes</h2>
        {data.map((heroName) => {
          return <div key={heroName}>{heroName}</div>;
        })}
      </>
    );

  };

```

Done!

### QUERY BY ID (TO FETCH AND DISPLAY ITEM DETAILS)

1. Create a new page to display the details about each super hero: RQSuperHero.page.js

```
  import React from "react";

  export const RQSuperHeroPage = () => {
    return <div>Super Hero Details</div>;
  };

```

2. Configure the route to that page in App.js.

```
  import { RQSuperHeroPage } from "./components/RQSuperHero.page";

  function App() {
    return (
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route
              path="/rq-super-heroes/:heroId"
              element={<RQSuperHeroPage />}
            />
            <Route path="/rq-super-heroes" element={<RQSuperHeroesPage />} />
          </Routes>
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      </QueryClientProvider>
    );
  }
```

3. In the RQSuperHeroes.page.js, add a link from the super heroes list page to the super heroes details page:

```
  import { Link } from "react-router-dom";

  return (
    <>
      <h2>React Query Super Heroes</h2>
      {data?.data.map((hero) => {
        return (
          <div key={hero.id}>
            <Link to={`/rq-super-heroes/${hero.id}`}>{hero.name}</Link>
          </div>
        );
      })}
    </>
  );

```

Check the result in the browser

4. Fetch a super hero by id and display the details in the UI

a. Create a new custom query hook in a separate file useSuperHeroData.js

```
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

```

b. Display the hero details in the RQSuperHeroPage component

```
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

```

### PARALLEL QUERIES (ParallelQueries.page.js)

```
  import axios from "axios";
  import { useQuery } from "react-query";

  const fetchSuperHeroes = () => {
    return axios.get("http://localhost:4000/superheroes");
  };

  const fetchFriends = () => {
    return axios.get("http://localhost:4000/friends");
  };

  export const ParallelQueriesPage = () => {
    const { data: superHeroes } = useQuery("heroes", fetchSuperHeroes);
    const { data: friends } = useQuery("friends", fetchFriends);

    return (
      <div>
        <h2>Parallel queries page</h2>
        <h4>Super Heroes</h4>
        {superHeroes.data.map((hero) => (
          <div key={hero.id}>{hero.name}</div>
        ))}
        <br />
        <h4>Friends</h4>
        {friends.data.map((friend) => (
          <div key={friend.id}>{friend.name}</div>
        ))}
      </div>
    );
  };

```

### DYNAMIC PARALLEL QUERIES: queries is being executed simultaneously (DynamicParallelQueries.page.js)

Instead of useQuery() we use useQueries() hook:

1. In App.js (pass the array of the heroIds as a prop to the component):

```
  import { DynamicParallelQueriesPage } from "./components/DynamicParallelQueries.page";

  <Route path="/rq-dynamic-parallel" element={<DynamicParallelQueriesPage heroIds={[1, 3]} />} />
```

2. In DynamicParallelQueries.page.js:

```
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
  };

```

### DEPENDENT QUERIES: queries is being executed one after the other, the result of the second query depends on the result of the first query (DependentQueries.page.js)

In the DependentQueries.page.js we want to get the courses that are connected to the email "lana@gmail.com" that the component receives as a prop from App.js
We also have new fields in the db.json: "users" with id = the email address and "courses" (see db.json)

1. In the DependentQueries.page.js, fetch the user using the "email" prop and get his "channelId" property from the DB:

```
  import axios from "axios";
  import { useQuery } from "react-query";

  const fetchUser = (email) => {
    return axios.get(`/api/users/${email}`);
  };

  export const DependentQueriesPage = ({ email }) => {
    const { data: user } = useQuery(["user", email], () => fetchUser(email));
    const channelId = user?.data.channelId;

    return <div>Depentent Queries</div>;
  };

```

2. Find the courses, associated with this channelId, and fetch them.

```
  import axios from "axios";
  import { useQuery } from "react-query";

  const fetchUser = (email) => {
    return axios.get(`http://localhost:4000/users/${email}`);
  };

  const fetchCoursesByChannelId = (channelId) => {
    return axios.get(`http://localhost:4000/channels/${channelId}`);
  };

  export const DependentQueriesPage = ({ email }) => {
    const { data: user } = useQuery(["user", email], () => fetchUser(email));
    const channelId = user?.data.channelId;

    const {data: courses} = useQuery(["courses", channelId], () => fetchCoursesByChannelId(channelId), {
      enabled: !!channelId, // double negation transform the value to a boolean (true or false)
    });

    console.log(courses?.data.courses)

    return <div>Dependent Queries</div>;
  };

```

### INITIAL QUERY DATA (using data from cache, not fetching it from the db on the component mount) with useQueryClient hook (useSuperHeroData.js)

useQueryClient instance has access to the query cache which we can use to set the initial data

```
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

```

### PAGINATED QUERIES (PaginatedQueries.page.js)

Use queries like "limit" and "page" to set the number of the items per page.
Also use keepPreviousData: true option to use the cached data and prevent dispalying the Loading... message on every button click

### INFINITE QUERIES (InfiniteQueries.page.js)

To load more data on every button click.
Here we are using the useInfiniteQuery() hook + getNexPageParam option

### MUTATIONS / POSTING DATA (PostingData.page.js + hooks/useSuperHeroesData.js)

1. Use the useMutation hook and pass in the function that is making the POST request:

hooks/useSuperHeroesData.js

```
  import axios from "axios";
  import { useMutation } from "react-query";

  const addDataToDB = (hero) => {
    return axios.post("http://localhost:4000/superheroes", hero);
  }

  export const useAddDataToDB = () => {
    return useMutation(addDataToDB)
  }

```

2. Invoke the useAddDataToDB() function in the component, retrieve the "mutate" property out of it, and pass the entered values into this property:

PostingData.page.js

```
import React, { useState } from "react";
import { useAddDataToDB } from "../hooks/useSuperHeroesData";

export const PostingDataPage = () => {
  const [name, setName] = useState("");
  const [alterEgo, setAlterEgo] = useState("");

  const { mutate: addHero } = useAddDataToDB();

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

```

Done! The new hero is in the DB. You can also use custom hooks useSuperHeroesData() and useSuperHeroData() to fetch and display the new hero on the screen.

### QUERY INVALIDATION - Automatically refetching new data after the POST request succeeds (PostingData.page.js + hooks/useSuperHeroesData.js)

1. In the file with the custom hook useAddDataToDB(), import useQueryClient and use its instance inside of the custom hook to automatically refetch the updated data on success:

hooks/useSuperHeroesData.js

```
  import axios from "axios";
  import { useQuery, useMutation, useQueryClient } from "react-query";

  const addDataToDB = (hero) => {
    return axios.post("http://localhost:4000/superheroes", hero);
  }

  export const useAddDataToDB = () => {
    const queryClient = useQueryClient();
    return useMutation(addDataToDB, {
      onSuccess: () => {
        queryClient.invalidateQueries("super-heroes"); // use the key from the func that fetches all the heroes
      }
    })
  }

```

2. Fetch and display the updated data in the component using the custom hook useSuperHeroesData() created before.

PostingData.page.js:

```
  import {useAddDataToDB, useSuperHeroesData} from "../hooks/useSuperHeroesData";

  export const PostingDataPage = () => {
    const {
      isLoading: getRequestIsLoading,
      isError: getRequestIsError,
      error: getRequestError,
      data,
    } = useSuperHeroesData();

    console.log(data?.data)


    return (
      <>

      </>
    );
  };


```


### USING MUTATION RESPONSE TO UPDATE THE QUERY DATA (so no data refetching is needed: we will use the response of the POST request to update the data). (PostingData.page.js + hooks/useSuperHeroesData.js)

1. Do do that, we need to use another queryClient method: setQueryData() instead od the invalidateQueries() that we used on the previous step:

hooks/useSuperHeroesData.js

```
  import axios from "axios";
  import { useQuery, useMutation, useQueryClient } from "react-query";

  const addDataToDB = (hero) => {
    return axios.post("http://localhost:4000/superheroes", hero);
  }

  export const useAddDataToDB = () => {
    const queryClient = useQueryClient();
    return useMutation(addDataToDB, {
      onSuccess: () => {
        queryClient.setQueryData("super-heroes", (oldQueryData) => {
        return {
          ...oldQueryData, // the data from cache
          data: [...oldQueryData.data, data.data],
        };
      });
      }
    })
  }

```

2. Use useAddDataToDB hook in the component to post the entered data.

3. Fetch and display the updated data in the component using the custom hook useSuperHeroesData() created before.

PostingData.page.js:

```
  import {useAddDataToDB, useSuperHeroesData} from "../hooks/useSuperHeroesData";

  export const PostingDataPage = () => {
    const {
      isLoading: getRequestIsLoading,
      isError: getRequestIsError,
      error: getRequestError,
      data,
    } = useSuperHeroesData();

    console.log(data?.data)


    return (
      <>

      </>
    );
  };


```


### OPTIMISTIC UPDATES imply updating the state BEFORE performing a mutation (post, put, delete requests) under an assumption that nothing can go wrong

Transform the useAddDataToDB hook as shown in the hooks/useSuperHeroesData.js


### AXIOS INTERCEPTOR (making the default path for all requests, like proxy)

1. Create a util function "request"

utils/axios-utils.js

```
  import axios from "axios";

  const client = axios.create({ baseURL: "http://localhost:4000" });

  // ...options = all options of axios
  export const request = ({ ...options }) => {
    client.defaults.headers.common.Authorization = `Bearer token`;
    const onSuccess = (response) => response;
    const onError = (error) => {
      // optionally catch errors and add additional logging here
      return error;
    };

    return client(options).then(onSuccess).catch(onError);
  };

```

2. Import this function in the custom hooks file or components where you need to use axios and use it in the callback functions:

hooks/useSuperHeroesData.js

```
import { request } from "../utils/axios-utils";

const fetchData = () => {
  return request({ url: "/superheroes" });
};

const addDataToDB = (hero) => {
  return request({ url: "/superheroes", method: "post", data: hero });
};

```