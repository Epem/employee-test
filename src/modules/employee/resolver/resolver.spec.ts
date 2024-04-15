import { Item } from 'nestjs-dynamoose';

import { Test, TestingModule } from '@nestjs/testing';

import { Employee, Department, Position, SortOptions, EmployeeStatus, SortOrder } from '../model';
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
            sortOrder: SortOrder.descending,
            firstName: "Iv",
            lastName: "Ka",
            filter: {
                department: Department.Design,
                position: Position.ScrumMaster,
                salaryRange: [0, 1000000]
            }
        })).toHaveLength(1);
        expect(await resolver.employees({
            sortBy: SortOptions.salary,
            sortOrder: SortOrder.ascending,
            firstName: "Iv",
            lastName: "Ka",
            filter: {
                department: Department.Design,
                position: Position.ScrumMaster,
                salaryRange: [0, 1000000]
            }
        })).toHaveLength(1);
        expect(await resolver.employees({
            sortBy: SortOptions.salary,
            firstName: "Iv",
            lastName: "Ka",
            filter: {
                department: Department.Design,
                position: Position.ScrumMaster,
                salaryRange: [0, 1000000]
            }
        })).toHaveLength(1);
    });

    it('update status', async () => {
        const employee = await resolver.employees({
            firstName: "Ivan"
        })
        expect(employee).toHaveLength(1);
        expect(employee[0].salary).toBe(455000);

        const updateData = {
            salary: 555555,
            firstName: "Ivan",
            lastName: "Test2",
            department: Department.AI,
            position: Position.Manager,
            dateOfBirth: new Date("2000-01-01"),
            dateOfJoining: new Date("2000-01-01")
        }

        const { id, status, ...updated } = await resolver.updateEmployee(employee[0].id, updateData);
        expect(id).toBe(employee[0].id);
        expect(status).toBe(EmployeeStatus.Active);
        expect(updated).toBeDefined();
        expect(updated).toStrictEqual(updateData)
    });

    it('find by id', async () => {
        const employees = await resolver.employees({
            firstName: "Ivan"
        })
        expect(employees).toHaveLength(1);

        const employee = await resolver.employee(employees[0].id);
        expect(employee).toBeDefined();
        expect(employee.id).toBe(employees[0].id);
        try {
            await resolver.employee("not-found");
        } catch (error: any) {
            expect(error.message).toBe('Employee not found');
        }
    });

    it('deactivate', async () => {
        const employees = await resolver.employees({
            firstName: "Ivan"
        })
        expect(employees).toHaveLength(1);

        const response = await resolver.deactivateEmployee(employees[0].id);
        expect(response).toBeDefined();
        expect(response.status).toBe(true);
        const check = await resolver.employee(employees[0].id);
        expect(check).toBeDefined();
        expect(check.status).toBe(EmployeeStatus.Deleted);
    })

    it('activate', async () => {
        const employees = await resolver.employees({
            firstName: "Ivan"
        })
        expect(employees).toHaveLength(1);

        const response = await resolver.activateEmployee(employees[0].id);
        expect(response).toBeDefined();
        expect(response.status).toBe(true);
        const check = await resolver.employee(employees[0].id);
        expect(check).toBeDefined();
        expect(check.status).toBe(EmployeeStatus.Active);
    })

    it('create error', async () => {
        try {
            await resolver.createEmployee({
                firstName: "Ivan",
                lastName: "Test2",
                department: Department.AI,
                position: Position.Manager,
                dateOfBirth: new Date("2000-01-01"),
                dateOfJoining: new Date("2000-01-01"),
                // eslint-disable-next-line @typescript-eslint/no-loss-of-precision
                salary: 1234567890123456789012345678901234567890
            });
        } catch (error: any) {
            expect(error.message).toBe('Creation problems. Incedent logged');
        }
    })

    it('update error', async () => {
        try {
            await resolver.updateEmployee('not-found', {
                firstName: "Ivan",
                lastName: "Test2",
                department: Department.AI,
                position: Position.Manager,
                dateOfBirth: new Date("2000-01-01"),
                dateOfJoining: new Date("2000-01-01"),
                // eslint-disable-next-line @typescript-eslint/no-loss-of-precision
                salary: 1234567890123456789012345678901234567890
            });
        } catch (error: any) {
            expect(error.message).toBe('Employee not found');
        }

        try {
            const employees = await resolver.employees();
            await resolver.updateEmployee(employees[0].id, {
                firstName: "Ivan",
                lastName: "Test2",
                department: Department.AI,
                position: Position.Manager,
                dateOfBirth: new Date("2000-01-01"),
                dateOfJoining: new Date("2000-01-01"),
                // eslint-disable-next-line @typescript-eslint/no-loss-of-precision
                salary: 1234567890123456789012345678901234567890
            });
        } catch (error: any) {
            expect(error.message).toBe('Number 1.2345678901234568e+39 is greater than Number.MAX_SAFE_INTEGER. Use BigInt. ');
        }

    })

});
