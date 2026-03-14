<template>
  <div
    class="p-6 font-['Montserrat'] bg-(--bg-primary) min-h-[calc(100vh-80px)] overflow-y-auto text-(--text-color)"
  >
    <div class="bg-white p-6 shadow-sm border border-(--primary)/10 flex flex-col min-h-100">
      <div class="flex items-center justify-between mb-8">
        <h3 class="newsreaderFont text-2xl flex items-center gap-3">
          <span class="w-8 h-px bg-(--primary)"></span>
          Quản lý mượn & trả sách
        </h3>

        <button
          @click="refresh()"
          class="primary-btn px-6! py-3! flex items-center gap-2 font-bold shadow-lg shadow-(--primary)/20"
        >
          <span class="text-xs uppercase tracking-widest">Đồng bộ dữ liệu</span>
        </button>
      </div>

      <div class="overflow-x-auto grow min-h-104">
        <table class="w-full text-left border-collapse table-fixed">
          <thead>
            <tr
              class="text-[9px] uppercase tracking-widest text-(--subtext-color) font-black border-b border-(--bg-secondary)"
            >
              <th class="px-4 pb-4 w-32">Mã phiếu</th>
              <th class="px-4 pb-4 w-64">Độc giả</th>
              <th class="px-4 pb-4">Thông tin Tác phẩm</th>
              <th class="px-4 pb-4 w-48 text-center">Ngày mượn/Hạn trả</th>
              <th class="px-4 pb-4 w-40 text-center">Ngày trả</th>
              <th class="px-4 pb-4 w-36 text-center">Trạng thái</th>
              <th class="px-4 pb-4 w-20 text-right">Xử lý</th>
            </tr>
          </thead>

          <tbody class="divide-y divide-(--bg-primary)">
            <tr
              v-for="(borrowing, index) in paginatedBorrowings"
              :key="borrowing.maPhieu"
              class="group hover:bg-(--bg-primary)/50 h-24 transition-colors duration-300"
              data-aos="fade-in"
              data-aos-offset="0"
              :data-aos-delay="(index % 4) * 100"
              data-aos-once="true"
            >
              <td
                class="px-4 py-4 text-[11px] font-black text-(--primary) newsreaderFont tracking-tighter"
              >
                {{ borrowing.maPhieu }}
              </td>

              <td class="px-4 py-4">
                <div class="flex items-center gap-3">
                  <div
                    class="w-10 h-10 rounded-full border border-(--primary)/20 overflow-hidden shrink-0"
                  >
                    <img :src="borrowing.userDetails?.hinhAnh" class="w-full h-full object-cover" />
                  </div>
                  <div class="flex flex-col truncate">
                    <p class="text-sm text-(--text-color-2) truncate">
                      {{ borrowing.userDetails?.hoLot }} {{ borrowing.userDetails?.ten }}
                    </p>
                    <p class="text-[10px] text-(--subtext-color) font-semibold truncate">
                      {{ borrowing.userDetails?.maDocGia }}
                    </p>
                    <p class="text-[10px] text-(--subtext-color) italic truncate">
                      {{ borrowing.userDetails?.email }}
                    </p>
                  </div>
                </div>
              </td>

              <td class="px-4 py-4">
                <div class="flex flex-col">
                  <p class="text-sm font-semibold leading-tight text-(--text-color-2)">
                    {{ borrowing.maSach }} — {{ borrowing.bookDetails?.tenSach }}
                  </p>
                  <p
                    class="text-[9px] text-(--subtext-color) mt-0.5 uppercase tracking-widest font-medium"
                  >
                    Số lượng: {{ borrowing.soLuong }} bản
                  </p>
                </div>
              </td>

              <td class="px-4 py-4 text-center">
                <div class="inline-flex flex-col items-center">
                  <span class="text-xs font-bold text-(--text-color-2)">{{
                    formatDate(borrowing.ngayMuon)
                  }}</span>
                  <div class="w-12 h-px bg-(--bg-secondary) my-1"></div>
                  <span class="text-xs font-bold text-(--primary)">{{
                    formatDate(borrowing.ngayCanTra)
                  }}</span>
                </div>
              </td>

              <td class="px-4 py-4 text-center">
                <div class="w-full min-h-10 flex flex-col justify-center items-center">
                  <template v-if="borrowing.ngayTra">
                    <span class="text-xs font-bold newsreaderFont">{{
                      formatDate(borrowing.ngayTra)
                    }}</span>
                  </template>
                  <template v-else>
                    <span class="text-[18px] text-(--bg-secondary) font-light">—</span>
                  </template>
                </div>
              </td>

              <td class="px-4 py-4 text-center">
                <div
                  class="inline-block px-3 py-1 w-24 h-6 text-[9px] font-semibold uppercase tracking-widest border border-transparent transition-all"
                  :class="getStatusClass(borrowing.trangThai)"
                >
                  {{ formatStatus(borrowing.trangThai) }}
                </div>
              </td>

              <td class="px-4 py-4 text-right">
                <el-dropdown
                  v-if="borrowing.trangThai !== 'DaHuy'"
                  trigger="click"
                  @command="(cmd) => handleStatusChange(borrowing, cmd)"
                >
                  <button
                    class="staff-header-icon w-8! h-8! bg-white! border border-(--primary)/20 hover:text-(--secondary) transition-all active:scale-90"
                  >
                    <FontAwesomeIcon :icon="faEllipsis" />
                  </button>
                  <template #dropdown>
                    <el-dropdown-menu class="rounded-none! border-(--primary)/20!">
                      <el-dropdown-item command="DaDuyet">Duyệt phiếu</el-dropdown-item>
                      <el-dropdown-item command="DangMuon">Đã lấy sách</el-dropdown-item>
                      <el-dropdown-item command="DaTra" class="text-green-600!"
                        >Đã trả sách</el-dropdown-item
                      >
                      <el-dropdown-item command="TuChoi" class="text-red-500!"
                        >Từ chối</el-dropdown-item
                      >
                    </el-dropdown-menu>
                  </template>
                </el-dropdown>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="flex justify-between items-center border-t border-(--bg-primary) mt-3 pt-4">
        <div class="flex flex-col gap-1">
          <p class="text-[11px] italic opacity-70">
            Hiển thị {{ paginatedBorrowings.length }} trên tổng số {{ borrowings.length }} phiếu
            mượn.
          </p>
        </div>

        <ElPagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[4, 8, 16, 32]"
          :total="borrowings.length"
          layout="total, sizes, prev, pager, next"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          class="custom-pagination"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useBorrowingStore } from '@/stores/borrowing'
import { ElMessage, ElPagination } from 'element-plus'
import { formatDate, getToday } from '../../../utils/formatDate'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faEllipsis } from '@fortawesome/free-solid-svg-icons'

const borrowingStore = useBorrowingStore()
const borrowings = ref([])

const formatStatus = (status) => {
  const map = {
    DangCho: 'Đang Chờ',
    DaDuyet: 'Đã Duyệt',
    DangMuon: 'Đang Mượn',
    DaTra: 'Đã Trả',
    TuChoi: 'Từ Chối',
    DaHuy: 'Đã Hủy',
  }
  return map[status] || status
}

const getStatusClass = (status) => {
  switch (status) {
    case 'DangCho':
      return 'bg-(--bg-quaternary) text-(--text-color-2) border-(--secondary)/40!'
    case 'DaDuyet':
    case 'DangMuon':
      return 'bg-(--bg-tertiary) text-(--subtext-color) border-(--subtext-color)/40!'
    case 'DaTra':
      return 'bg-green-50 text-green-600  border-green-200!'
    case 'TuChoi':
    case 'DaHuy':
      return 'bg-red-50 text-red-600 border-red-200!'
    default:
      return 'bg-(--bg-primary) text-(--subtext-color) border-(--bg-secondary)!'
  }
}

const handleStatusChange = async (borrowing, newStatus) => {
  try {
    borrowing.trangThai = newStatus
    let ngayTra = null
    if (newStatus === 'DaTra') {
      ngayTra = getToday()
    } else {
      ngayTra = null
    }
    borrowing.ngayTra = ngayTra

    const response = await borrowingStore.updateStatus(borrowing.maPhieu, {
      trangThai: newStatus,
      ngayTra: ngayTra,
    })

    if (response) {
      ElMessage({
        type: 'success',
        message: `Đã cập nhật phiếu ${borrowing.maPhieu} sang ${formatStatus(newStatus)}`,
        offset: 100,
      })
    }
  } catch (error) {
    ElMessage({
      type: 'error',
      message: 'Lỗi: ' + error,
      offset: 100,
    })
  }
}

const refresh = async () => {
  await borrowingStore.fetchBorrowings()
  const data = borrowingStore.borrowings
  borrowings.value = data.reverse()
}

onMounted(async () => {
  await borrowingStore.fetchBorrowings()
  const data = borrowingStore.borrowings
  borrowings.value = data.reverse()
})

const currentPage = ref(1)
const pageSize = ref(4)

const paginatedBorrowings = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return borrowings.value.slice(start, end)
})

const handleSizeChange = (val) => {
  pageSize.value = val
  currentPage.value = 1
}

const handleCurrentChange = (val) => {
  currentPage.value = val
}
</script>

<style scoped>
:deep(.el-dropdown-menu) {
  padding: 0 !important;
  border-radius: 0 !important;
  box-shadow: 8px 8px 0px rgba(58, 42, 30, 0.05) !important;
}

:deep(.el-dropdown-menu__item) {
  padding: 12px 20px !important;
  font-size: 11px !important;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

:deep(.el-dropdown-menu__item:hover) {
  background-color: var(--bg-primary) !important;
  color: var(--primary) !important;
}
</style>
