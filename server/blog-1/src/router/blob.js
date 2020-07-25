const {
  getList,
  getDetail,
  newBlob,
  updateBlob,
  delBlob
} = require("../controller/blob");
const { SuccessModel, ErrorModel } = require("../model/resModel");

const loginCheck = req => {
  if (!req.session.username) {
    return Promise.resolve(new ErrorModel("尚未登录"));
  }
};

const handleBlogRouter = (req, res) => {
  const { method } = req;
  const { id } = req.query;
  if (method === "GET" && req.path === "/api/blob/list") {
    const { author = "", keyword = "" } = req.query;
    const loginCheckResult = loginCheck(req);
    if (loginCheckResult) {
      return loginCheckResult;
    }
    const result = getList(author, keyword);
    return result.then(res => {
      return new SuccessModel(res);
    });
    // const listData = getList(author, keyword);
    // return new SuccessModel(listData);
  }

  if (method === "GET" && req.path === "/api/blob/detail") {
    const result = getDetail(id);
    return result.then(data => new SuccessModel(data));
    // return new SuccessModel(data);
  }
  if (method === "POST" && req.path === "/api/blob/new") {
    const loginCheckResult = loginCheck(req);
    if (loginCheckResult) {
      return loginCheckResult;
    }
    req.body.author = req.session.username;
    const result = newBlob(req.body);
    return result.then(data => new SuccessModel(data));
  }
  if (method === "POST" && req.path === "/api/blob/update") {
    const loginCheckResult = loginCheck(req);
    if (loginCheckResult) {
      return loginCheckResult;
    }
    const result = updateBlob(id, req.body);
    return result.then(res => {
      return res ? new SuccessModel(res) : new ErrorModel("更新博客失败");
    });
  }
  if (method === "POST" && req.path === "/api/blob/del") {
    req.body.author = "zhangsan";
    const result = delBlob(id, req.body.author);
    return result.then(val => {
      console.log("val", val);
      return val ? new SuccessModel() : new ErrorModel("删除博客失败");
    });
  }
};

module.exports = handleBlogRouter;
