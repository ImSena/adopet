import EnumEspecie from "../enum/EnumEspecie";

type TypePet = {
    id: number;
    nome: string;
    especie: EnumEspecie;
    adotado: boolean;
    dtBirth: Date;
}

export default TypePet;