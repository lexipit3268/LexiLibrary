<template>
  <BreadcrumbComponent
    title="Sách"
    :paths="[
      { label: 'Trang chủ', path: '/' },
      { label: 'Sách', path: '/book' },
    ]"
  />
  <div class="flex py-24 px-4 gap-10 bg-(--bg-primary)">
    <!-- Search sidebar -->
    <div class="max-w-72 pl-10">
      <!-- Search input -->
      <div
        class="group flex flex-row items-center border-b focus-within:border-(--primary) transition-all duration-300 py-4 px-2 gap-4"
      >
        <FontAwesomeIcon
          v-if="!searchText"
          :icon="faSearch"
          class="group-focus-within:text-(--primary) transition-all duration-300"
        />
        <div v-if="searchText" @click="searchText = ''">
          <ElTooltip content="Xóa tìm kiếm" placement="top">
            <FontAwesomeIcon
              :icon="faXmark"
              class="group-focus-within:text-(--primary) transition-all duration-300 cursor-pointer"
            />
          </ElTooltip>
        </div>
        <input v-model="searchText" type="text" placeholder="Tên sách..." class="outline-none" />
      </div>

      <!-- Filter -->
      <ElDivider border-style="dashed" />
      <div class="space-y-5">
        <div class="flex justify-between items-center">
          <h3 class="newsreaderFont text-3xl">Bộ lọc</h3>
          <div v-if="selectedCategory || selectedPublisher" @click="resetFilter">
            <ElTooltip content="Đặt lại bộ lọc" placement="top">
              <FontAwesomeIcon
                :icon="faFilterCircleXmark"
                class="text-xl text-(--subtext-color) cursor-pointer"
              />
            </ElTooltip>
          </div>
        </div>
        <!-- categories -->
        <ElDivider border-style="dashed" />
        <div>
          <h3 class="newsreaderFont text-2xl mb-2">Thể loại</h3>
          <div>
            <ElRadioGroup v-model="selectedCategory">
              <ElRadio value="">Tất cả</ElRadio>
              <div
                class="h-50 overflow-x-hidden overflow-y-hidden hover:overflow-y-auto transition-all duration-200"
              >
                <ElRadio
                  v-for="(cate, index) in categories"
                  :key="index"
                  :value="cate.maTheLoai"
                  class="w-full"
                  >{{ cate.tenTheLoai }}</ElRadio
                >
              </div>
            </ElRadioGroup>
          </div>
        </div>
        <!-- publishers -->
        <ElDivider border-style="dashed" />

        <div>
          <h3 class="newsreaderFont text-2xl mb-2">Nhà xuất bản</h3>
          <div>
            <ElRadioGroup v-model="selectedPublisher">
              <ElRadio value="">Tất cả</ElRadio>
              <ElRadio
                v-for="(publisher, index) in publishers"
                :key="index"
                :value="publisher.maNXB"
                class="w-full"
                >{{ publisher.tenNXB }}</ElRadio
              >
            </ElRadioGroup>
          </div>
        </div>
        <!-- pricing -->
        <ElDivider border-style="dashed" />
        <div>
          <h3 class="newsreaderFont text-2xl mb-2">Giá tiền</h3>
          <ElSlider v-model="selectedPrice" range :step="10" :max="100" />
          <div>
            <p class="text-(--subtext-color)">
              Giá từ: {{ selectedPrice[0] }} - {{ selectedPrice[1] }}$
            </p>
          </div>
        </div>
      </div>
    </div>
    <!-- books -->
    <div class="flex flex-col w-full gap-4">
      <!-- header -->
      <div class="flex justify-between items-center w-full min-h-18">
        <div>
          <p class="text-(--subtext-color)">Đang hiển thị {{ books.length }} quyển sách</p>
        </div>
        <ElSelect v-model="selectedSort" clearable placeholder="Sắp xếp theo..." class="max-w-62.5">
          <ElOption label="Sắp xếp theo giá tăng dần" value="priceIncreasing" />
          <ElOption label="Sắp xếp theo giá giảm dần" value="priceDecreasing" />
        </ElSelect>
      </div>

      <!-- sach -->
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div
          v-for="book in books"
          :key="book.tenSach"
          class="border border-gray-200 p-4 hover:shadow-md transition duration-300 place-items-center"
        >
          <BookCard
            :id="book.maSach"
            :title="book.tenSach"
            :author="book.tacGia"
            :price="book.donGia"
            :image="book.hinhAnh"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import BookCard from '@/components/BookCard.vue'
import BreadcrumbComponent from '@/components/BreadcrumbComponent.vue'
import { faFilterCircleXmark, faSearch, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  ElDivider,
  ElOption,
  ElRadio,
  ElRadioGroup,
  ElSelect,
  ElSlider,
  ElTooltip,
} from 'element-plus'
import BookService from '@/services/book.service'
import categoryService from '@/services/category.service'
import publisherService from '@/services/publisher.service'

const route = useRoute()

const selectedCategory = ref('')
const selectedPublisher = ref('')
const selectedPrice = ref([20, 100])
const selectedSort = ref('')
const searchText = ref('')

const categories = ref([])
const publishers = ref([])
const books = ref([])

const resetFilter = () => {
  selectedCategory.value = ''
  selectedPublisher.value = ''
}
const syncParamsFromUrl = () => {
  if (route.query.category) {
    selectedCategory.value = route.query.category
  } else {
    selectedCategory.value = ''
  }

  if (route.query.q) {
    searchText.value = route.query.q
  }

  if (route.query.publisher) {
    selectedPublisher.value = route.query.publisher
  }
}

const fetchBooks = async () => {
  const params = {}

  if (searchText.value) params.q = searchText.value
  if (selectedCategory.value) params.category = selectedCategory.value
  if (selectedPublisher.value) params.publisher = selectedPublisher.value

  if (selectedPrice.value) {
    params.minPrice = selectedPrice.value[0]
    params.maxPrice = selectedPrice.value[1]
  }

  if (selectedSort.value === 'priceIncreasing') params.sort = 'price_asc'
  if (selectedSort.value === 'priceDecreasing') params.sort = 'price_desc'

  books.value = await BookService.getBooks(params)
}

onMounted(async () => {
  categories.value = await categoryService.getCategories()
  publishers.value = await publisherService.getPublishers()

  syncParamsFromUrl()
  await fetchBooks()
})

watch(
  () => route.query,
  async () => {
    syncParamsFromUrl()
    await fetchBooks()
  },
  { deep: true },
)

watch([searchText, selectedCategory, selectedPublisher, selectedPrice, selectedSort], () => {
  fetchBooks()
})
</script>
<style scoped>
:deep(.el-select__wrapper) {
  background: none;
  box-shadow: none;
  min-width: 250px;
}
</style>
