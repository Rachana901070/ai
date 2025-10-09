declare namespace NodeJS {
  interface ProcessEnv {
    PORT?: string;
    MONGO_URI?: string;
    JWT_SECRET?: string;
    CLIENT_ORIGIN?: string;
    SMTP_HOST?: string;
    SMTP_USER?: string;
    SMTP_PASS?: string;
  }
}
