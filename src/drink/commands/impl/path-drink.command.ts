import { ICommand } from "@nestjs/cqrs";
import { UpdateDrinksDto } from "src/dto/update-drinks.dto";

export class PatchDrinkCommand implements ICommand {
    constructor(
        public readonly id:string,
        public readonly fund : number,
        public readonly income : number,
        public readonly coke : number,
        public readonly pepsi : number,
        public readonly dew : number,
    ){}
}
