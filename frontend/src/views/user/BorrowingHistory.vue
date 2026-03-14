<template>
  <BreadcrumbComponent
    :title="'Lịch sử mượn'"
    :paths="[
      { label: 'Trang chủ', path: '/' },
      { label: 'Lịch sử mượn', path: '/history' },
    ]"
  />

  <div class="max-w-6xl mx-auto px-6 py-14 min-h-[60vh]">
    <div class="mb-12" data-aos-once="true" data-aos="fade-down">
      <div class="flex items-end justify-between">
        <div class="space-y-3">
          <h1 class="newsreaderFont text-6xl text-(--primary) italic leading-none">Lịch sử mượn</h1>
          <p class="text-(--subtext-color) text-[10px] uppercase tracking-[0.3em] font-bold">
            Dấu ấn những hành trình tri thức
          </p>
        </div>
        <div class="text-right hidden sm:flex gap-10 items-end">
          <div class="text-right">
            <span class="text-5xl font-black text-(--primary) opacity-30 leading-none">
              {{ borrowingStore.borrowings.length }}
            </span>
            <p class="text-[9px] uppercase tracking-[0.2em] text-(--subtext-color) mt-1 font-bold">
              Tổng số phiếu
            </p>
          </div>
          <div class="text-right border-l border-(--bg-secondary) pl-10">
            <span class="text-5xl font-black text-(--primary) leading-none">
              {{ borrowingStore.activeCount }}
            </span>
            <p class="text-[9px] uppercase tracking-[0.2em] text-(--secondary) mt-1 font-bold">
              Đang mượn hoặc chờ duyệt
            </p>
          </div>
        </div>
      </div>
      <div class="mt-6 flex items-center gap-3">
        <div class="h-px flex-1 bg-(--bg-secondary)"></div>
        <div class="w-1.5 h-1.5 rounded-full bg-(--primary)"></div>
        <div class="h-px w-12 bg-(--primary)"></div>
        <div class="w-1.5 h-1.5 rounded-full bg-(--primary)"></div>
        <div class="h-px flex-1 bg-(--bg-secondary)"></div>
      </div>
    </div>

    <div v-if="borrowingStore.borrowings.length > 0" class="space-y-8">
      <div
        v-for="(borrowing, index) in borrowingStore.borrowings"
        :key="borrowing.maPhieu"
        class="bg-white border border-(--bg-secondary) hover:border-(--primary) transition-all duration-300 flex flex-col lg:flex-row items-stretch relative group"
        data-aos-once="true"
        data-aos="fade-up"
        :data-aos-delay="index * 100"
      >
        <div
          class="lg:w-40 bg-(--bg-primary) flex items-center justify-center p-4 border-b lg:border-b-0 lg:border-r border-(--bg-secondary)"
        >
          <div class="relative shadow-lg transition-transform duration-500">
            <img :src="borrowing.bookDetails?.hinhAnh" class="w-24 h-36 object-cover" alt="Cover" />
            <div class="absolute inset-y-0 left-0 w-1 bg-black/10"></div>
          </div>
        </div>

        <div class="flex-1 p-6 flex flex-col justify-between bg-white">
          <div class="space-y-2">
            <div class="flex flex-wrap items-center gap-3">
              <span
                class="text-[9px] bg-(--text-color-2) text-(--white) px-2 py-0.5 font-bold tracking-widest uppercase"
              >
                {{ borrowing.maPhieu }}
              </span>
              <div
                :class="getStatusClass(borrowing.trangThai)"
                class="px-2 py-0.5 text-[9px] uppercase tracking-widest font-bold border"
              >
                {{ getStatusLabel(borrowing.trangThai) }}
              </div>
            </div>

            <ElTooltip
              :content="`Xem chi tiết ${borrowing.bookDetails.maSach}`"
              placement="right"
              effect="light"
            >
              <h3
                class="newsreaderFont w-fit text-2xl font-bold text-(--text-color-2) leading-tight hover:text-(--primary) transition-all duration-300 cursor-pointer"
              >
                <router-link :to="`/book/${borrowing.maSach}`" target="_blank" class="w-fit">
                  {{ borrowing.bookDetails?.tenSach }}
                </router-link>
              </h3>
              >
            </ElTooltip>
            <p class="text-(--secondary) text-[11px] uppercase tracking-wider italic">
              {{ borrowing.bookDetails?.tacGia }}
            </p>
          </div>

          <div class="mt-6 pt-4 border-t border-(--bg-primary) flex items-center gap-8">
            <div class="space-y-1">
              <p class="text-[8px] uppercase tracking-widest text-(--subtext-color) font-black">
                Số lượng
              </p>
              <p class="text-xs font-bold text-(--text-color-2)">{{ borrowing.soLuong }} quyển</p>
            </div>
            <div class="space-y-1">
              <p class="text-[8px] uppercase tracking-widest text-(--subtext-color) font-black">
                Mã sách
              </p>
              <p class="text-xs text-(--text-color-2) font-medium">{{ borrowing.maSach }}</p>
            </div>
          </div>
        </div>

        <div
          class="lg:w-72 p-6 bg-(--bg-primary)/30 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-(--bg-secondary)"
        >
          <div class="space-y-4">
            <div class="flex justify-between items-center text-[12px]">
              <span class="uppercase text-(--subtext-color) font-bold tracking-tighter"
                >Ngày mượn:</span
              >
              <span class="font-bold text-(--text-color-2)">{{
                formatDate(borrowing.ngayMuon)
              }}</span>
            </div>
            <div class="flex justify-between items-center text-[12px]">
              <span class="uppercase text-(--subtext-color) font-bold tracking-tighter"
                >Hạn trả:</span
              >
              <span class="font-black text-(--primary)">{{
                formatDate(borrowing.ngayCanTra)
              }}</span>
            </div>
            <div v-if="borrowing.ngayTra" class="flex justify-between items-center text-[12px]">
              <span class="uppercase text-(--subtext-color) font-bold tracking-tighter"
                >Ngày trả thực:</span
              >
              <span class="font-bold text-(--secondary)">{{ formatDate(borrowing.ngayTra) }}</span>
            </div>
          </div>

          <div class="mt-8">
            <button
              v-if="borrowing.trangThai === 'DangCho'"
              @click="handleCancel(borrowing.maPhieu)"
              class="secondary-btn w-full py-3 text-[10px]! border-(--primary) text-(--primary) hover:bg-(--bg-primary)"
            >
              Hủy yêu cầu mượn
            </button>
            <div v-else class="text-center py-2.5 bg-white/50 border border-(--bg-secondary)">
              <p class="text-[10px] uppercase tracking-[0.3em] text-(--subtext-color) font-bold">
                {{ borrowing.trangThai === 'DaTra' ? 'Hoàn tất' : 'Đã xác nhận' }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="flex flex-col items-center justify-center py-32 text-center">
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
      <h2 class="newsreaderFont text-4xl italic text-[#c5b5ab] mb-8">Lịch sử trống...</h2>
      <button
        @click="$router.push('/book')"
        class="primary-btn text-[10px] px-12 py-4 uppercase tracking-[0.25em] font-bold"
      >
        Khám phá kho sách
      </button>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { formatDate } from '../../../utils/formatDate'
import { useAuthStore } from '@/stores/auth'
import { useBorrowingStore } from '@/stores/borrowing'
import { ElMessageBox, ElMessage, ElTooltip } from 'element-plus'
import BreadcrumbComponent from '@/components/BreadcrumbComponent.vue'

const borrowingStore = useBorrowingStore()
const authStore = useAuthStore()

const getStatusLabel = (status) => {
  const labels = {
    DangCho: 'Đang chờ duyệt',
    DaDuyet: 'Đã chấp nhận',
    DangMuon: 'Đang mượn',
    DaTra: 'Đã hoàn trả',
    TuChoi: 'Bị từ chối',
    DaHuy: 'Đã hủy',
  }
  return labels[status] || status
}

const getStatusClass = (status) => {
  switch (status) {
    case 'DangCho':
      return 'bg-(--bg-quaternary) text-(--text-color-2) border-(--secondary)'
    case 'DaDuyet':
    case 'DangMuon':
      return 'bg-(--bg-tertiary) text-(--subtext-color) border-(--subtext-color)'
    case 'DaTra':
      return 'bg-white text-(--primary) border-(--primary)'
    case 'TuChoi':
    case 'DaHuy':
      return 'bg-red-50 text-red-600 border-red-200'
    default:
      return 'bg-(--bg-primary) text-(--subtext-color) border-(--bg-secondary)'
  }
}

const handleCancel = async (maPhieu) => {
  try {
    await ElMessageBox.confirm('Hủy yêu cầu mượn sách này?', 'Xác nhận', {
      confirmButtonText: 'Đồng ý',
      cancelButtonText: 'Quay lại',
      type: 'warning',
    })
    const success = await borrowingStore.updateStatus(maPhieu, { trangThai: 'DaHuy' })
    if (success) ElMessage.success('Đã hủy phiếu thành công')
  } catch (e) {
    if (e !== 'cancel') ElMessage.error('Lỗi hệ thống')
  }
}

onMounted(async () => {
  if (authStore.user?.code) {
    await borrowingStore.fetchBorrowings(authStore.user.code)
  }
})
</script>
