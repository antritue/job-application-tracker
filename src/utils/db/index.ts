import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

export const client = new DynamoDBClient({
  // region: "localhost",
  // endpoint: "http://localhost:8000",
});
