import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { HomePage } from "./components/Home.page";
import { SuperHeroesPage } from "./components/SuperHeroes.page";
import { RQSuperHeroesPage } from "./components/RQSuperHeroes.page";
import { RQSuperHeroPage } from "./components/RQSuperHero.page";
import { ParallelQueriesPage } from "./components/ParallelQueries.page";
import { DynamicParallelQueriesPage } from "./components/DynamicParallelQueries.page";
import { DependentQueriesPage } from "./components/DependentQueries.page";
import { PaginatedQueriesPage } from "./components/PaginatedQueries.page";
import { InfiniteQueriesPage } from "./components/InfiniteQueries.page";
import { PostingDataPage } from "./components/PostingData.page";
import "./App.css";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/super-heroes">Axios Super Heroes</Link>
              </li>
              <li>
                <Link to="/rq-super-heroes">RQ Super Heroes</Link>
              </li>
              <li>
                <Link to="/rq-parallel">RQ Parallel Queries</Link>
              </li>
              <li>
                <Link to="/rq-dynamic-parallel">
                  RQ Dynamic Parallel Queries
                </Link>
              </li>
              <li>
                <Link to="/rq-dependent">RQ Dependent Queries</Link>
              </li>
              <li>
                <Link to="/rq-paginated">RQ Paginated Queries</Link>
              </li>
              <li>
                <Link to="/rq-infinite">RQ Infinite Queries</Link>
              </li>
              <li>
                <Link to="/rq-posting">RQ Post Data</Link>
              </li>
            </ul>
          </nav>
        </div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/rq-super-heroes/:heroId"
            element={<RQSuperHeroPage />}
          />
          <Route path="/super-heroes" element={<SuperHeroesPage />} />
          <Route path="/rq-super-heroes" element={<RQSuperHeroesPage />} />
          <Route path="/rq-parallel" element={<ParallelQueriesPage />} />
          <Route
            path="/rq-dynamic-parallel"
            element={<DynamicParallelQueriesPage heroIds={[1, 3]} />}
          />
          <Route
            path="/rq-dependent"
            element={<DependentQueriesPage email="lana@gmail.com" />}
          />
          <Route path="/rq-paginated" element={<PaginatedQueriesPage />} />
          <Route path="/rq-infinite" element={<InfiniteQueriesPage />} />
          <Route path="/rq-posting" element={<PostingDataPage />} />
        </Routes>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
  );
}

export default App;
