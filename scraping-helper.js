var cheerio = require('cheerio')

var parseFreeProxyList = function (url, body) {
    var proxies = [];
    var $ = cheerio.load(body);
    $('#proxylisttable tbody tr').each(function (index, element) {
        try {
            proxies.push({
                ip: $(this).find('td:nth-child(1)').text(),
                port: $(this).find('td:nth-child(2)').text(),
                country: $(this).find('td:nth-child(4)').text(),
                anonymity: $(this).find('td:nth-child(5)').text(),
                dateAdded: new Date(),
                working: true,
                lastChecked: new Date(),
                source: url
            });
        } catch (error) {
        }
    });
    return proxies;
}

var parseProxyNova = function (url, body) {
    var proxies = [];
    var $ = cheerio.load(body);
    $('#tbl_proxy_list tbody tr').each(function (index, element) {
        try {
            var ip = $(this).find('td:nth-child(1) script').html()
            if (ip) {
                ip = eval(ip.replace('document.write(', '').replace(');', ''))
            } else {
                ip = $(this).find('td:nth-child(1)').text()
            }
            proxies.push({
                ip: ip.trim(),
                port: $(this).find('td:nth-child(2)').text().trim(),
                country: $(this).find('td:nth-child(6) a').text().trim(),
                anonymity: $(this).find('td:nth-child(7)').text().trim(),
                dateAdded: new Date(),
                working: true,
                lastChecked: new Date(),
                source: url
            });
        } catch (error) {
        }
    });
    return proxies;
}

var parseGatherProxy = function (url, body) {
    var proxies = [];
    var $ = cheerio.load(body);
    $('#tblproxy tbody tr.proxy').each(function (index, element) {
        try {
            proxies.push({
                ip: $(this).find('td:nth-child(2)').text(),
                port: $(this).find('td:nth-child(3) a').text(),
                country: $(this).find('td:nth-child(4) a').text(),
                anonymity: $(this).find('td:nth-child(5) a').text(),
                dateAdded: new Date(),
                working: true,
                lastChecked: new Date(),
                source: url
            });
        } catch (error) {
        }
    });
    return proxies;
}


var parseFreeProxyListDotNet = function (url, body) {
    var proxies = [];
    var $ = cheerio.load(body);
    $('table.DataGrid tbody tr.Odd, tr.Even').each(function (index, element) {
        try {
            proxies.push({
                ip: $(this).find('td:nth-child(1) a').text(),
                port: $(this).find('td:nth-child(3)').text(),
                country: $(this).find('td:nth-child(5)').text(),
                anonymity: $(this).find('td:nth-child(4)').text(),
                dateAdded: new Date(),
                working: true,
                lastChecked: new Date(),
                source: url
            });
        } catch (error) {
        }
    });
    return proxies;
}


var parseNNTime = function (url, body) {
    var proxies = [];
    var $ = cheerio.load(body);
    $('#formname tbody tr').each(function (index, element) {
        try {
            proxies.push({
                ip: $(this).find('td:nth-child(2)').text().trim().split(':')[0],
                port: $(this).find('td:nth-child(2)').text().trim().split(':')[1],
                country: $(this).find('td:nth-child(3)').text(),
                anonymity: $(this).find('td:nth-child(5)').text(),
                dateAdded: new Date(),
                working: true,
                lastChecked: new Date(),
                source: url
            });
        } catch (error) {
        }
    });
    return proxies;
}


var parseProxyListPlus = function (url, body) {
    var proxies = [];
    var $ = cheerio.load(body);
    $('#page > table.bg tbody tr.cells').each(function (index, element) {
        try {
            proxies.push({
                ip: $(this).find('td:nth-child(2)').text(),
                port: $(this).find('td:nth-child(3)').text(),
                country: $(this).find('td:nth-child(5)').text(),
                anonymity: $(this).find('td:nth-child(4)').text(),
                dateAdded: new Date(),
                working: true,
                lastChecked: new Date(),
                source: url
            });
        } catch (error) {
        }
    });
    return proxies;
}

var parseProxyHttp = function (url, body) {
    var proxies = [];
    var $ = cheerio.load(body);
    var variables = $('#incontent > script:nth-child(5)').html()

    $('#incontent > table.proxytbl tbody tr:not([valign])').each(function (index, element) {
        try {
            var port = $(this).find('td.t_port script').html()
            if (port) port = eval(variables + port.replace('document.write(', '').replace(');', ''))
            else port = $(this).find('td.t_port').text()
            proxies.push({
                ip: $(this).find('td:nth-child(1)').text(),
                port: port,
                country: $(this).find('td:nth-child(3)').text(),
                anonymity: $(this).find('td:nth-child(4)').text(),
                dateAdded: new Date(),
                working: true,
                lastChecked: new Date(),
                source: url
            });

        } catch (error) {
        }
    });
    return proxies;
}

var parseSpysOne = function (url, body) {
    var proxies = [];
    var $ = cheerio.load(body);
    var varialbes = $('body > script').html()
    $('body > table:nth-child(3) > tbody > tr:nth-child(4) > td > table > tbody > tr[onmouseover]').each(function (index, element) {
        try {
            var portJS = $(this).find('td:nth-child(1) font.spy14 script').html()
            proxies.push({
                ip: $(this).find('td:nth-child(1) font.spy14').text(),
                port: eval(varialbes + portJS.substring(portJS.indexOf('+') + 1, portJS.length - 1).split('+').join('+ "" +')),
                country: $(this).find('td:nth-child(4) a font').text(),
                anonymity: $(this).find('td:nth-child(3) a font').text(),
                dateAdded: new Date(),
                working: true,
                lastChecked: new Date(),
                source: url
            });
        } catch (error) {
        }
    });
    return proxies;
}

var parseCoolProxiesDotNet = function (url, body) {
    var proxies = [];

    function str_rot13(str) {
        return (str + '').replace(/[a-z]/gi, function (s) {
            return String.fromCharCode(s.charCodeAt(0) + (s.toLowerCase() < 'n' ? 13 : -13));
        });
    };

    var $ = cheerio.load(body);
    var evalFunc = "function str_rot13(str) { return (str + '') .replace(/[a-z]/gi, function (s) { return String.fromCharCode(s.charCodeAt(0) + (s.toLowerCase() < 'n' ? 13 : -13)); }); };"
    $('#main > table > tbody > tr').each(function (index, element) {
        try {
            if ($(this).has('td[style="text-align:left; font-weight:bold;"] script').length) {
                var ipJS = $(this).find('td[style="text-align:left; font-weight:bold;"] script').html()
                var ip = new Buffer(str_rot13(ipJS.substring(ipJS.lastIndexOf('("') + 2, ipJS.lastIndexOf('")'))), 'base64').toString();
                proxies.push({
                    ip: ip,
                    port: $(this).find('td:nth-child(2)').text(),
                    country: $(this).find('td:nth-child(4)').text(),
                    anonymity: $(this).find('td:nth-child(6)').text(),
                    dateAdded: new Date(),
                    working: true,
                    lastChecked: new Date(),
                    source: url
                });

            }
        } catch (error) {
        }
    });
    return proxies;
}


var parseBigProxyList = function (url, body) {
    var proxies = [];
    try {
        var $ = cheerio.load(body);
        eval($('#site-wrapper > b > script:nth-child(3)').html())
        proxies = serverProxyList.map(proxy => ({
            ip: proxy.hostPort.split(":")[0],
            port: proxy.hostPort.split(":")[1],
            country: null,
            anonymity: null,
            dateAdded: new Date(),
            lastChecked: new Date(),
            working: true,
            source: url
        }))
    } catch (error) {
    }
    return proxies;
}

var parseHugeProxies = function (url, body) {
    var proxies = [];
    var $ = cheerio.load(body);
    $('table tbody tr').each(function (index, element) {
        try {
            proxies.push({
                ip: $(this).find('td:nth-child(1)').text(),
                port: $(this).find('td:nth-child(2)').text(),
                country: $(this).find('td:nth-child(3)').text(),
                anonymity: $(this).find('td:nth-child(6)').text(),
                dateAdded: new Date(),
                working: true,
                lastChecked: new Date(),
                source: url
            });
        } catch (error) {
        }
    });
    return proxies;
}

var parse7Xter = function (url, body) {
    var proxies = [];
    var $ = cheerio.load(body);
    $('table[width="404"] > tbody > tr').each(function (index, element) {
        try {
            if (!$(this).has('td[width]').length) {
                proxies.push({
                    ip: $(this).find('td:nth-child(2)').text(),
                    port: $(this).find('td:nth-child(3)').text(),
                    country: $(this).find('td:nth-child(4)').text(),
                    anonymity: null,
                    dateAdded: new Date(),
                    working: true,
                    lastChecked: new Date(),
                    source: url
                });
            }
        } catch (error) {
        }
    });
    return proxies;
}

// var freeProxyDotCz = function (url, body) {
//     var proxies = [];
//     var $ = cheerio.load(body);
//     $('#proxy_list > tbody > tr').each(function (index, element) {
//         try {

//             var ipJS = $(this).find('td:nth-child(1)[class="left"] script').html()
//             var ip = new Buffer(str_rot13(ipJS.substring(ipJS.lastIndexOf('("') + 2, ipJS.lastIndexOf('")'))), 'base64').toString();

//             proxies.push({
//                 ip: ip,
//                 port: $(this).find('td:nth-child(2) > span').text(),
//                 country: $(this).find('td:nth-child(4) a').text(),
//                 anonymity: $(this).find('td:nth-child(7) small').text(),
//                 dateAdded: new Date(),
//                 working: true,
//                 lastChecked: new Date(),
//                 source: url
//             });
//         } catch (error) {}
//     });
//     return proxies;
// }

var parseProxiesUsingRegex = function (url, body) {
    const proxies = body.match(/(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})[ \t:]+(\d{2,5})/g);
    if (!proxies) return [];
    return proxies
        .map(proxy => proxy.replace('\t', ':'))
        .map(proxy => ({
            ip: proxy.split(':')[0],
            port: proxy.split(':')[1],
            country: null,
            anonymity: null,
            working: true,
            dateAdded: new Date(),
            lastChecked: new Date(),
            source: url
        }));
};

module.exports = {
    parseFreeProxyList,
    parseProxyNova,
    parseGatherProxy,
    parseFreeProxyListDotNet,
    parseNNTime,
    parseProxyListPlus,
    parseProxyHttp,
    parseSpysOne,
    parseCoolProxiesDotNet,
    parseBigProxyList,
    parseHugeProxies,
    parse7Xter,
    parseProxiesUsingRegex,
};