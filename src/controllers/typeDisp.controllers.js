import { dbConnection } from "../database/config.js";
import sql from "mssql";

export const getAllTiposDisp = async (req, res) => {
  try {
    const pool = await dbConnection();
    const result = await pool.request().query("SELECT * FROM pers_Dispositivos_Tipo");
    res.json(result.recordset);
  } catch (error) {
    console.error("Error al obtener tipos de dispositivos:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const getTipoDispById = async (req, res) => {
  const { id } = req.params;
  try {
    const pool = await dbConnection();
    const result = await pool.request()
      .input("IdTipoDisp", sql.Int, id)
      .query("SELECT * FROM pers_Dispositivos_Tipo WHERE IdTipoDisp = @IdTipoDisp");

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ message: "Tipo de dispositivo no encontrado" });
    }

    res.json(result.recordset[0]);
  } catch (error) {
    console.error("Error al obtener tipo de dispositivo:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const createTipoDisp = async (req, res) => {
  const { ValorTipo } = req.body;

  try {
    const pool = await dbConnection();
    const result = await pool.request()
      .input("ValorTipo", sql.VarChar, ValorTipo)
      .query(`
        INSERT INTO pers_Dispositivos_Tipo (ValorTipo)
        VALUES (@ValorTipo);
        SELECT SCOPE_IDENTITY() AS id;
      `);

    res.status(201).json({
      id: result.recordset[0].id,
      ValorTipo
    });
  } catch (error) {
    console.error("Error al crear tipo de dispositivo:", error);
    res.status(500).json({ message: "Error interno del servidor", error: error.message });
  }
};

export const updateTipoDisp = async (req, res) => {
  const { id } = req.params;
  const { ValorTipo } = req.body;

  try {
    const pool = await dbConnection();
    const result = await pool.request()
      .input("IdTipoDisp", sql.Int, id)
      .input("ValorTipo", sql.VarChar, ValorTipo)
      .query(`
        UPDATE pers_Dispositivos_Tipo
        SET ValorTipo = @ValorTipo
        WHERE IdTipoDisp = @IdTipoDisp
      `);

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ message: "Tipo de dispositivo no encontrado" });
    }

    res.json({ message: "Tipo de dispositivo actualizado correctamente" });
  } catch (error) {
    console.error("Error al actualizar tipo de dispositivo:", error);
    res.status(500).json({ message: "Error interno del servidor", error: error.message });
  }
};

export const deleteTipoDisp = async (req, res) => {
  const { id } = req.params;

  try {
    const pool = await dbConnection();
    const result = await pool.request()
      .input("IdTipoDisp", sql.Int, id)
      .query("DELETE FROM pers_Dispositivos_Tipo WHERE IdTipoDisp = @IdTipoDisp");

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ message: "Tipo de dispositivo no encontrado" });
    }

    res.json({ message: "Tipo de dispositivo eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar tipo de dispositivo:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};
