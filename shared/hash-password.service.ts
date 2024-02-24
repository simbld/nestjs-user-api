import { Injectable } from "@nestjs/common";
import * as crypto from "crypto";
import "dotenv";

@Injectable()
export class HashPasswordService {
  hash(password: string): string {
    return crypto
      .createHmac("sha256", process.env.PASSWORD_SALT || "default_salt")
      .update(password)
      .digest("hex");
  }
}
