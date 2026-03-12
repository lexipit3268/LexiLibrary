const handleRequest = async (request) => {
  try {
    const response = await request
    return response
  } catch (error) {
    console.error('Lỗi API:', error)
    throw error
  }
}

export default handleRequest
