## Description

This project is designed as a robust AWS Serverless solution for managing employee records through a GraphQL API. It provides an efficient framework for creating, updating, querying, and deleting employee data, all while leveraging AWS services for seamless deployment.

## Technologies

- [AWS Lambda](https://aws.amazon.com/lambda)
- [AWS DynamoDB](https://aws.amazon.com/dynamodb)
- [Serverless](https://serverless.com/framework/docs/providers/aws/)
- [NestJS](https://docs.nestjs.com/)
- [NestJS GraphQL](https://docs.nestjs.com/graphql/quick-start)
- [NestJS Dynamoose](https://github.com/hardyscc/nestjs-dynamoose)

## Usage

```bash
git clone https://github.com/epem/employee-test.git && cd ./employee-test

npm install
```

After that find and update the following files:
- .env

## Setting Up AWS Credentials

1. [Sign up for an AWS account](https://serverless.com/framework/docs/providers/aws/guide/credentials#sign-up-for-an-aws-account)

2. Login to your AWS account and go to the **Identity & Access Management (IAM)** page.

3. Click on **Users** and then **Add user**. Enter a name for the user (e.g., serverless-admin) and enable **Programmatic access**. Proceed to the Permissions page, select **Attach existing policies directly**, and search for **AdministratorAccess**. **Review** and **Create** the user.

4. Copy the **API Key & Secret** to a safe location for later use.

## Workstation Setup

Install AWS CLI and configure it with your credentials:

```bash
$ aws configure

AWS Access Key ID [****************]:
AWS Secret Access Key [****************]:
Default region name [eu-central-1]:
Default output format [None]:
```

> Please enter your **AWS Access Key ID**, **AWS Secret Access Key** and **Default region name**

## Deployment

```bash
# deploy to AWS
$ npm run deploy
```

## Install DynamoDB local

```bash
# download dynamodb local into .dynamodb folder
$ npm run ddb:install
```

## Local Offline Development

```bash
# start dynamodb local
$ npm run ddb:start

# start serverless-offline server
$ npm run sls:offline

# start serverless-offline server and connect to online dynamodb
$ npm run sls:online
```

## Local NestJS Development - (Optional)

```bash
# start dynamodb local
$ npm run ddb:start

# start local nestjs server
$ npm start

# start local nestjs server in watch mode
$ npm run start:watch

# start local nestjs server and connect to online dynamodb
$ npm run start:online
```

## Tools

```bash
# re-generate the resources/dynamodb.yml from schemas
$ npm run genres
```

## Unit Testing

```bash
# run unit test
$ npm test

# run unit test with coverage
$ npm run test:cov
```

## GraphQL Endpoint Test

- offline: http://localhost:3000/dev/graphql
- local: http://localhost:3000/graphql
- AWS: https://<your_aws_deployment_id>.execute-api.<your_aws_region>.amazonaws.com/dev/graphql

```graphql
mutation {
  createEmployee(
    input: {
      firstName: "John",
      lastName: "Doe",
      dateOfJoining: "2022-01-01",
      dateOfBirth: "1990-01-01",
      salary: 50000,
      position: "EmbeddedSoftwareEngineer",
      department: "Networking",
    }
  ) {
    id
    firstName
    lastName
  }
}
```

```graphql
mutation {
  updateEmployee(
    id: "1ca7726e-0af8-4ff1-8ef1-4eae97377162"
    input: {
      salary: 60000
      position: "FullStackDeveloper"
    }
  ) {
    id
    firstName
    lastName
    salary
    title
  }
}
```


```graphql
mutation {
  forceDeleteEmployee(id: "1ca7726e-0af8-4ff1-8ef1-4eae97377162") {
    success
  }
}
```

```graphql
query {
  employee(id: "1ca7726e-0af8-4ff1-8ef1-4eae97377162") {
    id
    firstName
    lastName
    salary
    title
  }
}
```

```graphql
query {
  employees(
    params: {
      sortBy: "dateOfJoining",
      sortDirection: "descending",
      filter: {
        department: "Networking",
        minSalary: 50000,
        maxSalary: 80000,
      }
    }
  ) {
    id
    firstName
    lastName
    dateOfJoining
    salary
    title
    department
  }
}
```

## Stay in touch

