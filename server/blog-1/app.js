const querystring = require("querystring");
const { get, set } = require("./src/db/redis");
const handleUserRouter = require("./src/router/user");
const handleBlogRouter = require("./src/router/blob");

const getCookieExpires = () => {
  const d = new Date();
  d.setTime(d.getTime() + 24 * 60 * 60 * 1000);
  return d.toGMTString();
};

// session
// const SESSION_DATA = {};

const getPostData = req => {
  const promise = new Promise((resolve, reject) => {
    if (
      req.method !== "POST" ||
      req.headers["content-type"] !== "application/json;charset=UTF-8"
    ) {
      resolve({});
      return;
    }
    let postData = "";
    req.on("data", chunk => {
      postData += chunk.toString();
    });
    req.on("end", () => {
      if (!postData) {
        resolve({});
        return;
      }
      resolve(JSON.parse(postData));
    });
  });
  return promise;
};

const serverHandle = (req, res) => {
  res.setHeader("Content-type", "application/json");
  const url = req.url;
  req.path = url.split("?")[0];
  req.query = querystring.parse(url.split("?")[1]);

  req.cookie = {};
  const cookieStr = req.headers.cookie || ""; // "k1=v1;k2=v2"
  cookieStr.split(";").forEach(item => {
    // item = k1=v1
    if (!item) return;
    const arr = item.split("=");
    const key = arr[0].trim();
    const value = arr[1].trim();
    req.cookie[key] = value;
  });

  let needSetCookie = false;
  let userId = req.cookie.userId;
  if (!userId) {
    needSetCookie = true;
    userId = `${Date.now()}_${Math.random()}`;
    set(userId, {});
  }
  req.sessionId = userId;
  get(req.sessionId)
    .then(sessionData => {
      if (sessionData === null) {
        set(req.sessionId, {});
        req.session = {};
      } else {
        req.session = sessionData;
      }
      return getPostData(req);
    })
    .then(postData => {
      req.body = postData;
      const blogResult = handleBlogRouter(req, res);
      if (blogResult) {
        blogResult.then(blogData => {
          if (needSetCookie) {
            res.setHeader(
              "Set-Cookie",
              `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`
            );
          }

          res.end(JSON.stringify(blogData));
        });
        return;
      }

      const userResult = handleUserRouter(req, res);
      if (userResult) {
        userResult.then(userData => {
          if (needSetCookie) {
            res.setHeader(
              "Set-Cookie",
              `userId=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`
            );
          }

          res.end(JSON.stringify(userData));
        });
        return;
      }
      // 未命中路由，返回 404
      res.writeHead(404, { "Content-type": "text/plain" });
      res.write("404 Not Found\n");
      res.end();
    });
};

module.exports = serverHandle;
