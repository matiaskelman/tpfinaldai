import config from "../../dbconfig";
import sql from 'mssql'
import Pelicula from "../models/pelicula";

class PeliculaService {
    getAll = async () => {
        try {
            let pool   = await sql.connect(config);
            let result = await pool.request()
                                .query('SELECT * FROM PELICULA');
            return result.recordsets
        } catch (error) {
            console.log(error);
        }
    }
    getById = async (id) => {
        let returnEntity = null;
        console.log('Estoy en: PeliculaService.GetById(id)')
        try {
            let pool   = await sql.connect(config);
            let result = await pool.request()
                                .input('pId', sql.Int, id)
                                .query('SELECT * FROM Pelicula WHERE id = @pId');
            returnEntity = result.recordsets[0][0];                    
        } catch (error) {
            console.log(error);
        }
        return returnEntity;
    }

    insert = async (pelicula) => {
        try {
            console.log(pelicula);
            let pool   = await sql.connect(config);
            let result = await pool.request()
                                    .input("Imagen", sql.VarChar, pelicula.Imagen)
                                    .input("Titulo", sql.VarChar, pelicula.Titulo)
                                    .input("FechaDeCreacion", sql.Date, pelicula.FechaDeCreacion)
                                    .input("Calificacion", sql.Int, pelicula.Calificacion)
                                    .input("Personaje", sql.VarChar, pelicula.Personaje)
                                    .query("INSERT INTO Pelicula (Imagen, Titulo, FechaDeCreacion, Calificacion, Personaje) VALUES (@Imagen, @Titulo, @FechaDeCreacion, @Calificacion, @Personaje))");
    return result.rowsAffected;
        } catch (error) {
            console.log(error);
        }
    }
    update = async (pizza,id) => {
        let rowsAffected = 0;
        try {
            let pool   = await sql.connect(config);
            let result = await pool.request()
                .input("id", sql.Int, id)
                .input("nombre", sql.NChar, pizza.Nombre)
                .input("libreGluten", sql.Bit, pizza.LibreGluten)
                .input("importe", sql.Float, pizza.Importe)
                .input("descripcion", sql.NChar, pizza.Descripcion)
                .query("UPDATE Pizzas SET nombre = @nombre, libreGluten = @libreGluten, importe = @importe, descripcion = @descripcion WHERE id = @id");
                rowsAffected = result.rowsAffected;
        } catch (error) {
            console.log(error);
        }
        return rowsAffected
    }
    deleteById = async (id) => {
        let retunrEntity = 0;
        console.log('Estoy en: PizzaService.deleteById(id)')
    try {
        let pool = await sql.connect(config);
        let result = await pool.request()
                            .input('pId', sql.Int, id)
                            .query('DELETE FROM Pizzas WHERE id = @pId');
        retunrEntity = result.recordsets;              
        console.log(result);      
    } catch (error) {
        console.log(error);
    }
    return retunrEntity;
    }
}
export default PizzaService;