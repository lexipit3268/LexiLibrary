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
          :icon="faSearch"
          class="group-focus-within:text-(--primary) transition-all duration-300"
        />
        <input type="text" placeholder="Tên sách..." class="outline-none" />
      </div>

      <!-- Filter -->
      <ElDivider border-style="dashed" />
      <div class="space-y-5">
        <h3 class="newsreaderFont text-3xl">Bộ lọc</h3>
        <!-- categories -->
        <ElDivider border-style="dashed" />
        <div>
          <h3 class="newsreaderFont text-2xl mb-2">Thể loại</h3>
          <div>
            <ElRadioGroup v-model="selectedCategory">
              <ElRadio
                v-for="(cate, index) in categories"
                :key="index"
                :value="cate"
                class="w-full"
                >{{ cate }}</ElRadio
              >
            </ElRadioGroup>
          </div>
        </div>
        <!-- publishers -->
        <ElDivider border-style="dashed" />

        <div>
          <h3 class="newsreaderFont text-2xl mb-2">Nhà xuất bản</h3>
          <div>
            <ElRadioGroup v-model="selectedPublisher">
              <ElRadio
                v-for="(publisher, index) in publishers"
                :key="index"
                :value="publisher"
                class="w-full"
                >{{ publisher }}</ElRadio
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
          :key="book.title"
          class="border border-gray-200 p-4 hover:shadow-md transition duration-300 place-items-center"
        >
          <BookCard
            :title="book.title"
            :author="book.author"
            :price="book.price"
            :image="book.image"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import BookCard from '@/components/BookCard.vue'
import BreadcrumbComponent from '@/components/BreadcrumbComponent.vue'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { ElDivider, ElOption, ElRadio, ElRadioGroup, ElSelect, ElSlider } from 'element-plus'

const book = [
  {
    title: 'Mắt biếc',
    author: 'Nguyễn Nhật Ánh',
    publisher: 'Nhà xuất bản Trẻ',
    price: 50,
    image: 'https://www.nxbtre.com.vn/Images/Book/nxbtre_full_01372019_043734.jpg',
    description:
      'Một câu chuyện nhẹ nhàng và đầy day dứt về tình yêu đơn phương của Ngạn dành cho Hà Lan, gợi lại ký ức tuổi thơ và những rung động đầu đời.',
    quantity: 23,
  },
  {
    title: 'Tiệm sách của nàng',
    author: 'Nguyễn Nhật Ánh',
    publisher: 'Nhà xuất bản Trẻ',
    price: 45,
    image: 'https://www.nxbtre.com.vn/Images/Book/nxbtre_full_25412024_024109.jpg',
    description:
      'Câu chuyện xoay quanh một tiệm sách nhỏ và những mối quan hệ tinh tế, nơi mỗi nhân vật đều mang theo một nỗi niềm riêng.',
    quantity: 14,
  },
  {
    title: 'Cô gái đến từ hôm qua',
    author: 'Nguyễn Nhật Ánh',
    publisher: 'Nhà xuất bản Trẻ',
    price: 80,
    image: 'https://www.nxbtre.com.vn/Images/Book/nxbtre_full_06202025_092033.jpg',
    description:
      'Tác phẩm kể về tuổi học trò hồn nhiên, những trò nghịch ngợm và cảm xúc ngây ngô của mối tình đầu đầy trong trẻo. Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage,',
    quantity: 31,
  },
  {
    title: 'Tôi thấy hoa vàng trên cỏ xanh',
    author: 'Nguyễn Nhật Ánh',
    publisher: 'Nhà xuất bản Trẻ',
    price: 15,
    image: 'https://www.nxbtre.com.vn/Images/Book/NXBTreStoryFull_02482010_104821.jpg',
    description:
      'Bức tranh làng quê yên bình với tình anh em, tình bạn và những kỷ niệm tuổi thơ vừa đẹp đẽ vừa man mác buồn.',
    quantity: 18,
  },
  {
    title: 'Ngồi khóc trên cây',
    author: 'Nguyễn Nhật Ánh',
    publisher: 'Nhà xuất bản Trẻ',
    price: 40,
    image: 'https://www.nxbtre.com.vn/Images/Book/nxbtre_full_31252025_082543.jpg',
    description:
      'Một câu chuyện tình cảm trong sáng giữa khung cảnh miền quê, pha chút bí ẩn và những cảm xúc sâu lắng.',
    quantity: 9,
  },
]
const books = [...book, ...book]

const categories = [
  'Kinh tế',
  'Giáo dục',
  'Văn học',
  'Kỹ năng sống',
  'Tâm lý học',
  'Khoa học',
  'Lịch sử',
  'Thiếu nhi',
  'Nghệ thuật',
  'Tiểu sử',
]
const publishers = [
  'NXB Trẻ',
  'NXB Kim Đồng',
  'NXB Giáo dục',
  'NXB Tổng hợp TP.HCM',
  'NXB Đà Nẵng',
  'NXB Lao Động',
  'Penguin Random House',
  'HarperCollins',
]
const selectedCategory = ref('')
const selectedPublisher = ref('')
const selectedPrice = ref([20, 100])
const selectedSort = ref('')
</script>
<style scoped>
:deep(.el-select__wrapper) {
  background: none;
  box-shadow: none;
  min-width: 250px;
}
</style>
