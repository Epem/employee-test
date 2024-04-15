import { InjectModel, Model } from 'nestjs-dynamoose';
import * as uuid from 'uuid';
import { Injectable } from '@nestjs/common';
import { CreateEmployeeInput } from '../model/create-employee.input';
import { EmployeeStatus, SortOrder } from '../model/sort.enum';
import { Employee, EmployeeKey } from '../model/model';
import { UpdateEmployeeInput } from '../model/update-employee.input';
// import { SortOrder } from 'dynamoose/dist/General';
import { FindEmployee } from '../model/sort-filter-employee.input';
import { DeleteResponse } from '../model/delete-employee.response';
import { GraphQLError } from 'graphql/error/GraphQLError';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectModel('employee')
    private readonly model: Model<Employee, EmployeeKey>,
  ) { }

  async create(input: CreateEmployeeInput) {
    try {
      const response = await this.model.create({
        ...input,
        id: uuid.v4(),
        status: EmployeeStatus.Active,
      });
      return response
    } catch (error) {
      console.error(error);
      throw new GraphQLError('Creation problems. Incedent logged')
    }
  }

  async update(key: EmployeeKey, input: UpdateEmployeeInput) {
    const employee = await this.model.get(key);
    if (typeof employee === 'undefined') {
      throw new GraphQLError('Employee not found');
    }
    try {
      return this.model.update(key, input);
    } catch (error) {
      console.error(error);
      throw new GraphQLError('Update problems. Incedent logged')
    }
  }

  async delete(key: EmployeeKey) {
    try {
      const returnResponse: DeleteResponse = { status: true, message: 'Employee deleted' };
      await this.model.delete(key);
      return returnResponse;
    } catch (error) {
      console.error(error);
      throw new GraphQLError('Deletion problems. Incedent logged')
    }

  }

  async deactivate(key: EmployeeKey) {
    try {
      const response = await this.model.get(key);
      const returnResponse: DeleteResponse = { status: true, message: 'Employee deactivated' };

      if (typeof response === 'undefined') {
        returnResponse.status = false;
        returnResponse.message = 'Employee not found';
        return returnResponse;
      }

      if (response.status === EmployeeStatus.Deleted) {
        returnResponse.status = false;
        returnResponse.message = 'Employee is already inactive';
        return returnResponse;
      }

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id, ...updatedEmployee } = {
        ...response,
        status: EmployeeStatus.Deleted,
      };

      await this.model.update(key, updatedEmployee);
      return returnResponse;
    } catch (error) {
      console.error(error);
      throw new GraphQLError('Deactivation problems. Incedent logged')
    }

  }

  async activate(key: EmployeeKey) {
    try {
      const response = await this.model.get(key);
      const returnResponse: DeleteResponse = { status: true, message: 'Employee activated' };

      if (typeof response === 'undefined') {
        returnResponse.status = false;
        returnResponse.message = 'Employee not found';
        return returnResponse;
      }

      if (response.status === EmployeeStatus.Active) {
        returnResponse.status = false;
        returnResponse.message = 'Employee is already active';
        return returnResponse;
      }

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id, ...updatedEmployee } = {
        ...response,
        status: EmployeeStatus.Active,
      };

      await this.model.update(key, updatedEmployee);
      return returnResponse;
    } catch (error) {
      console.error(error);
      throw new GraphQLError('Activation problems. Incedent logged')
    }
  }

  async findOne(key: EmployeeKey) {
      const response = await this.model.get(key);
      if (typeof response === 'undefined') throw new GraphQLError('Employee not found');
      return response
  }

  async findAll(params?: FindEmployee): Promise<Employee[]> {
    try {
      let query = this.model.scan()
      if (typeof params !== 'object') return await query.exec();

      const { sortBy, filter, firstName, lastName } = params as FindEmployee;
      if (filter) {
        const { position, department, salaryRange } = filter;
        if (position) {
          query = query.using('positionIndex').where('position').eq(position);
        }
        if (department) {
          query = query.using('departmentIndex').where('department').eq(department);
        }
        if (salaryRange?.length === 2) {
          let [minSalary, maxSalary] = salaryRange;
          minSalary = !isNaN(minSalary) ? minSalary : 0;
          maxSalary = !isNaN(maxSalary) ? maxSalary : Infinity;
          query = query.using('salaryIndex').where('salary').between(minSalary, maxSalary);
        }
      }
      if (firstName) {
        query = query.using('firstNameIndex').where('firstName').contains(firstName);
      }
      if (lastName) {
        query = query.using('lastNameIndex').where('lastName').contains(lastName);
      }
      const response = await query.exec();
      if (sortBy) {
        let { sortOrder } = params as FindEmployee;
        if (typeof sortOrder !== 'string') sortOrder = SortOrder.ascending
        response.sort((a, b) => {
          if (a[sortBy] < b[sortBy]) {
            return sortOrder === SortOrder.ascending ? -1 : 1;
          }
          if (a[sortBy] > b[sortBy]) {
            return sortOrder === SortOrder.ascending ? 1 : -1;
          }
          return 0;
        });
      }
      return response;
    } catch (error) {
      console.error(error);
      throw new GraphQLError('Find all problems. Incedent logged')
    }
  }
}