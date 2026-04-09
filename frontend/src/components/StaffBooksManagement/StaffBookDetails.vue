<template>
  <LoadingComponent v-if="isLoading" />
  <div
    class="flex flex-col min-h-[calc(100%-80px)] max-h-150! w-full p-6 bg-(--bg-primary) justify-start"
  >
    <button
      @click="$router.push('/staff/book')"
      class="cursor-pointer mb-6 flex items-center gap-2 text-(--subtext-color) hover:text-(--primary) transition-colors text-sm font-bold uppercase tracking-widest"
    >
      <FontAwesomeIcon :icon="faArrowLeft" />
      Quay lại danh sách
    </button>

    <div class="flex flex-row w-full gap-14 bg-(--bg-primary) justify-center">
      <!-- hinh anh sach -->

      <div
        class="bg-pattern overflow-hidden h-fit max-w-100 bg-amber-800/10 p-8 group hover:shadow-2xl transition-all duration-300"
      >
        <img
          :src="
            book.hinhAnh
              ? book.hinhAnh
              : 'https://placehold.co/400x600/d48c6a/FFF?font=Montserrat&text=No+image'
          "
          alt=""
          class="max-w-72 place-self-center object-cover shadow-2xl group-hover:shadow-none group-hover:scale-105 ease-in-out transition-all duration-300"
        />
      </div>

      <!-- thong tin sach -->
      <div class="flex flex-col gap-4 max-w-145">
        <div class="flex flex-col gap-2">
          <h3 class="newsreaderFont text-2xl text-(--secondary) text-shadow-md">
            {{ book.maSach }} &mdash; {{ book.tenSach }}
          </h3>
          <div class="text-(--subtext-color)">
            <div class="flex flex-col">
              <p
                v-for="(p, index) in paragraphs"
                :key="index"
                class="text-(--subtext-color) mb-2 last:mb-0 text-sm"
              >
                {{ p }}
              </p>
            </div>
          </div>
          <div>
            <div class="grid grid-cols-2 grid-rows-3 w-fit gap-x-16 gap-y-2 text-sm">
              <p class="text-(--subtext-color)">Tác giả:</p>
              <span class="font-medium"> {{ book.tacGia }}</span>
              <p class="text-(--subtext-color)">Nhà xuất bản:</p>
              <span
                class="font-medium cursor-pointer hover:text-(--primary) transition-colors duration-300"
                @click="router.push({ name: 'book-page', query: { publisher: publisher.maNXB } })"
                >{{ publisher.tenNXB }}</span
              >
              <p class="text-(--subtext-color)">Năm xuất bản:</p>
              <span class="font-medium">{{ book.namXuatBan }}</span>
              <p class="text-(--subtext-color)">Sẵn có:</p>
              <span class="font-medium">{{ book.soQuyen }} quyển</span>
            </div>
            <div class="space-y-2">
              <p class="text-(--subtext-color)">Thể loại:</p>
              <BookTags :categories="categories" />
            </div>
            <ElDivider border-style="dashed" />
            <div class="flex gap-10">
              <div>
                <p class="text-sm tracking-wide uppercase">Đơn giá</p>
                <p class="text-2xl font-bold tracking-widest mt-2">${{ book.donGia }}.00</p>
              </div>
              <div class="flex flex-col gap-2">
                <h3 class="font-bold text-sm tracking-wide uppercase">Thao tác</h3>
                <div class="flex items-center gap-4">
                  <button
                    @click="router.push('edit/' + maSach)"
                    class="primary-btn px-4! py-2! min-h-10! font-bold text-sm flex items-center gap-3 shadow-xl shadow-(--primary)/20"
                  >
                    <FontAwesomeIcon :icon="faPenNib" class="text-sm" />
                    Chỉnh sửa nội dung
                  </button>

                  <ElTooltip content="Xem trên trang chủ">
                    <router-link :to="`/book/${maSach}`" target="_blank">
                      <button
                        class="secondary-btn px-4! py-2! min-h-10! font-bold border-red-100 text-red-600 hover:bg-red-50"
                      >
                        <FontAwesomeIcon :icon="faEye" class="text-sm" />
                      </button>
                    </router-link>
                  </ElTooltip>

                  <ElTooltip content="Xóa sách">
                    <button
                      class="secondary-btn px-4! py-2! min-h-10! font-bold border-red-100 text-red-600 hover:bg-red-50"
                      @click="deleteBook(maSach)"
                    >
                      <FontAwesomeIcon :icon="faTrash" class="text-sm" />
                    </button>
                  </ElTooltip>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useStaffStore } from '@/stores/staff'
import bookService from '@/services/book.service'
import { ElDivider, ElMessage, ElMessageBox, ElTooltip } from 'element-plus'
import BookTags from '../BookTags.vue'
import { faArrowLeft, faEye, faPenNib, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import LoadingComponent from '../LoadingComponent.vue'

const props = defineProps({
  maSach: String,
})

const router = useRouter()
const staffStore = useStaffStore()

const { publishers, categories: allCategories } = storeToRefs(staffStore)

const book = ref({
  hinhAnh: '',
  tenSach: '',
  tacGia: '',
  soQuyen: 0,
  maNXB: '',
  maTheLoai: [],
  moTa: '',
})

const publisher = computed(() => {
  return publishers.value.find((p) => p.maNXB === book.value.maNXB) || { tenNXB: 'N/A', maNXB: '' }
})

const categories = computed(() => {
  if (!book.value.maTheLoai || allCategories.value.length === 0) return []
  return allCategories.value.filter((cat) => book.value.maTheLoai.includes(cat.maTheLoai))
})

const paragraphs = computed(() => {
  if (!book.value.moTa) return ['Chưa có mô tả chi tiết cho cuốn sách này.']
  return book.value.moTa.split('\n').filter((p) => p.trim() !== '')
})

const isLoading = ref(false)
const deleteBook = async (maSach) => {
  try {
    ElMessageBox.confirm(
      `Hành động này sẽ gỡ bỏ vĩnh viễn sách ${maSach} khỏi hệ thống. Bạn có chắc chắn?`,
      'Xác nhận gỡ bỏ',
      {
        confirmButtonText: 'Xác nhận',
        cancelButtonText: 'Hủy',
        type: 'warning',
      },
    ).then(async () => {
      isLoading.value = true
      const success = await staffStore.removeBook(maSach)
      if (success) {
        ElMessage.success('Đã xóa sách thành công ' + maSach)
        router.push('/staff/book')
        isLoading.value = false
      }
    })
  } catch (error) {
    if (error !== 'cancel') {
      ElMessage.error('Không thể xóa dữ liệu vào lúc này')
    }
  }
}

const fetchAllData = async () => {
  try {
    if (publishers.value.length === 0 || allCategories.value.length === 0) {
      await staffStore.fetchAllData()
    }

    const data = await bookService.getBook(props.maSach)
    if (data) {
      book.value = data
    }
  } catch (error) {
    ElMessage.error('Không thể nạp thông tin sách chi tiết!')
    console.error(error)
  }
}

onMounted(() => {
  fetchAllData()
})
</script>
