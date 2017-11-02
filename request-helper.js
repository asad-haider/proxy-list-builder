var request = require('request')
var Proxy = require('./models/ProxyModel')

module.exports = function (uri, method, body, callback) {
    try {
        var options = {
            uri: uri,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36'
            },
            timeout: 5000,
            resolveWithFullResponse: true,
            tunnel: false,
            jar: true
        }
        options.method = method;
        options.form = body;
        request(options,
            function (err, response, body) {
                if (!err) console.log(response.request.href)
                callback(err, response, body);
            })
    } catch (error) {}
}