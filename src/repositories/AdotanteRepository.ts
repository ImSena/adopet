import { Repository } from "typeorm";
import AdotanteEntity from "../entities/AdotanteEntity";
import InterfaceAdotanteRepository from "./interfaces/InterfaceAdotanteEntity";

export default class AdotanteRepository implements InterfaceAdotanteRepository
{
    constructor(private repository: Repository<AdotanteEntity>){}

    async criaAdotante(adotante: AdotanteEntity): Promise<void> {
        await this.repository.save(adotante);
    } 
    
}