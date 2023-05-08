// import "core-js/stable/index.js";
// import "regenerator-runtime/runtime.js";

import Koa from "koa"
import dotenv from 'dotenv'
dotenv.config();

import { Scaffold, DataTypes } from "bitscaffold";
import { Player, Team } from "./Models.js";

const User = {
  name: "User",
  attributes: {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
  },
};

const app = new Koa();
const port = process.env.API_PORT || 3000;

// await scaffold.createDatabase();
async function waitForConnection(scaffold) {
  let isConnected = false;

  while (!isConnected) {
      try {
          await scaffold.createDatabase();
          isConnected = true;
      } catch (error) {
          console.log('Database connection not available yet. Retrying in 5 seconds...');
          await new Promise(resolve => setTimeout(resolve, 5000));
      }
  }

  console.log('Database connection established.');
}

// Usage
(async () => {
  const scaffold = new Scaffold([Player, Team, User], {
    name: "Scaffold Demo",
    prefix: "/api",
    database: {
      dialect: "postgres",
      host: process.env.DB_HOST ?? 'localhost',
      port: Number(process.env.DB_PORT) ?? 5432,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      logging: false
    },
  });
  
  app.use(scaffold.middleware.allModels.all);
  await waitForConnection(scaffold);
})();


app.use(async (ctx) => {
    ctx.body = "Hello From Koa";
});

app.listen(port, () => {
  console.log(`Started on port ${port}`);
 });
