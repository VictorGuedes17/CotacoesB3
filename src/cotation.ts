import puppeteer from 'puppeteer';


class CotationB3 {

  constructor() {
    
  }

  private getPrice = async(papper: string) => {
    const browser = await puppeteer.launch({
      headless: false
    });
    const page = await browser.newPage();
    const URL = `https://www.infomoney.com.br/cotacoes/${papper}`
    await page.goto(URL)
    console.log("URL: ", URL)
    const result = await page.evaluate(() => {
      try {
        if (document.getElementsByClassName("line-info")[0]) {
          const value = document.getElementsByClassName("line-info")[0].getElementsByClassName("value")[0].getElementsByTagName("p")[0].textContent;
          const currentPrice = value ? value : ""
          return currentPrice
        } else {
          return ""
        }
      } catch (e) {
        console.log("deu erro : ", e)
        return ""
      }
    });
  
    if (result) {
      page.close();
      return result;
    }
  }
  
 public main = async(pappers: string[]) => {
    for (const papper of pappers) {
      const currentPrice = await this.getPrice(papper);
      const papperName = papper.split("-")[1];
      console.log(`Papel: ${papperName} - Cotação Atual : ${currentPrice}`)
    }
  }

}

export const Cotation = new CotationB3;