import Moment from "moment";

const moment = Moment;
moment.locale("tr");
moment.updateLocale("tr", {
  months: [
    "Ocak",
    "Şubat",
    "Mart",
    "Nisan",
    "Mayıs",
    "Haziran",
    "Temmuz",
    "Ağustos",
    "Eylül",
    "Ekim",
    "Kasım",
    "Aralık",
  ],
  monthsShort: [
    "Oca",
    "Şub",
    "Mar",
    "Nis",
    "May",
    "Haz",
    "Tem",
    "Ağu",
    "Eyl",
    "Eki",
    "Kas",
    "Ara",
  ],
  weekdays: [
    "Pazar",
    "Pazartesi",
    "Salı",
    "Çarşamba",
    "Perşembe",
    "Cuma",
    "Cumartesi",
  ],
  weekdaysShort: ["Paz", "Pts", "Sal", "Çar", "Per", "Cum", "Cts"],
  relativeTime: {
    future: "%s içinde",
    past: "%s önce",
    s: "birkaç saniye",
    ss: "%d saniye",
    m: "1 dakika",
    mm: "%d dakika",
    h: "1 saat",
    hh: "%d saat",
    d: "1 gün",
    dd: "%d gün",
    M: "1 ay",
    MM: "%d ay",
    y: "1 yıl",
    yy: "%d yıl",
  },
});

export default moment;
