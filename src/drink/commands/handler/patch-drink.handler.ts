import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Drink } from "../../../entities/drink";
// import { Drink } from "src/entities/drink";

import { Repository } from "typeorm";
import { classToPlain } from "class-transformer";
import { PatchDrinkCommand } from "../impl/path-drink.command";

@CommandHandler(PatchDrinkCommand)
export class PatchDrinkHandler implements ICommandHandler<PatchDrinkCommand> {
    constructor(@InjectRepository(Drink) private drinksRepo:Repository<Drink>){}

    async execute(command: PatchDrinkCommand) : Promise<any>{
        try{
        const { id, fund,income,coke,pepsi,dew } = command;
        const newValue = { fund,income,coke,pepsi,dew};
            const returnVal = await this.drinksRepo.update(id,newValue);
             if(returnVal){
                console.log(newValue);
                return newValue
            }            
        }
        catch(error) {
            console.log(error);
            throw error;
        }
      
    }

}
