import { emailRegex, passwordRegex } from '@/utils/regex/authRegex';
import { z } from 'zod';

const loginSchema = z.object({
  email: z
    .string()
    .regex(emailRegex, '6~20자의 영문 숫자 @를 조합하여 작성해 주세요'),
  password: z
    .string()
    .regex(
      passwordRegex,
      '대문자,소문자,특수문자, 숫자를 포함하여 10자리 이상 20자 이하로 입력하여 주세요'
    ),
});

export type loginSchemaType = z.infer<typeof loginSchema>;

export default loginSchema;
