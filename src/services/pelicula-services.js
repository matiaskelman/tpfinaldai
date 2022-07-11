import config from "../../dbconfig";
import sql from 'mssql'
import Pelicula from "../models/pelicula";

class PeliculaService {
    getAll = async () => {
        try {
            let pool   = await sql.connect(config);
            let result = await pool.request()
                                .query('SELECT * FROM PELICULAS');
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
    getByTitle = async (titulo) => {
        let returnEntity = null;
        console.log('Estoy en: PeliculaService.GetByTitle(titulo)')
        try {
            let pool   = await sql.connect(config);
            let result = await pool.request()
                                .input('pTitulo', sql.VarChar, titulo)
                                .query('SELECT * FROM Pelicula WHERE titulo LIKE @pTitulo% ORDER BY FechaDeCreacion DESC');
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
                                    .query("INSERT INTO Pelicula (Imagen, Titulo, FechaDeCreacion, Calificacion) VALUES (@Imagen, @Titulo, @FechaDeCreacion, @Calificacion))");
    return result.rowsAffected;
        } catch (error) {
            console.log(error);
        }
    }
    update = async (pelicula,id) => {
        let rowsAffected = 0;
        try {
            let pool   = await sql.connect(config);
            let result = await pool.request()
            .input("Id", sql.Int, pelicula.id)
            .input("Imagen", sql.VarChar, pelicula.Imagen)
            .input("Titulo", sql.VarChar, pelicula.Titulo)
            .input("FechaDeCreacion", sql.Date, pelicula.FechaDeCreacion)
            .input("Calificacion", sql.Int, pelicula.Calificacion)
            .query("UPDATE Peliculas SET Imagen = @Imagen, Titulo = @Titulo, FechaDeCreacion = @FechaDeCreacion, Calificacion= @Calificacion WHERE ID = @id");                
            rowsAffected = result.rowsAffected;
        } catch (error) {
            console.log(error);
        }
        return rowsAffected
    }
    deleteById = async (id) => {
        let retunrEntity = 0;
        console.log('Estoy en: PeliculaService.deleteById(id)')
    try {
        let pool = await sql.connect(config);
        let result = await pool.request()
                            .input('Id', sql.Int, id)
                            .query('DELETE FROM Peliculas WHERE id = @Id');
        retunrEntity = result.recordsets;              
        console.log(result);      
    } catch (error) {
        console.log(error);
    }
    return retunrEntity;
    }
}
export default PeliculaService;