import { dbConnection } from "../database/config.js";
import sql from 'mssql';

export const getDevices = async (req, res) => {
  try {
    const pool = await dbConnection();
    console.log(pool)
    const result = await pool.request().query('SELECT * FROM pers_Dispositivos_Datos');
    console.log(result)
    res.json(result.recordset);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const getDevice = async (req, res) => {
  try {
    const pool = await dbConnection();
    const result = await pool
      .request()
      .input("IdDispositivo", sql.Int, req.params.id)
      .query("SELECT * FROM pers_Dispositivos_Datos WHERE IdDispositivo = @IdDispositivo");

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ message: "Dispositivo no encontrado"});
    }

    return res.json(result.recordset[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const createDevice = async (req, res) => {
  const {
    CodigoDispositivo,
    Importe,
    FechaCompra,
    IdUbicacion,
    IdTipoDisp,
    IdSO,
    IdOffice,
    IdEstado,
    TieneOffice,
    IdHardware
  } = req.body;

  try {
    const pool = await dbConnection();
    const result = await pool.request()
      .input("CodigoDispositivo", sql.VarChar, CodigoDispositivo)
      .input("Importe", sql.Decimal(14, 2), Importe)
      .input("FechaCompra", sql.Date, FechaCompra)
      .input("IdUbicacion", sql.Int, IdUbicacion)
      .input("IdTipoDisp", sql.Int, IdTipoDisp)
      .input("IdSO", sql.Int, IdSO)
      .input("IdOffice", sql.Int, IdOffice)
      .input("IdEstado", sql.Int, IdEstado)
      .input("TieneOffice", sql.Bit, TieneOffice)
      .input("IdHardware", sql.Int, IdHardware)
      .query(`
        INSERT INTO pers_Dispositivos_Datos (
          CodigoDispositivo, Importe, FechaCompra, IdUbicacion, IdTipoDisp,
          IdSO, IdOffice, IdEstado, TieneOffice, IdHardware
        ) VALUES (
          @CodigoDispositivo, @Importe, @FechaCompra, @IdUbicacion, @IdTipoDisp,
          @IdSO, @IdOffice, @IdEstado, @TieneOffice, @IdHardware
        );
        SELECT SCOPE_IDENTITY() AS id;
      `);

    res.json({
      id: result.recordset[0].id,
      CodigoDispositivo,
      Importe,
      FechaCompra,
      IdUbicacion,
      IdTipoDisp,
      IdSO,
      IdOffice,
      IdEstado,
      TieneOffice,
      IdHardware
    });
} catch (error) {
  console.error("Error al insertar dispositivo:", error); // Esto imprime más detalles
  res.status(500).json({
    message: "Error interno del servidor",
    error: error.message, // Esto ayuda a ver el verdadero motivo
  });
}
};


export const updateDevice = async (req, res) => {
  const {
    CodigoDispositivo,
    Importe,
    FechaCompra,
    IdUbicacion,
    IdTipoDisp,
    IdSO,
    IdOffice,
    IdEstado,
    TieneOffice,
    IdHardware
  } = req.body;

  try {
    const pool = await dbConnection();
    const result = await pool.request()
      .input("IdDispositivo", sql.Int, req.params.id)
      .input("CodigoDispositivo", sql.VarChar, CodigoDispositivo)
      .input("Importe", sql.Decimal(10, 2), Importe)
      .input("FechaCompra", sql.Date, FechaCompra)
      .input("IdUbicacion", sql.Int, IdUbicacion)
      .input("IdTipoDisp", sql.Int, IdTipoDisp)
      .input("IdSO", sql.Int, IdSO)
      .input("IdOffice", sql.Int, IdOffice)
      .input("IdEstado", sql.Int, IdEstado)
      .input("TieneOffice", sql.Bit, TieneOffice)
      .input("IdHardware", sql.Int, IdHardware)
      .query(`
        UPDATE pers_Dispositivos_Datos
        SET CodigoDispositivo = @CodigoDispositivo,
            Importe = @Importe,
            FechaCompra = @FechaCompra,
            IdUbicacion = @IdUbicacion,
            IdTipoDisp = @IdTipoDisp,
            IdSO = @IdSO,
            IdOffice = @IdOffice,
            IdEstado = @IdEstado,
            TieneOffice = @TieneOffice,
            IdHardware = @IdHardware
        WHERE IdDispositivo = @IdDispositivo
      `);

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ message: "Dispositivo no encontrado" });
    }

    res.json({ message: "Dispositivo actualizado correctamente" });
  } catch (error) {
    console.error("Error al actualizar dispositivo:", error);
    res.status(500).json({ message: "Error interno del servidor", error: error.message });
  }
};


export const deleteDevice = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ message: "ID inválido" });
    }

    const pool = await dbConnection();
    const result = await pool.request()
      .input("IdDispositivo", sql.Int, id)
      .query("DELETE FROM pers_Dispositivos_Datos WHERE IdDispositivo = @IdDispositivo");

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ message: "Dispositivo no encontrado" });
    }

    res.json({ message: "Dispositivo eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar dispositivo:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

