import { Request, Response } from "express";
import type TypePet from "../types/TypePet";
import EnumEspecie from "../enum/EnumEspecie";
import PetRepository from "../repositories/PetRepository";
import PetEntity from "../entities/PetEntity";
import EnumPorte from "../enum/EnumPorte";
let listaDePets: TypePet[] = [];
let id = 0;
function geraId() {
  id = id + 1;
  return id;
}

export default class PetController
{
    constructor(private repository: PetRepository){}

    criaPet(req: Request, res: Response){
        const {adotado, especie, dtBirth, nome, porte} = <PetEntity>req.body;

        if(!Object.values(EnumEspecie).includes(especie)){
            return res.status(400).json({error: "Especie inválida"});
        }

        if(porte && !(porte in EnumPorte)){
            return res.status(400).json({error: "Porte inválido"});
        }

        const novoPet = new PetEntity(nome, especie, dtBirth, adotado, porte);
        novoPet.id = geraId();
        novoPet.adotado = adotado;
        novoPet.especie = especie;
        novoPet.dtBirth = dtBirth;
        novoPet.nome = nome;

        this.repository.criaPet(novoPet);
        return res.status(201).json(novoPet);
    }
    
    async listaPets(req: Request, res: Response){
        const listaDePets = await this.repository.listaPet();
        return res.status(200).json(listaDePets);
    }

    async atualizaPet(req: Request, res: Response){
        const {id} = req.params;
        
        const {success, message} = await this.repository.atualizaPet(
            Number(id),
            req.body as PetEntity
        )

        if(!success){
            return res.status(404).json({message});
        }

        return res.sendStatus(204);
    }

    async deletaPet(req: Request, res: Response){
        const {id} = req.params;

        const {success, message} = await this.repository.deletaPet(Number(id));

        if(!success){
            return res.status(404).json({message});
        }

        return res.sendStatus(2024);
    }

    async adotaPet(req: Request, res: Response){
        const {pet_id, adotante_id} = req.params;

        const {success, message} = await this.repository.adotaPet(
            Number(pet_id),
            Number(adotante_id)
        )

        if(!success){
            return res.status(404).json({message});
        }

        return res.sendStatus(204);
    }

    async buscaPetPeloPorte(req: Request, res: Response)
    {
        const {porte} = req.query;

        const listaDePets = await this.repository.buscaPetPeloPorte(porte as EnumPorte);

        return res.status(200).json(listaDePets);
    }

    async buscaPetCampoGenerico(req: Request, res: Response)
    {
        const {campo, valor} = req.query;

        const listaDePets = await this.repository.buscaPorCampoGenerico(campo as keyof PetEntity, valor as string);

        return res.status(200).json(listaDePets);
    }
}