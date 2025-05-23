import { dbConnection } from "../database/config.js";
import sql from "mssql";

export const getStates = async (req, res) => {
  try {
    const pool = await dbConnection();
    const result = await pool.request().query("SELECT * FROM pers_dispositivos_estado");
    res.json(result.recordset);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const getState = async (req, res) => {
  try {
    const { id } = req.params;
    const pool = await dbConnection();
    const result = await pool.request()
      .input("IdEstado", sql.Int, id)
      .query("SELECT * FROM pers_dispositivos_estado WHERE IdEstado = @IdEstado");

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ message: "Estado no encontrado" });
    }

    res.json(result.recordset[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const createState = async (req, res) => {
  const { ValorEstado } = req.body;

  try {
    const pool = await dbConnection();
    const result = await pool.request()
      .input("ValorEstado", sql.VarChar, ValorEstado)
      .query(`
        INSERT INTO pers_dispositivos_estado (ValorEstado)
        VALUES (@ValorEstado);
        SELECT SCOPE_IDENTITY() AS id;
      `);

    res.status(201).json({
      id: result.recordset[0].id,
      ValorEstado
    });
  } catch (error) {
    console.error("Error al crear estado:", error);
    res.status(500).json({ message: "Error interno del servidor", error: error.message });
  }
};

export const updateState = async (req, res) => {
  const { id } = req.params;
  const { ValorEstado } = req.body;

  try {
    const pool = await dbConnection();
    const result = await pool.request()
      .input("IdEstado", sql.Int, id)
      .input("ValorEstado", sql.VarChar, ValorEstado)
      .query(`
        UPDATE pers_dispositivos_estado
        SET ValorEstado = @ValorEstado
        WHERE IdEstado = @IdEstado
      `);

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ message: "Estado no encontrado" });
    }

    res.json({ message: "Estado actualizado correctamente" });
  } catch (error) {
    console.error("Error al actualizar estado:", error);
    res.status(500).json({ message: "Error interno del servidor", error: error.message });
  }
};

export const deleteState = async (req, res) => {
  const { id } = req.params;

  try {
    const pool = await dbConnection();
    const result = await pool.request()
      .input("IdEstado", sql.Int, id)
      .query("DELETE FROM pers_dispositivos_estado WHERE IdEstado = @IdEstado");

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ message: "Estado no encontrado" });
    }

    res.json({ message: "Estado eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar estado:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};
