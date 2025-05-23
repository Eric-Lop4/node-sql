import { dbConnection } from "../database/config.js";
import sql from "mssql";

export const getAllOffice = async (req, res) => {
  try {
    const pool = await dbConnection();
    const result = await pool.request().query("SELECT * FROM pers_Dispositivos_Office");
    res.json(result.recordset);
  } catch (error) {
    console.error("Error al obtener Office:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const getOfficeById = async (req, res) => {
  const { id } = req.params;
  try {
    const pool = await dbConnection();
    const result = await pool.request()
      .input("IdOffice", sql.Int, id)
      .query("SELECT * FROM pers_Dispositivos_Office WHERE IdOffice = @IdOffice");

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ message: "Office no encontrado" });
    }

    res.json(result.recordset[0]);
  } catch (error) {
    console.error("Error al obtener Office por ID:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const createOffice = async (req, res) => {
  const { Licencia } = req.body;

  try {
    const pool = await dbConnection();
    const result = await pool.request()
      .input("Licencia", sql.VarChar, Licencia)
      .query(`
        INSERT INTO pers_Dispositivos_Office (Licencia)
        VALUES (@Licencia);
        SELECT SCOPE_IDENTITY() AS id;
      `);

    res.status(201).json({
      id: result.recordset[0].id,
      Licencia
    });
  } catch (error) {
    console.error("Error al crear Office:", error);
    res.status(500).json({ message: "Error interno del servidor", error: error.message });
  }
};

export const updateOffice = async (req, res) => {
  const { id } = req.params;
  const { Licencia } = req.body;

  try {
    const pool = await dbConnection();
    const result = await pool.request()
      .input("IdOffice", sql.Int, id)
      .input("Licencia", sql.VarChar, Licencia)
      .query(`
        UPDATE pers_Dispositivos_Office
        SET Licencia = @Licencia
        WHERE IdOffice = @IdOffice
      `);

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ message: "Office no encontrado" });
    }

    res.json({ message: "Office actualizado correctamente" });
  } catch (error) {
    console.error("Error al actualizar Office:", error);
    res.status(500).json({ message: "Error interno del servidor", error: error.message });
  }
};

export const deleteOffice = async (req, res) => {
  const { id } = req.params;

  try {
    const pool = await dbConnection();
    const result = await pool.request()
      .input("IdOffice", sql.Int, id)
      .query("DELETE FROM pers_Dispositivos_Office WHERE IdOffice = @IdOffice");

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ message: "Office no encontrado" });
    }

    res.json({ message: "Office eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar Office:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};
