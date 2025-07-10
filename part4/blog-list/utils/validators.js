// Validate blog data for POST and PUT requests
const validateBlogData = (body) => {
  // Validate required fields
  if (!body.title || !body.url) {
    return { error: 'title or url missing' }
  }

  // Validate input types and format
  if (typeof body.title !== 'string' || typeof body.url !== 'string') {
    return { error: 'title and url must be strings' }
  }

  // Optional fields validation
  if (body.author && typeof body.author !== 'string') {
    return { error: 'author must be a string' }
  }

  if (body.likes && typeof body.likes !== 'number') {
    return { error: 'likes must be a number' }
  }

  // Trim whitespace
  const trimmedTitle = body.title.trim()
  const trimmedUrl = body.url.trim()
  const trimmedAuthor = body.author ? body.author.trim() : ''

  if (!trimmedTitle || !trimmedUrl) {
    return { error: 'title and url cannot be empty or only whitespace' }
  }

  return {
    isValid: true,
    data: {
      title: trimmedTitle,
      author: trimmedAuthor || 'Anonymous',
      url: trimmedUrl,
      likes: body.likes || 0
    }
  }
}

module.exports = {
  validateBlogData
}