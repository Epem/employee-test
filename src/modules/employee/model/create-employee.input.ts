import { IsDate, IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';

import { Field, InputType, InterfaceType } from '@nestjs/graphql';
import { Position } from './position.enum';
import { Department } from './department.enum';

@InputType()
@InterfaceType('BaseEmployee')
export class CreateEmployeeInput {
  @IsNotEmpty()
  @IsString()
  @Field()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  @Field()
  lastName: string;

  @IsNotEmpty()
  @IsDate()
  @Field(()=> Date)
  dateOfJoining: Date;

  @IsNotEmpty()
  @IsDate()
  @Field(()=> Date)
  dateOfBirth: Date;

  @IsNotEmpty()
  @IsNumber()
  @Field()
  salary: number;

  @IsNotEmpty()
  @IsEnum(Department)
  @Field(() => Department)
  department: Department;

  @IsNotEmpty()
  @IsEnum(Position)
  @Field( () => Position)
  position: Position;
}
