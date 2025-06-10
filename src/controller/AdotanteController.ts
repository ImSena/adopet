import { Request, Response } from "express";
import AdotanteRepository from "../repositories/AdotanteRepository";
import AdotanteEntity from "../entities/AdotanteEntity";
import EnderecoEntity from "../entities/EnderecoEntity";
import { TypeRequestBodyAdotante, TypeRequestParamsAdotante, TypeResponseBodyAdotante } from "../types/TypesAdotante";

export default class AdotanteController {
    constructor(private repository: AdotanteRepository) { }

    async criaAdotante(
        req: Request<TypeRequestParamsAdotante, {}, TypeRequestBodyAdotante>,
        res: Response<TypeResponseBodyAdotante>
    ) {

        const { nome, celular, endereco, foto, senha } = req.body as AdotanteEntity;
    
        const novoAdotante = new AdotanteEntity(
            nome,
            senha,
            celular,
            foto,
            endereco
        );

        await this.repository.criaAdotante(novoAdotante);

        return res.status(201).json({ data: { id: novoAdotante.id, nome, celular } });

    }

    async listarAdotantes( 
        req: Request<TypeRequestParamsAdotante, {}, TypeRequestBodyAdotante>,
        res: Response<TypeResponseBodyAdotante>
    ) {
        try {
            const adotantes = await this.repository.listaAdotantes();

            const data = adotantes.map((adotante) => {
                return {
                    id: adotante.id,
                    nome: adotante.nome,
                    celular: adotante.celular
                }
            })

            res.status(200).json({data});
        } catch (error) {
            return res.status(400).json({ error: "Erro ao listar adotantes" });
        }
    }

    async atualizarAdotante( 
        req: Request<TypeRequestParamsAdotante, {}, TypeRequestBodyAdotante>,
        res: Response<TypeResponseBodyAdotante>
    ) {
        try {
            const { id } = req.params;

            const { success, message } = await this.repository.atualizaAdotante(
                Number(id),
                req.body as AdotanteEntity
            );

            if (!success) {
                return res.status(400).json({ error: message });
            }

            return res.sendStatus(204);
        } catch (error) {
            return res.status(400).json({ error: "Erro ao atualizar " });
        }
    }

    async deletarAdotante( 
        req: Request<TypeRequestParamsAdotante, {}, TypeRequestBodyAdotante>,
        res: Response<TypeResponseBodyAdotante>
    ) {
        try {

            const { id } = req.params;

            const { success, message } = await this.repository.deletarAdotante(Number(id));

            if (!success) {
                return res.status(400).json({ error: message });
            }

            return res.sendStatus(204);
        } catch (error) {
            return res.status(400).json({ error: "Erro ao deletar" });
        }
    }

    async atualizarEnderecoAdotante( 
        req: Request<TypeRequestParamsAdotante, {}, TypeRequestBodyAdotante>,
        res: Response<TypeResponseBodyAdotante>
    ) {
        try {
            const { id } = req.params;

            const { success, message } = await this.repository.atualizaEnderecoAdotante(Number(id), req.body.endereco as EnderecoEntity);

            if (!success) {
                return res.status(400).json({ error: message });
            }

            return res.sendStatus(204);
        } catch (error) {
            return res.status(400).json({ error: "Erro ao deletar" });
        }
    }
}