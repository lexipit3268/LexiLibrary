<template>
  <div class="p-6 min-h-screen bg-(--bg-primary) text-(--text-color)">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <div class="bg-white p-6 shadow-sm flex flex-col justify-between">
        <div class="flex justify-between items-start">
          <span class="newsreaderFont text-xl text-(--subtext-color)">Kho sách</span>
          <FontAwesomeIcon :icon="faBook" class="text-(--primary) text-xl" />
        </div>
        <div class="mt-4">
          <el-statistic :value="outBookLength" :precision="0" :value-style="statisticStyle" />
          <p class="text-xs text-green-600 font-bold mt-2">
            +3.68% <span class="text-(--subtext-color) font-normal ml-1 italic">tăng trưởng</span>
          </p>
        </div>
      </div>

      <div class="bg-white p-6 shadow-sm flex flex-col justify-between">
        <div class="flex justify-between items-start">
          <span class="newsreaderFont text-xl text-(--subtext-color)">Đối tác NXB</span>
          <FontAwesomeIcon :icon="faBuilding" class="text-(--primary) text-xl" />
        </div>
        <div class="mt-4">
          <el-statistic :value="outPublisherLength" :precision="0" :value-style="statisticStyle" />
          <p class="text-xs text-(--subtext-color) mt-2 italic">Hợp tác bền vững</p>
        </div>
      </div>

      <div class="bg-white p-6 shadow-sm flex flex-col justify-between">
        <div class="flex justify-between items-start">
          <span class="newsreaderFont text-xl text-(--subtext-color)">Độc giả</span>
          <FontAwesomeIcon :icon="faUsers" class="text-(--primary) text-xl" />
        </div>
        <div class="mt-4">
          <el-statistic :value="outUserLength" :precision="0" :value-style="statisticStyle" />
          <p class="text-xs text-green-600 font-bold mt-2">
            +3 <span class="text-(--subtext-color) font-normal ml-1 italic">thành viên mới</span>
          </p>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div class="lg:col-span-2 bg-white p-8 shadow-sm">
        <div class="flex justify-between items-center mb-6">
          <h3 class="newsreaderFont text-2xl">Sách mới cập nhật</h3>
          <router-link to="/staff/book"
            ><button class="secondary-btn px-6! py-2!">Xem tất cả</button></router-link
          >
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left">
            <thead>
              <tr
                class="text-(--subtext-color) text-xs uppercase tracking-widest border-b border-(--bg-primary)"
              >
                <th class="pb-4 font-semibold">Thông tin sách</th>
                <th class="pb-4 font-semibold">Nhà xuất bản</th>
                <th class="pb-4 font-semibold text-center">Số lượng</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-(--bg-primary)">
              <tr
                v-for="book in latestBooks"
                :key="book.maSach"
                class="group hover:bg-(--bg-primary)/60 transition-colors cursor-pointer"
                @click="router.push('staff/book/' + book.maSach)"
              >
                <ElTooltip
                  :content="`Xem chi tiết ${book.maSach}`"
                  :offset="0"
                  placement="bottom-end"
                >
                  <td class="py-4">
                    <div class="flex items-center gap-4">
                      <div
                        class="w-12 h-16 bg-(--bg-secondary) rounded flex items-center justify-center text-[10px] text-(--secondary) font-bold"
                      >
                        <img
                          :src="
                            book.hinhAnh
                              ? book.hinhAnh
                              : 'https://placehold.co/400x600/d48c6a/FFF?font=Montserrat&text=Empty...'
                          "
                          alt=""
                        />
                      </div>
                      <div>
                        <p class="font-bold text-sm">{{ book.tenSach }}</p>
                        <p class="text-xs text-(--subtext-color)">
                          Mã sách: {{ book.maSach.slice(-6).toUpperCase() }}
                        </p>
                      </div>
                    </div>
                  </td>
                </ElTooltip>
                <td class="py-4 text-sm">{{ getNamePublisher(book.maNXB) }}</td>
                <td class="py-4 text-center">
                  <span
                    class="px-3 py-1 bg-(--bg-primary) text-(--primary) rounded-full text-xs font-bold border border-(--primary)/20"
                  >
                    {{ book.soQuyen }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="space-y-6">
        <div class="bg-(--bg-secondary) p-8">
          <h3 class="newsreaderFont text-xl mb-6">Thao tác nhanh</h3>
          <div class="flex flex-col gap-4">
            <button
              class="primary-btn w-full py-4 font-bold flex items-center justify-center gap-3"
              @click="router.push('staff/book/create')"
            >
              <FontAwesomeIcon :icon="faPlus" />
              Nhập sách mới
            </button>
            <router-link to="/staff/borrowing-history">
              <button class="cta-btn my-0! rounded-none! w-full! bg-white text-(--primary)">
                <span>Quản lý mượn trả</span>
                <FontAwesomeIcon :icon="faArrowRight" /></button
            ></router-link>
          </div>
        </div>

        <div class="p-6 border border-(--primary)/20 italic">
          <p class="newsreaderFont text-(--subtext-color) leading-relaxed">
            Nếu làm không được thì vừa khóc vừa làm
          </p>
          <p class="text-[10px] mt-4 uppercase tracking-[0.2rem] text-(--primary) font-bold">
            — LexiLibrary Staff
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useTransition } from '@vueuse/core'
import { storeToRefs } from 'pinia'
import { useStaffStore } from '@/stores/staff'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faBook,
  faBuilding,
  faUsers,
  faPlus,
  faArrowRight,
} from '@fortawesome/free-solid-svg-icons'
import { ElStatistic, ElTooltip } from 'element-plus'
import { useRouter } from 'vue-router'

const router = useRouter()
const staffStore = useStaffStore()
const { books, publishers, users } = storeToRefs(staffStore)

const latestBooks = ref([])
const bookLength = ref(0)
const publisherLength = ref(0)
const userLength = ref(0)

const outBookLength = useTransition(bookLength, { duration: 2000 })
const outPublisherLength = useTransition(publisherLength, { duration: 2000 })
const outUserLength = useTransition(userLength, { duration: 2000 })

const getNamePublisher = (maNXB) => {
  return publishers.value.find((p) => p.maNXB === maNXB).tenNXB
}

onMounted(async () => {
  if (books.value.length === 0) {
    await staffStore.fetchAllData()
  }
  bookLength.value = books.value.length
  publisherLength.value = publishers.value.length
  userLength.value = users.value.length
  latestBooks.value = books.value.slice(-6).reverse()
})

const statisticStyle =
  'font-family: Montserrat; font-weight: 700; font-size: 2.25rem; color: var(--text-color); letter-spacing: -0.05em;'
</script>

<style scoped></style>
