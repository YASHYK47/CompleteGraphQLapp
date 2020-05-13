const express = require("express");
const bodyParser = require("body-parser");
const graphqlHttp = require("express-graphql");
const mongoose = require("mongoose");

const graphQlSchema = require("./graphql/schema/index");
const graphqlResolvers = require("./graphql/resolvers/index");
const isAuth = require("./middleware/is-auth");

const app = express();

app.use(bodyParser.json());
app.use(isAuth);

app.use(
  "/graphql",
  graphqlHttp({
    schema: graphQlSchema,
    rootValue: graphqlResolvers,
    graphiql: true,
  })
);

mongoose
  .connect("mongodb://127.0.0.1:27017/GraphQl", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    app.listen(3010, () => console.log(`Server started at port 3010`));
  })
  .catch((error) => {
    console.log(error);
  });
