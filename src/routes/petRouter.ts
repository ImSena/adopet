import express, { Request, Response } from "express";
import PetController from "../controller/PetController";


const router = express.Router();

const petController = new PetController();

router.post("/", (req: Request, res: Response) => { petController.criaPet(req, res)} );
router.get("/", (req: Request, res: Response) => { petController.listaPets(req, res)});
router.put("/:id", (req: Request, res: Response) => { petController.atualizaPet(req, res)});
router.delete("/:id", (req: Request, res: Response) => { petController.deletaPet(req, res)});

export default router;