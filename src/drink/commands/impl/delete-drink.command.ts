import { ICommand } from "@nestjs/cqrs";

export class DeleteDrinkCommand implements ICommand {
    constructor(
        public readonly id:string,
    ){}
}
