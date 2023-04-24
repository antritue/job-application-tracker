import { APIGatewayProxyEvent } from "aws-lambda";
import { PutItemCommand } from "@aws-sdk/client-dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";
import crypto from "crypto";

import { client } from "../../utils/db";
import { JobSchema, Job } from "../../utils/validator";
import { fromZodError } from "zod-validation-error";

export const create = async (event: APIGatewayProxyEvent) => {
  const body: Job = JSON.parse(event.body!);

  try {
    const result = JobSchema.safeParse(body);

    if (result.success === false) {
      const validationError = fromZodError(result.error).message;
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: validationError,
        }),
      };
    }

    const jobId = crypto.randomUUID();
    const params = {
      TableName: process.env.TABLE_NAME,
      Item: marshall({
        jobId,
        ...result.data,
      }),
    };

    console.log(client);
    await client.send(new PutItemCommand(params));

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Created!",
        data: {
          jobId,
          ...result.data,
        },
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: error.message,
      }),
    };
  }
};
