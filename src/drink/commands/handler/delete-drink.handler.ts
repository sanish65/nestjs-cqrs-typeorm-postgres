import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Drink } from "src/entities/drink";
import { Repository } from "typeorm";
import { DeleteDrinkCommand } from "../impl/delete-drink.command";

@CommandHandler(DeleteDrinkCommand)
export class DeleteDrinkHandler implements ICommandHandler<DeleteDrinkCommand> {
    constructor(@InjectRepository(Drink) private drinksRepo:Repository<Drink>){}

    async execute(command: DeleteDrinkCommand) : Promise<any>{
        console.log("deletion for drinks by id");

        const { id } = command;
        console.log(command);
        const updated = await this.drinksRepo.delete(id);
        return updated;
     
    }

}
