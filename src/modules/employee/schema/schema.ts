import { Schema } from 'dynamoose';

export const EmployeeSchema = new Schema({
  id: {
    type: String,
    hashKey: true,
  },
  firstName: {
    type: String,
    index: {
      type: 'global',
      rangeKey: 'id',
      project: true
    },
  },
  lastName: {
    type: String,
    index: {
      type: 'global',
      rangeKey: 'id',
      project: true
    },
  
  },
  dateOfJoining: {
    type: Date,
    index: {
      type: 'global',
      rangeKey: 'id',
      project: true
    },
  },
  dateOfBirth: {
    type: Date,
    index: {
      type: 'global',
      rangeKey: 'id',
      project: true
    },
  },
  salary: {
    type: Number,
    index: {
      type: 'global',
      rangeKey: 'id',
      project: true
    },
  },
  department: {
    type: String,
    index: {
      type: 'global',
      rangeKey: 'id',
      project: true
    },
  },
  status: {
    type: String,
    index: {
      type: 'global',
      rangeKey: 'id',
      project: true
    },
  },
  position: {
    type: String,
    index: {
      type: 'global',
      rangeKey: 'id',
      project: true
    },
  },
});