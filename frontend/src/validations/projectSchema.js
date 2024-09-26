import { z } from 'zod';

// Definer et skjema for prosjektdata
export const projectSchema = z.object({
  id: z.string(),
  title: z.string().min(1, 'Tittelen må ha minst 1 karakter.'),
  description: z.string().optional(),
  createdAt: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: 'Ugyldig dato.',
  }),
  category: z.string().optional(),
});
