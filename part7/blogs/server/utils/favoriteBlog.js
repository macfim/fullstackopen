
const favoriteBlog = blogs => {

  const likesArray = blogs.map(item => item.likes);

  const index = likesArray.indexOf(Math.max(...likesArray));
  const object = blogs[index];

  if (object) return {
    title: object.title,
    author: object.author,
    likes: object.likes
  };
  else return null; 
}

module.exports = favoriteBlog;