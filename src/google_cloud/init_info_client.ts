import { GoogleAuthInstance } from "./auth";
import { IClient } from "../client.interface";
import config from "../../env/config.json";

type TInitInfoResponse = { appVersion: string; resourceDate: string };

export class InitInfoClient
  extends GoogleAuthInstance
  implements IClient<TInitInfoResponse>
{
  private readonly serviceUrl: string;

  constructor() {
    super();
    this.serviceUrl = config.googleCloud.initInfoURL;
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
