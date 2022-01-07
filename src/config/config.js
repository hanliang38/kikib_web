export const configs = {
  database: process.env.DATABASE || 'localhost',
  kiki_dp_api:
    process.env.KIKI_DP_API ||
    process.env.KIKI_DEV_API ||
    process.env.KIKI_AZURE_API,
  username: process.env.USERNAME || 'root',
};
