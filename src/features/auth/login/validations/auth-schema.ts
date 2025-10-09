import * as z from 'zod';

export const schema = z.object({
  email: z
    .string()
    .min(1, { message: 'Por favor, insira um email' })
    .trim()

    .transform((email) => email.toLowerCase()),
  password: z.string().min(1, { message: 'Por favor, insira sua senha' }).trim(),
});

export type AuthSchema = z.infer<typeof schema>;

// .refine((email) => email.endsWith('@-tech.com') || email.endsWith('@futuroengenharia.com'), {
//       message: 'O e-mail deve ser válido para um dos domínios permitidos.',
//     })
