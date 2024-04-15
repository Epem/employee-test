import { registerEnumType } from '@nestjs/graphql';
import { SortOrder } from 'dynamoose/dist/General';

enum EmployeeStatus {
  Active = 'Active',
  Deleted = 'Deleted',
}

registerEnumType(EmployeeStatus, {
  name: 'EmployeeStatus',
});

enum SortOptions {
  salary = 'salary',
  dateOfJoining = 'dateOfJoining'
}

registerEnumType(SortOptions, {
  name: 'SortOptions',
});



registerEnumType(SortOrder, {
  name: 'SortOrder',
});

export { EmployeeStatus, SortOptions, SortOrder };
