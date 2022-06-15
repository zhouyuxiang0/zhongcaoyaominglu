import { Injectable } from '@nestjs/common';
import { cpus } from 'os';
import { connect, launch } from 'puppeteer';

export enum BrowserWsEndPointsStatus {
  free,
  process,
}

@Injectable()
export class PostimgService {
  constructor() {
    const num = cpus().length;
    const p = [];
    for (let i = 0; i < num; i++) {
      p.push(
        launch({
          headless: true,
          args: [
            '–disable-gpu',
            '–disable-dev-shm-usage',
            '–disable-setuid-sandbox',
            '–no-first-run',
            '–no-sandbox',
            '–no-zygote',
            '–single-process',
          ],
        }),
      );
    }
    Promise.all(p).then((v) => {
      this.browserWsEndPoints = v.map((v) => ({
        instance: v.wsEndpoint(),
        status: BrowserWsEndPointsStatus.free,
      }));
      this.test();
    });
  }
  browserWsEndPoints: {
    instance: string;
    status: BrowserWsEndPointsStatus;
  }[] = [];
  getHello(): string {
    return 'Hello World!';
  }

  async test() {
    const browserWSEndpoint = this.getBrowserWsEndPoints().instance;
    console.log(browserWSEndpoint);

    const browser = await connect({
      browserWSEndpoint,
    });
    const page = await browser.newPage();
    await page.goto('https://postimages.org/');
    const uploadBtn = await page.waitForSelector('.dz-hidden-input');
    await uploadBtn.uploadFile('test.png');
    page.once('load', () => {
      page.screenshot({ path: 'shot.png' });
    });
  }

  getBrowserWsEndPoints() {
    const free = this.browserWsEndPoints.find(
      (v) => v.status == BrowserWsEndPointsStatus.free,
    );
    if (free) return free;
    // TODO:
  }
}
