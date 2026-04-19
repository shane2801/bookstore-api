import db from '../../config/db.js';

export const fetchAllProducts = async () => {
    const result = await db.query('SELECT * FROM products');
    return result.rows;
};

export const findProductById = async (id) => {
    const result = await db.query('SELECT * FROM products WHERE id = $1', [id]);
    return result.rows;
};

export const createProduct = async (name, price) => {
    const result = await db.query(
        'INSERT INTO products (name, price) VALUES ($1, $2) RETURNING *',
        [name, price]
    );
    return result.rows[0];
};

export const removeProduct = async (id) => {
    await db.query('DELETE FROM products WHERE id = $1', [id]);
};

export const updateProduct = async (id, updates) => {
    const fields = [];
    const values = [];
    let index = 1;

    // only add fields that exist in request
    if (updates.name !== undefined) {
        fields.push(`name = $${index++}`);
        values.push(updates.name);
    }

    if (updates.price !== undefined) {
        if (updates.price <= 0) {
            throw new Error('Invalid price');
        }

        fields.push(`price = $${index++}`);
        values.push(updates.price);
    }

    // if nothing provided
    if (fields.length === 0) {
        throw new Error('No fields to update');
    }

    values.push(id);

    const query = `
        UPDATE products
        SET ${fields.join(', ')}
        WHERE id = $${index}
        RETURNING *
    `;

    const result = await db.query(query, values);

    return result.rows[0];
};
