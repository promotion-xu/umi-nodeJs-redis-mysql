const { exec } = require("../db/mysql");
const getList = (author, keyword) => {
  let sql = `select * from blogs where 1 = 1 `;
  if (author) {
    sql += `and author=${author}`;
  }
  if (keyword) {
    sql += `and title like '%${keyword}%' `;
  }
  sql += `order by createTime desc;`;
  return exec(sql);
};

const getDetail = id => {
  const sql = `select * from blogs where id=${id}`;
  return exec(sql).then(rows => rows[0]);
};

const newBlob = (blobData = {}) => {
  const { title, content, author, createTime = Date.now() } = blobData;
  const sql = `insert into blogs (title, content, createTime, author)
    values('${title}', '${content}', ${createTime}, '${author}')
  `;
  return exec(sql).then(insertData => insertData.insertId);
};

const updateBlob = (id, blobData = {}) => {
  const { title, content } = blobData;
  const sql = `update blogs set title='${title}', content='${content}' where id=${id}`;
  return exec(sql).then(updateData => {
    if (updateData.affectedRows > 0) {
      return true;
    }
    return false;
  });
};

const delBlob = (id, author) => {
  const sql = `delete from blogs where id='${id}'`;
  return exec(sql).then(delData => {
    console.log(id, author, delData);
    if (delData.affectedRows > 0) {
      return true;
    }
    return false;
  });
};

module.exports = {
  getList,
  getDetail,
  newBlob,
  updateBlob,
  delBlob
};
