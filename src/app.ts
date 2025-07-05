import "dotenv/config";
import _ from "lodash";
import * as ClientService from "./google_cloud";
import { InitInfoClient } from "./google_cloud/init_info_client";
import { DLServerClient } from "./google_cloud/dl_server_client";
import { ResourceDownloadClient } from "./cloud-flare/resource_download_client";
import { DrugDetailClient } from "./google_cloud/drug_detail";
import { NoticeClient } from "./cloud-flare/notice_client";
import { MarkImageClient } from "./google_cloud/mark_image_client";
import { GeminiImageSearchClient } from "./google_cloud/gemini_image_search_client";
import config from "../config.json";
import data from "../data.json";
import {
  NearbyPharmacyClient,
  TNearbyPharmacy,
} from "./cloud-flare/nearby_pharmacy_client";

async function getInitInfo() {
  const initInfoClient = ClientService.getClient(
    "initial-info"
  ) as InitInfoClient;

  return await initInfoClient.request();
}

async function requestImageSearch(base64: string) {
  const dlServerClient = ClientService.getClient(
    "image-search"
  ) as DLServerClient;

  return await dlServerClient.request(base64);
}

async function requestImageSearchV2(base64: string) {
  const geminiImageSearchClient = ClientService.getClient(
    "image-search-v2"
  ) as GeminiImageSearchClient;

  return await geminiImageSearchClient.request(base64);
}

async function requestDrugDetail(itemSeq: string) {
  const drugDetailClient = ClientService.getClient(
    "drug-detail"
  ) as DrugDetailClient;

  return await drugDetailClient.request(itemSeq);
}

async function downloadResourceFiles() {
  const resourceDownloadClient = new ResourceDownloadClient();

  await resourceDownloadClient.downloadResource();
}

async function getNotices() {
  const noticeClient = new NoticeClient();

  return (await noticeClient.readNotices()).data;
}

async function createNotice() {
  const noticeClient = new NoticeClient();

  return (
    await noticeClient.createNotice({
      title: "wip-client-test",
      contents: "클라이언트만 되면 끝",
      mustRead: true,
    })
  ).data;
}

async function updateNotice() {
  const noticeClient = new NoticeClient();

  return (
    await noticeClient.updateNotice(3, {
      title: "wip-update-test",
      contents: "업데이트 됨",
      mustRead: true,
    })
  ).data;
}

async function deleteNotice() {
  const noticeClient = new NoticeClient();

  return (await noticeClient.deleteNotice(5)).data;
}

async function getNearbyPharmacy(
  params: Partial<
    Pick<
      TNearbyPharmacy,
      "states" | "region" | "district" | "address" | "x" | "y"
    >
  >
) {
  const nearbyPharmacyClient = ClientService.getClient(
    "nearby-pharmacy"
  ) as NearbyPharmacyClient;

  return await nearbyPharmacyClient.readNearbyPharmacies(params);
}

async function getMarkImage(page: number, limit: number, title?: string) {
  const markImageClient = ClientService.getClient(
    "mark-image"
  ) as MarkImageClient;

  return await markImageClient.request(page, limit, title);
}

async function callAPI() {
  const {
    apiList,
    markImage: { page, limit, title },
  } = config;

  if (apiList.includes("get-initial-info")) {
    console.log(await getInitInfo());
  }

  if (apiList.includes("get-image-search")) {
    console.log(await requestImageSearch(data.v1Base64));
  }

  if (apiList.includes("get-image-search-v2")) {
    console.log(await requestImageSearchV2(data.v2base64));
  }

  if (apiList.includes("get-drug-detail")) {
    console.log(await requestDrugDetail("195500005"));
  }

  if (apiList.includes("get-wip-resource")) {
    await downloadResourceFiles();
  }

  if (apiList.includes("get-notices")) {
    console.log(JSON.stringify(await getNotices()));
  }

  if (apiList.includes("post-notices")) {
    console.log(JSON.stringify(await createNotice()));
  }

  if (apiList.includes("put-notices-idx")) {
    console.log(JSON.stringify(await updateNotice()));
  }

  if (apiList.includes("delete-notices-idx")) {
    console.log(JSON.stringify(await deleteNotice()));
  }

  if (apiList.includes("get-nearby-pharmacies")) {
    const params = _.pickBy(
      config.nearbyPharmacy,
      (value) => !_.isNil(value) && value !== ""
    );

    console.log(JSON.stringify(await getNearbyPharmacy(params)));
  }

  if (apiList.includes("mark-image")) {
    console.log(JSON.stringify(await getMarkImage(page, limit, title)));
  }
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  const started = new Date();

  const maxExecuteSeconds =
    parseInt(process.env.MAX_API_CALL_MINUTE as string, 10) * 1000 * 60; // min

  const interval =
    parseInt(process.env.API_CALL_INTERVAL_SECOND as string, 10) * 1000; // sec

  let executeSeconds = 0;

  const { apiList } = config;

  if (!apiList.some((v) => !/^_/.test(v))) {
    console.log(
      '[CALL-API] No API list. check config.json. delete "_" at apiList element'
    );
    return;
  }

  while (executeSeconds <= maxExecuteSeconds) {
    try {
      await callAPI();
      console.log(
        "[MAIN] execute %s seconds...",
        Math.floor(executeSeconds / 1000)
      );
    } catch (e) {
      console.log("[MAIN] error. %s", (e as Error).stack);
    } finally {
      executeSeconds = new Date().getTime() - started.getTime();
      await delay(interval);
    }
  }
}

main();
