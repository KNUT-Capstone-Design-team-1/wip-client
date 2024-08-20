import { GoogleAuthInstance } from "./auth";
import { IClient } from "../client.interface";

type TInitInfoResponse = { appVersion: string; resourceDate: string };

export class InitInfoClient
  extends GoogleAuthInstance
  implements IClient<TInitInfoResponse>
{
  private readonly serviceUrl: string;

  constructor() {
    super();
    this.serviceUrl = process.env.INIT_INFO_URL as string;
  }

  public async request() {
    const client = await this.getInstance().getIdTokenClient(this.serviceUrl);

    const result = await client.request<TInitInfoResponse>({
      url: this.serviceUrl,
      method: "GET",
    });

    return result.data;
  }
}

export function getGoogleCloudAPIClient() {}
