<template>
  <div class="min-h-screen bg-[--bg-primary]">
    <div class="h-1 w-full bg-(--primary)"></div>

    <div class="max-w-6xl mx-auto px-6 py-14">
      <div v-if="cartItems.length > 0">
        <div class="mb-12">
          <div class="flex items-end justify-between">
            <div>
              <h1 class="newsreaderFont text-6xl text-[#3a2a1e] italic leading-none">
                Sách đã chọn
              </h1>
            </div>
            <div class="text-right hidden sm:block">
              <span class="text-5xl font-black text-(--primary) leading-none">
                {{ cartStore.totalQuantity }}
              </span>
              <p class="text-[10px] uppercase tracking-[0.25em] text-(--secondary) mt-1">ấn phẩm</p>
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
          <div class="flex-1 space-y-5">
            <div
              v-for="(item, index) in cartItems"
              :key="item._id"
              class="group relative bg-white border border-[#f0e2d4] hover:border-(--primary) transition-all duration-300 hover:shadow-[0_8px_40px_rgba(212,140,106,0.12)] overflow-hidden"
              data-aos="fade-up"
              data-aos-once="true"
              :data-aos-delay="(index % 4) * 50"
            >
              <!-- index number -->
              <div class="absolute top-4 right-4 w-6 h-6 flex items-center justify-center">
                <span class="newsreaderFont text-[11px] italic text-[#c5a88d] font-bold">{{
                  String(index + 1).padStart(2, '0')
                }}</span>
              </div>

              <div class="flex gap-0">
                <div class="relative shrink-0">
                  <div
                    class="w-28 h-full min-h-40 bg-[#f7ede2] flex items-center justify-center p-3"
                  >
                    <div class="relative shadow-[4px_4px_16px_rgba(100,60,30,0.2)]">
                      <img :src="item.bookDetails?.hinhAnh" class="w-20 h-32 object-cover" />
                      <div
                        class="absolute inset-y-0 left-0 w-1 bg-linear-to-r from-black/20 to-transparent"
                      ></div>
                    </div>
                  </div>
                </div>

                <div class="flex-1 p-5 flex flex-col justify-between">
                  <div class="flex justify-between items-start pr-6">
                    <div class="space-y-1.5">
                      <ElTooltip
                        :content="`Xem chi tiết ${item.bookDetails.maSach}`"
                        placement="top"
                        effect="light"
                      >
                        <router-link :to="`book/${item.bookDetails.maSach}`" target="_blank">
                          <h3
                            class="newsreaderFont text-xl font-semibold text-[#3a2a1e] cursor-pointer hover:text-(--primary) transition-colors leading-tight"
                          >
                            {{ item.bookDetails?.tenSach }}
                          </h3>
                        </router-link>
                      </ElTooltip>
                      <p class="text-(--secondary) text-xs italic tracking-wide">
                        {{ item.bookDetails?.tacGia }}
                      </p>
                      <div
                        class="inline-flex items-center gap-1.5 mt-2 px-2 py-1 bg-[#fdf3ec] border border-[#f0dfd0]"
                      >
                        <span
                          class="text-[9px] uppercase tracking-[0.2em] text-(--secondary) font-bold"
                          >{{ item.maSach }}</span
                        >
                      </div>
                    </div>

                    <button
                      @click="removeItem(item._id)"
                      class="absolute top-4 right-10 text-[#c5b5ab] hover:text-red-500 transition-colors duration-200 cursor-pointer"
                      title="Gỡ bỏ"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="1.5"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>

                  <div class="flex items-center gap-4 mt-4 pt-4 border-t border-[#f5ece4]">
                    <span class="text-[10px] uppercase tracking-[0.2em] text-[#b09a8c] font-bold"
                      >Số lượng</span
                    >
                    <ElInputNumber
                      v-model="item.soLuong"
                      :min="1"
                      :max="5"
                      controls-position="right"
                      size="default"
                      class="lexi-qty-input-refined"
                      @change="handleChange"
                    >
                      <template #decrease-icon>
                        <el-icon><Minus /></el-icon>
                      </template>
                      <template #increase-icon>
                        <el-icon><Plus /></el-icon>
                      </template>
                    </ElInputNumber>
                    <span class="text-[10px] italic text-[#c5b5ab]">quyển</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="flex justify-between items-center pt-4">
              <button @click="$router.push('/book')" class="secondary-btn flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-3 h-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2.5"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
                Quay lại xem sách
              </button>

              <Transition name="slide-up">
                <button
                  v-if="isCountChanging"
                  @click="updateAllChanges"
                  class="primary-btn py-4! px-8 text-xs tracking-[0.2em] font-bold uppercase flex items-center gap-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-3.5 h-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2.5"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  Cập nhật thay đổi
                </button>
              </Transition>
            </div>
          </div>

          <div
            class="lg:w-72 w-full sticky top-28"
            data-aos="zoom-in-up"
            data-aos-once="true"
            data-aos-delay="250"
          >
            <div
              class="bg-white border border-[#e8d5c4] shadow-[0_4px_24px_rgba(212,140,106,0.10)]"
            >
              <div class="bg-[#3a2a1e] px-6 py-5">
                <p class="text-[9px] uppercase tracking-[0.35em] text-(--primary) mb-1">
                  Tóm tắt đơn
                </p>
                <h3 class="newsreaderFont text-3xl text-white italic">Giỏ mượn</h3>
              </div>

              <div class="p-6 space-y-5">
                <div class="space-y-3">
                  <div class="flex justify-between items-center">
                    <span class="text-[11px] uppercase tracking-[0.15em] text-(--secondary)"
                      >Hạn mức</span
                    >
                    <span class="text-sm font-black text-[#3a2a1e]"
                      >{{ authStore.user?.gioiHanMuon || 5 }}
                      <span class="font-normal text-(--secondary) text-xs">quyển</span></span
                    >
                  </div>
                  <div class="flex justify-between items-center">
                    <span class="text-[11px] uppercase tracking-[0.15em] text-(--secondary)"
                      >Điểm uy tín</span
                    >
                    <span
                      :class="authStore.user?.diemUyTin < 4 ? 'text-red-600' : 'text-emerald-700'"
                      class="text-sm font-black"
                    >
                      {{ authStore.user?.diemUyTin || 10
                      }}<span class="text-[#c5b5ab] font-light">/10</span>
                    </span>
                  </div>
                </div>

                <div class="flex items-center gap-2">
                  <div class="h-px flex-1 bg-[#f0e2d4]"></div>
                  <div class="w-1 h-1 rounded-full bg-(--primary)"></div>
                  <div class="h-px flex-1 bg-[#f0e2d4]"></div>
                </div>

                <div class="flex justify-between items-end">
                  <span class="newsreaderFont text-xl italic text-[#6a665f]">Tổng cộng</span>
                  <div class="text-right">
                    <span class="text-5xl font-black text-(--primary) leading-none">{{
                      cartStore.totalQuantity
                    }}</span>
                    <p class="text-[9px] uppercase tracking-[0.2em] text-(--secondary) mt-0.5">
                      quyển
                    </p>
                  </div>
                </div>

                <div
                  v-if="authStore.user?.diemUyTin < 4"
                  class="flex gap-2.5 p-3.5 bg-red-50 border border-red-200"
                >
                  <span class="text-base leading-none mt-0.5">!</span>
                  <p class="text-[10px] text-red-700 leading-relaxed">
                    Điểm uy tín không đủ. Vui lòng đợi khôi phục để tiếp tục mượn sách.
                  </p>
                </div>

                <button
                  @click="$router.push('/cart/checkout')"
                  :disabled="
                    cartItems.length === 0 || authStore.user?.diemUyTin < 4 || isCountChanging
                  "
                  class="primary-btn w-full py-4! text-[10px]! tracking-[0.25em] font-bold uppercase disabled:opacity-30 disabled:grayscale disabled:cursor-not-allowed"
                >
                  Tiến hành tạo phiếu
                </button>

                <Transition name="fade">
                  <p
                    v-if="isCountChanging"
                    class="text-[9px] text-center text-(--primary) italic font-bold"
                  >
                    * Lưu thay đổi trước khi tiếp tục
                  </p>
                </Transition>
              </div>
            </div>

            <div
              class="mt-4 flex items-center justify-center gap-2 text-[9px] uppercase tracking-[0.2em] text-[#c5b5ab]"
            >
              <div class="h-px w-8 bg-[#e8d5c4]"></div>
              <span>LexiLibrary</span>
              <div class="h-px w-8 bg-[#e8d5c4]"></div>
            </div>
          </div>
        </div>
      </div>
      <EmptyView
        v-else
        title="Danh sách giỏ mượn trống..."
        description="Chưa có sách"
        advise="Bạn cần đăng nhập để thêm sách vào giỏ"
      />
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed, ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useCartStore } from '@/stores/cart'
import { ElInputNumber, ElMessage, ElMessageBox, ElTooltip } from 'element-plus'
import { Minus, Plus } from '@element-plus/icons-vue'
import EmptyView from '../EmptyView.vue'

const authStore = useAuthStore()
const cartStore = useCartStore()

const isCountChanging = ref(false)
const cartItems = computed(() => cartStore.cartItems)

const handleChange = () => {
  isCountChanging.value = true
}

const updateAllChanges = async () => {
  try {
    for (const item of cartItems.value) {
      await cartStore.updateCart(item._id, {
        maDocGia: authStore.user.code,
        maSach: item.maSach,
        soLuong: item.soLuong,
      })
    }
    isCountChanging.value = false
    ElMessage.success({ message: 'Đã lưu tất cả thay đổi', offset: 100 })
  } catch (e) {
    ElMessage.error('Có lỗi khi cập nhật giỏ hàng: ' + e)
  }
}

const removeItem = async (id) => {
  try {
    await ElMessageBox.confirm('Gỡ quyển sách này khỏi danh sách mượn?', 'Xác nhận', {
      confirmButtonText: 'Xác nhận',
      cancelButtonText: 'Bỏ qua',
      type: 'warning',
    })
    await cartStore.removeFromCart(id)
    await cartStore.fetchCart(authStore.user.code)
    ElMessage.success({ message: 'Đã cập nhật giỏ hàng', offset: 100 })
  } catch (e) {
    ElMessage.error('Có lỗi khi cập nhật giỏ hàng: ' + e)
  }
}

onMounted(async () => {
  if (authStore.user?.code) {
    await cartStore.fetchCart(authStore.user.code)
  }
})
</script>

<style scoped>
.lexi-qty-input-refined {
  width: 120px !important;
}

:deep(.el-input__wrapper) {
  background-color: #fdf8f4 !important;
  box-shadow: none !important;
  border: 1px solid #f0e2d4 !important;
  border-radius: 0 !important;
}

:deep(.el-input-number__increase),
:deep(.el-input-number__decrease) {
  background-color: transparent !important;
  border-left: 1px solid #f0e2d4 !important;
  color: var(--secondary) !important;
}

:deep(.el-input__inner) {
  font-family: 'Newsreader', serif !important;
  font-weight: 700 !important;
  color: #3a2a1e !important;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.25s ease;
}
.slide-up-enter-from,
.slide-up-leave-to {
  opacity: 0;
  transform: translateY(8px);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
