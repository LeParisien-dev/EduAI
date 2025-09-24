import 'dotenv/config';
import { DataSource } from 'typeorm';

export default new DataSource({
    type: 'postgres',
    url: process.env.DATABASE_URL, // Neon pooled connection
    entities: ['dist/**/*.entity.js'],
    migrations: ['src/migrations/*.ts'], // ✅ corrige ici pour lire tes .ts
    ssl: true,
    extra: { ssl: { rejectUnauthorized: false } },
});
