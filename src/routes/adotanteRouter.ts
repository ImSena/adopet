import express from "express";
import AdotanteController from "../controller/AdotanteController";
import { AppDataSource } from "../config/datasource.config";
import AdotanteRepository from "../repositories/AdotanteRepository";

const router =  express.Router();

const adotanteRepository = new AdotanteRepository(
    AppDataSource.getRepository("AdotanteEntity")
);

const adotanteController = new AdotanteController(adotanteRepository);


router.post("/", (req, res) => {adotanteController.criaAdotante(req, res)});
router.get("/", (req, res) => {adotanteController.listarAdotantes(req, res)});
router.put("/:id", (req, res) => {adotanteController.atualizarAdotante(req, res)});
router.delete("/:id", (req, res) => {adotanteController.deletarAdotante(req, res)});


export default router;