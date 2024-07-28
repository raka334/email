import * as dotenv from "dotenv";
import path = require("path");

dotenv.config({ path: path.resolve(__dirname, "../.env") });

export type ConfigProps = {
    MAIL_FROM_EMAIL: string;
    RESEND_API_TOKEN: string;
};

export const getConfig = (): ConfigProps => ({
    MAIL_FROM_EMAIL: process.env.MAIL_FROM_EMAIL || "",
   RESEND_API_TOKEN: process.env.MAIL_FROM_NAME || "",
});