require('dotenv').config();

export const configs = {
  weather_api: process.env.WEATHER_API,
  google_api: process.env.GOOGLE_API,
  kiki_api:
    process.env.KIKI_DP_API ||
    process.env.KIKI_DEV_API ||
    process.env.KIKI_AZURE_API,
};
