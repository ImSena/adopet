import express, { RequestHandler } from "express";
import AdotanteController from "../controller/AdotanteController";
import { AppDataSource } from "../config/datasource.config";
import AdotanteRepository from "../repositories/AdotanteRepository";
import middlewareValidadorBodyAdotante from "../middlewares/validators/adotanteRequestBody";

const router =  express.Router();

const adotanteRepository = new AdotanteRepository(
    AppDataSource.getRepository("AdotanteEntity")
);

const adotanteController = new AdotanteController(adotanteRepository);

const validateBody: RequestHandler = (req, res, next) => {middlewareValidadorBodyAdotante(req, res, next)};

router.post("/", validateBody ,(req, res) => {adotanteController.criaAdotante(req, res)});
router.get("/", (req, res) => {adotanteController.listarAdotantes(req, res)});
router.put("/:id", (req, res) => {adotanteController.atualizarAdotante(req, res)});
router.delete("/:id", (req, res) => {adotanteController.deletarAdotante(req, res)});
router.patch("/:id", (req, res) => {adotanteController.atualizarEnderecoAdotante(req, res)});


export default router;