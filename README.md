# wip-client
- 이게뭐약 프로젝트 서버리스 계획에 따라 애플리케이션 담당자가 참조할 수 있고록 개발한 서버리스 클라이언트

# Execution
```bash
yarn start
```

# Requirement
- .env
```bash
GOOGLE_CLOUD_RSA_PUB_KEY="구글 클라우드 플랫폼 서버리스 토큰 암호화 키"
GOOGLE_CLOUD_INIT_INFO_URL="구글 클라우드 플랫폼 init-info API URL"
GOOGLE_CLOUD_DL_SERVER_URL="구글 클라우드 플랫폼 image-search API URL"
GOOGLE_CLOUD_DRUG_DETAIL_URL="구글 클라우드 플랫폼 drug-detail API URL"

CLOUD_FLARE_RESOURCE_DOWNLOAD_URL="클라우드 플레어 리소스 스토리지 URL"
CLOUD_FLARE_RESOURCE_BUCKET="클라우드 플레어 리소스 버킷 이름"
CLOUD_FLARE_TOKEN_VALUE="클라우드 플레어 R2 토큰"
CLOUD_FLARE_ACCESS_KEY_ID="클라우드 플레어 R2 액세스 키 아이디"
CLOUD_FLARE_SECRET_ACCESS_KEY="클라우드 플레어 R2 액세스 키"
CLOUD_FLARE_WORKERS_API_URL="클라우드 플레어 서버리스 URL"
CLOUD_FLARE_WORKERS_TOKEN="클라우드 플레어 서버리스 토큰"

MAX_API_CALL_MINUTE="API를 반복적으로 호출하는 시간 (분)"
API_CALL_INTERVAL_SECOND="API 호출 간격 (초)"
```

- config.json
  - apiList에 실행할 API의 이름에서 "_" 제거 후 실행