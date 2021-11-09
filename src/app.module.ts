import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Drink } from './entities/drink';
import { DrinkModule } from './drink/drink.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type:'postgres',
      host:'localhost',
      port:5432,
      username:'postgres',
      password:'root',
      database:'nestjs',
      entities:[Drink]
    }),
    DrinkModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
