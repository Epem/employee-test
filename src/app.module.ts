import { DynamooseModule } from 'nestjs-dynamoose';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';

import { EmployeeModule } from './modules/employee/module';
import { GraphQLError } from 'graphql/error';

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: true,
      formatError(error) {
        const originalError = error.extensions
          ?.originalError as GraphQLError;
       
        if (!originalError) {
          return {
            message: error.message,
          };
        }
        return {
          message: originalError.message,
        };
      }
    }),
    DynamooseModule.forRoot({
      local: process.env.IS_DDB_LOCAL === 'true',
      aws: { region: process.env.REGION },
      table: {
        create: process.env.IS_DDB_LOCAL === 'true',
        prefix: `${process.env.SERVICE}-${process.env.STAGE}-`,
        suffix: '-table',
      },
    }),
    EmployeeModule,
  ],
})
export class AppModule {}
