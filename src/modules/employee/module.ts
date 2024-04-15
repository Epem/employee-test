import { DynamooseModule } from 'nestjs-dynamoose';

import { Module } from '@nestjs/common';

// import { EmployeeController } from './controller/controller';
import { EmployeeResolver } from './resolver/resolver';
import { EmployeeSchema } from './schema/schema';
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
  // controllers: [EmployeeController],
})
export class EmployeeModule {}
