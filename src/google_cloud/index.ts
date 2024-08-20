import { DLServerClient } from "./dl_server_client";
import { InitInfoClient } from "./init_info_client";

type TClientType = "init-info" | "dl-server-recognition";

export function getClient(clientType: TClientType) {
  switch (clientType) {
    case "init-info":
      return new InitInfoClient();

    case "dl-server-recognition":
      return new DLServerClient();

    default:
      throw new Error(`invalid client type ${clientType}`);
  }
}
