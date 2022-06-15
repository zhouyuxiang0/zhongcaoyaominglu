import { Injectable } from '@nestjs/common';
import { connect, launch, Page, Browser } from 'puppeteer';

export enum BrowserWsEndPointsStatus {
  free,
  process,
}

// TODO: 定时重启浏览器实例， 多线程，控制tab数量
@Injectable()
export class PostimgService {
  constructor() {
    this.initBrowserWSEndPoint();
  }
  static browserIndex = 0;
  static pageIndex = [];
  private browserWsEndPoints: {
    instance: string;
    status: BrowserWsEndPointsStatus;
  }[] = [];

  getHello(): string {
    return 'Hello World!';
  }

  async test() {
    const [browserIndex, browser] = await this.pickBrowser();
    const [page] = await browser.pages();
    await this.initPage(page);
    await page.goto('https://postimages.org/');
    const uploadBtn = await page.waitForSelector('.dz-hidden-input');
    await uploadBtn.uploadFile('test.png');
    page.once('load', () => {
      page.screenshot({ path: 'shot.png' });
    });
  }

  /**
   * 挑选browser，目前为轮流选取
   * @returns
   */
  async pickBrowser(): Promise<[number, Browser]> {
    if (PostimgService.browserIndex >= this.browserWsEndPoints.length)
      PostimgService.browserIndex = 0;
    const pickedBrowser = this.browserWsEndPoints[PostimgService.browserIndex];
    const browser = await connect({
      browserWSEndpoint: pickedBrowser.instance,
    });
    const data: [number, Browser] = [PostimgService.browserIndex, browser];
    PostimgService.browserIndex += 1;
    return data;
  }

  async pickPage() {
    //
  }

  /**
   * 初始化page
   */
  async initPage(page: Page) {
    await page.setRequestInterception(true);
    page.on('request', (req) => {
      if (['image', 'stylesheet', 'font'].includes(req.resourceType())) {
        return req.abort();
      }
      return req.continue();
    });
  }

  /**
   * 初始化浏览器及WSEndPoint
   */
  async initBrowserWSEndPoint() {
    // const num = cpus().length;
    const num = 1;
    PostimgService.pageIndex = new Array(num).fill(0);
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
    this.browserWsEndPoints = (await Promise.all(p)).map((v) => ({
      instance: v.wsEndpoint(),
      status: BrowserWsEndPointsStatus.free,
    }));
    this.test();
  }
}
