const _ = require('lodash');

const mostLikes = blogs => {

  if (blogs.length === 0) return null;

  let authorsArray = blogs.map(item => item.author);
  authorsArray = _.uniq(authorsArray)

  const array = authorsArray.map(item => {
    return {
      author: item,
      likes: 0
    }
  })

  for (let i = 0; i < blogs.length; i++) {
    for (let j = 0; j < array.length; j++) {
      if (_.isEqual(blogs[i].author,array[j].author)) {
        array[j].likes += blogs[i].likes;
      }
    }
  }
  
  const maxLikes = Math.max(...array.map(item => item.likes));
  const authorwithMaxLikes =
   array.filter(item => item.likes === maxLikes)[0].author;
  
  return {
    author: authorwithMaxLikes,
    likes: maxLikes
  }
}

module.exports = mostLikes;