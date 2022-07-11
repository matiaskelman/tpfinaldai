import { Router } from "express";
import PersonajeService from "../services/personaje-services";
const router = Router();
const personajeService = new PersonajeService();

router.get('', async (req,res) => {
    const personaje = await personajeService.getAll();
    return res.status(200).json(personaje);
});
router.get('/:id', async(req,res)=>{
    const personaje = await personajeService.getById(req.params.id);
    if (personaje == null) {
        console.log("No existe");
        return res.sendStatus(404);
    }
    return res.status(200).json(personaje);
});
router.get('/:nombre', async(req,res)=>{
    const personaje = await personajeService.getById(req.params.nombre);
    if (personaje == null) {
        console.log("No existe");
        return res.sendStatus(404);
    }
    return res.status(200).json(personaje);
});
router.post('', async (req,res) => {
    const personaje = await personajeService.insert(req.body);
    return res.status(201).json(personaje);
});
router.put('/:id', async(req, res)=>{
    const personaje = await personajeService.update(req.body,req.params.id);
    console.log(personaje);
    return res.status(200).json(personaje);    
})
router.delete('/:id', async(req,res)=>{
    const personaje = await personajeService.deleteById(req.params.id)
    if (personaje == null) {
        console.log("No existe");
        return res.sendStatus(404);
    }
    return res.status(200).json(personaje);
})
export default router;