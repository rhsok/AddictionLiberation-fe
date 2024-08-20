import { z } from 'zod';

const loginSchema = z.object({
  email: z.string(),
  passward: z.string(),
});

export type loginSchemaType = z.infer<typeof loginSchema>;

export default loginSchema;
