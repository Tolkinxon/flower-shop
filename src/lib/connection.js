import { createConnection } from 'mysql2/promise';
import c from 'config';

export const db = await createConnection({
    port: c.get("DB_PORT"),
    user: c.get("DB_USERNAME"),
    password: c.get("DB_PASSWORD"),
    host: c.get("DB_HOST"),
    database: c.get("DB_DATABASE")
})