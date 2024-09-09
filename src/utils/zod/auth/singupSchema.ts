import { z } from 'zod';
import {
  emailRegex,
  passwordRegex,
  usernameRegex,
} from '@/utils/regex/authRegex';

const signupSchema = z
  .object({
    username: z
      .string()
      .regex(usernameRegex, '한글 또는 영문 2자 이상 10자 이하로 작성해주세요'),
    email: z
      .string()
      .regex(emailRegex, '6~20자의 영문 숫자 @를 조합하여 작성해 주세요'),
    password: z
      .string()
      .regex(
        passwordRegex,
        '대문자,소문자,특수문자, 숫자를 포함하여 10자리 이상 20자 이하로 입력하여 주세요'
      ),
    passwordConfirm: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    path: ['passwordConfirm'],
    message: '비밀번호가 일치하지 않습니다.',
  })
  .refine((data) => data.password === data.passwordConfirm, {
    path: ['passwordConfirm'],
    message: '비밀번호가 일치하지 않습니다.',
  });

export type signupSchemaType = z.infer<typeof signupSchema>;

export default signupSchema;
