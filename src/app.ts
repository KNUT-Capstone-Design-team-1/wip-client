import "dotenv/config";
import * as ClientService from "./google_cloud";
import { InitInfoClient } from "./google_cloud/init_info_client";
import { DLServerClient } from "./google_cloud/dl_server_client";
import { ResourceDownloadClient } from "./cloud-flare/resource_download_client";
import { DrugDetailClient } from "./google_cloud/drug_detail";

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

async function callAPI() {
  // 애플리케이션 초기화 정보
  console.log(await getInitInfo());

  // 딥러닝 서버 요청
  const base64 =
    "/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxAPDw4NDhAQDxANDw8PDg8PDg8NDQ4PFREWFhURExMYHSggGBolGxMVLTEhJSkrLi8uFx8zOzMsNyg5LisBCgoKDg0OFRAQFS0dHR0vLS0tLS0tLS0tLS0tKy0rKy0tLSstKy0tKystLS0rKy0rLSstLSstLSsrLS0tLS04K//AABEIALkBEAMBEQACEQEDEQH/xAAcAAEAAgMBAQEAAAAAAAAAAAAAAQIDBAYFBwj/xAA+EAEAAgADBAYGBQsFAAAAAAAAAQIDBBEGEjFRBRMhQVKRBxQWYaHRInGBorIVI0JDU2JzkrHB4SQyM4Lx/8QAGgEBAQADAQEAAAAAAAAAAAAAAAECAwQFBv/EAC8RAQABAwIEBAUDBQAAAAAAAAABAhESAwQTITFRBRRhcRUyUqHBIkGxIyRCgdH/2gAMAwEAAhEDEQA/APuIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIm0c4BHWRzjzEujrI5wWLnW15rYujrq8/6li519ef8AUsXafSHTWXy8VtjYkUi06V7LTrP2Qwqqinq36O31NaZjTi9mj7YZD9vH8mJ8mHGo7uj4bufo/gnbDI/tvuYnyONR3Ph25+j7wtTa3JTOkY3H9y/yONR3T4duPo+8LYm1WTrbcnF0mO6aX+RxqO5Hh24mLxT94I2qyf7X7l/kcajufDtx9P3heu0uUn9bp9dLxHnocajuk7DcR/j/AA9DK5zDxY1wr1vH7sxM/bDZFUT0c1elXRyqizOrAAAAAAAAAAAAAAAAABTExIrGszoDRxc3NuHZHxVFIuJZbfLpZHWF1sicRSyN8LG+K+f+k3MfTy1OVcS0/bMR/aXHuesPo/A6f06lXs4qMZzWe9ZemYLJNLNTNadsTw7VtLHFnz3Sl8a/W3nev3z2RvRpoTeerHT0qaKcYjkpHSVo/wDUtLPhw28HaG8VnDmYmkzEzXnp7zm1ztqZnK3N0nQXTGTxJiMSbZfE7N3FpOmk+9soqj93n7vb69POi1UdpdlgdJXwZpXHtGJhYmnVZinCdeEWh0xXMdecd3h1benUvOnFqo60/wDHt1nWNY4TwbnCkAAAAAAAAAAAAAAEXtpEzPCO0HiZnMze0z3d0coBjrcG3uqis198gREe8FtKqImIBTUHz7b+2uYw4010wY7teNrfJx7j5n0nhHLSq9/w5jq6+GPKGh695WikcdI8oEvLPWsco8oVLp6qvfWP5Y+QtzqK91Y/lFylq4vReDa02vW29MdmlorWPs0YzLbTq1Ryh5mLh1wb2iu9McO22ug3RM1Q3I6ax6UruYtpin+2s3ndiJntrpw0n4SXlr8vp1Vc6ecvqno82ljN4XV2n6VeyInjE8nToal/0y+X8W2XBqzjpLtHS8YAAAAAAAAAAAAABo9LYulIrH6U/AHjaikXEZ5zQinrQqs5tUPWxUetFyyJzIsQ+YekbpW1M3SIjX8xWeP793Fr1WqfU+EacToTPr+Icp+XL8o85acoepw4THTs99df+2i5Qk0R3XjaCfB9/wDwuUJw47k7QW7qfekyheH6o9oMTwx5yxyheHC35et4fiXhY0/Vo4+ctiTMz2a9ukcFiqG6nkpXGnTTVJmG2JdX6OukJws3ExPHd15TpqmnVziXB4npxqaMw/QNZ1iJjv7XpvhEgAAAAAAAAAAAAA8npqe2v1SDyZujJTfBE3EVm4tlZupZG+IjrAJuMofKvSZP+sp/Ap+O7h3HzPqfCJ/t59/xDkdWh6d0aqxuahc1RbpFWhGUJ1FuvSJmdIjVecsol1OyuVmmLW9uMzGkcmVMWc261L0TD9CZL/iw9fBT8MPSjpD4av5p92ZWIAAAAAAAAAAAADzOm6dlbcuwHhWlGSiCllFJC6FLoABOvvFh809I+Xm2aw51/UV/HZya8XqfSeE1W0Zj1cn6nPNpxeplB6nPMwTKCMnPP4SuBlC3qM80wXKD1KeaYsoqhPqc8zCGUVQzYWTjv7ViIgmtvZfBiOEKwmp1Gy+TnEx8Ksd9oj4rTF5cW61Ip05l9wpXSIiOEREO98gsAAAAAAAAAAAAADFmsHfpNefD6wcrj0mszWeMSisEyLdS0iKTIImyqjeBG8BFhXBekKPz+DPPDmPK3+XNrfND3vC5/RVHq5XearPUubykp3gTF0sq0WLMl6ot2WtRLtvLYWswjGan1P0d9CTWPWrxp3YevfPfLfo0fvLwfEtzf+nH+3eOl44AAAAAAAAAAAAAADyOncCunWcJjj7wc9vRPBFUuDFKqrNgV3gN8VMXUcX6Qo7cvf8AiV/DLn1o6Pa8Ln5o9nHb8NL1kb8c1EdZAqeshFTGLAyZKYkc0VvZX6UxEds8kYVVWfQ9jtjrYs1xcx9DDjt3f07/AGd0NlGnl1eRu9/hGNHV9QwsOKVilYitaxEREdkRDriLPCmZmbyuIAAAAAAAAAAAAAAA8np7Btan0QcLm6YlJnTWGE3ZxZo4vSeNX3/XCZSytDTxemsaP0Y+JlJjDWv07j+GPiuUrjDDbp/MeGvxMpMYU9oMx4K/Eykxg9oMz4K/EylcYePtDn8fMUitqxG7beiY146af3YV83ZttThzeHL2wcflPxYWehG5qR1GNyn4pZl5io9WxuUll8xUn1XH8M+Rb1ZeYq7rRlMflPklvVfMVd2zl+j8aZ7Yn4lidzPd2Oy2StS9Z3e3nprJZya2tNUc5fZtnotuxq30PI1XtNjQAAAAAAAAAAAAAAAAiY14g0c10Xh4nGIB5ePsvh24FoW7TxNj6zyS0F2GdjK+5bQXlT2KrygsZJjYqvKC0Lkt7F05QWhcmPE2IpPdHkxmlsp1LMXsJh+GPJMG2NdauwuH4Y8kwXzDJXYbD8MeS4L5laNiMLwx5QYHmVo2IwvDHlCYJ5llpsZhR3R5GCTuXo5LZrCw510jyWKWqrXmXt4WFFY0iNGbTM3XEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf/Z";
  console.log(await requestImageSearch(base64));

  // 알약 상세 정보 조회
  console.log(await requestDrugDetail("195500005"));

  // 리소스 다운로드
  await downloadResourceFiles();
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  const started = new Date();

  const maxExecuteSeconds =
    parseInt(process.env.MAX_API_CALL_MINUTE as string, 10) * 60; // min to sec

  const interval = parseInt(process.env.API_CALL_INTERVAL_SECOND as string, 10);

  let executeSeconds = 0;

  while (executeSeconds <= maxExecuteSeconds) {
    try {
      await callAPI();
      await delay(interval);
    } catch (e) {
      console.log("[ERROR] %s", (e as Error).message);
    } finally {
      console.log("[INFO] execute %s seconds...", executeSeconds);
      executeSeconds = (new Date().getTime() - started.getTime()) / 1000;
    }
  }
}

main();
