import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';

import { Employee, UpdateEmployeeInput, FindEmployee, DeleteResponse, CreateEmployeeInput } from '../model';
import { EmployeeService } from '../service';

@Resolver(/* istanbul ignore next */() => Employee)
export class EmployeeResolver {
  constructor(private readonly employeeService: EmployeeService) { }

  @Mutation(/* istanbul ignore next */() => Employee)
  createEmployee(@Args('input') input: CreateEmployeeInput) {
    return this.employeeService.create(input);
  }

  @Mutation(/* istanbul ignore next */() => Employee)
  updateEmployee(
    @Args('id', { type:  /* istanbul ignore next */() => ID }) id: string,
    @Args('input') input: UpdateEmployeeInput,
  ) {
    return this.employeeService.update({ id }, input);
  }

  @Mutation(/* istanbul ignore next */() => DeleteResponse)
  forceDeleteEmployee(
    @Args('id', { type: /* istanbul ignore next */ () => ID }) id: string,
  ) {
    return this.employeeService.delete({ id });
  }

  @Mutation(/* istanbul ignore next */() => DeleteResponse)
  activateEmployee(
    @Args('id', { type:  /* istanbul ignore next */() => ID }) id: string,
  ) {
    return this.employeeService.activate({ id });
  }

  @Mutation(/* istanbul ignore next */() => DeleteResponse)
  deactivateEmployee(
    @Args('id', { type: /* istanbul ignore next */ () => ID }) id: string,
  ) {
    return this.employeeService.deactivate({ id });
  }

  @Query(/* istanbul ignore next */() => Employee)
  employee(
    @Args('id', { type: /* istanbul ignore next */ () => ID }) id: string,
  ) {
    return this.employeeService.findOne({ id });
  }

  @Query(/* istanbul ignore next */() => [Employee])
  employees(@Args('params', { type:  /* istanbul ignore next */() => FindEmployee, nullable: true}) params?: FindEmployee) {
    return this.employeeService.findAll(params);
  }
}
