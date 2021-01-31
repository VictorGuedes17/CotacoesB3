import puppeteer from 'puppeteer';

const pappers = [
  "viavarejo-vvar3",
  "Berkshire Hathaway Inc.-BRK.B",
  "Vamos-VAMO3",
  "fundos-imobiliarios-URPR11",
  "fundos-imobiliarios-DEVA11",
  "fundos-imobiliarios-MFAI11",
  "Neogrid-NGRD3",
  "Baxter International Inc.-BAX",
  "Baker Hughes Company-BKR",
  "AT&T Inc.-T",
  "Altria Group, Inc.-MO",
  "American International Group, Inc.-AIG",
  "Accenture plc-ACN"
]

async function getPrice(papper: string) {
  const browser = await puppeteer.launch({
    // headless: false
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

(async function main() {
  for (const papper of pappers) {
    const currentPrice = await getPrice(papper);
    const papperName = papper.split("-")[1];
    console.log(`Papel: ${papperName} - Cotação Atual : ${currentPrice}`)
  }
})()
