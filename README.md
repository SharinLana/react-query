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

2. Now data = an array filled with names. Map through this array in the JSX code to display the names:

  return (
    <>
      <h2>React Query Super Heroes</h2>
      {data.map((heroName) => {
        return <div key={heroName}>{heroName}</div>;
      })}
    </>
  );