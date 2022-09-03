const _ = require('lodash');

const mostBlogs = blogs => {

  if (blogs.length === 0) return null;

  const authorsArray = blogs.map(item => item.author);
 
  const o = _.countBy(authorsArray)
  const maxCount = Math.max(...Object.values(o))
  const authorWithMaxCount = Object.keys(o).find(key => o[key] === maxCount);

  return {
    author: authorWithMaxCount,
    blogs: maxCount
  }
}

module.exports = mostBlogs;