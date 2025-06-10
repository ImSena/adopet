import express, { Request, Response } from "express";
import PetController from "../controller/PetController";
import PetRepository from "../repositories/PetRepository";
import { AppDataSource } from "../config/datasource.config";
import PetEntity from "../entities/PetEntity";
import AdotanteEntity from "../entities/AdotanteEntity";


const router = express.Router();

const petRepository = new PetRepository(
  AppDataSource.getRepository(PetEntity),
  AppDataSource.getRepository(AdotanteEntity)
);
const petController = new PetController(petRepository);

router.post("/", (req: Request, res: Response) => { petController.criaPet(req, res)} );
router.get("/", (req: Request, res: Response) => { petController.listaPets(req, res)});
router.get("/filtroPorte", (req: Request, res: Response) => { petController.buscaPetPeloPorte(req, res)});
router.get("/filtro", (req: Request, res: Response) => { petController.buscaPetCampoGenerico(req, res)});
router.get("")
router.put("/:id", (req: Request, res: Response) => { petController.atualizaPet(req, res)});
router.delete("/:id", (req: Request, res: Response) => { petController.deletaPet(req, res)});
router.put("/:pet_id/:adotante_id", (req: Request, res: Response) => { petController.adotaPet(req, res)})

export default router;