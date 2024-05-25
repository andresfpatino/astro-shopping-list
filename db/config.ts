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

// https://astro.build/db/config
export default defineDb({
	tables: {
		Lists,
		Categories,
		Units,
		Items,
	},
});