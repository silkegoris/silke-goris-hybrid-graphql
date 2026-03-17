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
      director
      genre
      rating
    }
  }
`;

interface Movie {
  id: string;
  title?: string | null;
  year?: number | null;
  director?: string | null;
  genre?: string | null;
  rating?: number | null;
}

interface GetMoviesResponse {
  movies: Movie[];
}

function MovieList() {
  const { loading, error, data } = useQuery<GetMoviesResponse>(GET_MOVIES);

  if (loading) return <p className="text-center text-gray-500 py-20">Loading...</p>;
  if (error) return <p className="text-center text-red-500 py-20">Error loading movies</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
      {data?.movies.map((movie) => (
        <div
          key={movie.id}
          className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-200"
        >
          <div className="p-5">
            <div className="flex justify-between items-start mb-2">
              {movie.title && (
                <h2 className="text-lg font-semibold text-gray-900 line-clamp-2">{movie.title}</h2>
              )}
              {movie.rating != null && (
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded">
                  {movie.rating.toFixed(1)}
                </span>
              )}
            </div>
            <div className="space-y-1 text-sm text-gray-600">
              {movie.year != null && (
                <p><span className="font-medium text-gray-700">Year:</span> {movie.year}</p>
              )}
              {movie.director && (
                <p><span className="font-medium text-gray-700">Director:</span> {movie.director}</p>
              )}
              {movie.genre && (
                <p><span className="font-medium text-gray-700">Genre:</span> {movie.genre}</p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Page() {
  return (
    <ApolloProvider client={client}>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900 px-6 py-4">Movies</h1>
        </header>
        <MovieList />
      </div>
    </ApolloProvider>
  );
}