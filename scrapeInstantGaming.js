import puppeteer from "puppeteer";

export const scrapeInstantGaming = async ({
    url,
    container,
    description,
    price,
    store,
  }) => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "networkidle2" });
  
    const products = await page.evaluate(
      (container, description, price) => {
        const ulElement = document.querySelector(container);
        const products = Array.from(ulElement?.children || []);
  
        return products.map((product) => {
          const title = product.querySelector(description)?.innerText;
         const priceWhole = product.querySelector(price)?.title;
          
          if (!priceWhole) {
            return {
              title,
              price: "Sin precio",
            };
          }
  
          const priceWholeCleaned = priceWhole.split(" ").slice(-1)[0];
  
          return {
            title,
            price: priceWholeCleaned,
          };
        });
      },
      container,
      description,
      price
    );
    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log(`Tienda: ${store}`);
    if (products.length === 0) {
      console.log("No se encontraron resultados");
    } else {
      console.log(products);
    } 
    console.log(products.length);
  
    await page.close();
    await browser.close();
    return products;
  };
  