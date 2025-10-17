export default ({ env }) => [
  'strapi::logger',
  'strapi::errors',
  'strapi::security',
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  {
    name: 'strapi::session',
    config: {
      cookie: {
        secure: env('NODE_ENV') === 'production',
        sameSite: env('NODE_ENV') === 'production' ? 'none' : 'lax',
      },
    },
  },
  'strapi::favicon',
  'strapi::public',
];
