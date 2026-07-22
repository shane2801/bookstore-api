import db from '../../config/db.js';

export const fetchAllProducts = async ({limit, offset}) => {
    let query = `SELECT * FROM products WHERE 1=1`;
  const values = [];

//   if (filters?.category) {
//     values.push(filters.category);
//     query += ` AND category = $${values.length}`;
//   }

  query += ` ORDER BY id`;

  if (limit !== undefined && offset !== undefined) {
    values.push(limit, offset);
    query += ` LIMIT $${values.length - 1} OFFSET $${values.length}`;
  }

  const result = await db.query(query, values);

  if (limit !== undefined) {
    const countResult = await db.query(
      `SELECT COUNT(*) FROM products`
    );

    return {
      rows: result.rows,
      total: parseInt(countResult.rows[0].count, 10),
    };
  }

  return { rows: result.rows };
};

export const findProductById = async (id) => {
    const result = await db.query('SELECT * FROM products WHERE id = $1', [id]);
    return result.rows[0];
};

export const createProduct = async (data) => {
    const result = await db.query(
        `INSERT INTO products (name, price, image_url, inventory_count)
         VALUES ($1, $2, $3, $4)
         RETURNING *`,
        [
            data.name,
            data.price,
            data.image_url,
            data.inventory_count
        ]
    );

    return result.rows[0];
};



// UPDATE (PATCH - dynamic)
export const updateProduct = async (id, updates) => {
    const fields = [];
    const values = [];
    let index = 1;

    if (updates.name !== undefined) {
        fields.push(`name = $${index++}`);
        values.push(updates.name);
    }

    if (updates.price !== undefined) {
        fields.push(`price = $${index++}`);
        values.push(updates.price);
    }

    if (updates.image_url !== undefined) {
        fields.push(`image_url = $${index++}`);
        values.push(updates.image_url);
    }

    if (updates.inventory_count !== undefined) {
        fields.push(`inventory_count = $${index++}`);
        values.push(updates.inventory_count);
    }

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


export const removeProduct = async (id) => {
    await db.query('DELETE FROM products WHERE id = $1', [id]);
};

