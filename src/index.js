const fs = require("fs");
const path = require("path");
import { Scraper } from "./onthesnow-scraper";

const sedrunScraper = Scraper();

sedrunScraper.getHistoricalData().then(data => {
  const json = JSON.stringify({ data }, null, 2);
  fs.writeFileSync(
    path.resolve(__dirname, "../data", "sedrun-snow.json"),
    json
  );
  console.log("file written");
});

const grindelwaldScraper = Scraper(
  "bernese-oberland/grindelwald-wengen/historical-snowfall.html"
);

grindelwaldScraper.getHistoricalData().then(data => {
  const json = JSON.stringify({ data }, null, 2);
  fs.writeFileSync(
    path.resolve(__dirname, "../data", "grindelwald-snow.json"),
    json
  );
  console.log("file written");
});
