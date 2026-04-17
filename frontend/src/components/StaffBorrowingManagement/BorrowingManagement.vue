<template>
  <div class="p-6 bg-(--bg-primary) min-h-[calc(100vh-80px)] overflow-y-auto text-(--text-color)">
    <div class="bg-white p-6 shadow-sm border border-(--primary)/10 flex flex-col min-h-100">
      <div class="flex items-center justify-between mb-8">
        <h3 class="newsreaderFont text-2xl flex items-center gap-3">
          <span class="w-8 h-px bg-(--primary)"></span>
          Danh sách phiếu mượn
        </h3>

        <div class="flex gap-4 justify-center items-center">
          <button
            @click="refresh()"
            class="primary-btn min-w-fit px-5! py-2! flex items-center gap-2 font-semibold shadow-lg shadow-(--primary)/20"
          >
            <span class="text-xs uppercase tracking-widest">Đồng bộ dữ liệu</span>
          </button>

          <ElSelect
            v-model="filter"
            clearable
            placeholder="Lọc theo trạng thái..."
            class="min-w-50"
          >
            <ElOption label="Đang chờ duyệt" value="DangCho" />
            <ElOption label="Đã duyệt" value="DaDuyet" />
            <ElOption label="Đang mượn" value="DangMuon" />
            <ElOption label="Đã trả" value="DaTra" />
            <ElOption label="Đã hủy" value="DaHuy" />
            <ElOption label="Từ chối" value="TuChoi" />
          </ElSelect>
        </div>
      </div>

      <div class="overflow-x-auto grow min-h-104">
        <table
          class="w-full text-left border-collapse table-fixed"
          v-if="paginatedBorrowings.length >= 1"
        >
          <thead>
            <tr
              class="text-[10px] uppercase tracking-widest text-(--subtext-color) font-black border-b border-(--bg-secondary)"
            >
              <th class="px-4 pb-4 w-32">Mã phiếu</th>
              <th class="px-4 pb-4 w-64">Độc giả</th>
              <th class="px-4 pb-4">Thông tin Tác phẩm</th>
              <th class="px-4 pb-4 w-48 text-center">Ngày mượn/Hạn trả</th>
              <th class="px-4 pb-4 w-40 text-center">Ngày trả</th>
              <th class="px-4 pb-4 w-30 text-center">Trạng thái</th>
              <th class="px-4 pb-4 w-20"></th>
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
                <el-dropdown
                  v-if="['DangCho', 'DaDuyet', 'DangMuon'].includes(borrowing.trangThai)"
                  trigger="click"
                  @command="(cmd) => handleStatusChange(borrowing, cmd)"
                >
                  <div
                    class="cursor-pointer flex items-center justify-center w-24 h-6 text-[9px] font-semibold uppercase tracking-widest border border-transparent transition-all"
                    :class="getStatusClass(borrowing.trangThai)"
                  >
                    <span class="">{{ formatStatus(borrowing.trangThai) }}</span>
                    <FontAwesomeIcon :icon="faChevronDown" class="text-[8px] ml-2 opacity-80" />
                  </div>

                  <template #dropdown>
                    <el-dropdown-menu class="rounded-none! border-(--primary)/20!">
                      <el-dropdown-item v-if="borrowing.trangThai === 'DangCho'" command="DaDuyet"
                        >Duyệt phiếu</el-dropdown-item
                      >
                      <el-dropdown-item
                        v-if="borrowing.trangThai === 'DangCho'"
                        command="TuChoi"
                        class="text-red-500!"
                        >Từ chối</el-dropdown-item
                      >
                      <el-dropdown-item v-if="borrowing.trangThai === 'DaDuyet'" command="DangMuon"
                        >Đã lấy sách</el-dropdown-item
                      >
                      <el-dropdown-item
                        v-if="borrowing.trangThai === 'DangMuon'"
                        command="DaTra"
                        class="text-green-600!"
                        >Đã trả sách</el-dropdown-item
                      >
                    </el-dropdown-menu>
                  </template>
                </el-dropdown>

                <div
                  v-else
                  class="inline-block px-3 py-1 w-24 h-6 text-[9px] font-semibold uppercase tracking-widest border border-transparent transition-all"
                  :class="getStatusClass(borrowing.trangThai)"
                >
                  {{ formatStatus(borrowing.trangThai) }}
                </div>
              </td>
              <td
                class="px-4 py-4 max-w-16 text-center opacity-0 group-hover:opacity-100 transition-all duration-200"
              >
                <ElTooltip content="Xem chi tiết" effect="light">
                  <button
                    type="button"
                    class="cursor-pointer w-8! h-8! bg-white! border border-(--primary)/20 hover:text-(--secondary) transition-all active:scale-90 rounded-full"
                    @click="$router.push(`borrowing-management/${borrowing.maPhieu}`)"
                  >
                    <FontAwesomeIcon :icon="faEllipsis" class="text-xs" />
                  </button>
                </ElTooltip>
              </td>
            </tr>
          </tbody>
        </table>
        <EmptyView v-else title="Danh sách mượn & trả trống..." :hide-button="true" />
      </div>
      <div class="flex justify-between items-center border-t border-(--bg-primary) pt-4">
        <div class="flex flex-col gap-1">
          <p class="text-[11px] italic opacity-70">
            Hiển thị {{ paginatedBorrowings.length }} trên tổng số
            {{ filteredBorrowings.length }} phiếu mượn.
          </p>
        </div>

        <ElPagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[4, 8, 16, 32]"
          :total="filteredBorrowings.length"
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
import { ElMessage, ElMessageBox, ElOption, ElPagination, ElSelect, ElTooltip } from 'element-plus'
import { formatDate, getToday } from '../../../utils/date.util'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faEllipsis, faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { formatStatus, getStatusClass } from '../../../utils/borrowing.util'
import EmptyView from '../EmptyView.vue'

const borrowingStore = useBorrowingStore()
const borrowings = computed(() => {
  return [...borrowingStore.borrowings].reverse()
})

const filter = ref('')

const filteredBorrowings = computed(() => {
  if (!filter.value) return borrowings.value
  return borrowings.value.filter((brr) => brr.trangThai === filter.value)
})

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
  return filteredBorrowings.value.slice(start, end)
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
