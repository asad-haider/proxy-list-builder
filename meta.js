var scrapingHelper = require('./scraping-helper');
module.exports = [
    {
        url: 'https://free-proxy-list.net/',
        parse: scrapingHelper.parseFreeProxyList,
        method: 'GET'
    },
    {
        url: 'https://www.us-proxy.org/',
        parse: scrapingHelper.parseFreeProxyList,
        method: 'GET',
    },
    {
        url: 'https://www.sslproxies.org/',
        parse: scrapingHelper.parseFreeProxyList,
        method: 'GET',
    },
    {
        url: 'https://www.socks-proxy.net/',
        parse: scrapingHelper.parseFreeProxyList,
        method: 'GET',
    },
    {
        url: 'https://www.proxynova.com/proxy-server-list/',
        parse: scrapingHelper.parseProxyNova,
        method: 'GET',
    },
    {
        url: 'http://www.gatherproxy.com/',
        parse: scrapingHelper.parseFreeProxyList,
        method: 'GET',
    },
    {
        url: 'http://www.gatherproxy.com/',
        parse: scrapingHelper.parseGatherProxy,
        method: 'GET',
    },
    {
        url: 'http://list.proxylistplus.com/Fresh-HTTP-Proxy-List-%d',
        parse: scrapingHelper.parseProxyListPlus,
        method: 'GET',
        maxLength: 6,
    },
    {
        url: 'https://proxyhttp.net/free-list/anonymous-server-hide-ip-address/%d#proxylist',
        parse: scrapingHelper.parseProxyHttp,
        method: 'GET',
        maxLength: 9,
    },
    {
        url: 'https://sockslist.net/proxy/server-socks-hide-ip-address/%d#proxylist',
        parse: scrapingHelper.parseProxyHttp,
        method: 'GET',
        maxLength: 4,
    },
    {
        url: 'https://sockslist.net/list/proxy-socks-5-list/%d#proxylist',
        parse: scrapingHelper.parseProxyHttp,
        method: 'GET',
        maxLength: 3,
    },
    {
        url: 'https://www.cool-proxy.net/proxies/http_proxy_list/sort:score/direction:desc/page:%d',
        parse: scrapingHelper.parseCoolProxiesDotNet,
        method: 'GET',
        maxLength: 31,
    },
    {
        url: 'http://spys.one/en/free-proxy-list/',
        parse: scrapingHelper.parseSpysOne,
        method: 'POST',
        body: {
            "xpp": 5,
            "xf1": 0,
            "xf2": 0,
            "xf4": 0,
            "xf5": 0
        }
    },
    {
        url: 'http://spys.one/en/https-ssl-proxy/',
        parse: scrapingHelper.parseSpysOne,
        method: 'POST',
        body: {
            "xpp": 5,
            "xf1": 0,
            "xf2": 0,
            "xf4": 0,
            "xf5": 0
        }
    },
    {
        url: 'http://spys.one/en/socks-proxy-list/',
        parse: scrapingHelper.parseSpysOne,
        method: 'POST',
        body: {
            "xpp": 5,
            "xf1": 0,
            "xf2": 0,
            "xf4": 0,
            "xf5": 0
        }
    },
    {
        url: 'http://spys.one/en/http-proxy-list/',
        parse: scrapingHelper.parseSpysOne,
        method: 'POST',
        body: {
            "xpp": 5,
            "xf1": 0,
            "xf2": 0,
            "xf4": 0,
            "xf5": 0
        }
    },
    {
        url: 'http://spys.one/en/non-anonymous-proxy-list/',
        parse: scrapingHelper.parseSpysOne,
        method: 'POST',
        body: {
            "xpp": 5,
            "xf1": 0,
            "xf2": 0,
            "xf4": 0,
            "xf5": 0
        }
    },
    {
        url: 'http://www.thebigproxylist.com/',
        parse: scrapingHelper.parseBigProxyList,
        method: 'GET',
    },
    {
        url: 'https://hugeproxies.com/home/page/%d/',
        parse: scrapingHelper.parseProxiesUsingRegex,
        method: 'GET',
    },
    {
        url: 'https://www.7xter.com/2017/03/top-proxy-sites-best-proxy-servers.html',
        parse: scrapingHelper.parse7Xter,
        method: 'GET',
    },
    {
        url: 'https://raw.githubusercontent.com/clarketm/proxy-list/master/proxy-list.txt',
        parse: scrapingHelper.parseProxiesUsingRegex,
        method: 'GET',
    },
    {
        url: 'https://raw.githubusercontent.com/opsxcq/proxy-list/master/list.txt',
        parse: scrapingHelper.parseProxiesUsingRegex,
        method: 'GET',
    }
];