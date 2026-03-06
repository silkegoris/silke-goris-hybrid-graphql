import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { gql } from "graphql-tag";

const movies = [
  { id: "1", title: "Inception", year: 2010 },
  { id: "2", title: "Interstellar", year: 2014 },
];

const typeDefs = gql`
  type Movie {
    id: ID
    title: String
    year: Int
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

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

export const GET = startServerAndCreateNextHandler(server);
export const POST = startServerAndCreateNextHandler(server);