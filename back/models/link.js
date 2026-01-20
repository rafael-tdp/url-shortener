import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import { v4 as uuidv4 } from "uuid";
import { nanoid } from "nanoid";
import { CONFIG } from "../config/constants.js";

/**
 * Link model for URL shortener
 * Stores original URLs and their corresponding short slugs
 */
const Link = sequelize.define(
	"Link",
	{
		id: {
			type: DataTypes.UUID,
			defaultValue: () => uuidv4(),
			primaryKey: true,
			comment: "Unique identifier for the link",
		},
		slug: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
			defaultValue: () => nanoid(CONFIG.SLUG_LENGTH),
			comment: "Short slug used in shortened URLs",
		},
		url: {
			type: DataTypes.TEXT,
			allowNull: false,
			comment: "Original URL to redirect to",
		},
	},
	{
		timestamps: false,
		modelName: "Link",
		tableName: "links",
		underscored: true,
		comment: "Table storing shortened links",
	}
);

export default Link;

