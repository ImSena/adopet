import PetEntity from "../../entities/PetEntity";
import EnumPorte from "../../enum/EnumPorte";

export default interface InterfacePetRepository{
    criaPet(pet:PetEntity):void | Promise<void>;
    listaPet():Promise<PetEntity[]> | PetEntity[];
    atualizaPet(
        id:number, 
        pet: PetEntity
    ): Promise<{success: boolean, message?: string}> | void;
    deletaPet(id:number): Promise<{success: boolean, message?: string}> | void;
    adotaPet(idPet: number, idAdotante: number) : Promise<{success: boolean, message?: string}>
    buscaPetPeloPorte(porte: EnumPorte): Promise<PetEntity[]> | PetEntity[];
    buscaPorCampoGenerico<T extends keyof PetEntity>
    (campo: T, valor: PetEntity[T]):Promise<PetEntity[]> | PetEntity[];
}