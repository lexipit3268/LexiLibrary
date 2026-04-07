const handleRequest = async (request) => {
  try {
    const response = await request
    return response
  } catch (error) {
    console.log('Lỗi API: ', error)
    throw error
  }
}

export default handleRequest
