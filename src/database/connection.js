import sql from 'mssql';

const dbSettings = {
  user: 'sa1',
  password: 'yourStrong#Password',
  server: 'localhost', 
  database: 'GestionDispositivos',
  options: {
    trustServerCertificate: true,
    requestTimeout: 200000
  },
};

let pool;

export const getConnection = async () => {
  try {
    if (!pool) {
      pool = await sql.connect(dbSettings);
    }
    return pool;
  } catch (err) {
    console.error('Error al conectar a la base de datos:', err);
    throw err;
  }
};

export { sql };
