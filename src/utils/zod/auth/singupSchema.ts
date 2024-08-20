import { z } from 'zod';

const signupSchema = z
  .object({
    name: z.string(),
    email: z.string(),
    passward: z.string(),
    passwordConfirm: z.string(),
  })
  .refine((data) => data.passward === data.passwordConfirm, {
    path: ['passwordConfirm'],
    message: '비밀번호가 일치하지 않습니다.',
  });

export type signupSchemaType = z.infer<typeof signupSchema>;

export default signupSchema;
