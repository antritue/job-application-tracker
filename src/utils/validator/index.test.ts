import { JobSchema } from "."; // Import the module that contains JobSchema and Job

describe("JobSchema", () => {
  // Test case for valid data
  test("should validate with valid job data", () => {
    const validJobData = {
      company: "Company",
      status: "accepted",
      workingStyle: "remote",
      dateApplied: "2022-01-01T00:00:00Z",
      address: "123 Main St",
      platform: "Platform",
      headquarters: "Headquarters",
    };
    const result: any = JobSchema.safeParse(validJobData);
    expect(result.success).toBe(true);
    expect(result.data).toEqual(validJobData);
  });

  // Test case for invalid data
  test("should not validate with invalid job data", () => {
    const invalidJobData = {
      company: "Company",
      status: "invalid_status", // Invalid value for "status"
      dateApplied: "2022-01-01T00:00:00Z",
      address: "123 Main St",
      platform: "Platform",
      headquarters: "Headquarters",
    };
    const result: any = JobSchema.safeParse(invalidJobData);
    expect(result.success).toBe(false);
    expect(result.error).toBeDefined();
  });
});
