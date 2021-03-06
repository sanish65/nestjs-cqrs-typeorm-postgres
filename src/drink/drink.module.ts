import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { Drink } from 'src/entities/drink';
// alternate the { Drink }  module for test-case / localhost start
import { Drink } from '../entities/drink';

import { CreateDrinkHandler } from './commands/handler/create-drink.handler';
import { DeleteDrinkHandler } from './commands/handler/delete-drink.handler';
import { PatchDrinkHandler } from './commands/handler/patch-drink.handler';
import { UpdateDrinkHandler } from './commands/handler/update-drink.handler';
import { CreateDrinkCommand } from './commands/impl/create-drink.command';
import { DeleteDrinkCommand } from './commands/impl/delete-drink.command';
import { PatchDrinkCommand } from './commands/impl/path-drink.command';
import { UpdateDrinkCommand } from './commands/impl/update-drink.command';
import { DrinkController } from './drink.controller';
import { DrinksService } from './drink.service';
import { GetDrinksHandler,  } from './queries/handlers/get-drinks.handler';
import { GetSingleDrinkHandler } from './queries/handlers/get-singleDrink.handler';
import { GetSingleDrinkQuery } from './queries/impl/get-singleDrink.query';

@Module({
  imports:[CqrsModule, TypeOrmModule.forFeature([Drink])],
  controllers: [DrinkController],
  providers:[
    DrinksService,
    GetDrinksHandler,
    GetSingleDrinkQuery,GetSingleDrinkHandler,
    CreateDrinkCommand,CreateDrinkHandler,
    UpdateDrinkCommand,UpdateDrinkHandler,
    DeleteDrinkCommand,DeleteDrinkHandler,
    PatchDrinkCommand,PatchDrinkHandler,
  ]
})
export class DrinkModule {}
