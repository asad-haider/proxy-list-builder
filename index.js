const { Spidey, DiscardItemError } = require("spidey");
const sources = require("./sources");
const dotnev = require("dotenv");
const { MongoClient } = require("mongodb");
dotnev.config();

class ValidationPipeline {
  constructor(options) {}

  isValidHost(ip) {
    const ipRegex = new RegExp(
      "^([1-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|" +
        "25[0-5])\\.([0-9]|[1-9][0-9]|1[0-9]{2}|" +
        "2[0-4][0-9]|25[0-5])\\.([0-9]|[1-9][0-9]|" +
        "1[0-9]{2}|2[0-4][0-9]|25[0-5])\\.([1-9]|" +
        "[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|" +
        "25[0-5])$"
    );
    return ipRegex.test(ip);
  }

  isValidPort(port) {
    const portRegex = new RegExp(
      "^(0|[1-9]\\d{0,3}|[1-5]\\d{4}|6[0-4]\\d{3}" +
        "|65[0-4]\\d{2}|655[0-2]\\d|6553[0-5])$"
    );
    return portRegex.test(port);
  }

  process(data) {
    if (!data.url) throw new DiscardItemError("Missing or Invalid URL");
    if (this.isValidHost(data.ip) && this.isValidPort(data.port)) return data;
    else throw new DiscardItemError("Invalid IP or Port");
  }
}

class ManipulatePipeline {
  constructor(options) {}

  process(data) {
    data.port = parseInt(data.port, 10);
    if (data.type) data.type = data.type.toUpperCase();
    if (data.anonymity) data.anonymity = data.anonymity.toUpperCase();
    return data;
  }
}

class MongoPipeline {
  proxiesCol;
  options;

  constructor(options) {
    this.options = options;
    this.client = new MongoClient(options.mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }

  async start() {
    await this.client.connect();
    const db = this.client.db(this.options.database);
    this.proxiesCol = db.collection(this.options.collection);
  }

  async process(data) {
    const query = {
      ip: data.ip,
      port: data.port,
    };
    const update = {
      $set: data,
      $setOnInsert: {
        crawledAt: new Date(),
      },
    };
    await this.proxiesCol.updateOne(query, update, { upsert: true });
    return data;
  }

  async complete() {
    await this.client.close();
  }
}

class ProxySpidey extends Spidey {
  constructor() {
    super({
      retries: 3,
      concurrency: 10,
      mongoUrl: process.env.MONGO_URL,
      database: process.env.MONGO_DB,
      collection: process.env.MONGO_COLLECTION,
      pipelines: [ValidationPipeline, ManipulatePipeline, MongoPipeline],
    });
  }

  start() {
    for (const source of sources) {
      const urls = this.castArray(source.url);
      urls.forEach((url) => {
        this.request(
          {
            url,
            method: source.method,
            body: source.body,
            meta: { parse: source.parse },
          },
          this.parse.bind(this)
        );
      });
    }
  }

  parse(response) {
    const url = response.url;
    const parser = response.meta.parse;
    const proxies = parser(response.$, {
      url,
    });
    proxies.forEach((proxy) => this.save(proxy));
  }

  castArray(...args) {
    return args[0] instanceof Array ? args[0] : args;
  }
}

new ProxySpidey().start();
