import { z } from 'zod';

export const createAddWorkplaceForm = z.object({
  name: z.string().min(1, 'The title is required').max(255),
  city: z.string().min(1, 'The description is required'),
});
