const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const db = require('./config/connection');
//const routes = require('./routes');
const { typeDefs, resolvers } = require('./schemas');

const app = express();
const PORT = process.env.PORT || 3001;
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware
});

server.applyMiddleware({ app });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
  res.status(404).sendFile(path.join(__dirname, './public/404.html'));  
});

db.once('open', () => {
  app.listen(PORT, () => {
    onsole.log(`API server running on port ${PORT}!`)
    console.log(`🌍 Now listening on localhost:${PORT}${server.graphqlPath}`)
  });
});
