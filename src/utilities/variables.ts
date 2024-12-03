import dotenv from 'dotenv';
dotenv.config();

// Added by Payload
export const POSTGRES_URL = process.env.POSTGRES_URL;
export const PAYLOAD_SECRET = process.env.PAYLOAD_SECRET;

// Payload Configuration
export const PAYLOAD_PUBLIC_SERVER_URL = process.env.PAYLOAD_PUBLIC_SERVER_URL;
export const PAYLOAD_PORT = process.env.PAYLOAD_PORT;

// Amazon S3
export const S3 = {
    REGION: process.env.S3_REGION,
    ACCESS_KEY_ID: process.env.S3_ACCESS_KEY_ID,
    SECRET_ACCESS_KEY: process.env.S3_SECRET_ACCESS_KEY,
    BUCKET: process.env.S3_BUCKET,
    ENDPOINT: process.env.S3_ENDPOINT,
};

// SMTP Configuration
export const SMTP = { 
    HOST: process.env.SMTP_HOST,
    PORT: process.env.SMTP_PORT,
    USER: process.env.SMTP_USER,
    PASS: process.env.SMTP_PASS,
};