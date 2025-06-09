import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import EnumEspecie from "../enum/EnumEspecie";
import AdotanteEntity from "./AdotanteEntity";

@Entity()
export default class PetEntity
{
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    nome: string;
    @Column()
    especie: EnumEspecie;
    @Column()
    dtBirth: Date;
    @Column()
    adotado: boolean;

    @ManyToOne(() => AdotanteEntity, (adotante) => adotante.pets)
    adotante!: AdotanteEntity

    constructor(
        nome: string,
        especie: EnumEspecie,
        dtBirth: Date,
        adotado: boolean
    ){
        this.nome = nome;
        this.especie = especie;
        this.dtBirth = dtBirth;
        this.adotado = adotado;
    }
}