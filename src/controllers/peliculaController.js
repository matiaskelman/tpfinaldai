import { Router } from "express";
import Pelicula from "../models/pelicula";
const router = Router();
const peliculaService = new PeliculaService();

router.get('', async (req,res) => {
    const pelicula = await peliculaService.getAll();
    return res.status(200).json(pelicula);
});

router.get('/:id', async(req,res)=>{
    const pelicula = await peliculaService.getById(req.params.id);
    if (pelicula == null) {
        console.log("No existe");
        return res.sendStatus(404);
    }
    return res.status(200).json(pelicula);
});
router.post('', async (req,res) => {
    const pelicula = await peliculaService.insert(req.body);
    return res.status(201).json(pelicula);
});
router.put('/:id', async(req, res)=>{
    const pelicula = await peliculaService.update(req.body,req.params.id);
    console.log(pelicula);
    return res.status(200).json(pelicula);    
})

router.delete('/:id', async(req,res)=>{
    const pelicula = await peliculaService.deleteById(req.params.id)
    if (pelicula == null) {
        console.log("No existe");
        return res.sendStatus(404);
    }
    return res.status(200).json(pelicula);
})
export default router;