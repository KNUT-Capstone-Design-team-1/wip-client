import { DLServerClient } from "./dl_server_client";
import { DrugDetailClient } from "./drug_detail";
import { InitInfoClient } from "./init_info_client";

type TClientType = "initial-info" | "image-search" | "drug-detail";

export function getClient(clientType: TClientType) {
  switch (clientType) {
    case "initial-info":
      return new InitInfoClient();

    case "image-search":
      return new DLServerClient();

    case "drug-detail":
      return new DrugDetailClient();

    default:
      throw new Error(`invalid client type ${clientType}`);
  }
}
