import { IsDate, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

import { Field, InputType, InterfaceType } from '@nestjs/graphql';
import { Position } from './position.enum';
import { Department } from './department.enum';

@InputType()
@InterfaceType('UpdateEmployee')
export class UpdateEmployeeInput{

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  firstName?: string;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  lastName?: string;


  @IsOptional()
  @IsDate()
  @Field(() => Date, { nullable: true })
  dateOfJoining?: Date

  @IsOptional()
  @IsDate()
  @Field(() => Date, { nullable: true })
  dateOfBirth?: Date;


  @IsOptional()
  @IsEnum(Department)
  @Field(() => Department, { nullable: true })
  department?: Department;

  @IsOptional()
  @IsEnum(Position)
  @Field(() => Position, { nullable: true })
  position?: Position;

  @IsOptional()
  @IsNumber()
  @Field(() => Number, { nullable: true })
  salary?: number;
}
