import { Injectable, NotFoundException } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { UpdateDrinksDto } from 'src/dto/update-drinks.dto';
import { Drink } from 'src/entities/drink';
// import { Drink } from '../entities/drink';

import { CreateDrinkCommand } from './commands/impl/create-drink.command';
import { DeleteDrinkCommand } from './commands/impl/delete-drink.command';
import { PatchDrinkCommand } from './commands/impl/path-drink.command';
import { UpdateDrinkCommand } from './commands/impl/update-drink.command';
import { GetDrinksQuery } from './queries/impl/get-drinks.query';
import { GetSingleDrinkQuery } from './queries/impl/get-singleDrink.query';

@Injectable()
export class DrinksService {

  constructor(private queryBus:QueryBus , private commandBus:CommandBus){}

  async getAll() : Promise<Drink[]>{
    return await this.queryBus.execute(new GetDrinksQuery()); 
   }

  async getDrinksById(id:string) : Promise<Drink>{
    return await this.queryBus.execute(new GetSingleDrinkQuery(id));
  }

  async createDrinks(payload: CreateDrinkCommand) : Promise<Drink>{
    return await this.commandBus.execute(payload);
  }

  async updateDrinks(id : string ,drinks : string ,money : number) : Promise<any>{
    return this.commandBus.execute(new UpdateDrinkCommand(id, drinks , money));
  }

  async patchDrinks(id : string , fund:number,income:number,coke:number,pepsi:number,dew:number ) : Promise<Drink>{
    return this.commandBus.execute(new PatchDrinkCommand(id, fund,income,coke,pepsi,dew))
  }

  async deleteDrinks(id:string) : Promise<any>{
    return this.commandBus.execute(new DeleteDrinkCommand(id));


  }
}

