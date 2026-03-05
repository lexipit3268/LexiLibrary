<template>
  <div>
    <BreadcrumbComponent
      :title="props.book.tenSach"
      :image="props.book.hinhAnh"
      :paths="[
        { label: 'Trang chủ', path: '/' },
        { label: 'Sách', path: '/book' },
        { label: props.book.tenSach, path: '' },
      ]"
    />
    <div class="flex flex-col w-full px-30 py-24">
      <div class="flex flex-row w-full justify-center gap-16 mb-20">
        <!-- hinh anh sach -->
        <div class="flex flex-col">
          <div
            class="bg-pattern overflow-hidden h-fit w-lg bg-amber-800/10 p-8 group hover:shadow-2xl transition-all duration-300 z-10!"
          >
            <VueImageZoomer
              :regular="
                props.book.hinhAnh
                  ? props.book.hinhAnh
                  : 'https://placehold.co/400x600/d48c6a/FFF?font=Montserrat&text=Empty'
              "
              hover-message="Di chuột để zoom"
              message-pos="top"
              :show-message="false"
              :zoom="props.book.hinhAnh"
              :zoom-amount="2"
            />
          </div>
          <div class="relative">
            <p class="absolute left-[50%] -translate-x-[50%] top-2 text-sm text-(--subtext-color)">
              Di chuột vào để zoom ảnh bìa sách
            </p>
            <img src="../../../public/book.svg" alt="" class="w-120 opacity-30" />
          </div>
        </div>

        <!-- thong tin sach -->
        <div class="flex flex-col gap-4 py-5 max-w-145">
          <div class="flex flex-col gap-6">
            <div class="flex flex-col gap-3">
              <div class="flex items-center gap-3" data-aos="fade-right">
                <span class="text-[10px] uppercase font-bold tracking-[0.4em] text-gray-400"
                  >mã sách</span
                >
                <span
                  class="px-2 py-0.5 bg-amber-900/5 text-[11px] font-mono text-(--primary) border border-amber-900/10 rounded-sm shadow-sm"
                >
                  #{{ props.book.maSach }}
                </span>
              </div>

              <h1
                class="newsreaderFont capitalize text-6xl text-(--secondary) leading-tight tracking-tighter"
                data-aos="fade-right"
                data-aos-delay="200"
              >
                {{ props.book.tenSach }}
              </h1>
            </div>

            <div class="flex flex-col gap-3 border-l-2 border-amber-200 pl-6 py-1">
              <p
                v-for="(p, index) in paragraphs"
                :key="index"
                class="text-(--subtext-color) text-lg newsreaderFont leading-relaxed opacity-90"
                data-aos="fade-up"
                :data-aos-delay="400"
                data-aos-once="true"
              >
                {{ p }}
              </p>
            </div>

            <div class="space-y-4">
              <div class="grid grid-cols-2 w-full gap-x-16 gap-y-4">
                <div class="space-y-1" data-aos="fade-up" data-aos-once="true" data-aos-delay="0">
                  <p class="text-(--subtext-color) font-bold uppercase text-xs tracking-wider">
                    Tác giả:
                  </p>
                  <span class="font-medium"> {{ props.book.tacGia }}</span>
                </div>
                <div class="space-y-1" data-aos="fade-up" data-aos-once="true" data-aos-delay="200">
                  <p class="text-(--subtext-color) font-bold uppercase text-xs tracking-wider">
                    Nhà xuất bản:
                  </p>
                  <span
                    class="font-medium cursor-pointer hover:text-(--primary) transition-colors duration-300"
                    @click="
                      router.push({ name: 'book-page', query: { publisher: publisher.maNXB } })
                    "
                    >{{ publisher.tenNXB }}</span
                  >
                </div>
                <div class="space-y-1" data-aos="fade-up" data-aos-once="true" data-aos-delay="300">
                  <p class="text-(--subtext-color) font-bold uppercase text-xs tracking-wider">
                    Năm xuất bản:
                  </p>
                  <span class="font-medium">{{ props.book.namXuatBan }}</span>
                </div>
                <div class="space-y-1" data-aos="fade-up" data-aos-once="true" data-aos-delay="400">
                  <p class="text-(--subtext-color) font-bold uppercase text-xs tracking-wider">
                    Sẵn có:
                  </p>
                  <span v-if="props.book.soQuyen > 0" class="font-medium"
                    >{{ props.book.soQuyen }} quyển</span
                  >
                  <span
                    v-else
                    class="px-2 py-0.5 bg-red-50 text-red-600 text-[14px] border border-red-200"
                    >Hết lượt mượn</span
                  >
                </div>
              </div>
              <div class="space-y-2" data-aos="fade-up" data-aos-once="true" data-aos-delay="500">
                <p class="text-(--subtext-color) font-bold uppercase text-xs tracking-wider">
                  Thể loại:
                </p>
                <BookTags :categories="categories" />
              </div>
            </div>
          </div>
          <ElDivider border-style="dashed" class="m-0!" />

          <!-- checkout -->
          <div class="flex flex-col gap-4 pt-6 border-t border-amber-900/5">
            <div
              class="flex items-baseline justify-between"
              data-aos="fade-up"
              data-aos-once="true"
              data-aos-delay="600"
            >
              <p class="newsreaderFont text-4xl text-(--secondary) tracking-tight">
                ${{ props.book.donGia }}.00
              </p>
            </div>

            <div
              class="flex flex-wrap items-center gap-6"
              data-aos="fade-up"
              data-aos-once="true"
              data-aos-delay="700"
            >
              <ElInputNumber
                v-model="num"
                :min="1"
                :max="10"
                controls-position="right"
                size="large"
                class="lexi-qty-input-refined"
              >
                <template #suffix>
                  <span class="text-[10px] uppercase font-bold tracking-widest opacity-50"
                    >Quyển</span
                  >
                </template>
              </ElInputNumber>

              <AddToCartBtn
                :book="props.book"
                @add-to-cart="handleAddToCart(props.book.tenSach)"
                class="transform hover:scale-[1.02] transition-transform active:scale-95"
              />

              <button
                type="button"
                class="w-14 h-14 border border-amber-900/10 rounded-full flex items-center justify-center cursor-pointer bg-white group hover:bg-red-50 hover:border-red-100 transition-all duration-300 shadow-sm"
              >
                <FontAwesomeIcon
                  :icon="faHeart"
                  class="text-gray-400 group-hover:text-red-500 text-lg transition-colors duration-300"
                />
              </button>
            </div>

            <div
              class="flex gap-4 p-5 bg-amber-900/2 border border-amber-900/5 rounded-sm items-start"
              data-aos="fade-up"
              data-aos-once="true"
              data-aos-delay="800"
            >
              <div
                class="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0 border border-amber-900/5"
              >
                <FontAwesomeIcon :icon="faTruckFast" class="text-amber-700 text-sm" />
              </div>
              <div class="space-y-1">
                <p class="text-xs font-bold text-amber-900/80 uppercase tracking-widest">
                  Dịch vụ vận chuyển
                </p>
                <p class="text-[11px] leading-relaxed text-(--subtext-color) opacity-80">
                  Giao hàng miễn phí khu vực lân cận hoặc nhận trực tiếp tại quầy thư viện trong
                  vòng 15 phút.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- thong tin chi tiet sach & review -->
      <div class="w-full">
        <el-collapse v-model="activeName" accordion>
          <el-collapse-item name="1">
            <template #title>
              <div class="flex items-center gap-4 group">
                <span
                  class="newsreaderFont text-2xl lg:text-3xl text-(--secondary) group-hover:text-(--primary) transition-colors"
                  >Mô tả tác phẩm</span
                >
              </div>
            </template>
            <div class="px-4 mt-6">
              <div
                class="first-letter:[font-family:var(--font-primary)] first-letter:text-7xl first-letter:italic first-letter:font-bold first-letter:text-(--primary) first-letter:mr-1 first-letter:float-left"
              >
                {{ props.book.moTa }}
              </div>
            </div>
          </el-collapse-item>
          <el-collapse-item name="2">
            <template #title>
              <div class="flex items-center gap-4 group">
                <span
                  class="newsreaderFont text-2xl lg:text-3xl text-(--secondary) group-hover:text-(--primary) transition-colors"
                  >Thông tin giao nhận sách</span
                >
              </div>
            </template>
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
          <el-collapse-item name="3">
            <template #title>
              <div class="flex items-center gap-4 group">
                <span
                  class="newsreaderFont text-2xl lg:text-3xl text-(--secondary) group-hover:text-(--primary) transition-colors"
                  >Đánh giá</span
                >
              </div>
            </template>
            <div class="px-4">Hiện chưa có đánh giá nào về sách này</div>
          </el-collapse-item>
        </el-collapse>
      </div>
    </div>
  </div>
</template>
<script setup>
import { VueImageZoomer } from 'vue-image-zoomer'
import 'vue-image-zoomer/dist/style.css'
import { ElCollapse, ElDivider, ElInputNumber, ElMessageBox } from 'element-plus'
import BreadcrumbComponent from '../BreadcrumbComponent.vue'
import { computed, ref } from 'vue'
import AddToCartBtn from '../AddToCartBtn.vue'
import BookTags from '../BookTags.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faHeart } from '@fortawesome/free-regular-svg-icons'
import { faTruckFast } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const router = useRouter()

const props = defineProps({
  book: Object,
  categories: Array,
  publisher: Object,
})

const paragraphs = computed(() => {
  if (!props.book.moTa) return []
  return props.book.moTa.split('\n').filter((p) => p.trim() !== '')
})

const num = ref(1)
const activeName = ref('1')
const handleAddToCart = (bookTitle) => {
  if (!authStore.isLoggedIn) {
    ElMessageBox.confirm(`Vui lòng đăng nhập để thực hiện chức năng này`, 'Yêu cầu đăng nhập', {
      confirmButtonText: 'Đăng nhập',
      cancelButtonText: 'Hủy bỏ',
    }).then(() => router.push('/login'))
    return
  }
  if (authStore.userRole !== 'user') {
    ElMessageBox.alert(
      'Chỉ người dùng thông thường mới có thể mượn sách.',
      'Quyền truy cập bị từ chối',
    )
    return
  }
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
