<template>
  <div class="p-6 min-h-[calc(100%-80px)] bg-(--bg-primary) text-(--text-color)">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <div
        class="bg-white p-6 shadow-sm flex flex-col justify-between"
        data-aos="fade-down"
        data-aos-offset="0"
        data-aos-delay="300"
        data-aos-once="true"
      >
        <div class="flex justify-between items-start">
          <span class="newsreaderFont text-xl text-(--subtext-color)">Kho sách</span>
          <ElTooltip content="Xem chi tiết" placement="top">
            <FontAwesomeIcon
              :icon="faBook"
              @click="$router.push('/staff/book')"
              class="text-(--primary) text-xl cursor-pointer outline-none"
            />
          </ElTooltip>
        </div>
        <div class="mt-4">
          <CountUp
            :from="0"
            :to="bookLength"
            :delay="1"
            :duration="2"
            class-name="font-extrabold text-4xl"
            :start-when="bookLength > 0"
          />
          <p class="text-xs text-green-600 font-bold mt-2">
            +3.68% <span class="text-(--subtext-color) font-normal ml-1 italic">tăng trưởng</span>
          </p>
        </div>
      </div>

      <div
        class="bg-white p-6 shadow-sm flex flex-col justify-between"
        data-aos="fade-down"
        data-aos-offset="0"
        data-aos-delay="200"
        data-aos-once="true"
      >
        <div class="flex justify-between items-start">
          <span class="newsreaderFont text-xl text-(--subtext-color)">Đối tác NXB</span>
          <ElTooltip content="Xem chi tiết" placement="top">
            <FontAwesomeIcon
              :icon="faBuilding"
              @click="$router.push('/staff/publisher')"
              class="text-(--primary) text-xl cursor-pointer outline-none"
            />
          </ElTooltip>
        </div>
        <div class="mt-4">
          <CountUp
            :from="0"
            :to="publisherLength"
            :delay="1"
            :duration="1.5"
            :start-when="publisherLength > 0"
            class-name="font-extrabold text-4xl"
          />
          <p class="text-xs text-(--subtext-color) mt-2 italic">Hợp tác bền vững</p>
        </div>
      </div>

      <div
        class="bg-white p-6 shadow-sm flex flex-col justify-between"
        data-aos="fade-down"
        data-aos-offset="0"
        data-aos-delay="0"
        data-aos-once="true"
      >
        <div class="flex justify-between items-start">
          <span class="newsreaderFont text-xl text-(--subtext-color)">Độc giả</span>
          <ElTooltip content="Xem chi tiết" placement="top">
            <FontAwesomeIcon
              :icon="faUsers"
              @click="$router.push('/staff/user')"
              class="text-(--primary) text-xl cursor-pointer outline-none"
            />
          </ElTooltip>
        </div>
        <div class="mt-4">
          <CountUp
            :from="0"
            :to="userLength"
            :delay="1"
            :duration="1.5"
            :start-when="userLength > 0"
            class-name="font-extrabold text-4xl tracking-tighter"
          />
          <p class="text-xs text-green-600 font-bold mt-2">
            +3 <span class="text-(--subtext-color) font-normal ml-1 italic">thành viên mới</span>
          </p>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div class="bg-white p-8 shadow-sm border border-gray-100 flex flex-col max-h-105">
        <h2 class="newsreaderFont text-2xl font-medium text-(--secondary)">Cơ cấu thể loại</h2>
        <div class="flex items-center justify-center relative">
          <VueApexCharts
            v-if="categorySeries.length > 0"
            type="pie"
            width="100%"
            height="350"
            :options="categoryOptions"
            :series="categorySeries"
          />
          <div v-else class="w-full space-y-4">
            <el-skeleton :rows="6" animated />
          </div>
        </div>
        <div></div>
      </div>

      <div class="bg-white p-8 shadow-sm border border-gray-100 flex flex-col max-h-105">
        <h2 class="newsreaderFont text-2xl font-medium text-(--secondary)">Tình trạng mượn trả</h2>
        <div class="grow flex items-center justify-center relative">
          <VueApexCharts
            v-if="statusSeries[0].data.length > 0"
            type="bar"
            width="120%"
            height="340"
            :options="statusOptions"
            :series="statusSeries"
          />
          <div v-else class="w-full space-y-4">
            <el-skeleton :rows="6" animated />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import VueApexCharts from 'vue3-apexcharts'
import CountUp from '@/components/vuebits/CountUp/CountUp.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faBook, faBuilding, faUsers } from '@fortawesome/free-solid-svg-icons'
import { ElTooltip, ElSkeleton } from 'element-plus'

import { useStaffStore } from '@/stores/staff'
import { useBorrowingStore } from '@/stores/borrowing'
import { formatStatus } from '../../utils/borrowing.util'

const staffStore = useStaffStore()
const borrowingStore = useBorrowingStore()
const { books, publishers, users } = storeToRefs(staffStore)

const bookLength = ref(0)
const publisherLength = ref(0)
const userLength = ref(0)

// --- CONFIG PIE CHART ---
const categorySeries = ref([])
const categoryOptions = ref({
  chart: {
    type: 'pie',
    fontFamily: 'inherit',
    animations: { enabled: true, easing: 'easeinout', speed: 1000 },
  },
  labels: [],
  theme: {
    monochrome: {
      enabled: true,
      color: '#d48c6a',
      shadeTo: 'light',
      shadeIntensity: 0.65,
    },
  },
  stroke: { width: 2, colors: ['#fff'] },
  legend: { position: 'bottom', fontSize: '11px', fontWeight: 600, offsetY: 10 },
  dataLabels: {
    enabled: true,
    formatter: (val) => `${val.toFixed(1)}%`,
    style: { fontSize: '10px' },
  },
  tooltip: { y: { formatter: (val) => `${val} cuốn` } },
})

// --- CONFIG BAR CHART ---
const statusSeries = ref([{ name: 'Số lượng', data: [] }])
const statusOptions = ref({
  chart: {
    type: 'bar',
    fontFamily: 'inherit',
    toolbar: { show: false },
    animations: { enabled: true, speed: 1000 },
  },
  plotOptions: {
    bar: { borderRadius: 4, horizontal: true, distributed: true, barHeight: '55%' },
  },
  colors: ['#2c3e50', '#d48c6a', '#95a5a6', '#e74c3c', '#bdc3c7', '#27ae60'],
  dataLabels: {
    enabled: true,
    style: { fontSize: '10px', fontWeight: 'bold' },
    formatter: (val) => `${val} phiếu`,
  },
  xaxis: {
    categories: [],
    labels: { style: { fontSize: '10px', fontWeight: 600 } },
  },
  grid: { borderColor: '#f8f8f8' },
  legend: { show: false },
})

onMounted(async () => {
  if (books.value.length === 0) await staffStore.fetchAllData()
  bookLength.value = books.value.length
  publisherLength.value = publishers.value.length
  userLength.value = users.value.length

  try {
    const categoryData = (await staffStore.getCategoryStats()) || []
    const top5 = categoryData.slice(0, 5)

    categorySeries.value = top5.map((item) => item.count)
    categoryOptions.value = {
      ...categoryOptions.value,
      labels: top5.map((item) => item._id),
    }

    const statusData = (await borrowingStore.getStatusStats()) || []

    statusSeries.value = [
      {
        name: 'Số lượng',
        data: statusData.map((item) => item.count),
      },
    ]

    statusOptions.value = {
      ...statusOptions.value,
      xaxis: {
        ...statusOptions.value.xaxis,
        categories: statusData.map((item) => formatStatus(item._id)),
      },
    }
  } catch (error) {
    console.error('Lỗi khi tải dữ liệu báo cáo:', error)
  }
})
</script>

<style scoped>
:deep(.apexcharts-legend-text) {
  text-transform: uppercase;
  letter-spacing: 0.1em;
  opacity: 0.7;
}
</style>
