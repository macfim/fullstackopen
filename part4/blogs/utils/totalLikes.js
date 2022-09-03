
const totalLikes = blogs => {

  let sum = blogs.reduce((prev, curr) => prev + curr.likes, 0);
  return sum;
}

module.exports = totalLikes;