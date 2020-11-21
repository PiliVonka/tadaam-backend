// External
import express from "express";
import helmet from "helmet";
import mongoose from "mongoose";
import { ApolloServer } from "apollo-server-express";
import connectMongo from "connect-mongo";
import session from "express-session";

// Local
import loggerConfig from "./config/loggerConfig";
import typeDefs from "./graphql-src/schemas";
import resolvers from "./graphql-src/resolvers";
import schemaDirectives from "./graphql-src/directives";

// Constants
const {
  NODE_ENV,
  MONGO_DB_URI,
  PORT,
  SESSION_NAME,
  SESSION_SECRET,
  SESSION_MAX_AGE,
} = process.env;

const app = express();
mongoose.set("useCreateIndex", true);

// Set Secure Headers with Helmet
app.use(helmet());
app.use(helmet.permittedCrossDomainPolicies());

// Serve React Application
if (NODE_ENV !== "development") {
  app.use(express.static("dist"));
}

// Set User Session
const MongoStore = connectMongo(session);
app.use(
  session({
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    name: SESSION_NAME,
    secret: SESSION_SECRET,
    resave: true,
    rolling: true,
    saveUninitialized: false,
    cookie: {
      maxAge: parseInt(SESSION_MAX_AGE, 10),
      sameSite: true,
      httpOnly: true,
      secure: !NODE_ENV.trim() === "development"
    }
  })
);

// Init ApolloServer
const server = new ApolloServer({
  typeDefs,
  resolvers,
  schemaDirectives,
  playground:
    NODE_ENV.trim() !== "development"
      ? false
      : {
        settings: {
          "request.credentials": "include",
          "schema.polling.enable": false,
        },
      },
  context: ({ req, res }) => ({ req, res }),
});

// Logging with Morgan
if (NODE_ENV === "development") {
  loggerConfig(app);
}

// Init cors
server.applyMiddleware({
  app,
  cors: {
    credentials: true,
    origin: "http://localhost:3000",
  },
});

// Connect to MongoDB and start the server
mongoose.connect(MONGO_DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once("open", () => {
  const port = PORT || 8080;
  app.listen({ port }, () => {
    console.log(`Server running on port ${port}`);
  });
});
mongoose.connection.on("error", (error) => console.error(error));
