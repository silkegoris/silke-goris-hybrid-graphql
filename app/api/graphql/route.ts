import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { gql } from "graphql-tag";
import { NextRequest } from "next/server";

const movies = [
  { id: "1", title: "Inception", year: 2010, director: "Christopher Nolan", genre: "Sci-Fi", rating: 8.8 },
  { id: "2", title: "Interstellar", year: 2014, director: "Christopher Nolan", genre: "Sci-Fi", rating: 8.7 },
  { id: "3", title: "The Dark Knight", year: 2008, director: "Christopher Nolan", genre: "Action", rating: 9.0 },
  { id: "4", title: "The Matrix", year: 1999, director: "Lana & Lilly Wachowski", genre: "Sci-Fi", rating: 8.7 },
  { id: "5", title: "The Shawshank Redemption", year: 1994, director: "Frank Darabont", genre: "Drama", rating: 9.3 },
  { id: "6", title: "Pulp Fiction", year: 1994, director: "Quentin Tarantino", genre: "Crime", rating: 8.9 },
  { id: "7", title: "Fight Club", year: 1999, director: "David Fincher", genre: "Drama", rating: 8.8 },
  { id: "8", title: "Forrest Gump", year: 1994, director: "Robert Zemeckis", genre: "Drama", rating: 8.8 },
  { id: "9", title: "The Lord of the Rings: The Fellowship of the Ring", year: 2001, director: "Peter Jackson", genre: "Fantasy", rating: 8.8 },
  { id: "10", title: "The Lord of the Rings: The Two Towers", year: 2002, director: "Peter Jackson", genre: "Fantasy", rating: 8.7 },
  { id: "11", title: "The Lord of the Rings: The Return of the King", year: 2003, director: "Peter Jackson", genre: "Fantasy", rating: 9.0 },
  { id: "12", title: "Gladiator", year: 2000, director: "Ridley Scott", genre: "Action", rating: 8.5 },
  { id: "13", title: "Titanic", year: 1997, director: "James Cameron", genre: "Romance", rating: 7.9 },
  { id: "14", title: "Avatar", year: 2009, director: "James Cameron", genre: "Sci-Fi", rating: 7.8 },
  { id: "15", title: "Parasite", year: 2019, director: "Bong Joon-ho", genre: "Thriller", rating: 8.5 }
];

const typeDefs = gql`
  type Movie {
    id: ID
    title: String
    year: Int
    director: String
    genre: String
    rating: Float
  }

  type Query {
    movies: [Movie]
    movie(id: ID!): Movie
  }
`;

const resolvers = {
  Query: {
    movies: () => movies,
    movie: (_: any, args: any) =>
      movies.find((m) => m.id === args.id),
  },
};

export const runtime = "nodejs";

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const apolloHandler = startServerAndCreateNextHandler(server);

export async function GET(request: NextRequest) {
  return apolloHandler(request as any);
}

export async function POST(request: NextRequest) {
  return apolloHandler(request as any);
}