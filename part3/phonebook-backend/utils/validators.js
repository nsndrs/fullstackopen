// Validate person data for POST and PUT requests
const validatePersonData = (body) => {
  // Validate required fields
  if (!body.name || !body.number) {
    return { error: 'name or number missing' }
  }

  // Validate input types and format
  if (typeof body.name !== 'string' || typeof body.number !== 'string') {
    return { error: 'name and number must be strings' }
  }

  // Trim whitespace
  const trimmedName = body.name.trim()
  const trimmedNumber = body.number.trim()

  if (!trimmedName || !trimmedNumber) {
    return { error: 'name and number cannot be empty or only whitespace' }
  }

  return {
    isValid: true,
    data: {
      name: trimmedName,
      number: trimmedNumber
    }
  }
}

module.exports = {
  validatePersonData
}