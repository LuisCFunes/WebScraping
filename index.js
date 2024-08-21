import puppeteer from "puppeteer";
import { scrapePage } from "./scrapePage.js";
import { scrapeInstantGaming } from "./scrapeInstantGaming.js";

(async () => {
  const game = "resident evil 4 remake";
  const URLs = [
    {
      url: `https://www.eneba.com/store/all?drms[]=steam&enb_campaign=Main%20Search&enb_content=search%20dropdown%20-%20input&enb_medium=input&enb_source=https%3A%2F%2Fwww.eneba.com%2F&enb_term=Submit&os[]=WINDOWS&page=1&regions[]=global&text=${game}&types[]=game`,
      container: ".JZCH_t",
      description: ".YLosEL",
      price: ".L5ErLT",
      store: "eneba",
    },
    {
      url: `https://www.g2a.com/category/games-c189?availability%5B0%5D=inStock&f%5Bdevice%5D%5B0%5D=1118&f%5Bplatform%5D%5B0%5D=1&f%5Bversions%5D%5B0%5D=8355&query=${game}`,
      container:
        "ul.sc-euEtCV.indexes__StyledListMobile-wklrsw-111.hTuscY.bQhJrc",
      description: ".sc-iqAclL.sc-dIsUp.dJFpVb.eHDAgC.sc-daBunf.brOVbM",
      price: ".sc-iqAclL.sc-crzoAE.dJFpVb.eqnGHx.sc-bqGGPW.gjCrxq",
      store: "g2a",
    },
    {
      url: `https://www.instant-gaming.com/en/search/?platform%5B%5D=1&type%5B%5D=steam&sort_by=&min_reviewsavg=10&max_reviewsavg=100&noreviews=1&min_price=0&max_price=200&noprice=1&gametype=games&search_tags=0&query=${game}`,
      container: ".search.listing-items",
      description: ".information > .text > .name > .title",
      price: "a.cover.video",
      store: "instant-gaming",
    },
  ];

  const scrapePromises = URLs.map((urlObj) => {
    if (urlObj.store === "instant-gaming") {
      return scrapeInstantGaming(urlObj);
    } else {
      return scrapePage(urlObj);
    }
  });

  const results = await Promise.all(scrapePromises);
  const allProducts = results.flat();
  console.log("Total products:", allProducts.length);
})();
