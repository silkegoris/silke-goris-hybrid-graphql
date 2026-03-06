"use client";

import { gql } from "@apollo/client";
import { useQuery, ApolloProvider } from "@apollo/client/react";
import { client } from "@/lib/apolloClient";

const GET_MOVIES = gql`
  query {
    movies {
      id
      title
      year
    }
  }
`;

interface Movie {
  id: string;
  title: string;
  year: number;
}

interface GetMoviesResponse {
  movies: Movie[];
}

function MovieList() {
  const { loading, error, data } = useQuery<GetMoviesResponse>(GET_MOVIES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return (
    <ul>
      {data?.movies.map((movie: any) => (
        <li key={movie.id}>
          {movie.title} ({movie.year})
        </li>
      ))}
    </ul>
  );
}

export default function Page() {
  return (
    <ApolloProvider client={client}>
      <MovieList />
    </ApolloProvider>
  );
}