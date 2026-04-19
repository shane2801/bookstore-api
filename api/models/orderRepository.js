import db from '../../config/db.js';

// CREATE ORDER
export const createOrder = async (product_id, quantity) => {
    const result = await db.query(
        `INSERT INTO orders (product_id, quantity)
         VALUES ($1, $2)
         RETURNING *`,
        [product_id, quantity]
    );

    return result.rows[0];
};

// GET ALL ORDERS (with product info)
export const getAllOrders = async () => {
    const result = await db.query(`
        SELECT 
            o.id,
            o.quantity,
            o.created_at,
            json_build_object(
                'id', p.id,
                'name', p.name,
                'price', p.price
            ) AS product
        FROM orders o
        JOIN products p ON o.product_id = p.id
    `);

    return result.rows;
};

// GET SINGLE ORDER
export const getOrderById = async (id) => {
    const result = await db.query(`
        SELECT 
            o.id,
            o.quantity,
            o.created_at,
            json_build_object(
                'id', p.id,
                'name', p.name,
                'price', p.price
            ) AS product
        FROM orders o
        JOIN products p ON o.product_id = p.id
        WHERE o.id = $1
    `, [id]);

    return result.rows[0];
};

export const deleteOrder = async (id) => {
    const result = await db.query(
        'DELETE FROM orders WHERE id = $1 RETURNING *',
        [id]
    );

    return result.rows[0]; // helps detect if it existed
};

export const updateOrder = async (id, updates) => {
    const fields = [];
    const values = [];
    let i = 1;

    if (updates.quantity !== undefined) {
        fields.push(`quantity = $${i++}`);
        values.push(updates.quantity);
    }

    values.push(id);

    const query = `
        UPDATE orders
        SET ${fields.join(', ')}
        WHERE id = $${i}
        RETURNING *
    `;

    const result = await db.query(query, values);
    return result.rows[0];
};