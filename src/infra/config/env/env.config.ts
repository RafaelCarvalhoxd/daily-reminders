export default () => {
  const requiredEnv = (key: string): string => {
    const value = process.env[key];
    if (value === undefined) {
      throw new Error(`Environment variable ${key} is required`);
    }
    return value;
  };

  return {
    port: parseInt(process.env.PORT ?? '3000', 10),
    jwt: {
      secret: requiredEnv('JWT_SECRET'),
      expiresIn: requiredEnv('JWT_EXPIRES_IN'),
    },
    database: {
      host: requiredEnv('DATABASE_HOST'),
      port: parseInt(process.env.DATABASE_PORT ?? '5432', 10),
      username: requiredEnv('DATABASE_USERNAME'),
      password: requiredEnv('DATABASE_PASSWORD'),
      database: requiredEnv('DATABASE_NAME'),
    },
  };
};
