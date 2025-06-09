import { Request, Response } from "express";
import AdotanteRepository from "../repositories/AdotanteRepository";
import AdotanteEntity from "../entities/AdotanteEntity";

export default class AdotanteController{
    constructor(private repository: AdotanteRepository){}

    async criaAdotante(req: Request, res: Response)
    {
        try{
            const {nome, celular, endereco, foto, senha} = req.body as AdotanteEntity;

            const novoAdotante = new AdotanteEntity(
                nome,
                senha, 
                celular,
                foto,
                endereco
            );

            await this.repository.criaAdotante(novoAdotante);

            return res.status(201).json(novoAdotante);

        }catch(error){
            return res.status(400).json({error: "Erro ao criar o adotante"});
        }
    }

    async listarAdotantes(req: Request, res: Response)
    {
        try{
            const adotantes = await this.repository.listaAdotantes();

            res.status(200).json(adotantes);
        }catch(error){
            return res.status(400).json({error: "Erro ao listar adotantes"});
        }
    }

    async atualizarAdotante(req: Request, res: Response)
    {
        try{
            const {id} = req.params;

            const {success, message} = await this.repository.atualizaAdotante(
                Number(id),
                req.body as AdotanteEntity
            );

            if(!success){
                return res.status(400).json({message});
            }

            return res.sendStatus(204);
        }catch(error){
            return res.status(400).json({error: "Erro ao atualizar "});
        }
    }

    async deletarAdotante(req: Request, res: Response)
    {
        try{

            const {id} = req.params;

            const {success, message} = await this.repository.deletarAdotante(Number(id));

            if(!success){
                return res.status(400).json({message});
            }

            return res.sendStatus(204);
        }catch(error){
            return res.status(400).json({error: "Erro ao deletar"});
        }
    }
}