<template>
  <div class="bg-(--bg-primary) p-6 overflow-y-auto">
    <div class="bg-white p-6 shadow-sm border border-(--primary)/10 flex flex-col min-h-100">
      <div class="flex items-center justify-between mb-6">
        <h3 class="newsreaderFont text-2xl flex items-center gap-3">
          <span class="w-8 h-px bg-(--primary)"></span>
          Danh sách sách
        </h3>
        <button
          class="primary-btn px-6! py-3! flex items-center gap-2 font-bold shadow-lg shadow-(--primary)/20"
          @click="router.push('/staff/book/create')"
        >
          <FontAwesomeIcon :icon="faPlus" />
          <span class="text-xs uppercase tracking-widest">Thêm sách mới</span>
        </button>
      </div>

      <div class="overflow-x-auto grow">
        <table class="w-full text-left border-spacing-y-2">
          <thead>
            <tr class="text-[9px] uppercase tracking-widest text-(--subtext-color) font-black">
              <th class="px-4 pb-2">Thông tin sách</th>
              <th class="px-4 pb-2">Nhà xuất bản</th>
              <th class="px-4 pb-2">Tác giả</th>
              <th class="px-4 pb-2 text-center">Số lượng</th>
              <th class="px-4 pb-2 text-right">Thao tác</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-(--bg-primary)">
            <tr
              v-for="book in books"
              :key="book.maSach"
              class="group hover:bg-(--bg-primary)/70 h-20 transition-colors duration-300 divide-y divide-(--bg-secondary)"
            >
              <td class="py-4 px-4 min-w-100">
                <div class="flex items-center gap-4">
                  <div
                    class="w-12 h-16 bg-(--bg-secondary) rounded flex items-center justify-center text-[10px] text-(--secondary) font-bold"
                  >
                    <img :src="book.hinhAnh" alt="" />
                  </div>
                  <div>
                    <p class="font-bold text-sm">{{ book.tenSach }}</p>
                    <p class="text-xs text-(--subtext-color)">
                      Mã sách: {{ book.maSach.toUpperCase() }}
                    </p>
                  </div>
                </div>
              </td>
              <td class="px-4 py-4">
                <p class="text-sm">{{ getPublisherName(book.maNXB) }}</p>
              </td>
              <td class="px-4 py-4">
                <p class="text-sm">{{ book.tacGia }}</p>
              </td>
              <td class="px-4 py-4 text-center">
                <span
                  class="px-2 py-1 bg-(--bg-primary) text-(--primary) rounded-full text-xs font-bold"
                  >{{ book.soQuyen }}</span
                >
              </td>
              <td class="px-4 py-4 text-right border-b border-(--bg-secondary)">
                <div
                  class="flex justify-end gap-2 opacity-40 group-hover:opacity-100 transition-opacity"
                >
                  <ElTooltip content="Xem thông tin">
                    <button
                      @click="router.push(`/staff/book/${book.maSach}`)"
                      class="staff-header-icon w-7! h-7! bg-white! border border-(--primary)/20 hover:text-(--secondary)"
                    >
                      <FontAwesomeIcon :icon="faInfo" class="text-[9px]" />
                    </button>
                  </ElTooltip>

                  <ElTooltip content="Xóa sách">
                    <button
                      @click="handleDelete(book.maSach)"
                      class="staff-header-icon w-7! h-7! bg-white! border border-red-100 hover:bg-red-50! hover:text-red-600!"
                    >
                      <FontAwesomeIcon :icon="faTrash" class="text-[9px]" />
                    </button>
                  </ElTooltip>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useStaffStore } from '@/stores/staff'
import { faInfo, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { ElMessage, ElMessageBox, ElTooltip } from 'element-plus'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
const staffStore = useStaffStore()
const { books, publishers } = storeToRefs(staffStore)

const router = useRouter()
const getPublisherName = (maNXB) => {
  if (!publishers.value || publishers.value.length === 0) return 'Đang tải...'

  const found = publishers.value.find((p) => p.maNXB === maNXB)
  return found ? found.tenNXB : 'Không xác định'
}

const handleDelete = async (maSach) => {
  try {
    await ElMessageBox.confirm(
      `Bạn có chắc chắn muốn xóa sách với mã sách là ${maSach}?`,
      'Xác nhận xóa',
      {
        confirmButtonText: 'Xác nhận',
        cancelButtonText: 'Hủy bỏ',
        type: 'warning',
      },
    )

    const success = await staffStore.removeBook(maSach)

    if (success) {
      ElMessage.success('Đã xóa sách thành công ' + maSach)
    }
  } catch (error) {
    if (error !== 'cancel') {
      ElMessage.error('Không thể xóa dữ liệu vào lúc này')
    }
  }
}
onMounted(async () => {
  await staffStore.fetchAllData()
  books.value = staffStore.books
  publishers.value = staffStore.publishers
})
</script>
