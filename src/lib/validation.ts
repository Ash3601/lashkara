import { z } from 'zod';

const inches = (label: string, min: number, max: number) =>
  z.coerce
    .number({ error: `${label} is required` })
    .positive(`${label} must be greater than zero`)
    .min(min, `${label} looks too small`)
    .max(max, `${label} looks too large`);

const optionalInches = (min: number, max: number) =>
  z.preprocess(
    (value) => (value === '' || value === undefined || value === null ? undefined : value),
    z.coerce.number().min(min).max(max).optional(),
  );

export const measurementSchema = z.object({
  unit: z.literal('IN').default('IN'),
  bust: inches('Bust', 20, 70),
  waist: inches('Waist', 18, 65),
  hips: inches('Hips', 20, 75),
  shoulder: inches('Shoulder', 10, 28),
  armhole: optionalInches(6, 28),
  sleeveLength: inches('Sleeve length', 2, 34),
  topLength: inches('Blouse/top length', 8, 45),
  bottomLength: optionalInches(10, 55),
  fullHeight: inches('Full height', 48, 84),
  heightWithHeels: optionalInches(48, 90),
  neckStyle: z.string().min(1, 'Choose a neck style'),
  sleeveStyle: z.string().min(1, 'Choose a sleeve style'),
  blousePadding: z.coerce.boolean(),
  notes: z.string().max(500, 'Notes must be under 500 characters').optional(),
});

export const checkoutSchema = z.object({
  fullName: z.string().min(2, 'Enter full name'),
  email: z.string().email('Enter a valid email'),
  mobile: z.string().min(10, 'Enter mobile number'),
  address1: z.string().min(4, 'Enter address'),
  address2: z.string().optional(),
  city: z.string().min(2, 'Enter city'),
  state: z.string().min(2, 'Enter state'),
  pinCode: z.string().regex(/^[1-9][0-9]{5}$/, 'Enter a valid PIN code'),
  paymentMethod: z.enum(['UPI', 'CARD', 'COD']),
});
