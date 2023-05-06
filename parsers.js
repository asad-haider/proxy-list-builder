const parseFreeProxyList = ($, meta) => {
  const proxies = [];
  $("table tbody tr").each((index, element) => {
    try {
      proxies.push({
        ...meta,
        ip: $(element).find("td:nth-child(1)").text(),
        port: $(element).find("td:nth-child(2)").text(),
        country: $(element).find("td:nth-child(4)").text(),
        anonymity: $(element).find("td:nth-child(5)").text(),
        type:
          $(element).find("td:nth-child(7)").text().toLowerCase() === "yes"
            ? "HTTPS"
            : "HTTP",
      });
    } catch (error) {}
  });
  return proxies;
};

const parseSocksProxy = ($, meta) => {
  const proxies = [];
  $("table tbody tr").each((index, element) => {
    try {
      proxies.push({
        ...meta,
        ip: $(element).find("td:nth-child(1)").text(),
        port: $(element).find("td:nth-child(2)").text(),
        country: $(element).find("td:nth-child(4)").text(),
        anonymity: $(element).find("td:nth-child(6)").text(),
        type: $(element).find("td:nth-child(5)").text(),
      });
    } catch (error) {}
  });
  return proxies;
};

const parseProxyNova = function ($, meta) {
  const proxies = [];
  $("#tbl_proxy_list tbody tr").each(function (index, element) {
    try {
      let ip = $(element).find("td:nth-child(1) script").html();
      if (ip) {
        const regex = /document.write\((.*)\)/g;
        const cleanIp = regex.exec(ip)[1];
        ip = eval(cleanIp);
      } else {
        ip = $(element).find("td:nth-child(1)").text();
      }
      proxies.push({
        ...meta,
        ip: ip.trim(),
        port: $(element).find("td:nth-child(2)").text().trim(),
        country: $(element)
          .find("td:nth-child(6) a")
          .children()
          .remove()
          .end()
          .text()
          .trim(),
        anonymity: $(element).find("td:nth-child(7)").text().trim(),
      });
    } catch (error) {}
  });
  return proxies;
};

module.exports = {
  parseFreeProxyList,
  parseSocksProxy,
  parseProxyNova,
};
