const dev = {
  apiGateway: {
    BASE_URL: 'http://localhost:3000',
  },
};

const prod = {
  apiGateway: {
    BASE_URL: 'http://ustcl158.kcc.com:16006',
  },
};
// Default to dev if not set
const config = process.env.NODE_ENV === 'production' ? prod : dev;

export default {
  // Add common config values here
  MAX_ATTACHMENT_SIZE: 5000000,
  ...config,
};
