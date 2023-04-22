import { z } from "zod";

export const JobSchema = z.object({
  id: z.string().trim().min(1),
  company: z.string().trim().min(1),
  status: z.enum(["pending", "accepted", "rejected"]),
  dateApplied: z.string().datetime().trim().min(1),
  address: z.string().trim().min(1),
  platform: z.string().trim().min(1),
  headquarters: z.string().trim().min(1),
});

export type Job = z.infer<typeof JobSchema>;
