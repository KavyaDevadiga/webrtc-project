export class Database {
  private static instance: Database;
  protected constructor() {}
  public static async getConnection(): Promise<Database> {
    if (!this.instance) {
      this.instance = new this();
      await this.instance.connect();
    }
    return this.instance;
  }
  protected async connect() {}
}
