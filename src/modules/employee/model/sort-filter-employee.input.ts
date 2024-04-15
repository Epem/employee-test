import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { Field, InputType, InterfaceType } from '@nestjs/graphql';
import { SortOptions, SortOrder } from './sort.enum';
import { Position } from './position.enum';
import { Department } from './department.enum';

@InputType()
export class Filter {
    @IsOptional()
    @IsEnum(Position)
    @Field(/* istanbul ignore next */() => Position, { nullable: true })
    position?: Position;

    @IsOptional()
    @IsEnum(Department)
    @Field(/* istanbul ignore next */() => Department, { nullable: true })
    department?: Department;

    @IsOptional()
    @IsNumber()
    @Field(/* istanbul ignore next */() => [Number], { nullable: true })
    salaryRange?: [number, number];
}

@InputType()
@InterfaceType('FindEmployee')
export class FindEmployee {
    
    @IsOptional()
    @IsEnum(SortOptions)
    @Field(/* istanbul ignore next */() => SortOptions, { nullable: true })
    sortBy?: SortOptions;

    @IsOptional()
    @IsEnum(SortOrder)
    @Field(/* istanbul ignore next */() => SortOrder, { nullable: true })
    sortOrder?: SortOrder;

    @IsOptional()
    @IsString()
    @Field(/* istanbul ignore next */() => String, { nullable: true })
    firstName?: string;    

    @IsOptional()
    @IsString()
    @Field(/* istanbul ignore next */() => String, { nullable: true })
    lastName?: string;

    @IsOptional()
    @Field(/* istanbul ignore next */() => Filter, { nullable: true })
    filter?: Filter;
}