import { ElMessage } from 'element-plus'

const handleRequest = async (request) => {
  try {
    const response = await request
    if (!response) throw new Error('No response from server')
    return response
  } catch (error) {
    if (error.response && error.response.data) {
      const serverMessage = error.response.data.message
      console.log('Lỗi từ Backend:', serverMessage)
      throw error
    } else {
      ElMessage.error('Có lỗi xảy ra, vui lòng thử lại sau')
    }

    return null
  }
}

export default handleRequest
