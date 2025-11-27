interface QrGenerator {
  generate(data: string, size: number): string;
}

class QrServerGenerator implements QrGenerator {
  url: string = "https://api.qrserver.com/v1/create-qr-code/";

  generate(data: string, size: number): string {
    return `${this.url}?size=${size}x${size}&data=${encodeURIComponent(data)}`;
  }
}

export { QrServerGenerator };
