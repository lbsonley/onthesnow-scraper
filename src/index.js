const cheerio = require("cheerio");
const fetch = require("node-fetch");
import { inToCm, getTimezoneAdjustedDate, getMonthIndex } from "./utils";
let $;

const url =
  "https://www.onthesnow.com/graubunden/andermatt-gotthard-oberalp-arena/historical-snowfall.html?&y=2010";

const getPage = async url => {
  const res = await fetch(url);
  const page = await res.text();
  return cheerio.load(page);
};

const getMonthData = monthEl => {
  const data = [];
  const monthContainer = $(monthEl);

  const [month, year] = $(".dte_mon", monthContainer)
    .text()
    .split(" ");

  const dayContainer = $(".cal_chart_td", monthContainer);
  const days = $(".dte_hd_td", dayContainer);

  days.each((i, day) => {
    const snowAmount = $("div", day);

    if (snowAmount.length > 0) {
      const dayNum = $("span", day).text();
      data.push({
        date: getTimezoneAdjustedDate({ year, month, dayNum }),
        newSnow: inToCm(snowAmount.text()),
        unit: "cm"
      });
    }
  });

  return data;
};

const getSnowData = async url => {
  $ = await getPage(url);
  let data = [];
  const calendarContainer = $(".cal_chart_main");
  const monthContainers = $(".cal_chart_div", calendarContainer);
  monthContainers.each((i, month) => {
    const monthData = getMonthData(month);
    data = data.concat(monthData);
  });

  return data;
};

getSnowData(url).then(data => console.log("data", data));
