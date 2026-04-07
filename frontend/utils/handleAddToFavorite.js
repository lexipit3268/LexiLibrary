import { ElMessage } from 'element-plus'

const handleAddToFavorite = async (id, title) => {
  ElMessage({
    type: 'success',
    message: `Đã thêm "${title}" vào danh sách yêu thích!`,
    offset: 100,
  })
}

export default handleAddToFavorite
