<template>
  <BreadcrumbComponent
    title="Sách"
    :paths="[
      { label: 'Trang chủ', path: '/' },
      { label: 'Sách', path: '/book' },
    ]"
  />

  <div class="flex flex-col py-24 px-4 bg-(--bg-primary) gap-6">
    <div class="flex flex-row px-10 items-center gap-4">
      <ElDivider class="w-30! border-(--secondary)!" />
      <h1 class="newsreaderFont text-7xl! lg:text-8xl text-(--secondary) tracking-tighter italic">
        Tất cả
        <TextType
          :text="['ấn phẩm', 'tuyệt tác', 'sách hay', 'đều ở đây!']"
          :typingSpeed="75"
          :pauseDuration="1500"
          :showCursor="true"
          cursorCharacter="|"
          :textColors="'#d1d5db'"
        />
      </h1>
    </div>
    <div class="flex gap-10">
      <!-- Search sidebar -->
      <div class="max-w-72 pl-10">
        <!-- Search input -->
        <div
          class="group flex flex-row items-center border-b focus-within:border-(--primary) transition-all duration-300 py-4 px-2 gap-4"
        >
          <FontAwesomeIcon
            v-if="!filters.searchText"
            :icon="faSearch"
            class="group-focus-within:text-(--primary) transition-all duration-300"
          />
          <div v-if="filters.searchText" @click="filters.searchText = ''">
            <ElTooltip content="Xóa tìm kiếm" placement="top">
              <FontAwesomeIcon
                :icon="faXmark"
                class="group-focus-within:text-(--primary) transition-all duration-300 cursor-pointer"
              />
            </ElTooltip>
          </div>
          <input
            v-model="filters.searchText"
            type="text"
            placeholder="Tên sách..."
            class="outline-none"
          />
        </div>

        <!-- Filter -->
        <ElDivider border-style="dashed" />
        <div class="space-y-5">
          <div class="flex justify-between items-center">
            <h3 class="newsreaderFont text-3xl">Bộ lọc</h3>
            <div
              v-if="
                filters.selectedCategory ||
                filters.selectedPublisher ||
                filters.selectedPrice[0] != 20 ||
                filters.selectedPrice[1] != 100
              "
              @click="resetFilter"
            >
              <ElTooltip content="Đặt lại bộ lọc" placement="top">
                <p class="text-sm text-amber-600 italic underline cursor-pointer">Xóa</p>
              </ElTooltip>
            </div>
          </div>
          <!-- categories -->
          <ElDivider border-style="dashed" />
          <div>
            <h3 class="newsreaderFont text-2xl mb-2">Thể loại</h3>
            <div ref="categoryContainer">
              <ElRadioGroup v-model="filters.selectedCategory">
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
              <ElRadioGroup v-model="filters.selectedPublisher">
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
            <ElSlider v-model="filters.selectedPrice" range :step="10" :max="100" />
            <div class="flex justify-between mt-2 text-gray-400 text-sm">
              <span>Min: ${{ filters.selectedPrice[0] }}</span>
              <span>Max: ${{ filters.selectedPrice[1] }}</span>
            </div>
          </div>
        </div>
      </div>
      <!-- books -->
      <div class="flex flex-col w-full gap-4">
        <!-- header -->
        <div class="flex justify-between items-center w-full min-h-18">
          <div>
            <p class="text-(--subtext-color)">
              Đang hiển thị
              <span class="text-(--secondary) font-semibold">{{ books.length }}</span> quyển sách
            </p>
          </div>
          <ElSelect
            v-model="filters.selectedSort"
            clearable
            placeholder="Sắp xếp theo..."
            class="max-w-62.5"
          >
            <ElOption label="Sắp xếp theo giá tăng dần" value="priceIncreasing" />
            <ElOption label="Sắp xếp theo giá giảm dần" value="priceDecreasing" />
            <ElOption label="Sắp xếp theo sách mới nhất" value="latest" />
            <ElOption label="Sắp xếp theo sách cũ nhất" value="oldest" />
          </ElSelect>
        </div>

        <!-- sach -->
        <div v-if="books.length > 0" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <div
            v-for="(book, index) in books"
            :key="book.tenSach"
            class=""
            data-aos="fade-up"
            :data-aos-delay="(index % 8) * 100"
            data-aos-once="true"
            data-aos-offset="50"
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

        <div v-else class="py-40 flex flex-col items-center justify-center text-center opacity-30">
          <div class="newsreaderFont text-8xl mb-4 italic">∅</div>
          <p class="newsreaderFont text-2xl italic">Không tìm thấy sách nào phù hợp</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted, reactive, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import BookCard from '@/components/BookCard.vue'
import BreadcrumbComponent from '@/components/BreadcrumbComponent.vue'
import { faSearch, faXmark } from '@fortawesome/free-solid-svg-icons'
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
import TextType from '@/components/vuebits/TextType/TextType.vue'

const route = useRoute()
const router = useRouter()

const filters = reactive({
  selectedCategory: '',
  selectedPublisher: '',
  selectedPrice: [20, 100],
  selectedSort: '',
  searchText: '',
})

const categories = ref([])
const publishers = ref([])
const books = ref([])
const categoryContainer = ref(null)

const updateUrl = () => {
  const query = {
    ...route.query,
    q: filters.searchText || undefined,
    category: filters.selectedCategory || undefined,
    publisher: filters.selectedPublisher || undefined,
    minPrice: filters.selectedPrice[0],
    maxPrice: filters.selectedPrice[1],
    sort: filters.selectedSort || undefined,
  }

  Object.keys(query).forEach(
    (key) => (query[key] === undefined || query[key] === '') && delete query[key],
  )

  router.replace({ query })
}

const syncParamsFromUrl = () => {
  filters.selectedCategory = route.query.category || ''
  filters.selectedPublisher = route.query.publisher || ''
  filters.searchText = route.query.q || ''
  filters.selectedSort = route.query.sort || ''

  if (route.query.minPrice && route.query.maxPrice) {
    filters.selectedPrice = [Number(route.query.minPrice), Number(route.query.maxPrice)]
  } else {
    filters.selectedPrice = [20, 100]
  }
}

const fetchBooks = async () => {
  const params = {
    q: route.query.q || undefined,
    category: route.query.category || undefined,
    publisher: route.query.publisher || undefined,
    minPrice: route.query.minPrice || filters.selectedPrice[0],
    maxPrice: route.query.maxPrice || filters.selectedPrice[1],
    sort: route.query.sort || undefined,
  }

  const sortMap = {
    priceIncreasing: 'price_asc',
    priceDecreasing: 'price_desc',
    latest: 'latest',
    oldest: 'oldest',
  }

  if (params.sort) params.sort = sortMap[params.sort] || params.sort

  books.value = await BookService.getBooks(params)
}

const resetFilter = () => {
  filters.selectedCategory = ''
  filters.selectedPublisher = ''
  filters.selectedPrice = [20, 100]
  filters.selectedSort = ''
  filters.searchText = ''
  updateUrl()
}

const scrollIntoActive = (containerRef) => {
  if (containerRef.value) {
    const activeRadio = containerRef.value.querySelector('.el-radio__input.is-checked')
    if (activeRadio) {
      activeRadio.scrollIntoView({ behavior: 'smooth' })
    }
  }
}

onMounted(async () => {
  categories.value = await categoryService.getCategories()
  publishers.value = await publisherService.getPublishers()

  syncParamsFromUrl()
  await fetchBooks()
  scrollIntoActive(categoryContainer)
  window.scrollTo(0, 0)
})

watch(
  () => route.query,
  async () => {
    syncParamsFromUrl()
    await fetchBooks()
  },
  { deep: true },
)

watch(filters, () => {
  updateUrl()
})
</script>
<style scoped>
:deep(.el-select__wrapper) {
  background: none;
  box-shadow: none;
  min-width: 250px;
}

:deep(.el-slider__bar) {
  background-color: var(--primary) !important;
  height: 2px;
}

:deep(.el-slider__button) {
  border: 1px solid var(--primary) !important;
  background-color: var(--bg-primary) !important;
  width: 12px;
  height: 12px;
  transition: transform 0.3s;
}

:deep(.el-slider__button:hover) {
  transform: scale(1.5);
}
</style>
