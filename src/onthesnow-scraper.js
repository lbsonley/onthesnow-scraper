const cheerio = require("cheerio");
const fetch = require("node-fetch");
import { inToCm, getTimezoneAdjustedDate } from "./utils";
let $;

export const Scraper = (
  resortPath = "/graubunden/andermatt-gotthard-oberalp-arena/historical-snowfall.html"
) => {
  const baseUrl = "https://www.onthesnow.com/";
  const resortUrl = `${baseUrl}${resortPath}`;

  const getPage = async url => {
    const res = await fetch(url);
    const page = await res.text();
    return cheerio.load(page);
  };

  const getAvailableYears = () => {
    let yearEls = $(".border_box_content .tabs li").toArray();

    return yearEls
      .filter(year => $(year).text() !== "Compare")
      .map(year => $("a", year).attr("href"));
  };

  const filterSnowDays = dayEl => $("div", dayEl).length > 0;

  const getDayData = (dayEl, month, year) => {
    const dayNum = $("span", dayEl).text();
    return {
      date: getTimezoneAdjustedDate({ year, month, dayNum }),
      newSnow: inToCm($("div", dayEl).text()),
      unit: "cm"
    };
  };

  const getMonthData = monthEl => {
    const monthContainer = $(monthEl);

    const [month, year] = $(".dte_mon", monthContainer)
      .text()
      .split(" ");

    const dayContainer = $(".cal_chart_td", monthContainer);
    const days = $(".dte_hd_td", dayContainer).toArray();

    return days
      .filter(dayEl => filterSnowDays(dayEl))
      .map(dayEl => getDayData(dayEl, month, year));
  };

  const getSeasonData = async url => {
    $ = await getPage(url);
    const calendarContainer = $(".cal_chart_main");
    const monthContainers = $(".cal_chart_div", calendarContainer).toArray();

    const data = monthContainers.reduce((acc, month) => {
      acc = acc.concat(getMonthData(month));
      return acc;
    }, []);

    return data;
  };

  const getHistoricalData = async () => {
    console.log("Getting Historical Data");
    $ = await getPage(resortUrl);
    const yearPaths = getAvailableYears();
    const data = await Promise.all(
      yearPaths.map(async yearPath => {
        const seasonData = await getSeasonData(`${baseUrl}${yearPath}`);
        return seasonData;
      })
    );

    console.log("Done getting data");
    return data.flat().sort((a, b) => a.date - b.date);
  };

  return {
    getHistoricalData
  };
};
