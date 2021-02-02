import puppeteer from 'puppeteer';


class CotationB3 {

  constructor() {

  }

  private getPrice = async (papper: string) => {
    const baseUrl = `http://www.b3.com.br/pt_br/busca/?query=`;
    const browser = await puppeteer.launch({
      // headless: false
    });
    const page = await browser.newPage();
    const URL = `${baseUrl}${papper}`
    console.log("URL: ", URL)
    await page.goto(URL, { timeout: 30000 })
    await new Promise(r => setTimeout(r, 4000))
    const result = await page.frames()[1].evaluate(() => {
      try {
        const iframe = document.getElementsByClassName('tv-widget-chart__price-value symbol-last')[0].textContent;
        return iframe
      } catch (e) {
        console.log(e)
        return ""
      }
    });

    if (result) {
      page.close();
      return result;
    }
  }

  public main = async (pappers: string[]) => {
    for (const papper of pappers) {
      const currentPrice = await this.getPrice(papper);
      const convertCurrentPrice = Number(currentPrice.replace(/[^\d.-]/g, ''));
      // const papperName = papper.split("-")[1];
      console.log(`Papel: ${papper} - Cotação Atual : ${convertCurrentPrice}`)
    }
  }

}

export const Cotation = new CotationB3;