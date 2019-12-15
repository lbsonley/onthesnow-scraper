const cheerio = require("cheerio");
const fetch = require("node-fetch");
let $;

const url =
  "https://www.onthesnow.com/graubunden/andermatt-gotthard-oberalp-arena/historical-snowfall.html";

const getPage = async url => {
  const res = await fetch(url);
  const page = await res.text();
  return cheerio.load(page);
};

const getMonthData = async monthEl => {
  const month = [];
  const monthContainer = $(monthEl);

  const monthLabel = $(".dte_mon", monthContainer)
    .text()
    .replace(/ /, "-");

  const dayContainer = $(".cal_chart_td", monthContainer);
  console.log("dayContainer Length", dayContainer.length);
  const days = $(".dte_hd_td", dayContainer);
  console.log("days Length", days.length);

  let snowDays = 0;

  days.each((i, day) => {
    const snowAmount = $("div", day);
    if (snowAmount.length > 0) snowDays += 1;
  });

  console.log("snow days", snowDays);

  return monthLabel;
};

const getSnowData = async url => {
  $ = await getPage(url);
  const calendarContainer = $(".cal_chart_main");
  const monthContainers = $(".cal_chart_div", calendarContainer);
  monthContainers.each(async (i, month) => {
    const monthData = await getMonthData(month);
    // console.log(new Date(monthData));
  });
};

getSnowData(url);
