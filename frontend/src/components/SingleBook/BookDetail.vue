<template>
  <div>
    <BreadcrumbComponent
      :title="props.book.title"
      :paths="[
        { label: 'Trang chủ', path: '/' },
        { label: 'Sách', path: '/book' },
        { label: props.book.title, path: '' },
      ]"
    />
    <div class="flex flex-col w-full px-30 my-24">
      <div class="flex flex-row w-full justify-start gap-16 mb-20">
        <!-- hinh anh sach -->
        <div
          class="bg-pattern overflow-hidden h-fit w-auto bg-amber-800/10 p-16 group hover:shadow-2xl transition-all duration-300"
        >
          <img
            :src="props.book.image"
            alt=""
            class="max-w-115 place-self-center object-cover shadow-2xl group-hover:shadow-none group-hover:scale-115 ease-in-out transition-all duration-300"
          />
        </div>

        <!-- thong tin sach -->
        <div class="flex flex-col gap-4 py-5 max-w-145">
          <div class="flex flex-col gap-8">
            <h3 class="newsreaderFont text-4xl text-(--secondary) text-shadow-md">
              {{ props.book.title }}
            </h3>
            <p class="text-(--subtext-color)">{{ props.book.description }}</p>
            <div>
              <div class="grid grid-cols-2 grid-rows-3 w-fit gap-x-16 gap-y-2">
                <p class="text-(--subtext-color)">Tác giả:</p>
                <span class="font-medium"> {{ props.book.author }}</span>
                <p class="text-(--subtext-color)">Nhà xuất bản:</p>
                <span class="font-medium">{{ props.book.publisher }}</span>
                <p class="text-(--subtext-color)">Sẵn có:</p>
                <span class="font-medium">{{ props.book.quantity }} quyển</span>
              </div>
              <div class="space-y-2">
                <p class="text-(--subtext-color)">Thể loại:</p>
                <BookTags :categories="categories" />
              </div>
            </div>
          </div>
          <ElDivider border-style="dashed" class="m-0!" />

          <!-- checkout -->
          <div class="space-y-2">
            <p class="text-2xl font-bold tracking-widest">${{ props.book.price }}.00</p>
            <div class="cta flex flex-row items-center gap-4 h-fit">
              <ElInputNumber
                v-model="num"
                :min="1"
                :max="10"
                controls-position="right"
                size="large"
              >
                <template #suffix>
                  <span>Quyển</span>
                </template>
              </ElInputNumber>
              <AddToCartBtn :book="props.book" @add-to-cart="handleAddToCart" />
              <button
                type="button"
                class="w-12 h-12 p-4 rounded-full shadow-md flex items-center justify-center cursor-pointer bg-white group hover:bg-amber-600/20 transition-all duration-200"
              >
                <FontAwesomeIcon
                  :icon="faHeart"
                  class="text-black group-hover:text-xl group-hover:text-red-400 transition-all duration-200"
                />
              </button>
            </div>
            <div class="flex gap-2 justify-start items-center mt-4">
              <FontAwesomeIcon :icon="faTruckFast" class="text-(--secondary)" />
              <p class="text-xs text-(--subtext-color)">
                Giao hàng miễn phí khu vực lân cận hoặc nhận trực tiếp tại thư viện trong vòng 15
                phút!
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- thong tin chi tiet sach & review -->
      <div class="w-full">
        <el-collapse v-model="activeName" accordion>
          <el-collapse-item title="Mô tả" name="1">
            <div class="px-4">
              {{ props.book.description }}
            </div>
          </el-collapse-item>
          <el-collapse-item title="Thông tin giao nhận sách" name="2">
            <ul class="list-disc list-inside space-y-1 px-4">
              <li>
                <strong>Dịch vụ linh hoạt:</strong> Giao sách Tiêu chuẩn và Giao hàng nhanh cho mọi
                đơn mượn.
              </li>
              <li>
                <strong>Phí vận chuyển:</strong> Tự động tính tại trang thanh toán theo địa chỉ
                nhận.
              </li>
              <li>
                <strong>Theo dõi đơn hàng:</strong> Cập nhật liên tục lộ trình giao và thu hồi sách.
              </li>
              <li>
                <strong>Thời gian làm việc:</strong> Giao nhận trong giờ hành chính các ngày trong
                tuần.
              </li>
            </ul>
          </el-collapse-item>
          <el-collapse-item title="Đánh giá" name="3">
            <div class="px-4">Hiện chưa có đánh giá nào về sách này</div>
          </el-collapse-item>
        </el-collapse>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ElCollapse, ElDivider, ElInputNumber } from 'element-plus'
import BreadcrumbComponent from '../BreadcrumbComponent.vue'
import { ref } from 'vue'
import AddToCartBtn from '../AddToCartBtn.vue'
import BookTags from '../BookTags.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faHeart } from '@fortawesome/free-regular-svg-icons'
import { faTruckFast } from '@fortawesome/free-solid-svg-icons'
const props = defineProps({
  book: Object,
})
const categories = ['Văn học', 'Kinh tế', 'Kỹ năng sống', 'Tâm lý', 'Tiểu thuyết']

const num = ref(1)
const activeName = ref('1')
const handleAddToCart = (bookTitle) => {
  alert('Add to cart book: ' + bookTitle + num.value)
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&family=Newsreader:ital,opsz,wght@0,6..72,200..800;1,6..72,200..800&family=Playwrite+HR:wght@100..400&display=swap');

:deep(.el-collapse-item__header) {
  background: transparent;
}
:deep(.el-input__wrapper) {
  background-color: #fff;
}
:deep(.el-collapse-item__title) {
  font-size: 1.7rem;
  font-weight: 400;
  font-family: 'Newsreader';
}
:deep(.el-collapse-item__wrap) {
  background: transparent;
}
:deep(.el-collapse-item__content) {
  font-size: 1rem;
}
</style>
