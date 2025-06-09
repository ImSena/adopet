import express, { Request, Response } from "express";
import PetController from "../controller/PetController";
import PetRepository from "../repositories/PetRepository";
import { AppDataSource } from "../config/datasource.config";


const router = express.Router();

const petRepository = new PetRepository(
    AppDataSource.getRepository("PetEntity")
);
const petController = new PetController(petRepository);

router.post("/", (req: Request, res: Response) => { petController.criaPet(req, res)} );
router.get("/", (req: Request, res: Response) => { petController.listaPets(req, res)});
router.put("/:id", (req: Request, res: Response) => { petController.atualizaPet(req, res)});
router.delete("/:id", (req: Request, res: Response) => { petController.deletaPet(req, res)});

export default router;