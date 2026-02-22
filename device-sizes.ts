export const deviceSizes = [640, 750, 828, 1080, 1200, 1920, 2048, 3840] as const;
export const imageSizes = [16, 32, 48, 64, 96, 128, 256, 384] as const;

export type DeviceSize = (typeof deviceSizes)[number];
export type ImageSize = (typeof imageSizes)[number];
