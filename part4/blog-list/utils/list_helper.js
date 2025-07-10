const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return undefined
  }
  return blogs.reduce((max, blog) => blog.likes > max.likes ? blog : max)
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return undefined
  }
  
  const authorCounts = blogs.reduce((counts, blog) => {
    counts[blog.author] = (counts[blog.author] || 0) + 1
    return counts
  }, {})
  
  const [author, count] = Object.entries(authorCounts).reduce((max, [author, count]) => 
    count > max[1] ? [author, count] : max
  )
  
  return { author, blogs: count }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return undefined
  }
  
  const authorLikes = blogs.reduce((likes, blog) => {
    likes[blog.author] = (likes[blog.author] || 0) + blog.likes
    return likes
  }, {})
  
  const [author, likes] = Object.entries(authorLikes).reduce((max, [author, likes]) => 
    likes > max[1] ? [author, likes] : max
  )
  
  return { author, likes }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
