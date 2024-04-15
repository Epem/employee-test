import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { Field, InputType, InterfaceType } from '@nestjs/graphql';
import { SortOptions, SortOrder } from './sort.enum';
import { Position } from './position.enum';
import { Department } from './department.enum';

@InputType()
export class Filter {
    @IsOptional()
    @IsEnum(Position)
    @Field(() => Position, { nullable: true })
    position?: Position;

    @IsOptional()
    @IsEnum(Department)
    @Field(() => Department, { nullable: true })
    department?: Department;

    @IsOptional()
    @IsNumber()
    @Field(() => [Number], { nullable: true })
    salaryRange?: [number, number];
}

@InputType()
@InterfaceType('FindEmployee')
export class FindEmployee {
    
    @IsOptional()
    @IsEnum(SortOptions)
    @Field(() => SortOptions, { nullable: true })
    sortBy?: SortOptions;

    @IsOptional()
    @IsEnum(SortOrder)
    @Field(() => SortOrder, { nullable: true })
    sortOrder?: SortOrder;

    @IsOptional()
    @IsString()
    @Field(() => String, { nullable: true })
    firstName?: string;    

    @IsOptional()
    @IsString()
    @Field(() => String, { nullable: true })
    lastName?: string;

    @IsOptional()
    @Field(() => Filter, { nullable: true })
    filter?: Filter;
}