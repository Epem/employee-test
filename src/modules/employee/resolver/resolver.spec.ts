import { Item } from 'nestjs-dynamoose';

import { Test, TestingModule } from '@nestjs/testing';

import { Employee, Department, Position, SortOptions } from '../model';
import { EmployeeService } from '../service';
import { EmployeeTestImports } from '../test/test.imports';
import employeeJson from './data.json';
import { EmployeeResolver } from './resolver';

let resolver: EmployeeResolver;

beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
        imports: EmployeeTestImports,
        providers: [EmployeeService, EmployeeResolver],
    }).compile();

    resolver = module.get<EmployeeResolver>(EmployeeResolver);
});

describe('Employee Resolver', () => {
    let employees: Item<Employee>[] = [];

    beforeAll(async () => {
        employees = await Promise.all(
            employeeJson.map(
                async (input) => {
                    const { ...data } = {
                        ...input, ...{
                            dateOfBirth: new Date(input.dateOfBirth), 
                            dateOfJoining: new Date(input.dateOfJoining),
                            department: Department[input.department as keyof typeof Department],
                            position: Position[input.position as keyof typeof Position]
                        }
                    }
                    return await resolver.createEmployee(data)
                }
            ),
        );
    });

    afterAll(async () => {
        await Promise.all(
            employees.map(
                async (employee) =>
                    await resolver.forceDeleteEmployee(employee.toJSON().id),
            ),
        );
    });

    it('findAll', async () => {
        expect(await resolver.employees()).toHaveLength(4);
        expect(await resolver.employees({
            sortBy: SortOptions.salary,
            firstName: "Tati"
        })).toHaveLength(3);
    });

    it('update status', async () => {
        const employee = await resolver.employees({
            firstName: "Ivan"
        })
        expect(employee).toHaveLength(1);
        expect(employee[0].salary).toBe(455000);

        const updated = await resolver.updateEmployee(employee[0].id, {
            salary: 555555,
        });
        expect(updated).toBeDefined();
        expect(updated.salary).toBe(555555);
    });

    it('find by id', async () => {
        const employees = await resolver.employees({
            firstName: "Ivan"
        })
        expect(employees).toHaveLength(1);

        const employee = await resolver.employee(employees[0].id);
        expect(employee).toBeDefined();
        expect(employee.id).toBe(employees[0].id);
    });
});
