import { dbConnection } from "../database/config.js";
import sql from "mssql";

export const getHardware = async (req, res) => {
  try {
    const pool = await dbConnection();
    const result = await pool.request().query("SELECT * FROM pers_Dispositivos_Hardware");
    res.json(result.recordset);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const getHardwareById = async (req, res) => {
  const { id } = req.params;
  try {
    const pool = await dbConnection();
    const result = await pool.request()
      .input("IdHardware", sql.Int, id)
      .query("SELECT * FROM pers_Dispositivos_Hardware WHERE IdHardware = @IdHardware");

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ message: "Hardware no encontrado" });
    }

    res.json(result.recordset[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const createHardware = async (req, res) => {
  const { CPU, RAM, DisDur } = req.body;

  try {
    const pool = await dbConnection();
    const result = await pool.request()
      .input("CPU", sql.VarChar, CPU)
      .input("RAM", sql.VarChar, RAM)
      .input("DisDur", sql.VarChar, DisDur)
      .query(`
        INSERT INTO pers_Dispositivos_Hardware (CPU, RAM, DisDur)
        VALUES (@CPU, @RAM, @DisDur);
        SELECT SCOPE_IDENTITY() AS id;
      `);

    res.status(201).json({
      id: result.recordset[0].id,
      CPU,
      RAM,
      DisDur
    });
  } catch (error) {
    console.error("Error al crear hardware:", error);
    res.status(500).json({ message: "Error interno del servidor", error: error.message });
  }
};

export const updateHardware = async (req, res) => {
  const { id } = req.params;
  const { CPU, RAM, DisDur } = req.body;

  try {
    const pool = await dbConnection();
    const result = await pool.request()
      .input("IdHardware", sql.Int, id)
      .input("CPU", sql.VarChar, CPU)
      .input("RAM", sql.VarChar, RAM)
      .input("DisDur", sql.VarChar, DisDur)
      .query(`
        UPDATE pers_Dispositivos_Hardware
        SET CPU = @CPU, RAM = @RAM, DisDur = @DisDur
        WHERE IdHardware = @IdHardware
      `);

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ message: "Hardware no encontrado" });
    }

    res.json({ message: "Hardware actualizado correctamente" });
  } catch (error) {
    console.error("Error al actualizar hardware:", error);
    res.status(500).json({ message: "Error interno del servidor", error: error.message });
  }
};

export const deleteHardware = async (req, res) => {
  const { id } = req.params;

  try {
    const pool = await dbConnection();
    const result = await pool.request()
      .input("IdHardware", sql.Int, id)
      .query("DELETE FROM pers_Dispositivos_Hardware WHERE IdHardware = @IdHardware");

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ message: "Hardware no encontrado" });
    }

    res.json({ message: "Hardware eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar hardware:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};
