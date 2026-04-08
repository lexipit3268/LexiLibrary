<template>
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
      <div class="z-10 flex items-end justify-between border-b border-(--primary)/20 pb-6">
        <h2 class="newsreaderFont text-6xl text-(--text-color-2) italic leading-none">
          Sách yêu thích của bạn
        </h2>

        <div>
          <button
            v-if="data.length > 0"
            @click="handleClearAll"
            class="text-[9px] uppercase tracking-widest font-bold text-red-400 hover:text-red-600 transition-all px-4 py-2 border border-red-100 hover:bg-red-50"
          >
            Mượn toàn bộ
          </button>
          <button
            v-if="data.length > 0"
            @click="handleClearAll"
            class="text-[9px] uppercase tracking-widest font-bold text-red-400 hover:text-red-600 transition-all px-4 py-2 border border-red-100 hover:bg-red-50"
          >
            Xóa toàn danh sách yêu thích
          </button>
        </div>
      </div>
    </div>

    <div v-if="data.length > 0" class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
      <div v-for="item in data" :key="item._id" class="relative group">
        <BookCard
          :id="item.bookDetails.maSach"
          :title="item.bookDetails.tenSach"
          :image="item.bookDetails.hinhAnh"
          :price="item.bookDetails.donGia"
        />

        <button
          @click="removeItem(item._id)"
          class="absolute top-2 right-2 w-8 h-8 bg-white/80 backdrop-blur rounded-full text-red-500 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
        >
          <FontAwesomeIcon :icon="faHeartCircleXmark" />
        </button>
      </div>
    </div>
    <EmptyView v-else title="Danh sách yêu thích trống..." description="Chưa có sách nào..." />
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import BookCard from '@/components/BookCard.vue'
import BreadcrumbComponent from '@/components/BreadcrumbComponent.vue'
import { useFavoriteStore } from '@/stores/favorite'
import EmptyView from '@/components/EmptyView.vue'

const favoriteStore = useFavoriteStore()

const data = computed(() => favoriteStore.favoriteItems)

onMounted(async () => {
  await favoriteStore.fetchFavorite()
})
</script>
