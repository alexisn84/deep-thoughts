const express = require('express');
const { ApolloServer } = require('apollo-server-express');


//import typeDefs and resolvers
const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();

const startServer = async () => {
  //create new Apollo server and pass to schema
  const server = new ApolloServer({
    typeDefs,
    resolvers
  });

  //Start Apollo
  await server.start();

  //integrate apollo with express middleware
  server.applyMiddleware({ app });

  //log where we can go to test our gql api
  console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
};

//Initialize the apollo server
startServer()

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});

