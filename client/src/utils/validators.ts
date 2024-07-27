import {  z } from 'zod';

export const AutoSchema = z.object({
    id: z.number(),
    userId: z.number().nullable().optional(), 
    modelCar: z.string(),
    yearCar: z.string(),
    mileage: z.string(),
    cost: z.string(),
    description: z.string(),
    image: z.string(),
  });

  export const AutosSchema = z.array(AutoSchema);
