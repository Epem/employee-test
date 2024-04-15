import { Field, ID, ObjectType } from '@nestjs/graphql';

import { CreateEmployeeInput } from './create-employee.input';
import { EmployeeStatus } from './sort.enum';

export type EmployeeKey = {
  id: string;
};

@ObjectType({ implements: CreateEmployeeInput })
export class Employee extends CreateEmployeeInput {
  @Field( () => ID)
  id: string;
  @Field( () => EmployeeStatus)
  status: EmployeeStatus;

}