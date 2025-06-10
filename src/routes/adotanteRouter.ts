import express, { RequestHandler } from "express";
import AdotanteController from "../controller/AdotanteController";
import { AppDataSource } from "../config/datasource.config";
import AdotanteRepository from "../repositories/AdotanteRepository";
import middlewareValidadorBodyAdotante from "../middlewares/validators/adotanteRequestBody";
import middlewareValidadorBodyEndereco from "../middlewares/validators/enderecoRequestBody";

const router =  express.Router();

const adotanteRepository = new AdotanteRepository(
    AppDataSource.getRepository("AdotanteEntity")
);

const adotanteController = new AdotanteController(adotanteRepository);

const validateBodyAdotante: RequestHandler = (req, res, next) => {middlewareValidadorBodyAdotante(req, res, next)};

const validateBodyEndereco: RequestHandler = (req, res, next) => 
{middlewareValidadorBodyEndereco(req, res, next)}

router.post("/", validateBodyAdotante ,(req, res) => {adotanteController.criaAdotante(req, res)});
router.get("/", (req, res) => {adotanteController.listarAdotantes(req, res)});
router.put("/:id", (req, res) => {adotanteController.atualizarAdotante(req, res)});
router.delete("/:id", (req, res) => {adotanteController.deletarAdotante(req, res)});
router.patch("/:id", validateBodyEndereco ,(req, res) => {adotanteController.atualizarEnderecoAdotante(req, res)});


export default router;