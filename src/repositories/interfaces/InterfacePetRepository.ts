import PetEntity from "../../entities/PetEntity";

export default interface InterfacePetRepository{
    criaPet(pet:PetEntity):void | Promise<void>;
    listaPet():Promise<PetEntity[]> | PetEntity[];
    atualizaPet(
        id:number, 
        pet: PetEntity
    ): Promise<{success: boolean, message?: string}> | void;
    deletaPet(id:number): Promise<{success: boolean, message?: string}> | void;
}