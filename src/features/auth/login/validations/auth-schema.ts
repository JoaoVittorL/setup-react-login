import * as z from 'zod';

export const schema = z.object({
  email: z
    .string()
    .min(1, { message: 'Por favor, insira um email' })
    .trim()
    .refine((email) => email.endsWith('@ecoeletrica.com.br'), {
      message: 'O e-mail deve ser válido para um dos domínios permitidos.',
    })
    .transform((email) => email.toLowerCase()),
  password: z.string().min(1, { message: 'Por favor, insira sua senha' }).trim(),
});

export type AuthSchema = z.infer<typeof schema>;
