import { Scraper } from "../onthesnow-scraper";

const sedrunScraper = Scraper();

export const handler = (event, context, callback) => {
  sedrunScraper.getHistoricalData().then(data => {
    callback(null, {
      statusCode: 200,
      body: data
    });
  });
};
