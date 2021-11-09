import {
    IsNotEmpty,
    IsOptional,
    IsString,
    IsIn,
    IsNumber,
  } from 'class-validator';
  
  export class UpdateDrinksDto {
    @IsOptional()
    @IsString()
    readonly id?: string;

    @IsOptional()
    @IsNumber()
    readonly fund?: number;

    @IsOptional()
    @IsNumber()
    readonly income?: number;
  
    @IsOptional()
    @IsNumber()
    readonly coke?: number;
  
    @IsOptional()
    @IsNumber()
    readonly pepsi?: number;
  
    @IsOptional()
    @IsNumber()
    readonly dew?: number;
  }
  