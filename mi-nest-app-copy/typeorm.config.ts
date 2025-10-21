import * as dotenv from 'dotenv'
import { DataSource } from 'typeorm'
import { User } from './src/entities/user.entity'
import { Product } from './src/entities/product.entity';

// Carga las variables de entorno del archivo .env al entorno de Node.
dotenv.config()

/**
 * Configuración de la conexión a la base de datos para TypeORM CLI (migraciones).
 * Exporta una instancia de DataSource con la configuración de la conexión.
 * TypeORM CLI buscará por defecto este export para operar.
 */
export default new DataSource({

    // Tipo de base de datos utilizado.
    type:'mysql',

    // Parámetros de conexión obtenidos directamente de las variables de entorno (.env).
    host: process.env.DB_HOST,
    port: Number (process.env.DB_PORT), // Se convierte explícitamente a número
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database:process.env.DB_NAME,
    // ENTITIES: Archivos de entidad
    // Lista de entidades que TypeORM debe monitorear y mapear a tablas.
    // ¡Es vital que 'Product' esté aquí para que las migraciones funcionen!
    entities:[User, Product],
    // MIGRATIONS: Rutas de las migraciones
    // Indica dónde se encuentran los archivos de migración que la CLI debe ejecutar.
    migrations:['./src/migrations/*.ts']
});


