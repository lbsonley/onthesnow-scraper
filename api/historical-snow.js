import { Scraper } from "../src/onthesnow-scraper";

export default async (req, res) => {
  const sedrunScraper = Scraper();
  const data = await sedrunScraper.getHistoricalData();

  res.json({
    body: data,
    query: req.query,
    cookies: req.cookies
  });
};
