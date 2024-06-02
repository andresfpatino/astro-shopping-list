import { db, Lists, Categories, Units, Items} from 'astro:db'

export default async function seed() {
	const lists = await db
		.insert(Lists)
		.values([
			{
				name: 'Enero',
				description: `<p>Lista de compras de Enero</p>`,
			},
		])
		.returning();

	const categories = await db
		.insert(Categories)
		.values([
			{
				name: 'Frutas',
				color: '#ff0000',
			},
            {
				name: 'Verduras',
				color: '#00ff00',
			},
		])
		.returning();

    const units = await db
		.insert(Units)
		.values([
			{
				name: 'bag',
			},
            {
				name: 'bottle',
			},
            {
				name: 'box',
			},
            {
				name: 'crate',
			},
            {
				name: 'cup',
			},
            {
				name: 'gr',
			},
            {
				name: 'gallon',
			},
            {
				name: 'kg',
			},
            {
				name: 'l',
			},
            {
				name: 'lbs',
			},
            {
				name: 'ml',
			},
            {
				name: 'oz',
			},
            {
				name: 'pack',
			},
            {
				name: 'piece',
			},
		])
		.returning();

	await db.insert(Items).values([
		{
			name: 'Carne',
            pricePerUnit: 1000,
			category: categories[0].id,
            unit: units[0].id,
		},
	]);
}