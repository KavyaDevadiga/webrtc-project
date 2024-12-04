import { RedisConnection } from "@src/database";
import { TimeConversionUtils } from "@src/utils";
import fs from "fs";
import jwt from "jsonwebtoken";
import path from "path";

export class TokenService {
  private privateKey: string;
  private redisClient: any;

  constructor() {
    const privateKeyPath = path.resolve(__dirname, "../keys/private.key");
    this.privateKey = fs.readFileSync(privateKeyPath, "utf8");
    this.initializeRedisClient();
  }

  private async initializeRedisClient(): Promise<void> {
    const redisConnection = await RedisConnection.getInstance();
    this.redisClient = redisConnection.getRedisClient();
  }

  // Generates and stores JWT token for the user in Redis
  public async generateAndStoreToken(
    payload: { userId: string },
    expiresInHours = TimeConversionUtils.daysToHours(7)
  ): Promise<string> {
    const { userId } = payload;
    const token = this.generateToken(payload, `${expiresInHours}h`);

    const expiryTimeInSeconds =
      TimeConversionUtils.hoursToSeconds(expiresInHours);

    try {
      await this.redisClient.set(`auth_token:${userId}`, token, {
        EX: expiryTimeInSeconds,
      });
    } catch (error) {
      throw new Error(`Error storing JWT token in Redis: ${error}`);
    }

    return token;
  }

  private generateToken(payload: object, expiresIn: string): string {
    try {
      return jwt.sign(payload, this.privateKey, {
        algorithm: "RS256",
        expiresIn,
      });
    } catch (error) {
      throw new Error(`Error generating JWT token: ${error}`);
    }
  }
  public generateRefreshToken(payload: object, expiresIn = "70d"): string {
    return this.generateToken(payload, expiresIn);
  }
}
