<template>
  <div class="min-h-140 bg-[--bg-primary]">
    <div class="h-1 w-full bg-(--primary)"></div>

    <div v-if="cartItems.length > 0" class="max-w-6xl mx-auto px-6 py-14">
      <div class="mb-12">
        <div class="flex items-end justify-between">
          <div class="space-y-2">
            <h1 class="newsreaderFont text-6xl text-(--text-color-2) italic leading-none">
              Thông tin phiếu mượn
            </h1>
            <p class="text-(--secondary) text-sm italic opacity-80">
              Xác nhận thời gian và thông tin trước khi nhận sách
            </p>
          </div>
          <div class="text-right hidden sm:block">
            <span class="text-5xl font-black text-(--primary) leading-none">
              {{ cartItems.length }}
            </span>
            <p class="text-[10px] uppercase tracking-[0.25em] text-(--secondary) mt-1">phiếu</p>
          </div>
        </div>
        <div class="mt-6 flex items-center gap-3">
          <div class="h-px flex-1 bg-[#e8d5c4]"></div>
          <div class="w-1.5 h-1.5 rounded-full bg-(--primary)"></div>
          <div class="h-px w-12 bg-(--primary)"></div>
          <div class="w-1.5 h-1.5 rounded-full bg-(--primary)"></div>
          <div class="h-px flex-1 bg-[#e8d5c4]"></div>
        </div>
      </div>

      <div class="flex flex-col lg:flex-row gap-10 items-start">
        <div class="flex-1 space-y-6">
          <div
            v-for="(item, index) in cartItems"
            :key="item._id"
            class="bg-white border border-[#f0e2d4] relative group"
            data-aos="fade-up"
            :data-aos-delay="(index % 4) * 50"
            data-aos-once="true"
          >
            <div class="flex flex-col md:flex-row gap-2">
              <div class="flex gap-6 flex-1">
                <div class="w-28 h-full min-h-40 bg-[#f7ede2] flex items-center justify-center p-3">
                  <div class="relative shadow-[4px_4px_16px_rgba(100,60,30,0.2)]">
                    <img :src="item.bookDetails?.hinhAnh" class="w-20 h-32 object-cover" />
                    <div
                      class="absolute inset-y-0 left-0 w-1 bg-linear-to-r from-black/20 to-transparent"
                    ></div>
                  </div>
                </div>
                <div class="space-y-2 py-6">
                  <h3 class="newsreaderFont text-2xl font-semibold text-(--text-color-2)">
                    {{ item.bookDetails?.tenSach }}
                  </h3>
                  <p class="text-(--secondary) text-xs italic">{{ item.bookDetails?.tacGia }}</p>
                  <div class="flex items-center gap-4 mt-4">
                    <span class="text-[10px] uppercase tracking-widest text-[#b09a8c] font-bold"
                      >SL: {{ item.soLuong }} quyển</span
                    >
                    <button
                      @click="removeItem(item._id)"
                      class="text-red-400 hover:text-red-600 text-[10px] uppercase font-bold tracking-widest underline underline-offset-4 cursor-pointer"
                    >
                      Hủy mượn
                    </button>
                  </div>
                </div>
              </div>

              <div class="md:w-72 flex flex-col gap-3 py-6 px-3">
                <label class="text-[10px] uppercase tracking-[0.2em] text-[#b09a8c] font-bold"
                  >Thời gian mượn dự kiến</label
                >
                <ElDatePicker
                  v-model="dates[item._id]"
                  type="daterange"
                  range-separator="-"
                  start-placeholder="Ngày mượn"
                  end-placeholder="Ngày trả"
                  format="DD-MM-YYYY"
                  value-format="YYYY-MM-DD"
                  :clearable="false"
                  class="date-picker-refined"
                />
                <p class="text-[9px] text-[#c5b5ab] italic">
                  * Mặc định mượn trong 14 ngày kể từ hôm nay
                </p>
              </div>
            </div>
          </div>

          <button @click="$router.push('/cart')" class="secondary-btn mt-4">
            Quay lại chỉnh sửa giỏ hàng
          </button>
        </div>

        <div class="lg:w-80 w-full sticky top-28">
          <div class="bg-white border border-[#e8d5c4] shadow-[0_4px_24px_rgba(212,140,106,0.10)]">
            <div class="bg-[#3a2a1e] px-6 py-5">
              <p class="text-[9px] uppercase tracking-[0.35em] text-(--primary) mb-1">
                Xác nhận cuối
              </p>
              <h3 class="newsreaderFont text-3xl text-white italic">Tổng phiếu</h3>
            </div>

            <div class="p-6 space-y-6">
              <div class="space-y-4">
                <div class="flex justify-between text-xs">
                  <span class="text-(--secondary) italic">Người mượn:</span>
                  <span class="font-bold text-(--text-color-2)">{{ authStore.user.name }}</span>
                </div>
                <div class="flex justify-between text-xs">
                  <span class="text-(--secondary) italic">Mã độc giả:</span>
                  <span class="font-bold text-(--text-color-2)">{{ authStore.user?.code }}</span>
                </div>
                <div class="flex justify-between text-xs border-t border-[#f5ece4] pt-4">
                  <span class="text-(--secondary) italic">Tổng cộng phiếu:</span>
                  <span class="font-black text-(--primary) text-lg"
                    >{{ cartItems.length }} phiếu</span
                  >
                </div>
              </div>

              <div class="p-4 bg-(--bg-primary) border border-(--bg-secondary) space-y-2">
                <p class="text-[10px] text-(--text-color-2) leading-relaxed italic">
                  * Hệ thống sẽ tự động tạo mã phiếu <strong>MP</strong> riêng biệt cho từng cuốn
                  sách bạn đã chọn.
                </p>
              </div>

              <button
                @click="handleCreateBorrowing"
                :disabled="isProcessing"
                class="primary-btn w-full py-4! text-[10px]! tracking-[0.25em] font-bold uppercase disabled:opacity-50"
              >
                {{ isProcessing ? 'Đang tạo phiếu...' : 'Xác nhận mượn sách' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="py-32 text-center">
      <h2 class="newsreaderFont text-4xl italic text-[#c5b5ab]">Không có dữ liệu để tạo phiếu</h2>
      <button @click="$router.push('/book')" class="primary-btn py-4 mt-8 px-10">
        Quay lại kho sách
      </button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed, ref, reactive } from 'vue'
import { useCartStore } from '@/stores/cart'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import { ElDatePicker, ElMessage, ElMessageBox } from 'element-plus'
import borrowingService from '@/services/borrowing.service'
import dayjs from 'dayjs'
import { getToday } from '../../../utils/formatDate'

const authStore = useAuthStore()
const cartStore = useCartStore()
const router = useRouter()

const isProcessing = ref(false)
const cartItems = computed(() => cartStore.cartItems)

//  { item_id: [ngayMuon, ngayCanTra] }
const dates = reactive({})
const today = getToday()
const twoWeeksLater = dayjs().add(14, 'day').format('YYYY-MM-DD')

const initDates = () => {
  cartItems.value.forEach((item) => {
    const start = today
    const end = twoWeeksLater
    dates[item._id] = [start, end]
  })
}

const handleCreateBorrowing = async () => {
  try {
    await ElMessageBox.confirm(
      'Hệ thống sẽ tiến hành tạo các phiếu mượn. Bạn có chắc chắn muốn tiếp tục?',
      'Xác nhận mượn',
      { confirmButtonText: 'Xác nhận', cancelButtonText: 'Hủy' },
    )

    isProcessing.value = true
    for (const item of cartItems.value) {
      const selectedDates = dates[item._id]
      if (selectedDates[0] < today) {
        throw new Error('Vui lòng chọn ngày bắt đầu từ hôm nay')
      }
      if (selectedDates[1] > twoWeeksLater) {
        throw new Error('Giới hạn mượn là 2 tuần')
      }
      const payload = {
        maDocGia: authStore.user.code,
        maSach: item.maSach,
        soLuong: item.soLuong,
        ngayMuon: selectedDates[0],
        ngayCanTra: selectedDates[1],
      }

      await borrowingService.create(payload)
    }

    ElMessage({
      type: 'success',
      message: 'Toàn bộ phiếu mượn đã được tạo thành công!',
      offset: 100,
    })
    await cartStore.resetCart(authStore.user.code)
    router.push('/cart/finish')
  } catch (error) {
    if (error !== 'cancel') {
      let errMsg = 'Có lỗi xảy ra khi tạo phiếu mượn: ' + error
      const errResponse = error?.response?.data?.message

      if (errResponse && String(errResponse).includes('limit')) {
        errMsg = 'Việc mượn này sẽ vượt quá giới hạn 5 quyển sách'
      }

      ElMessage({
        type: 'error',
        message: errMsg,
        offset: 100,
      })
    }
  } finally {
    isProcessing.value = false
  }
}

const removeItem = async (id) => {
  try {
    await cartStore.removeFromCart(id)
    ElMessage({
      type: 'success',
      message: 'Đã gỡ bỏ khỏi danh sách chuẩn bị mượn',
      offset: 100,
    })
    await cartStore.fetchCart(authStore.user.code)
  } catch (e) {
    ElMessage({
      type: 'error',
      message: 'Lỗi khi xóa ' + e,
      offset: 100,
    })
  }
}

onMounted(async () => {
  if (authStore.user?.code) {
    await cartStore.fetchCart(authStore.user.code)
    initDates()
  }
})
</script>

<style scoped>
:deep(.date-picker-refined) {
  width: 100% !important;
  background-color: var(--bg-primary) !important;
  border: 1px solid #f0e2d4 !important;
  box-shadow: none !important;
}

:deep(.el-range-input) {
  font-family: 'Newsreader', serif !important;
  font-size: 13px !important;
  color: var(--text-color-2) !important;
}
</style>
