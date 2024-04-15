import * as dynamoose from 'dynamoose';
import { Schema } from 'dynamoose/dist/Schema';
import { TableOptionsOptional } from 'dynamoose/dist/Table';
import * as fs from 'fs';
import * as glob from 'glob-promise';
import * as yaml from 'js-yaml';
import * as path from 'path';

const args = process.argv.slice(2);
const matchPattern = args[1];
const outputFile = args[2];

const pascalCase = (str:string):string => {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
      return index === 0 ? word.toUpperCase() : word.toLowerCase();
    })
    .replace(/\s+|[-_]/g, '');
}

const deletionPolicy = 'Delete';
const globalOptions: TableOptionsOptional = {
  throughput: 'ON_DEMAND',
  prefix: '${self:service}-${self:provider.stage}-',
  suffix: '-table',
};

async function main() {
  if (!matchPattern || !outputFile) {
    console.log('missing required arguments.');
    return;
  }

  const slsResources: { Resources: Record<string, any> } = { Resources: {} };

  const files = await glob.promise(matchPattern);
  await Promise.all(
    files.map(async (file) => {
      console.log('detected:', file);

      const fileNameExt = file.split(/[\\\/]/).pop()!;
      const fileName = fileNameExt.split('.').shift()!;
      const tableName = pascalCase(fileName);

      const exports = await import(`.${path.sep}${file}`);
      const schema = Object.values(exports).shift() as Schema;

      if (schema.constructor.name === 'Schema') {
        const model = dynamoose.model(fileName, schema, globalOptions);
        slsResources.Resources[`${tableName}Table`] = {
          Type: 'AWS::DynamoDB::Table',
          DeletionPolicy: deletionPolicy,
          Properties: await model.table().create({ return: 'request' }),
        };
      }
    }),
  );

  const yamlReources = yaml.dump(slsResources);
  const outputPath = outputFile.split(/[\\\/]/);
  if (outputPath.length > 1) {
    await fs.promises.mkdir(
      outputPath.slice(0, outputPath.length - 1).join(path.sep),
      { recursive: true },
    );
  }
  await fs.promises.writeFile(outputFile, yamlReources);
  console.log(`Serverless resources file generated at ${outputFile}`);
  process.exit(0);
}

main();
