import { dbConnection } from "../database/config.js";
import sql from "mssql";

export const getAllUbicaciones = async (req, res) => {
  try {
    const pool = await dbConnection();
    const result = await pool.request().query("SELECT * FROM pers_Dispositivos_Ubicacion");
    res.json(result.recordset);
  } catch (error) {
    console.error("Error al obtener ubicaciones:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const getUbicacionById = async (req, res) => {
  const { id } = req.params;
  try {
    const pool = await dbConnection();
    const result = await pool.request()
      .input("IdUbicacion", sql.Int, id)
      .query("SELECT * FROM pers_Dispositivos_Ubicacion WHERE IdUbicacion = @IdUbicacion");

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ message: "Ubicación no encontrada" });
    }

    res.json(result.recordset[0]);
  } catch (error) {
    console.error("Error al obtener ubicación:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const createUbicacion = async (req, res) => {
  const { Departamento } = req.body;

  try {
    const pool = await dbConnection();
    const result = await pool.request()
      .input("Departamento", sql.VarChar, Departamento)
      .query(`
        INSERT INTO pers_Dispositivos_Ubicacion (Departamento)
        VALUES (@Departamento);
        SELECT SCOPE_IDENTITY() AS id;
      `);

    res.status(201).json({
      id: result.recordset[0].id,
      Departamento
    });
  } catch (error) {
    console.error("Error al crear ubicación:", error);
    res.status(500).json({ message: "Error interno del servidor", error: error.message });
  }
};

export const updateUbicacion = async (req, res) => {
  const { id } = req.params;
  const { Departamento } = req.body;

  try {
    const pool = await dbConnection();
    const result = await pool.request()
      .input("IdUbicacion", sql.Int, id)
      .input("Departamento", sql.VarChar, Departamento)
      .query(`
        UPDATE pers_Dispositivos_Ubicacion
        SET Departamento = @Departamento
        WHERE IdUbicacion = @IdUbicacion
      `);

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ message: "Ubicación no encontrada" });
    }

    res.json({ message: "Ubicación actualizada correctamente" });
  } catch (error) {
    console.error("Error al actualizar ubicación:", error);
    res.status(500).json({ message: "Error interno del servidor", error: error.message });
  }
};

export const deleteUbicacion = async (req, res) => {
  const { id } = req.params;

  try {
    const pool = await dbConnection();
    const result = await pool.request()
      .input("IdUbicacion", sql.Int, id)
      .query("DELETE FROM pers_Dispositivos_Ubicacion WHERE IdUbicacion = @IdUbicacion");

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ message: "Ubicación no encontrada" });
    }

    res.json({ message: "Ubicación eliminada correctamente" });
  } catch (error) {
    console.error("Error al eliminar ubicación:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};
