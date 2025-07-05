import axios, { Axios } from "axios";

type TNotice = {
  title: string;
  contents: string;
  mustRead: boolean;
  createDate: string;
  updateDate: string;
};

type TNoticeList = Array<{
  success: boolean;
  meta: {
    served_by: string;
    duration: number;
    changes: number;
    last_row_id: number;
    changed_db: boolean;
    size_after: number;
    rows_read: number;
    rows_written: number;
  };
  results: Array<TNotice>;
}>;

export class NoticeClient {
  private readonly apiURL: string;
  private readonly token: string;
  private readonly axiosClient: Axios;

  constructor() {
    const { CLOUD_FLARE_WORKERS_NOTICES_API_URL, CLOUD_FLARE_WORKERS_TOKEN } =
      process.env;

    this.apiURL = CLOUD_FLARE_WORKERS_NOTICES_API_URL as string;
    this.token = CLOUD_FLARE_WORKERS_TOKEN as string;
    this.axiosClient = axios.create({
      baseURL: this.apiURL,
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });
  }

  public async createNotice(
    payload: Pick<TNotice, "title" | "contents" | "mustRead">
  ) {
    return this.axiosClient.post<"Created">(`/notices`, payload, {
      headers: { "Content-Type": "application/json" },
    });
  }

  public async readNotices(skip?: number, limit?: number, mustRead?: boolean) {
    return this.axiosClient.get<TNoticeList>(`/notices`, {
      params: { skip, limit, mustRead },
    });
  }

  public async updateNotice(
    idx: number,
    payload: Pick<TNotice, "title" | "contents" | "mustRead">
  ) {
    return this.axiosClient.put<"Success">(`/notices/${idx}`, payload, {
      headers: { "Content-Type": "application/json" },
    });
  }

  public async deleteNotice(idx: number) {
    return this.axiosClient.delete<"Success">(`/notices/${idx}`);
  }
}
