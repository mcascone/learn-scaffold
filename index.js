// import "core-js/stable/index.js";
// import "regenerator-runtime/runtime.js";

import Koa from "koa";
import path from "path";

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

const scaffold = new Scaffold([Player, Team, User], {
  name: "Scaffold Demo",
  prefix: "/api",
  database: {
    dialect: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "mysecretpassword",
  },
});

app.use(scaffold.middleware.allModels.all);

await scaffold.createDatabase();

app.use(async (ctx) => {
    ctx.body = "Hello From Koa";
});

  app.listen(3000, () => {
    console.log("Started on port 3000");
  });