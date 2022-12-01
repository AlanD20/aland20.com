const config = {
  host: `http://localhost:3000`,
  allowedOrigins: ['localhost:3000', 'http://localhost:3000'],
  api: {
    contact: () => `${config.host}/api/contact`,
    sessions: {
      user: (token: string) => `${config.host}/api/sessions/users/${token}`,
    },
    admin: {
      all: (model: string) => `${config.host}/api/admin/${model}`,
      show: (model: string, id) => `${config.host}/api/admin/${model}/${id}`,
      store: (model: string) => `${config.host}/api/admin/${model}/store`,
      update: (model: string, id) => `${config.host}/api/admin/${model}/${id}`,
      destroy: (model: string, id) => `${config.host}/api/admin/${model}/${id}`,
      export: () => `${config.host}/api/admin/export`,
    },
  },
};

export default config;
