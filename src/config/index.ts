import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.join(process.cwd(), ".env"),
});

const config = {
  port: process.env.PORT || 3000,
  connection_String: process.env.CONNECTION_STRING as string,
  secretKey: process.env.JWT_SECRET_KEY,
};

export default config;
