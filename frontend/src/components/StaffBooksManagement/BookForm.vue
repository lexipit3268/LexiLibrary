<template>
  <LoadingComponent v-if="isLoading" />
  <div class="flex flex-col min-h-[calc(100%-80px)] w-full p-6 bg-(--bg-primary)">
    <div class="flex justify-between items-center mb-4">
      <button
        @click="$router.push('/staff/book')"
        class="flex items-center gap-2 text-(--subtext-color) hover:text-(--primary) transition-all text-sm font-bold uppercase tracking-widest cursor-pointer"
      >
        <FontAwesomeIcon :icon="faArrowLeft" /> Quay lại danh sách
      </button>
    </div>

    <div class="flex flex-col lg:flex-row w-full gap-4 justify-center items-start">
      <div class="flex flex-col gap-4 w-full max-w-80">
        <label class="text-xs uppercase font-bold tracking-wide text-(--subtext-color) ml-1"
          >ảnh bìa</label
        >

        <el-upload
          action="#"
          :auto-upload="false"
          :show-file-list="false"
          :on-change="handleImageChange"
        >
          <div
            class="bg-white border border-(--primary)/20 p-2 hover:border-(--primary) transition-all group relative cursor-pointer"
          >
            <div
              class="bg-amber-800/5 min-h-100 max-h-100 overflow-hidden aspect-2/3 flex items-center justify-center relative"
            >
              <img
                v-if="book.hinhAnh"
                :src="book.hinhAnh"
                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div v-else class="flex flex-col items-center gap-2 text-(--subtext-color)">
                <FontAwesomeIcon :icon="faCamera" class="text-2xl" />
                <span class="text-[10px] uppercase font-bold tracking-widest">Tải ảnh lên</span>
              </div>

              <div
                class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
              >
                <span class="text-white text-[10px] font-bold uppercase tracking-widest"
                  >Thay đổi ảnh</span
                >
              </div>
            </div>
          </div>
        </el-upload>
        <p class="text-[10px] text-(--subtext-color) italic px-1">
          * Hỗ trợ định dạng: JPG, PNG, WEBP
        </p>
      </div>

      <!-- thong tin sach -->
      <div
        class="flex flex-col gap-2 w-full max-w-160 bg-white p-8 shadow-sm border border-(--primary)/10"
      >
        <div class="flex flex-col gap-2">
          <label class="text-[10px] uppercase font-bold tracking-[0.2em] text-(--subtext-color)"
            >Tiêu đề sách</label
          >
          <input
            v-model="book.tenSach"
            type="text"
            class="newsreaderFont text-lg text-(--secondary) border-b border-(--primary)/40 focus:border-(--primary) pb-2 transition-all bg-transparent"
            placeholder="Nhập tên sách..."
          />
        </div>

        <div class="flex flex-col gap-2">
          <label class="text-[10px] uppercase font-bold tracking-[0.2em] text-(--subtext-color)"
            >Mô tả</label
          >
          <textarea
            v-model="book.moTa"
            rows="4"
            class="text-sm leading-relaxed text-(--text-color) bg-(--bg-primary)/30 p-4 outline-none focus:bg-(--bg-primary)/50 transition-all resize-none"
            placeholder="Viết giới thiệu về sách..."
          ></textarea>
        </div>

        <div class="grid grid-cols-2 gap-x-10 gap-y-4 py-2 border-(--primary)/40">
          <div class="flex flex-col gap-1.5">
            <label class="text-[10px] uppercase font-bold tracking-widest text-(--subtext-color)"
              >Tác giả</label
            >
            <input
              v-model="book.tacGia"
              type="text"
              class="font-medium text-sm border-b border-(--primary)/40 focus:border-(--primary) outline-none pb-1 bg-transparent"
            />
          </div>

          <div class="flex flex-col gap-1.5">
            <label class="text-[10px] uppercase font-bold tracking-widest text-(--subtext-color)"
              >Nhà xuất bản</label
            >
            <select
              v-model="book.maNXB"
              class="font-medium text-sm border-b border-(--primary)/40 focus:border-(--primary) outline-none pb-1 bg-transparent cursor-pointer"
            >
              <option disabled value="">Chọn NXB</option>
              <option v-for="pub in publishers" :key="pub.maNXB" :value="pub.maNXB">
                {{ pub.tenNXB }}
              </option>
            </select>
          </div>

          <div class="flex flex-row gap-1.5">
            <div class="flex flex-col gap-1.5">
              <label class="text-[10px] uppercase font-bold tracking-widest text-(--subtext-color)"
                >Mã sách</label
              >
              <input
                v-model="book.maSach"
                :disabled="isEditMode"
                type="text"
                class="font-medium text-sm border-b border-(--primary)/40 focus:border-(--primary) outline-none pb-1 bg-transparent disabled:opacity-30"
              />
            </div>
            <div class="flex flex-col gap-1.5">
              <label class="text-[10px] uppercase font-bold tracking-widest text-(--subtext-color)"
                >Số quyển</label
              >
              <input
                v-model="book.soQuyen"
                type="number"
                class="font-medium text-sm border-b border-(--primary)/40 focus:border-(--primary) outline-none pb-1 bg-transparent w-20!"
              />
            </div>
          </div>
          <div class="flex flex-row justify-between">
            <div class="flex flex-col gap-2">
              <label class="text-[10px] uppercase font-bold tracking-widest text-(--subtext-color)"
                >Năm xuất bản</label
              >
              <input
                v-model="book.namXuatBan"
                type="text"
                class="w-32 font-medium text-sm border-b border-(--primary)/40 outline-none pb-1"
              />
            </div>
            <div class="w-fit flex flex-col gap-2">
              <label class="text-[10px] uppercase font-bold tracking-widest text-(--subtext-color)"
                >Đơn giá</label
              >
              <input
                v-model="book.donGia"
                type="number"
                class="w-30 font-medium text-sm border-b border-(--primary)/40 outline-none pb-1 text-(--primary)"
              />
            </div>
          </div>
        </div>

        <div class="space-y-4">
          <div class="flex flex-col gap-3">
            <label class="text-[10px] uppercase font-bold tracking-widest text-(--subtext-color)"
              >thể loại</label
            >
            <el-select
              v-model="book.maTheLoai"
              multiple
              placeholder="Chọn thể loại..."
              class="lexi-select-sharp"
            >
              <el-option
                v-for="cat in allCategories"
                :key="cat.maTheLoai"
                :label="cat.tenTheLoai"
                :value="cat.maTheLoai"
              />
            </el-select>
          </div>

          <div class="flex items-center gap-4">
            <button
              @click="handleSave"
              class="primary-btn px-5! py-2! font-bold text-xs uppercase tracking-[0.2em] flex items-center gap-3 shadow-none border border-(--primary)"
            >
              <FontAwesomeIcon :icon="isEditMode ? faSave : faPlus" />
              {{ isEditMode ? 'Lưu' : 'Thêm' }}
            </button>
            <button
              @click="$router.back()"
              class="secondary-btn px-4! py-2! text-[10px] uppercase font-bold tracking-widest border border-(--subtext-color)/20"
            >
              Hủy bỏ
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, reactive, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useStaffStore } from '@/stores/staff'
import { faArrowLeft, faPlus, faSave, faCamera } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { ElMessage, ElUpload } from 'element-plus'
import bookService from '@/services/book.service'
import LoadingComponent from '../LoadingComponent.vue'

const props = defineProps({
  maSach: String,
})

const router = useRouter()
const staffStore = useStaffStore()
const { publishers, categories: allCategories } = storeToRefs(staffStore)

const isEditMode = computed(() => !!props.maSach)
const selectedFile = ref(null)

const book = reactive({
  tenSach: '',
  maSach: '',
  tacGia: '',
  maTheLoai: [],
  hinhAnh: '',
  soQuyen: 1,
  donGia: 0,
  maNXB: '',
  moTa: '',
  namXuatBan: new Date().getFullYear().toString(),
  publicImgId: '',
})

const handleImageChange = (file) => {
  selectedFile.value = file.raw
  book.hinhAnh = URL.createObjectURL(file.raw)
}

const isLoading = ref(false)

const handleSave = async () => {
  if (!book.tenSach || !book.maSach) {
    ElMessage.warning('Vui lòng điền đầy đủ thông tin')
    return
  }

  try {
    isLoading.value = true

    if (selectedFile.value) {
      const uploadRes = await bookService.uploadBookCover(selectedFile.value)
      book.hinhAnh = uploadRes.coverUrl
      book.publicImgId = uploadRes.publicId
    }

    if (isEditMode.value) {
      console.log(book)
      await bookService.updateBook(book.maSach, book)
      ElMessage.success('Đã cập nhật dữ liệu sách thành công')
    } else {
      await bookService.createBook(book)
      await staffStore.fetchAllData()
      ElMessage.success('Đã thêm sách mới vào hệ thống')
    }

    router.push('/staff/book')
  } catch (error) {
    console.error(error)
    ElMessage.error('Thao tác thất bại: ' + (error.response?.data?.message || error.message))
  } finally {
    isLoading.value = false
  }
}

onMounted(async () => {
  if (publishers.value.length === 0) await staffStore.fetchAllData()

  if (isEditMode.value) {
    try {
      const data = await bookService.getBook(props.maSach)
      Object.assign(book, data)
    } catch (error) {
      ElMessage.error('Không thể nạp dữ liệu sách' + error)
    }
  }
})
</script>
