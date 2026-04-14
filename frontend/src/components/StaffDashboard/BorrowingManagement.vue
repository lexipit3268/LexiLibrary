<template>
  <div class="p-6 bg-(--bg-primary) min-h-[calc(100vh-80px)] overflow-y-auto text-(--text-color)">
    <div class="bg-white p-6 shadow-sm border border-(--primary)/10 flex flex-col min-h-100">
      <div class="flex items-center justify-between mb-8">
        <h3 class="newsreaderFont text-2xl flex items-center gap-3">
          <span class="w-8 h-px bg-(--primary)"></span>
          Danh sách phiếu mượn
        </h3>

        <button
          @click="refresh()"
          class="primary-btn px-6! py-3! flex items-center gap-2 font-bold shadow-lg shadow-(--primary)/20"
        >
          <span class="text-xs uppercase tracking-widest">Đồng bộ dữ liệu</span>
        </button>
      </div>

      <div class="overflow-x-auto grow min-h-104">
        <table class="w-full text-left border-collapse table-fixed" v-if="paginatedBorrowings">
          <thead>
            <tr
              class="text-[10px] uppercase tracking-widest text-(--subtext-color) font-black border-b border-(--bg-secondary)"
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
              <td class="px-4 py-4 text-xs font-bold text-(--primary) tracking-tighter">
                {{ borrowing.maPhieu }}
              </td>

              <td class="px-4 py-4">
                <div class="flex items-center gap-3">
                  <div
                    class="w-10 h-10 rounded-full border border-(--primary)/20 overflow-hidden shrink-0"
                  >
                    <img
                      :src="
                        borrowing.userDetails.hinhAnh
                          ? borrowing.userDetails.hinhAnh
                          : `https://img.freepik.com/premium-vector/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3407.jpg`
                      "
                      class="w-full h-full object-cover"
                    />
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
                    <span class="text-xs font-bold">{{ formatDate(borrowing.ngayTra) }}</span>
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
                  v-if="
                    borrowing.trangThai !== 'DaHuy' &&
                    borrowing.trangThai !== 'DaTra' &&
                    borrowing.trangThai !== 'TuChoi'
                  "
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
                      <el-dropdown-item
                        v-if="
                          borrowing.trangThai === 'DangCho' && borrowing.trangThai !== 'DaDuyet'
                        "
                        command="DaDuyet"
                        >Duyệt phiếu</el-dropdown-item
                      >
                      <el-dropdown-item
                        v-if="borrowing.trangThai === 'DangCho'"
                        command="TuChoi"
                        class="text-red-500!"
                        >Từ chối
                      </el-dropdown-item>
                      <el-dropdown-item
                        v-if="
                          borrowing.trangThai === 'DaDuyet' && borrowing.trangThai !== 'DangMuon'
                        "
                        command="DangMuon"
                        >Đã lấy sách</el-dropdown-item
                      >
                      <el-dropdown-item
                        v-if="borrowing.trangThai === 'DangMuon' && borrowing.trangThai !== 'DaTra'"
                        command="DaTra"
                        class="text-green-600!"
                        >Đã trả sách</el-dropdown-item
                      >
                    </el-dropdown-menu>
                  </template>
                </el-dropdown>
              </td>
            </tr>
          </tbody>
        </table>
        <div v-else class="flex flex-col items-center justify-center py-14 text-center">
          <div class="relative mb-8">
            <div class="w-28 h-28 rounded-full bg-[#f7ede2] flex items-center justify-center">
              <span class="newsreaderFont text-6xl italic text-[#d4c0b0] mr-2">∅</span>
            </div>
            <div
              class="absolute -top-1 -right-1 w-5 h-5 rounded-full border-2 border-white bg-(--primary) opacity-60"
            ></div>
            <div
              class="absolute -bottom-2 -left-2 w-3 h-3 rounded-full border-2 border-white bg-[#faedcd]"
            ></div>
          </div>
          <p class="text-[10px] uppercase tracking-[0.35em] text-[#c5b5ab] mb-3">
            Chưa có phiếu mượn nào
          </p>
          <h2 class="newsreaderFont text-4xl italic text-[#c5b5ab] mb-8">
            Danh sách mượn & trả trống...
          </h2>
        </div>
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
import { ElMessage, ElMessageBox, ElPagination } from 'element-plus'
import { formatDate, getToday } from '../../../utils/formatDate'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faEllipsis } from '@fortawesome/free-solid-svg-icons'
import { formatStatus } from '../../../utils/formatStatus'

const borrowingStore = useBorrowingStore()
const borrowings = computed(() => {
  return [...borrowingStore.borrowings].reverse()
})

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
  ElMessageBox.confirm(
    `Bạn có chắc chắn đổi trạng thái phiếu ${borrowing.maPhieu} sang ${formatStatus(newStatus)} không?`,
    'Xác nhận thay đổi',
    {
      confirmButtonText: 'Xác nhận',
      cancelButtonText: 'Hủy bỏ',
    },
  ).then(async () => {
    try {
      let ngayTra = null
      if (newStatus === 'DaTra') {
        ngayTra = getToday()
      }

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
      let errMessage = 'Có lỗi xảy ra khi cập nhật phiếu mượn'
      if (error.message.toString().includes('409')) {
        errMessage = 'Trạng thái cập nhật không phù hợp'
      }
      ElMessage({
        type: 'error',
        message: errMessage,
        offset: 100,
      })
    }
  })
}

const refresh = async () => {
  await borrowingStore.fetchBorrowings()
}

onMounted(async () => {
  await refresh()
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
