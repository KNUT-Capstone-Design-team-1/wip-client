# wip-client

- 이게뭐약 프로젝트 서버리스 계획에 따라 애플리케이션 담당자가 참조할 수 있고록 개발한 서버리스 클라이언트

# Requirement

- .env

```bash
GOOGLE_CLOUD_RSA_PUB_KEY="구글 클라우드 플랫폼 서버리스 토큰 암호화 키"
GOOGLE_CLOUD_INIT_INFO_URL="구글 클라우드 플랫폼 init-info API URL"
GOOGLE_CLOUD_DL_SERVER_URL="구글 클라우드 플랫폼 image-search API URL"
GOOGLE_CLOUD_DRUG_DETAIL_URL="구글 클라우드 플랫폼 drug-detail API URL"
GOOGLE_CLOUD_NEARBY_PHARMACY_URL="구글 클라우드 플랫폼 nearby-pharmacy API URL"
GOOGLE_CLOUD_MARK_IMAGE_URL="구글 클라우드 플랫폼 mark-image API URL"

CLOUD_FLARE_RESOURCE_DOWNLOAD_URL="클라우드 플레어 리소스 스토리지 URL"
CLOUD_FLARE_RESOURCE_BUCKET="클라우드 플레어 리소스 버킷 이름"
CLOUD_FLARE_TOKEN_VALUE="클라우드 플레어 R2 토큰"
CLOUD_FLARE_ACCESS_KEY_ID="클라우드 플레어 R2 액세스 키 아이디"
CLOUD_FLARE_SECRET_ACCESS_KEY="클라우드 플레어 R2 액세스 키"
CLOUD_FLARE_WORKERS_TOKEN="클라우드 플레어 서버리스 토큰"
CLOUD_FLARE_WORKERS_NOTICES_API_URL="클라우드 플레어 공지사항 API URL"
CLOUD_FLARE_WORKERS_NEARBY_PHARMACIES_API_URL="클라우드 플레어 주변약국 API URL"

MAX_API_CALL_MINUTE="API를 반복적으로 호출하는 시간 (분)"
API_CALL_INTERVAL_SECOND="API 호출 간격 (초)"
```

- config.json
  - apiList에 실행할 API의 이름에서 "\_" 제거 후 실행

# Execution

1. `.env` 구성
2. `config.json` 파일 수정

- apiList에서 실행할 API의 `_` 문자 제거

```json
{
  // API 목록
  "apiList": [
    "_get-initial-info", // 초기화 정보
    "_get-image-search", // 이미지 검색 v1 (구 파이썬 서버)
    "_get-image-search-v2", // 이미지 검색 v2 (신 제미나이 서버)
    "_get-drug-detail", // 알약 상세 정보
    "_get-wip-resource", // 알약 정보 데이터 베이스 리소스 다운로드
    "_get-notices", // 공지사항 조회
    "_post-notices", // 공지사항 등록
    "_put-notices-idx", // 공지사항 수정
    "_delete-notices-idx", // 공지사항 삭제
    "_get-nearby-pharmacies", // 주변 약국
    "_mark-image" // 마크 이미지
  ],
  "markImage": {
    "page": 1, // 마크 이미지 검색 시 페이지 (최소 1)
    "limit": 9, // 마크 이미지 검색 시 limit (최대 50)
    "title": "" // 마크이미지 검색 시 제목
  },
  "nearbyPharmacy": {
    "x": 127.1282197, // 주변 약국 x축 (경도)
    "y": 37.4105955, // 주변 약국 y축 (위도)
    "states": "", // 주변 약국 시도 코드명 (ex) 서울 / 경기 / 세종시 ...
    "region": "", // 주변 약국 시군구코드명 (ex) 고양덕양구 / 남양주시 ...
    "district": "", // 주변 약국 읍면동 (ex) 동산동 / 오남읍 / 당산동6가 ...
    "address": "" // 주변 약국 주소 (ex) 세종특별자치시 마음로 78, 세종 스마트큐브Ⅱ 2층 205호 (고운동)
  }
}
```

3. 실행

```bash
yarn start
```
