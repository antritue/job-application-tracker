import { APIGatewayProxyEvent } from "aws-lambda";
import { JobSchema, Job } from "../../utils/validator/validator";
import { fromZodError } from "zod-validation-error";

export const create = async (event: APIGatewayProxyEvent) => {
  const body: Job = JSON.parse(event.body!);

  const result = JobSchema.safeParse(body);
  // console.log(result);

  if (result.success === false) {
    const validationError = fromZodError(result.error).message;

    return {
      statusCode: 400,
      body: JSON.stringify({
        message: validationError,
      }),
    };
  } else {
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Created!",
        data: result.data,
      }),
    };
  }
};
