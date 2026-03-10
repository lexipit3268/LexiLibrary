<template>
  <div class="max-w-7xl mx-auto px-6 pb-20">
    <div v-if="cartItems.length > 0">
      <div class="flex justify-between items-end border-b pb-4 border-(--primary) mb-10 mt-10">
        <h2 class="newsreaderFont text-5xl text-(--secondary) italic">Sách đã chọn</h2>
        <div class="flex items-center gap-4">
          <span class="text-sm text-(--subtext-color)">{{ cartStore.totalQuantity }} ấn phẩm</span>
        </div>
      </div>

      <div class="flex flex-col lg:flex-row gap-10">
        <div class="flex-1 space-y-6">
          <div
            v-for="item in cartItems"
            :key="item._id"
            class="flex gap-6 p-6 bg-(--white) border border-(--bg-secondary) shadow-sm hover:shadow-md transition-shadow relative"
          >
            <img
              :src="item.bookDetails?.hinhAnh"
              class="w-24 h-36 object-cover shadow-sm border border-(--bg-tertiary)"
            />

            <div class="flex-1 flex flex-col justify-between py-1">
              <div class="flex justify-between items-start">
                <div class="space-y-1">
                  <ElTooltip
                    :content="`Xem chi tiết ${item.bookDetails.maSach}`"
                    placement="top"
                    effect="light"
                  >
                    <router-link :to="`book/${item.bookDetails.maSach}`" target="_blank">
                      <h3
                        class="newsreaderFont text-2xl font-semibold text-(--secondary) cursor-pointer"
                      >
                        {{ item.bookDetails?.tenSach }}
                      </h3>
                    </router-link>
                  </ElTooltip>
                  <p class="text-(--subtext-color) text-sm italic">
                    {{ item.bookDetails?.tacGia }}
                  </p>
                  <div
                    class="mt-4 inline-block px-2 py-0.5 bg-(--bg-tertiary) text-[10px] border border-(--bg-secondary)"
                  >
                    Mã sách: {{ item.maSach }}
                  </div>
                </div>

                <button
                  @click="removeItem(item._id)"
                  class="text-red-400 hover:text-red-700 text-[10px] uppercase font-bold tracking-widest transition-colors cursor-pointer"
                >
                  Gỡ bỏ
                </button>
              </div>

              <div class="flex items-center gap-4 mt-4">
                <span class="text-xs italic text-(--subtext-color)">Số lượng mượn</span>
                <ElInputNumber
                  v-model="item.soLuong"
                  :min="1"
                  :max="5"
                  controls-position="right"
                  size="default"
                  class="lexi-qty-input-refined"
                  @change="handleChange"
                >
                  <template #suffix>
                    <span
                      class="text-[10px] uppercase font-bold tracking-widest opacity-50 text-(--primary)"
                      >Quyển</span
                    >
                  </template>
                  <template #decrease-icon>
                    <el-icon>
                      <Minus />
                    </el-icon>
                  </template>
                  <template #increase-icon>
                    <el-icon>
                      <Plus />
                    </el-icon>
                  </template>
                </ElInputNumber>
              </div>
            </div>
          </div>

          <div class="flex justify-between items-center pt-6">
            <button @click="$router.push('/book')" class="secondary-btn">Quay lại xem sách</button>

            <button
              v-if="isCountChanging"
              @click="updateAllChanges"
              class="primary-btn py-4! px-8 text-xs tracking-[0.2em] font-bold uppercase"
            >
              Cập nhật thay đổi
            </button>
          </div>
        </div>

        <div
          class="lg:w-80 h-fit sticky top-28 space-y-6 bg-(--bg-secondary) p-8 border border-(--primary) shadow-sm"
        >
          <h3
            class="newsreaderFont text-3xl text-(--secondary) italic border-b border-(--primary) pb-4 mb-6"
          >
            Tóm tắt
          </h3>

          <div class="space-y-4 text-sm">
            <div class="flex justify-between text-(--subtext-color)">
              <span>Hạn mức</span>
              <span class="font-bold text-black border-b border-(--primary)"
                >{{ authStore.user?.gioiHanDat || 5 }} quyển</span
              >
            </div>
            <div class="flex justify-between text-(--subtext-color)">
              <span>Điểm uy tín</span>
              <span
                :class="
                  authStore.user?.diemUyTin < 6
                    ? 'text-red-600 font-bold'
                    : 'text-green-700 font-bold'
                "
                class="underline underline-offset-4 decoration-1"
              >
                {{ authStore.user?.diemUyTin || 10 }}/10
              </span>
            </div>

            <ElDivider class="my-6! opacity-30" />

            <div class="flex justify-between items-end">
              <span class="newsreaderFont text-2xl italic">Tổng cộng</span>
              <span class="text-4xl font-bold text-(--primary) leading-none">{{
                cartStore.totalQuantity
              }}</span>
            </div>
          </div>

          <div
            v-if="authStore.user?.diemUyTin < 6"
            class="p-4 bg-(--bg-primary) border border-red-200 text-[11px] text-red-700 leading-relaxed italic"
          >
            ⚠️ Điểm uy tín không đủ. Vui lòng đợi khôi phục để tiếp tục mượn sách.
          </div>

          <button
            @click="$router.push('/cart/checkout')"
            :disabled="cartItems.length === 0 || authStore.user?.diemUyTin < 6 || isCountChanging"
            class="primary-btn w-full py-4! text-xs! tracking-[0.2em] font-bold uppercase bg-(--secondary) hover:bg-(--primary) disabled:opacity-30 disabled:grayscale shadow-sm"
          >
            Tiến hành tạo phiếu
          </button>

          <p
            v-if="isCountChanging"
            class="text-[10px] text-center text-(--primary) italic mt-4 font-bold"
          >
            * Vui lòng nhấn "Cập nhật thay đổi" để tiếp tục.
          </p>
        </div>
      </div>
    </div>

    <div v-else class="py-20 flex flex-col items-center justify-center text-center">
      <div class="newsreaderFont text-8xl mb-4 italic opacity-30">∅</div>
      <p class="newsreaderFont text-2xl italic opacity-30">Giỏ hàng trống...</p>
      <button
        @click="$router.push('/book')"
        class="primary-btn text-sm mt-4 px-12 py-4 uppercase tracking-widest font-bold"
      >
        Khám phá kho sách
      </button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed, ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useCartStore } from '@/stores/cart'
import { ElDivider, ElInputNumber, ElMessage, ElMessageBox, ElTooltip } from 'element-plus'
import { Minus, Plus } from '@element-plus/icons-vue'

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
    ElMessage.success('Đã lưu tất cả thay đổi')
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
    ElMessage.success('Đã cập nhật giỏ hàng')
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
  width: 140px !important;
}

:deep(.el-input__wrapper) {
  background-color: var(--bg-primary) !important;
  box-shadow: none !important;
  border: 1px solid var(--bg-secondary) !important;
}

:deep(.el-input-number__increase),
:deep(.el-input-number__decrease) {
  background-color: transparent !important;
  border-left: 1px solid var(--bg-secondary) !important;
  color: var(--secondary) !important;
}

:deep(.el-input__inner) {
  font-family: 'Newsreader', serif !important;
  font-weight: 600 !important;
}
</style>
