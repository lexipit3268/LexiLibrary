<template>
  <LoadingComponent v-if="isLoading" />
  <BreadcrumbComponent
    title="Danh sách yêu thích"
    :paths="[
      { label: 'Trang chủ', path: '/' },
      { label: 'Danh sách yêu thích', path: '/favorite' },
    ]"
  >
  </BreadcrumbComponent>

  <div class="px-32 py-18 min-h-screen">
    <div class="mb-24">
      <div class="z-10 flex items-end justify-between">
        <div class="space-y-2">
          <h2 class="newsreaderFont text-6xl font-medium text-(--primary) italic leading-none">
            Danh sách yêu thích
          </h2>
          <p class="text-(--subtext-color) text-[10px] uppercase tracking-[0.3em] font-bold">
            Bộ sưu tập tác phẩm hay do bạn tuyển chọn
          </p>
        </div>

        <div class="flex gap-4">
          <button
            v-if="data.length > 0"
            @click="handleAddAllToCard"
            class="primary-btn px-5 py-3 text-xs! uppercase font-semibold tracking-widest"
          >
            Mượn toàn bộ
          </button>
          <button
            v-if="data.length > 0"
            @click="handleClearAll"
            class="secondary-btn px-5! py-3! text-xs! uppercase font-semibold tracking-widest"
          >
            Xóa danh sách yêu thích
          </button>
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

    <div v-if="data.length > 0" class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
      <div v-for="item in data" :key="item._id" class="relative group">
        <BookCard
          :id="item.bookDetails.maSach"
          :title="item.bookDetails.tenSach"
          :image="item.bookDetails.hinhAnh"
          :price="item.bookDetails.donGia"
          :quantity="item.bookDetails.soQuyen"
        />
      </div>
    </div>
    <EmptyView v-else title="Danh sách yêu thích trống..." description="Chưa có sách nào..." />
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import BookCard from '@/components/BookCard.vue'
import BreadcrumbComponent from '@/components/BreadcrumbComponent.vue'
import { useFavoriteStore } from '@/stores/favorite'
import EmptyView from '@/components/EmptyView.vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useCartStore } from '@/stores/cart'
import LoadingComponent from '@/components/LoadingComponent.vue'

const favoriteStore = useFavoriteStore()
const cartStore = useCartStore()

const data = computed(() => favoriteStore.favoriteItems)

const isLoading = ref(false)

const handleAddAllToCard = async () => {
  try {
    isLoading.value = true

    const inStock = favoriteStore.favoriteItems.filter((fav) => fav.bookDetails.soQuyen > 0)
    const outOfStock = favoriteStore.favoriteItems.filter((fav) => fav.bookDetails.soQuyen <= 0)

    if (inStock.length === 0 && outOfStock.length > 0) {
      throw new Error('Tất cả tác phẩm bạn chọn đều đã hết sách!')
    }

    for (const fav of inStock) {
      await cartStore.addToCart({ maSach: fav.maSach, maDocGia: fav.maDocGia })
    }

    if (outOfStock.length > 0) {
      const titles = outOfStock.map((i) => i.bookDetails.tenSach).join(', ')
      ElMessage.warning({
        message: `Đã thêm ${inStock.length} cuốn. Còn các cuốn sau hết hàng: ${titles}`,
        duration: 2000,
        offset: 100,
      })
    } else {
      ElMessage.success('Đã thêm toàn bộ vào giỏ!')
    }
  } catch (error) {
    ElMessage.error(error.message)
  } finally {
    isLoading.value = false
  }
}

const handleClearAll = async () => {
  ElMessageBox.confirm(
    'Bạn có chắc chắn muốn xóa toàn bộ danh sách yêu thích không?',
    'Yêu cầu xác nhận',
    {
      confirmButtonText: 'Xác nhận',
      cancelButtonText: 'Hủy bỏ',
    },
  ).then(async () => {
    try {
      await favoriteStore.clearAllFav()
      ElMessage.success({ message: 'Xóa danh sách yêu thích thành công', offset: 100 })
    } catch (error) {
      ElMessage.error({ message: 'Lỗi không thể xóa danh sách yêu thích: ' + error, offset: 100 })
    }
  })
}

onMounted(async () => {
  await favoriteStore.fetchFavorite()
})
</script>
