import { Request, Response } from "express";
import type TypePet from "../types/TypePet";
import EnumEspecie from "../enum/EnumEspecie";
let listaDePets: TypePet[] = [];
let id = 0;
function geraId() {
  id = id + 1;
  return id;
}

export default class PetController
{
    criaPet(req: Request, res: Response){
        const {adotado, especie, dtBirth, nome} = <TypePet>req.body;
        if(!Object.values(EnumEspecie).includes(especie)){
            return res.status(400).json({error: "Especie inválida"});
        }
        const novoPet: TypePet = {id: geraId(), adotado, especie, dtBirth, nome};
        listaDePets.push(novoPet);
        return res.status(201).json(novoPet);
    }
    
    listaPets(req: Request, res: Response){
        return res.status(200).json(listaDePets);
    }

    atualizaPet(req: Request, res: Response){
        const {id} = req.params;
        const {adotado, especie, dtBirth, nome} =  <TypePet>req.body;
        const pet = listaDePets.find((pet) => pet.id === Number(id));

        if(!pet){
            return res.status(404).json({erro: "Pet isn't find"});
        }

        pet.nome = nome;
        pet.dtBirth = dtBirth;
        pet.especie = especie;
        pet.adotado = adotado;

        return res.status(200).json(pet);
    }

    deletaPet(req: Request, res: Response){
        const {id} = req.params;
        console.log(id)
        const pet = listaDePets.find((pet) => pet.id === Number(id));
        if(!pet){
            return res.status(404).json({erro: "Pet isn't find"});
        }

        const index = listaDePets.indexOf(pet);
        listaDePets.splice(index, 1);
        return res.status(200).json({mensagem: "Pet deletado com sucesso"});
    }
}