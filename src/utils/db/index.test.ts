import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { client } from "./";

describe("DynamoDBClient", () => {
  test("should have region and endpoint set", () => {
    expect(client).toBeInstanceOf(DynamoDBClient);
  });
});
