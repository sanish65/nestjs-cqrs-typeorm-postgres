import { ICommand } from "@nestjs/cqrs";

export class DeleteDrinkCommand implements ICommand {
    constructor(
        public readonly id:string,
    ){
        console.log("Delete drink DeleteDrinkCommand");
    }
}
