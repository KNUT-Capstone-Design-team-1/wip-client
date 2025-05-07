import axios from "axios";
import { IClient } from "../client.interface";
import { GoogleAuthInstance } from "./auth";

type TMarkImageData = {
  total: number; // 마크이미지 총 개수
  totalPage: number; // 총 페이지
  page: number; // 현재 페이지
  limit: number; // 현재 페이지당 개수
  data: { code: string; base64: string }[]; // 데이터
};

export class MarkImageClient
  extends GoogleAuthInstance
  implements IClient<TMarkImageData>
{
  private readonly serviceUrl: string;

  constructor() {
    super();
    this.serviceUrl = process.env.GOOGLE_CLOUD_MARK_IMAGE_URL as string;
  }

  public async request(page: number, limit: number, title?: string) {
    const result = await axios.get<TMarkImageData>(this.serviceUrl, {
      params: {
        page,
        limit,
        title,
      },
      headers: { Authorization: `Bearer ${this.token}` },
    });

    return result.data;
  }
}
