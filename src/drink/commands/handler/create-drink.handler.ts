import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Drink } from "src/entities/drink";
import { Repository } from "typeorm";
import { CreateDrinkCommand } from "../impl/create-drink.command";

@CommandHandler(CreateDrinkCommand)
export class CreateDrinkHandler implements ICommandHandler<CreateDrinkCommand> {
    constructor(@InjectRepository(Drink) private drinksRepo:Repository<Drink>){}

    async execute(command: CreateDrinkCommand) : Promise<any>{
        var newDrinks = new Drink();
        newDrinks.fund = command.fund;
        newDrinks.income = command.income;
        newDrinks.coke = command.coke;
        newDrinks.pepsi = command.pepsi;
        newDrinks.dew = command.dew;

        await this.drinksRepo.insert(newDrinks);
    }

}
