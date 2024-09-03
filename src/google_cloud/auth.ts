import { GoogleAuth } from "google-auth-library";
import { JSONClient } from "google-auth-library/build/src/auth/googleauth";
import path from "path";

export class GoogleAuthInstance {
  private readonly googleAuth: GoogleAuth<JSONClient>;

  constructor() {
    this.googleAuth = new GoogleAuth({
      keyFilename: path.join(__dirname, "../../google_cloud_service_key.json"),
    });
  }

  public getInstance() {
    return this.googleAuth;
  }
}
