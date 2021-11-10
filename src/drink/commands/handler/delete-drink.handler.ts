import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Drink } from "../../../entities/drink";
// import { Drink } from "src/entities/drink";
import { Repository } from "typeorm";
import { DeleteDrinkCommand } from "../impl/delete-drink.command";

@CommandHandler(DeleteDrinkCommand)
export class DeleteDrinkHandler implements ICommandHandler<DeleteDrinkCommand> {
    constructor(@InjectRepository(Drink) private drinksRepo:Repository<Drink>){}

    async execute(command: DeleteDrinkCommand) : Promise<any>{
        const { id } = command;
        console.log(command);
        const updated = await this.drinksRepo.delete(id);
        return { deleted: true };
     
    }

}
