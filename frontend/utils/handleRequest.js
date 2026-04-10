import { ElMessage } from 'element-plus'

const handleRequest = async (request) => {
  try {
    const response = await request
    return response
  } catch (error) {
    if (error.response && error.response.data) {
      const serverMessage = error.response.data.message

      ElMessage.error({ message: serverMessage, offset: 100 })
      console.log('Lỗi từ Backend:', serverMessage)
    } else {
      ElMessage.error('Có lỗi xảy ra, vui lòng thử lại sau')
    }

    return null
  }
}

export default handleRequest
