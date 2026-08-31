export interface CustomMeasurements {
  unit: 'IN';
  bust: number;
  waist: number;
  hips: number;
  shoulder: number;
  armhole?: number;
  sleeveLength: number;
  topLength: number;
  bottomLength?: number;
  fullHeight: number;
  heightWithHeels?: number;
  neckStyle: string;
  sleeveStyle: string;
  blousePadding: boolean;
  notes?: string;
}

export const neckStyles = [
  'Sweetheart',
  'V neck',
  'Boat neck',
  'Round neck',
  'High neck',
];

export const sleeveStyles = [
  'Sleeveless',
  'Cap sleeve',
  'Elbow sleeve',
  'Full sleeve',
  'Bell sleeve',
];
