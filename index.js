var requestHelper = require('./request-helper')
var scrapingHelper = require('./scraping-helper')
var mongoose = require('mongoose')
var Proxy = require('./models/ProxyModel')
var meta = require('./meta')
var cron = require('node-cron');
var util = require('util')

mongoose.connect('mongodb://127.0.0.1:27017/proxies', {
    useMongoClient: true
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var proxiesAdded = 0
var proxiesFound = 0
var insertIfNotExist = function (proxy) {
    Proxy.findOne({
        ip: proxy.ip,
        port: proxy.port
    }, function (err, data) {
        if (err) return;
        proxiesFound++;
        if (!data && proxy.ip != '' && proxy.ip != '0' && proxy.port != '' && proxy.port != '0') {
            var proxyModel = new Proxy(proxy);
            proxyModel.save(function (err, result) {
                proxiesAdded++;
            });
        }
    });
}

var printStatus = function () {
    console.log('Proxies Found: ' + proxiesFound)
    console.log('Proxies Added: ' + proxiesAdded)
}

var counter = 0
var task = cron.schedule('0 */15 * * * *', function () {
    console.log('scraping after every 15 minutes');
    proxiesAdded = 0
    proxiesFound = 0
    counter = 0
    var totalRequests = meta.length
    meta.forEach(function (metaObj) {
        metaObj.maxLength ? totalRequests += metaObj.maxLength : totalRequests += 0;
        if (metaObj.maxLength) {
            totalRequests--;
            for (var index = 1; index <= metaObj.maxLength; index++) {
                requestHelper(util.format(metaObj.url, index), metaObj.method, metaObj.body, function (err, response, body) {
                    if (!err) {
                        metaObj.parse(response.request.href, body).forEach(function (proxy) {
                            insertIfNotExist(proxy);
                        });
                    }
                    counter++;
                    if (counter == totalRequests) printStatus()
                })
            }
        } else {
            requestHelper(metaObj.url, metaObj.method, metaObj.body, function (err, response, body) {
                if (!err) {
                    metaObj.parse(response.request.href, body).forEach(function (proxy) {
                        insertIfNotExist(proxy);
                    });
                }
                counter++;
                if (counter == totalRequests) printStatus()
            })
        }
    });
}, false);

task.start();