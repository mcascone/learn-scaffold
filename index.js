import "core-js/stable/index.js";
import "regenerator-runtime/runtime.js";

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
    dialect: "sqlite",
    storage: "./example.sqlite",
  },
});

app.use(async (ctx, next) => {
  if (ctx.path.startsWith('/api')) {
    ctx.type = 'application/json';
    await scaffold.middleware.allModels.all(ctx, next);
  } else {
    ctx.body = "Hello From Koa";
  }
});

app.use(scaffold.middleware.allModels.all);

(async() => {
  // Create the database
  await scaffold.createDatabase();

  app.listen(3000, () => {
    console.log("Started on port 3000");
  });
})();