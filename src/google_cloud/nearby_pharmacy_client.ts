import axios from "axios";
import { IClient } from "../client.interface";
import { GoogleAuthInstance } from "./auth";

type TPharmacyList = {
  dutyAddr: string; // 주소
  dutyName: string; // 이름
  dutyTel1: string; // 전화번호
  dutyTime1c: number; // 월요일 영업 종료 시간
  dutyTime1s: string; // 월요일 영업 시작 시간
  dutyTime2c: number; // 화요일 영업 종료 시간
  dutyTime2s: string; // 화요일 영업 시작 시간
  dutyTime3c: number; // 수요일 영업 종료 시간
  dutyTime3s: string; // 수요일 영업 시작 시간
  dutyTime4c: number; // 목요일 영업 종료 시간
  dutyTime4s: string; // 목요일 영업 시작 시간
  dutyTime5c: number; // 금요일 영업 종료 시간
  dutyTime5s: string; // 금요일 영업 종료 시간
  dutyTime6c: number; // 토요일 영업 종료 시간
  dutyTime6s: string; // 토요일 영업 시작 시간
  dutyTime7c: number; // 일요일 영업 종료 시간
  dutyTime7s: string; // 일요일 영업 시작 시간
  dutyTime8c: number; // 공휴일 영업 종료 시간
  dutyTime8s: string; // 공휴일 영업 시작 시간
  hpid: string; // ID
  postCdn1: number; // 우편번호 앞자리
  postCdn2: string; // 우편번호 뒷자리
  rnum: number; // 일련번호
  wgs84Lat: number; // 위도
  wgs84Lon: number; // 경도
};

type TNearbyPharmacyResponseHeader = {
  resultCode: string; // 결과 코드. 00 성공
  resultMsg: string; // 결과 메시지. NORMAL SERVICE. 성공
};

type TNearbyPharmacyResponseBody = {
  items: { item: Array<TPharmacyList> }; // 약국 정보 목록
  numOfRows: string; // 페이지당 행 개수
  pageNo: number; // 페이지 번호
  totalCount: number; // 조건에 해당하는 행 개수
};

type TNearbyPharmacyData = {
  header: TNearbyPharmacyResponseHeader,
  body: TNearbyPharmacyResponseBody,
}

export class NearbyPharmacyClient
  extends GoogleAuthInstance
  implements IClient<Array<TNearbyPharmacyData>>
{
  private readonly serviceUrl: string;

  constructor() {
    super();
    this.serviceUrl = process.env.GOOGLE_CLOUD_NEARBY_PHARMACY_URL as string;
  }

  public async request() {
    const result = await axios.get<Array<TNearbyPharmacyData>>(
      this.serviceUrl,
      {
        params: {
          pageNo: 1, // 페이지 번호
          numOfRows: 5, // 페이지당 행 개수
          Q0: "경기도", // 도/시 (경기도/서울특별시)
          Q1: "성남시", // 시/군/구 (성남시/강서구)
          // QT: 1, // 진료 요일 (1~8, 월(1)~일(7) + 공휴일(8))
          // QN: "삼성 약국", // 약국 이름
        },
        headers: { Authorization: `Bearer ${this.token}` },
      }
    );

    return result.data;
  }
}
