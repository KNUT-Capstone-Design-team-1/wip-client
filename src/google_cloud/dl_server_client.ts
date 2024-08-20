import { GoogleAuthInstance } from "./auth";
import { IClient } from "../client.interface";

type TDLServerResponse = {
  success: boolean;
  data?: Array<{ ITEM_SEQ: string }>;
  message?: string;
};

export class DLServerClient extends GoogleAuthInstance implements IClient<TDLServerResponse>  {
  private readonly serviceUrl: string;

  constructor() {
    super();
    this.serviceUrl = process.env.DL_SERVER_URL as string;
  }

  public async request(base64: string) {
    const client = await this.getInstance().getIdTokenClient(this.serviceUrl);

    const result = await client.request<TDLServerResponse>({
      url: this.serviceUrl,
      method: "POST",
      data: { base64 },
      headers: { "Content-Type": "application/json" },
    });

    return result.data;
  }
}
