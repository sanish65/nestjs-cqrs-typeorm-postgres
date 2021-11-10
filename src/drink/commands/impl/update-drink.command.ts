import { ICommand } from "@nestjs/cqrs";
import { UpdateDrinksDto } from "src/dto/update-drinks.dto";

export class UpdateDrinkCommand implements ICommand {
    constructor(
        public readonly id:string,
        public readonly drink : string,
        public readonly money : number,
    ){}
}
