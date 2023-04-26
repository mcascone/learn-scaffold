import { DataTypes } from "bitscaffold";

export const Player = {
  name: "Player",
  attributes: {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
  },
  belongsTo: [{ target: "Team" }],
};

export const Team = {
  name: "Team",
  attributes: {
    name: DataTypes.STRING,
  },
  hasMany: [{ target: "Player", options: { as: "players" } }],
};
