import {
    IsNotEmpty,
    IsOptional,
    IsString,
    IsIn,
    IsNumber,
  } from 'class-validator';
  
  export class CreateDrinksDto {
    @IsOptional()
    @IsString()
    readonly id?: string;

    @IsNumber()
    readonly fund: number;

    @IsNumber()
    readonly income: number;
  
    @IsNumber()
    readonly coke: number;
  
    @IsNumber()
    readonly pepsi: number;
  
    @IsNumber()
    readonly dew: number;
  }
  