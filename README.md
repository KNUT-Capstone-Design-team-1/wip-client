# wip-client

- 이게뭐약 프로젝트 서버리스 계획에 따라 애플리케이션 담당자가 참조할 수 있고록 개발한 서버리스 클라이언트

# Execution

```bash
yarn start
```

# Requirement

- /env/config.json

```json
{
  "resource": {
    "aesKey": "",
    "aesIv": ""
  },
  "googleCloud": {
    "initInfoURL": "",
    "deeplearningServerURL": ""
  },
  "cloudflare": {
    "resourceDownloadURL": "",
    "resourceBucket": "",
    "tokenValue": "",
    "accessKeyID": "",
    "secretAccessKey": ""
  }
}
```

- /env/google_cloud_service_key.json

```json
{
  "type": "",
  "project_id": "",
  "private_key_id": "",
  "private_key": "",
  "client_email": "",
  "client_id": "",
  "auth_uri": "",
  "token_uri": "",
  "auth_provider_x509_cert_url": "",
  "client_x509_cert_url": "",
  "universe_domain": ""
}
```
