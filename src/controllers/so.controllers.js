import { dbConnection } from "../database/config.js";
import sql from "mssql";

export const getAllSO = async (req, res) => {
  try {
    const pool = await dbConnection();
    const result = await pool.request().query("SELECT * FROM pers_Dispositivos_SO");
    res.json(result.recordset);
  } catch (error) {
    console.error("Error al obtener SO:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const getSOById = async (req, res) => {
  const { id } = req.params;
  try {
    const pool = await dbConnection();
    const result = await pool.request()
      .input("IdSO", sql.Int, id)
      .query("SELECT * FROM pers_Dispositivos_SO WHERE IdSO = @IdSO");

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ message: "SO no encontrado" });
    }

    res.json(result.recordset[0]);
  } catch (error) {
    console.error("Error al obtener SO por ID:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const createSO = async (req, res) => {
  const { NomSO, Licencia } = req.body;

  try {
    const pool = await dbConnection();
    const result = await pool.request()
      .input("NomSO", sql.VarChar, NomSO)
      .input("Licencia", sql.VarChar, Licencia)
      .query(`
        INSERT INTO pers_Dispositivos_SO (NomSO, Licencia)
        VALUES (@NomSO, @Licencia);
        SELECT SCOPE_IDENTITY() AS id;
      `);

    res.status(201).json({
      id: result.recordset[0].id,
      NomSO,
      Licencia
    });
  } catch (error) {
    console.error("Error al crear SO:", error);
    res.status(500).json({ message: "Error interno del servidor", error: error.message });
  }
};

export const updateSO = async (req, res) => {
  const { id } = req.params;
  const { NomSO, Licencia } = req.body;

  try {
    const pool = await dbConnection();
    const result = await pool.request()
      .input("IdSO", sql.Int, id)
      .input("NomSO", sql.VarChar, NomSO)
      .input("Licencia", sql.VarChar, Licencia)
      .query(`
        UPDATE pers_Dispositivos_SO
        SET NomSO = @NomSO, Licencia = @Licencia
        WHERE IdSO = @IdSO
      `);

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ message: "SO no encontrado" });
    }

    res.json({ message: "SO actualizado correctamente" });
  } catch (error) {
    console.error("Error al actualizar SO:", error);
    res.status(500).json({ message: "Error interno del servidor", error: error.message });
  }
};

export const deleteSO = async (req, res) => {
  const { id } = req.params;

  try {
    const pool = await dbConnection();
    const result = await pool.request()
      .input("IdSO", sql.Int, id)
      .query("DELETE FROM pers_Dispositivos_SO WHERE IdSO = @IdSO");

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ message: "SO no encontrado" });
    }

    res.json({ message: "SO eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar SO:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};
