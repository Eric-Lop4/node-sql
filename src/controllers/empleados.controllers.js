import { dbConnection } from "../database/config.js";
import sql from "mssql";

export const getAllEmpleados = async (req, res) => {
  try {
    const pool = await dbConnection();
    const result = await pool.request().query("SELECT * FROM pers_Empleados");
    res.json(result.recordset);
  } catch (error) {
    console.error("Error al obtener empleados:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const getEmpleadoById = async (req, res) => {
  const { id } = req.params;
  try {
    const pool = await dbConnection();
    const result = await pool.request()
      .input("IdEmpleado", sql.Int, id)
      .query("SELECT * FROM pers_Empleados WHERE IdEmpleado = @IdEmpleado");

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ message: "Empleado no encontrado" });
    }

    res.json(result.recordset[0]);
  } catch (error) {
    console.error("Error al obtener empleado:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const createEmpleado = async (req, res) => {
  const { Nom, Departamento } = req.body;

  try {
    const pool = await dbConnection();
    const result = await pool.request()
      .input("Nom", sql.VarChar, Nom)
      .input("Departamento", sql.VarChar, Departamento)
      .query(`
        INSERT INTO pers_Empleados (Nom, Departamento)
        VALUES (@Nom, @Departamento);
        SELECT SCOPE_IDENTITY() AS id;
      `);

    res.status(201).json({
      id: result.recordset[0].id,
      Nom,
      Departamento
    });
  } catch (error) {
    console.error("Error al crear empleado:", error);
    res.status(500).json({ message: "Error interno del servidor", error: error.message });
  }
};

export const updateEmpleado = async (req, res) => {
  const { id } = req.params;
  const { Nom, Departamento } = req.body;

  try {
    const pool = await dbConnection();
    const result = await pool.request()
      .input("IdEmpleado", sql.Int, id)
      .input("Nom", sql.VarChar, Nom)
      .input("Departamento", sql.VarChar, Departamento)
      .query(`
        UPDATE pers_Empleados
        SET Nom = @Nom, Departamento = @Departamento
        WHERE IdEmpleado = @IdEmpleado
      `);

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ message: "Empleado no encontrado" });
    }

    res.json({ message: "Empleado actualizado correctamente" });
  } catch (error) {
    console.error("Error al actualizar empleado:", error);
    res.status(500).json({ message: "Error interno del servidor", error: error.message });
  }
};

export const deleteEmpleado = async (req, res) => {
  const { id } = req.params;

  try {
    const pool = await dbConnection();
    const result = await pool.request()
      .input("IdEmpleado", sql.Int, id)
      .query("DELETE FROM pers_Empleados WHERE IdEmpleado = @IdEmpleado");

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ message: "Empleado no encontrado" });
    }

    res.json({ message: "Empleado eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar empleado:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};
