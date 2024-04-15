import { registerEnumType } from '@nestjs/graphql';


enum Position {
    Manager = 'Manager',
    Developer = 'Developer',
    Designer = 'Designer',
    QAEngineer = 'QA Engineer',
    DevOpsEngineer = 'DevOps Engineer',
    DataAnalyst = 'Data Analyst',
    ScrumMaster = 'Scrum Master',
    ProductOwner = 'Product Owner',
    UXUIEngineer = 'UX/UI Engineer',
    TechnicalWriter = 'Technical Writer',
    SecurityAnalyst = 'Security Analyst',
    SystemArchitect = 'System Architect',
    DatabaseAdministrator = 'Database Administrator',
    NetworkEngineer = 'Network Engineer',
    ITSupport = 'IT Support',
    FrontendDeveloper = 'Frontend Developer',
    BackendDeveloper = 'Backend Developer',
    FullStackDeveloper = 'Full Stack Developer',
    MobileDeveloper = 'Mobile Developer',
    EmbeddedSoftwareEngineer = 'Embedded Software Engineer',
    AIEngineer = 'AI Engineer',
    MachineLearningEngineer = 'Machine Learning Engineer',
    GameDeveloper = 'Game Developer',
    AutomationEngineer = 'Automation Engineer',
    ReleaseManager = 'Release Manager',
    ProjectManager = 'Project Manager',
    BusinessAnalyst = 'Business Analyst',
    SalesEngineer = 'Sales Engineer',
    CustomerSupport = 'Customer Support',
    TechnicalConsultant = 'Technical Consultant',
    CloudEngineer = 'Cloud Engineer',
    QualityAssuranceLead = 'Quality Assurance Lead',
    SolutionsArchitect = 'Solutions Architect',
    ResearchScientist = 'Research Scientist',
    VRARDeveloper = 'VR/AR Developer',
    BlockchainDeveloper = 'Blockchain Developer',
    SoftwareTrainer = 'Software Trainer',
    IntegrationEngineer = 'Integration Engineer',
    ETLDeveloper = 'ETL Developer',
    CybersecurityEngineer = 'Cybersecurity Engineer',
  }

  registerEnumType(Position, {
    name: 'Position',
  });


  export { Position }