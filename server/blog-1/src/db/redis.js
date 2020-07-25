const redis = require("redis");

const { REDIS_CONF } = require("../conf/db");
const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host);

redisClient.on("error", err => {
  console.log("err", err);
});

const set = (key, value) => {
  if (typeof value === "object") {
    value = JSON.stringify(value);
  }
  redisClient.set(key, value, redis.print);
};

const get = key => {
  return new Promise((resolve, reject) => {
    redisClient.get(key, (err, value) => {
      if (err) {
        reject(err);
        return;
      }

      if (value == null) {
        resolve(null);
        return;
      }
      try {
        resolve(JSON.parse(value));
      } catch {
        resolve(value);
      }
    });
  });
};

module.exports = {
  get,
  set
};
