import { z } from "zod";

export const JobSchema = z
  .object({
    company: z.string().trim().min(1),
    status: z.enum(["pending", "accepted", "rejected"]),
    workingStyle: z.enum(["office", "hybrid", "remote"]),
    dateApplied: z.string().datetime().trim().min(1),
    address: z.string(),
    platform: z.string().trim().min(1),
    headquarters: z.string().trim().min(1),
  })
  .strict();

export type Job = z.infer<typeof JobSchema>;
