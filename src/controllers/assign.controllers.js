import { dbConnection } from "../database/config.js";
import sql from "mssql";

export const getAssignments = async (req, res) => {
  try {
    const pool = await dbConnection();
    const result = await pool.request().query("SELECT * FROM pers_Dispositivos_Asignacion");
    res.json(result.recordset);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const getAssignment = async (req, res) => {
  try {
    const { idEmpleado, idDispositivo } = req.params;
    const pool = await dbConnection();
    const result = await pool
      .request()
      .input("IdEmpleado", sql.Int, idEmpleado)
      .input("IdDispositivo", sql.Int, idDispositivo)
      .query(
        `SELECT * FROM pers_Dispositivos_Asignacion 
         WHERE IdEmpleado = @IdEmpleado AND IdDispositivo = @IdDispositivo`
      );

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ message: "Asignación no encontrada" });
    }

    res.json(result.recordset[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const createAssignment = async (req, res) => {
  const { IdEmpleado, IdDispositivo, FechaAsignacion, Observaciones } = req.body;

  try {
    const pool = await dbConnection();
    await pool.request()
      .input("IdEmpleado", sql.Int, IdEmpleado)
      .input("IdDispositivo", sql.Int, IdDispositivo)
      .input("FechaAsignacion", sql.Date, FechaAsignacion)
      .input("Observaciones", sql.VarChar, Observaciones)
      .query(`
        INSERT INTO pers_Dispositivos_Asignacion (IdEmpleado, IdDispositivo, FechaAsignacion, Observaciones)
        VALUES (@IdEmpleado, @IdDispositivo, @FechaAsignacion, @Observaciones)
      `);

    res.status(201).json({ message: "Asignación creada correctamente", IdEmpleado, IdDispositivo, FechaAsignacion, Observaciones });
  } catch (error) {
    console.error("Error al crear asignación:", error);
    res.status(500).json({ message: "Error interno del servidor", error: error.message });
  }
};

export const updateAssignment = async (req, res) => {
  const { FechaAsignacion, Observaciones } = req.body;
  const { idEmpleado, idDispositivo } = req.params;

  try {
    const pool = await dbConnection();
    const result = await pool.request()
      .input("IdEmpleado", sql.Int, idEmpleado)
      .input("IdDispositivo", sql.Int, idDispositivo)
      .input("FechaAsignacion", sql.Date, FechaAsignacion)
      .input("Observaciones", sql.VarChar, Observaciones)
      .query(`
        UPDATE pers_Dispositivos_Asignacion
        SET FechaAsignacion = @FechaAsignacion,
            Observaciones = @Observaciones
        WHERE IdEmpleado = @IdEmpleado AND IdDispositivo = @IdDispositivo
      `);

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ message: "Asignación no encontrada" });
    }

    res.json({ message: "Asignación actualizada correctamente" });
  } catch (error) {
    console.error("Error al actualizar asignación:", error);
    res.status(500).json({ message: "Error interno del servidor", error: error.message });
  }
};

export const deleteAssignment = async (req, res) => {
  const { idEmpleado, idDispositivo } = req.params;

  try {
    const pool = await dbConnection();
    const result = await pool.request()
      .input("IdEmpleado", sql.Int, idEmpleado)
      .input("IdDispositivo", sql.Int, idDispositivo)
      .query(`
        DELETE FROM pers_Dispositivos_Asignacion
        WHERE IdEmpleado = @IdEmpleado AND IdDispositivo = @IdDispositivo
      `);

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ message: "Asignación no encontrada" });
    }

    res.json({ message: "Asignación eliminada correctamente" });
  } catch (error) {
    console.error("Error al eliminar asignación:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};
