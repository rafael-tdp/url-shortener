import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import { v4 as uuidv4 } from "uuid";
import { nanoid } from "nanoid";

const Link = sequelize.define(
	"Link",
	{
		id: {
			type: DataTypes.UUID,
			defaultValue: () => uuidv4(),
			primaryKey: true,
		},
		slug: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
			defaultValue: () => nanoid(6), // Use a slug to shorten URLs
		},
		url: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
	},
	{
		timestamps: false,
		modelName: "Link",
		tableName: "links",
		underscored: true,
	}
);

export default Link;
