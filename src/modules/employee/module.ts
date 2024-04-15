import { DynamooseModule } from 'nestjs-dynamoose';

import { Module } from '@nestjs/common';

import { EmployeeResolver } from './resolver/resolver';
import { EmployeeSchema } from './schema/employee';
import { EmployeeService } from './service';

@Module({
  imports: [
    DynamooseModule.forFeature([
      {
        name: 'employee',
        schema: EmployeeSchema,
      },
    ]),
  ],
  providers: [EmployeeService, EmployeeResolver],
})
export class EmployeeModule {}
