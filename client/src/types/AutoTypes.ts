import type { z } from 'zod';
import type { AutoSchema } from '../utils/validators';


export type AutoType = z.infer<typeof AutoSchema>;

export type AutoDataType = Omit<AutoType, 'id'>;

export type ApiResponce = AutoType[];

export type EditAutoType = {
    id: number;
    data: AutoDataType;
};