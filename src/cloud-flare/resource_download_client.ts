import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { PassThrough, Stream } from "stream";
import fs from "fs";
import path from "path";

export class ResourceDownloadClient {
  private readonly apiURL: string;
  private readonly bucket: string;
  private readonly accessKeyID: string;
  private readonly secretAccessKey: string;
  private readonly resourcePath: string;

  constructor() {
    const {
      CLOUD_FLARE_RESOURCE_DOWNLOAD_URL,
      CLOUD_FLARE_RESOURCE_BUCKET,
      CLOUD_FLARE_ACCESS_KEY_ID,
      CLOUD_FLARE_SECRET_ACCESS_KEY,
    } = process.env;

    this.apiURL = CLOUD_FLARE_RESOURCE_DOWNLOAD_URL as string;
    this.bucket = CLOUD_FLARE_RESOURCE_BUCKET as string;
    this.accessKeyID = CLOUD_FLARE_ACCESS_KEY_ID as string;
    this.secretAccessKey = CLOUD_FLARE_SECRET_ACCESS_KEY as string;
    this.resourcePath = path.join(__dirname, `../../resources`);
  }

  public async downloadAllResources(fileName: string) {
    const command = new GetObjectCommand({
      Bucket: this.bucket,
      Key: fileName,
    });

    const response = await this.getS3Client().send(command);

    this.createFile(fileName, response.Body as Stream);
  }

  private getS3Client() {
    return new S3Client({
      endpoint: this.apiURL,
      region: "auto",
      credentials: {
        accessKeyId: this.accessKeyID,
        secretAccessKey: this.secretAccessKey,
      },
    });
  }

  private createFile(fileName: string, streamData: Stream) {
    if (!fs.existsSync(this.resourcePath)) {
      fs.mkdirSync(this.resourcePath);
    }

    const fileStream = fs.createWriteStream(
      path.join(this.resourcePath, `/${fileName}`)
    );

    const passThroughStream = new PassThrough();

    streamData.pipe(passThroughStream).pipe(fileStream);

    fileStream.on("finish", () => {
      console.log("File downloaded successfully!");
    });

    fileStream.on("error", (err) => {
      console.error("Error downloading file:", err);
    });
  }
}
