const {
  parseFreeProxyList,
  parseSocksProxy,
  parseProxyNova,
} = require("./parsers");

module.exports = [
  {
    url: [
      "https://free-proxy-list.net/",
      "https://www.us-proxy.org/",
      "https://www.sslproxies.org/",
    ],
    parse: parseFreeProxyList,
    method: "GET",
  },
  {
    url: "https://www.socks-proxy.net/",
    parse: parseSocksProxy,
    method: "GET",
  },
  {
    url: [
      "https://www.proxynova.com/proxy-server-list/",
      "https://www.proxynova.com/proxy-server-list/country-us/",
      "https://www.proxynova.com/proxy-server-list/country-ca/",
      "https://www.proxynova.com/proxy-server-list/country-br/",
      "https://www.proxynova.com/proxy-server-list/country-ve/",
      "https://www.proxynova.com/proxy-server-list/country-ar/",
      "https://www.proxynova.com/proxy-server-list/country-gb/",
      "https://www.proxynova.com/proxy-server-list/country-ru/",
      "https://www.proxynova.com/proxy-server-list/country-fr/",
      "https://www.proxynova.com/proxy-server-list/country-de/",
      "https://www.proxynova.com/proxy-server-list/country-pl/",
      "https://www.proxynova.com/proxy-server-list/country-ua/",
      "https://www.proxynova.com/proxy-server-list/country-cn/",
      "https://www.proxynova.com/proxy-server-list/country-hk/",
      "https://www.proxynova.com/proxy-server-list/country-tw/",
      "https://www.proxynova.com/proxy-server-list/country-kr/",
      "https://www.proxynova.com/proxy-server-list/country-jp/",
      "https://www.proxynova.com/proxy-server-list/country-id/",
      "https://www.proxynova.com/proxy-server-list/country-th/",
    ],
    parse: parseProxyNova,
    method: "GET",
  },
];
