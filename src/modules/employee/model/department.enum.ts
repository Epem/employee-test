import { registerEnumType } from '@nestjs/graphql';

enum Department {
  Management = 'Management',
  Development = 'Development',
  Design = 'Design',
  QA = 'Quality Assurance',
  Operations = 'Operations',
  Data = 'Data Analysis',
  ProjectManagement = 'Project Management',
  UX = 'User Experience',
  Writing = 'Technical Writing',
  Cybersecurity = 'Cybersecurity',
  Systems = 'Systems Architecture',
  Databases = 'Database Administration',
  Networking = 'Network Engineering',
  ITSupport = 'IT Support',
  Frontend = 'Frontend Development',
  Backend = 'Backend Development',
  FullStack = 'Full Stack Development',
  Mobile = 'Mobile Development',
  Embedded = 'Embedded Software',
  AI = 'Artificial Intelligence',
  ML = 'Machine Learning',
  GameDev = 'Game Development',
  Automation = 'Automation Engineering',
  Release = 'Release Management',
  Business = 'Business Analysis',
  Sales = 'Sales Engineering',
  CustomerSupport = 'Customer Support',
  Consulting = 'Technical Consulting',
  Cloud = 'Cloud Engineering',
  QAManagement = 'Quality Assurance Management',
  Solutions = 'Solutions Architecture',
  Research = 'Research Science',
  VRAR = 'VR/AR Design',
  Blockchain = 'Blockchain Development',
  Training = 'Software Training',
  Integration = 'Integration Engineering',
  ETL = 'ETL Development',
}

registerEnumType(Department, {
  name: 'Department',
});

export { Department };
