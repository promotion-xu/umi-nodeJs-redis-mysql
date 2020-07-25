const { login } = require("../controller/user");
const { SuccessModel, ErrorModel } = require("../model/resModel");
const { set } = require("../db/redis");
const getCookieExpires = () => {
  const d = new Date();
  d.setTime(d.getTime() + 24 * 60 * 60 * 1000);
  return d.toGMTString();
};

const hanldeUserRouter = (req, res) => {
  const { method } = req;

  if (method === "POST" && req.path === "/api/user/login") {
    const { username, password } = req.body;
    const result = login(username, password);
    return result.then(v => {
      if (v.username) {
        req.session.username = v.username;
        req.session.realname = v.realname;
        console.log("req.session", req.session);
        set(req.sessionId, req.session);
        return new SuccessModel();
      }
      return new ErrorModel("登录失败");
    });
  }

  // 验证登录的测试
  if (method === "GET" && req.path === "/api/user/login-test") {
    if (req.session.username) {
      return Promise.resolve(
        new SuccessModel({
          username: req.session.username
        })
      );
    }
    return Promise.resolve(new ErrorModel("登录失败"));
  }
};

module.exports = hanldeUserRouter;
