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

export default router;