import { IsDate, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

import { Field, InputType, InterfaceType } from '@nestjs/graphql';
import { Position } from './position.enum';
import { Department } from './department.enum';

@InputType()
@InterfaceType('UpdateEmployee')
export class UpdateEmployeeInput{

  @IsOptional()
  @IsString()
  @Field(/* istanbul ignore next */() => String, { nullable: true })
  firstName?: string;

  @IsOptional()
  @IsString()
  @Field(/* istanbul ignore next */() => String, { nullable: true })
  lastName?: string;


  @IsOptional()
  @IsDate()
  @Field(/* istanbul ignore next */() => Date, { nullable: true })
  dateOfJoining?: Date

  @IsOptional()
  @IsDate()
  @Field(/* istanbul ignore next */() => Date, { nullable: true })
  dateOfBirth?: Date;


  @IsOptional()
  @IsEnum(Department)
  @Field(/* istanbul ignore next */() => Department, { nullable: true })
  department?: Department;

  @IsOptional()
  @IsEnum(Position)
  @Field(/* istanbul ignore next */() => Position, { nullable: true })
  position?: Position;

  @IsOptional()
  @IsNumber()
  @Field(/* istanbul ignore next */() => Number, { nullable: true })
  salary?: number;
}
