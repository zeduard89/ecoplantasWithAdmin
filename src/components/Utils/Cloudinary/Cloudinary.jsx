import { Cloudinary } from '@cloudinary/url-gen';

const cloudinaryCloudName = import.meta.env.VITE_CLOUDINNARY_CLOUD_NAME;
const cld = new Cloudinary({ cloud: { cloudName: cloudinaryCloudName } });

export const banner1 = cld.image('Ejemplo_Banner_1_owuhez');
export const banner2 = cld.image('Ejemplo_Banner_2_rxffsg');
export const banner3 = cld.image('Ejemplo_Banner_4_aitj4p');
export const banner4 = cld.image('Ejemplo_Banner_3_eevk4q');
