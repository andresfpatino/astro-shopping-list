import { column, defineDb, defineTable } from 'astro:db';

export const Lists = defineTable({
	columns: {
		id: column.number({ primaryKey: true }),
		name: column.text(),
		description: column.text({ optional: true }),
	},
});

export const Categories = defineTable({
	columns: {
		id: column.number({ primaryKey: true }),
		name: column.text(),
		color: column.text(),
	},
});

export const Units = defineTable({
	columns: {
		id: column.number({ primaryKey: true }),
		name: column.text(),
	},
});

export const Items = defineTable({
	columns: {
		id: column.number({ primaryKey: true }),
		name: column.text(),
		pricePerUnit: column.number(),
		category: column.number({ references: () => Categories.columns.id }),
		unit: column.number({ references: () => Units.columns.id }),
	},
});

export const User = defineTable({
	columns: {
		id: column.text({ primaryKey: true, optional: false, unique: true }),
		username: column.text({ unique: true, optional: false }),
		password: column.text( { optional: true } ),
		github_id: column.text({ optional: true, unique: true }),
	},
});

export const Session = defineTable({
	columns: {
		id: column.text({ optional: false, unique: true }),
		userId: column.text({ optional: false, references: () => User.columns.id}),
		expiresAt: column.text({ optional: false }),
	},
});

// https://astro.build/db/config
export default defineDb({
	tables: {
		Lists,
		Categories,
		Units,
		Items,
		User,
		Session,
	},
});