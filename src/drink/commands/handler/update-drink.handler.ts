import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Drink } from "src/entities/drink";
import { Repository } from "typeorm";
import { UpdateDrinkCommand } from "../impl/update-drink.command";
import { classToPlain } from "class-transformer";

@CommandHandler(UpdateDrinkCommand)
export class UpdateDrinkHandler implements ICommandHandler<UpdateDrinkCommand> {
    constructor(@InjectRepository(Drink) private drinksRepo:Repository<Drink>){}

    async execute(command: UpdateDrinkCommand) : Promise<any>{
        console.log("reached upto here");

        const { id, drink, money } = command;
        console.log(command);
        try{
            const returnVal = await this.drinksRepo.findOne(id);
            console.log("It is returning this");
            const plain = classToPlain(returnVal);
            console.log(plain);
            let newValue  = plain;
            let remainder :  number = 0;
            let numOfDrinks : number  = 0;
            let deductSum : number = 0;
            switch(drink){
                case 'coke':
                    if(money < 20){
                        numOfDrinks = 0;
                        remainder = money;
                        break;
                    }
                    else{
                        let numOfCoke : string = (money / 20).toString();
                        numOfCoke = numOfCoke.split('.')[0];
                        numOfDrinks = <number><unknown>numOfCoke;
                        remainder = money % 20;
                        newValue.coke =  newValue.coke - (<number><unknown>numOfCoke);   
                        deductSum = money - remainder;
                        break;
                    }
      
                case 'pepsi':
                    if(money < 25){
                        numOfDrinks = 0;
                        remainder = money;
                        break;
                    }
                    else{
                        let numOfPepsi : string = (money / 25).toString();
                        numOfPepsi = numOfPepsi.split('.')[0];
                        numOfDrinks = <number><unknown>numOfPepsi;
                        remainder = money % 25;
                        newValue.pepsi =  newValue.pepsi - (<number><unknown>numOfPepsi);   
                        deductSum = money - remainder;
                        break;
                    }
      
                case 'dew':
                    if(money < 20){
                        numOfDrinks = 0;
                        remainder = money;
                        break;
                    }
                    else{
                        let numOfDew : string = (money / 30).toString();
                        numOfDew = numOfDew.split('.')[0];
                        numOfDrinks = <number><unknown>numOfDew;
                        remainder = money % 30;
                        newValue.dew =  newValue.dew - (<number><unknown>numOfDew);   
                        deductSum = money - remainder;
                        break;
                    }
      
                default:
                    newValue = newValue;
                    break;
            }
            newValue.fund = newValue.fund - deductSum;
            newValue.income = newValue.income + deductSum;
            const returnIt = await this.drinksRepo.update(id,newValue);
            return returnIt;
        }
        catch(error) {
            console.log(error);
            throw error;
        }
      
    }

}
