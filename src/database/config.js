import * as mssql from './mssql-connection-pooling.js';


// CONEXIÓN: ERP AHORA SOLUCIONES
import sql from 'mssql';

var config = {
    user: 'nela',
    password: '1234',
    server: 'PLS-017',
    database: 'GestionDispositivos',
    trustServerCertificate: true,
    requestTimeout: 200000
};

const dbConnection = async () => {
    try {
        return await mssql.GetCreateIfNotExistPool(config);
    } catch (error) {
        console.error('🔴 Error al conectar a la base de datos:', error.message);
        console.error('📄 Stack:', error.stack);
        throw new Error(`Error al conectar a la base de datos: ${error.message}`);
    }
}

export{
    dbConnection
}

