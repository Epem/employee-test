import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';

import { Employee, UpdateEmployeeInput, FindEmployee, DeleteResponse, CreateEmployeeInput } from '../model';
import { EmployeeService } from '../service';

@Resolver(() => Employee)
export class EmployeeResolver {
  constructor(private readonly employeeService: EmployeeService) { }

  @Mutation(() => Employee)
  createEmployee(@Args('input') input: CreateEmployeeInput) {
    return this.employeeService.create(input);
  }

  @Mutation(() => Employee)
  updateEmployee(
    @Args('id', { type:  () => ID }) id: string,
    @Args('input') input: UpdateEmployeeInput,
  ) {
    return this.employeeService.update({ id }, input);
  }

  @Mutation(() => DeleteResponse)
  forceDeleteEmployee(
    @Args('id', { type:  () => ID }) id: string,
  ) {
    return this.employeeService.delete({ id });
  }

  @Mutation(() => DeleteResponse)
  activateEmployee(
    @Args('id', { type:  () => ID }) id: string,
  ) {
    return this.employeeService.activate({ id });
  }

  @Mutation(() => DeleteResponse)
  deactivateEmployee(
    @Args('id', { type:  () => ID }) id: string,
  ) {
    return this.employeeService.deactivate({ id });
  }

  @Query(() => Employee)
  employee(
    @Args('id', { type:  () => ID }) id: string,
  ) {
    return this.employeeService.findOne({ id });
  }

  @Query(() => [Employee])
  employees(@Args('params', { type:  () => FindEmployee, nullable: true}) params?: FindEmployee) {
    return this.employeeService.findAll(params);
  }
}
