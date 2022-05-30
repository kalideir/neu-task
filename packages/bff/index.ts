import { ApolloServer, gql } from 'apollo-server';
import ds from './dataSources';
import posts from './posts';

const typeDefs = gql`
  type Post {
    id: ID
    title: String
    body: String
    userId: ID
  }

  type User {
    id: ID
    username: String
    email: String
    name: String
  }

  type Query {
    posts: [Post]
    user(id: ID!): User
  }

`;

const resolvers = {
  Query: {
    posts: () => posts,
    user: async (_: any, { id } : {id: string}, { dataSources }: {dataSources: typeof ds }) => {
      return dataSources.usersApi.getUserById(id);
    }, 
  },
};

const server = new ApolloServer({ 
  typeDefs,
  resolvers,
  dataSources: () => ds
});

server.listen().then(({ url }: { url: string }) => {
  console.log(`🚀  Server ready at ${url}`);
});
