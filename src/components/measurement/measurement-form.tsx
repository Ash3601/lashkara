'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { z } from 'zod';
import { neckStyles, sleeveStyles } from '@/domain/measurement';
import { measurementSchema } from '@/lib/validation';
import { Button } from '@/components/common/button';

type MeasurementInput = z.input<typeof measurementSchema>;
type MeasurementValues = z.output<typeof measurementSchema>;

const numericFields: Array<[keyof MeasurementInput, string]> = [
  ['bust', 'Bust'],
  ['waist', 'Waist'],
  ['hips', 'Hips'],
  ['shoulder', 'Shoulder'],
  ['armhole', 'Armhole'],
  ['sleeveLength', 'Sleeve length'],
  ['topLength', 'Blouse/top length'],
  ['bottomLength', 'Bottom length'],
  ['fullHeight', 'Full height'],
  ['heightWithHeels', 'Height with heels'],
];

export function MeasurementForm({
  onSubmit,
}: {
  onSubmit: (values: MeasurementValues) => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MeasurementInput>({
    resolver: zodResolver(measurementSchema),
    defaultValues: {
      unit: 'IN',
      neckStyle: '',
      sleeveStyle: '',
      blousePadding: true,
    },
  });

  return (
    <form onSubmit={handleSubmit((values) => onSubmit(measurementSchema.parse(values)))} className="rounded-md border border-stone-200 p-4">
      <div className="grid gap-4 sm:grid-cols-2">
        {numericFields.map(([name, label]) => (
          <label key={name} className="grid gap-1 text-sm">
            <span className="font-medium">{label} {['armhole', 'bottomLength', 'heightWithHeels'].includes(name) ? '' : '*'}</span>
            <input
              type="number"
              step="0.25"
              className="input"
              {...register(name)}
            />
            {errors[name] ? (
              <span className="text-xs text-rose-700">{String(errors[name]?.message)}</span>
            ) : null}
          </label>
        ))}
        <label className="grid gap-1 text-sm">
          <span className="font-medium">Neck style *</span>
          <select className="input" {...register('neckStyle')}>
            <option value="">Select</option>
            {neckStyles.map((style) => (
              <option key={style}>{style}</option>
            ))}
          </select>
          {errors.neckStyle ? (
            <span className="text-xs text-rose-700">{errors.neckStyle.message}</span>
          ) : null}
        </label>
        <label className="grid gap-1 text-sm">
          <span className="font-medium">Sleeve style *</span>
          <select className="input" {...register('sleeveStyle')}>
            <option value="">Select</option>
            {sleeveStyles.map((style) => (
              <option key={style}>{style}</option>
            ))}
          </select>
          {errors.sleeveStyle ? (
            <span className="text-xs text-rose-700">{errors.sleeveStyle.message}</span>
          ) : null}
        </label>
      </div>
      <label className="mt-4 flex items-center gap-2 text-sm">
        <input type="checkbox" {...register('blousePadding')} />
        Blouse padding
      </label>
      <label className="mt-4 grid gap-1 text-sm">
        <span className="font-medium">Additional tailoring notes</span>
        <textarea className="input min-h-24" maxLength={500} {...register('notes')} />
        {errors.notes ? <span className="text-xs text-rose-700">{errors.notes.message}</span> : null}
      </label>
      <Button className="mt-4 w-full" type="submit">Use these measurements</Button>
    </form>
  );
}
