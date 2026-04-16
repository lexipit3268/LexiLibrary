<template>
  <div class="p-6 bg-(--bg-primary) min-h-[calc(100vh-80px)] overflow-y-auto text-(--text-color)">
    <button
      @click="$router.push('/staff/borrowing-management')"
      class="cursor-pointer mb-6 flex items-center gap-2 text-(--subtext-color) hover:text-(--primary) transition-colors text-sm font-bold uppercase tracking-widest"
    >
      <FontAwesomeIcon :icon="faArrowLeft" />
      Quay lại danh sách
    </button>

    <div
      v-if="detail"
      class="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in max-w-7xl mx-auto"
    >
      <div class="lg:col-span-1">
        <div class="bg-white p-6 shadow-sm border border-(--primary)/10 h-full">
          <h3 class="newsreaderFont text-xl mb-6 flex items-center gap-3">
            <span class="w-6 h-px bg-(--primary)"></span>
            Chi tiết phiếu mượn
          </h3>

          <div class="space-y-4">
            <div class="flex justify-between items-center border-b border-(--bg-primary) pb-2">
              <span class="text-xs uppercase tracking-widest text-(--subtext-color) font-bold"
                >Mã phiếu</span
              >
              <span class="text-sm font-bold text-(--primary)">{{ detail.maPhieu }}</span>
            </div>

            <div class="flex justify-between items-center border-b border-(--bg-primary) pb-2">
              <span class="text-xs uppercase tracking-widest text-(--subtext-color) font-bold"
                >Trạng thái</span
              >
              <div
                :class="getStatusClass(detail.trangThai)"
                class="px-3 py-1 text-xs font-bold uppercase tracking-widest border"
              >
                {{ formatStatus(detail.trangThai) }}
              </div>
            </div>

            <div class="flex justify-between items-center border-b border-(--bg-primary) pb-2">
              <span class="text-xs uppercase tracking-widest text-(--subtext-color) font-bold"
                >Ngày lập</span
              >
              <span class="text-sm font-bold">{{ formatDate(detail.ngayTaoPhieu) }}</span>
            </div>

            <div class="flex justify-between items-center border-b border-(--bg-primary) pb-2">
              <span class="text-xs uppercase tracking-widest text-(--subtext-color) font-bold"
                >Số lượng</span
              >
              <span class="text-sm font-bold">{{ detail.soLuong }} quyển</span>
            </div>
          </div>

          <div class="mt-8 p-5 bg-(--bg-primary)/40 border border-(--primary)/5">
            <div class="space-y-4">
              <div>
                <p class="text-xs uppercase text-(--subtext-color) mb-1 font-bold tracking-tight">
                  Ngày mượn sách
                </p>
                <p class="text-sm font-bold">{{ formatDate(detail.ngayMuon) }}</p>
              </div>
              <div class="pt-3 border-t border-(--primary)/10">
                <p class="text-xs uppercase text-(--primary) mb-1 font-bold tracking-tight">
                  Hạn trả dự kiến
                </p>
                <p class="text-sm font-bold text-(--primary)">
                  {{ formatDate(detail.ngayCanTra) }}
                </p>
              </div>
              <div v-if="detail.ngayTra" class="pt-3 border-t border-(--primary)/10">
                <p class="text-xs uppercase text-green-600 mb-1 font-bold tracking-tight">
                  Ngày trả thực tế
                </p>
                <p class="text-sm font-bold text-green-600">{{ formatDate(detail.ngayTra) }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="lg:col-span-2 flex flex-col gap-6">
        <div class="bg-white p-6 shadow-sm border border-(--primary)/10">
          <h3 class="newsreaderFont text-xl mb-5 flex items-center gap-3">
            <span class="w-6 h-px bg-(--primary)"></span>
            Thông tin độc giả
          </h3>
          <div class="flex items-center gap-6">
            <div
              class="w-16 h-16 rounded-full border border-(--primary)/20 overflow-hidden shrink-0"
            >
              <img
                :src="detail.userDetails?.hinhAnh || defaultAvatar"
                class="w-full h-full object-cover"
              />
            </div>
            <div class="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-3 grow">
              <div>
                <p class="text-xs uppercase text-(--subtext-color) font-bold">Họ và tên</p>
                <p class="text-sm font-bold text-(--text-color-2)">
                  {{ detail.userDetails?.hoLot }} {{ detail.userDetails?.ten }}
                </p>
              </div>
              <div>
                <p class="text-xs uppercase text-(--subtext-color) font-bold">Mã độc giả</p>
                <p class="text-sm font-bold">{{ detail.userDetails?.maDocGia }}</p>
              </div>
              <div>
                <p class="text-xs uppercase text-(--subtext-color) font-bold">Số điện thoại</p>
                <p class="text-sm font-bold">{{ detail.userDetails?.soDienThoai }}</p>
              </div>
              <div>
                <p class="text-xs uppercase text-(--subtext-color) font-bold">Email</p>
                {{ detail.userDetails?.email }}
              </div>
              <div>
                <p class="text-xs uppercase text-(--subtext-color) font-bold">Địa chỉ</p>
                {{ detail.userDetails?.diaChi }}
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white p-6 shadow-sm border border-(--primary)/10 grow">
          <h3 class="newsreaderFont text-xl mb-5 flex items-center gap-3">
            <span class="w-6 h-px bg-(--primary)"></span>
            Thông tin tác phẩm
          </h3>

          <div class="flex gap-6">
            <div class="w-28 shrink-0">
              <div class="aspect-2/3 border border-(--bg-primary) overflow-hidden shadow-md">
                <img :src="detail.bookDetails?.hinhAnh" class="w-full h-full object-cover" />
              </div>
            </div>

            <div class="grow space-y-4">
              <div>
                <h2 class="text-xl font-bold text-(--text-color-2) leading-tight">
                  {{ detail.bookDetails?.maSach }} &mdash; {{ detail.bookDetails?.tenSach }}
                </h2>
                <p class="text-sm font-semibold text-(--subtext-color)">
                  Tác giả:
                  <span class="text-(--text-color)">{{ detail.bookDetails?.tacGia }}</span>
                </p>
              </div>

              <div class="flex gap-10 border-y border-(--bg-primary) py-3">
                <div>
                  <p class="text-xs uppercase text-(--subtext-color) font-semibold">Nhà xuất bản</p>
                  <p class="text-sm font-bold">{{ getPublisherName(detail.bookDetails?.maNXB) }}</p>
                </div>
                <div>
                  <p class="text-xs uppercase text-(--subtext-color) font-semibold">Năm xuất bản</p>
                  <p class="text-sm font-bold">{{ detail.bookDetails?.namXuatBan }}</p>
                </div>
              </div>

              <div>
                <p class="text-xs uppercase font-semibold text-(--subtext-color) mb-1">
                  Mô tả ngắn
                </p>
                <p class="text-sm leading-relaxed opacity-80 line-clamp-4 text-justify">
                  {{ detail.bookDetails?.moTa }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'
import borrowingService from '@/services/borrowing.service'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { formatDate } from '../../../utils/formatDate'
import { formatStatus, getStatusClass } from '../../../utils/formatBorrowingStatus'
import { useStaffStore } from '@/stores/staff'
import { storeToRefs } from 'pinia'
import router from '@/router'
import { ElMessage } from 'element-plus'

const props = defineProps({
  maPhieu: String,
})

const staffStore = useStaffStore()
const { publishers } = storeToRefs(staffStore)

const rawData = ref([])
const defaultAvatar =
  'https://img.freepik.com/premium-vector/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3407.jpg'

const detail = computed(() => rawData.value[0] || null)

const getPublisherName = (maNXB) => {
  if (!publishers.value || publishers.value.length === 0) return 'Đang nạp dữ liệu...'
  const found = publishers.value.find((p) => p.maNXB === maNXB)
  return found ? found.tenNXB : 'NXB không xác định'
}

onMounted(async () => {
  try {
    await staffStore.fetchAllData()
    rawData.value = await borrowingService.findOne(props.maPhieu)
  } catch (error) {
    if (error.message.includes('404')) {
      router.replace('/staff/borrowing-management')
      ElMessage({ message: 'Không tìm thấy phiếu với phiếu này', offset: 100, type: 'warning' })
    }
  }
})
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.5s ease-out forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
