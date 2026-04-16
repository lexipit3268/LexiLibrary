<template>
  <div class="p-6 bg-(--bg-primary) min-h-[calc(100vh-80px)] overflow-y-auto text-(--text-color)">
    <div class="bg-white p-6 shadow-sm border border-(--primary)/10 flex flex-col min-h-100">
      <div class="flex items-center justify-between mb-8">
        <h3 class="newsreaderFont text-2xl flex items-center gap-3">
          <span class="w-8 h-px bg-(--primary)"></span>
          Danh sách độc giả
        </h3>
        <div class="flex gap-4 items-center">
          <p class="text-xs uppercase font-medium text-(--subtext-color)">
            Tổng cộng: <span class="text-(--primary)">{{ users.length }}</span> độc giả
          </p>
        </div>
      </div>

      <div class="overflow-x-auto grow">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr
              class="text-[10px] uppercase tracking-widest text-(--subtext-color) font-black border-b border-(--bg-primary)"
            >
              <th class="px-4 pb-4">Thành viên</th>
              <th class="px-4 pb-4">Ngày sinh</th>
              <th class="px-4 pb-4">Giới tính</th>
              <th class="px-4 pb-4">Thông tin liên lạc</th>
              <th class="px-4 pb-4">Ngày vi phạm</th>
              <th class="px-4 pb-4">Điểm số / Giới hạn</th>
              <th class="px-4 pb-4 text-center">Trạng thái</th>
              <th class="px-4 pb-4 text-right">Thao tác</th>
            </tr>
          </thead>

          <tbody class="divide-y divide-(--bg-primary)">
            <tr
              v-for="(user, index) in users"
              :key="user.maDocGia"
              class="group hover:bg-(--bg-primary)/50 h-24 transition-all duration-300"
              data-aos="fade-in"
              :data-aos-delay="(index % 5) * 100"
              data-aos-once="true"
            >
              <td class="px-4 py-4">
                <div class="flex items-center gap-3">
                  <div
                    class="w-12 h-12 rounded-full overflow-hidden border border-(--primary)/20 p-0.5 bg-white"
                  >
                    <img
                      :src="
                        user.hinhAnh
                          ? user.hinhAnh
                          : `https://img.freepik.com/premium-vector/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3407.jpg`
                      "
                      class="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  <div>
                    <p class="font-medium text-sm">{{ user.hoLot }} {{ user.ten }}</p>
                    <p class="text-xs uppercase tracking-tighter opacity-60">{{ user.maDocGia }}</p>
                  </div>
                </div>
              </td>

              <td class="px-4 py-4">
                <p class="text-sm italic">{{ formatDate(user.ngaySinh) }}</p>
              </td>

              <td class="px-4 py-4">
                <p class="text-sm">{{ user.phai }}</p>
              </td>

              <td class="px-4 py-4">
                <div class="space-y-0.5">
                  <p class="text-sm font-medium">{{ user.soDienThoai }}</p>
                  <p class="text-xs font-medium italic opacity-80">{{ user.email }}</p>
                </div>
              </td>

              <td class="px-4 py-4">
                <div v-if="user.ngayViPham" class="flex flex-col">
                  <p class="text-sm font-medium text-red-500">
                    {{ formatDate(user.ngayViPham) }}
                  </p>
                  <span class="text-[10px] uppercase font-medium text-red-400 tracking-tighter"
                    >Gần nhất</span
                  >
                </div>
                <p v-else class="text-sm opacity-30 italic">---</p>
              </td>

              <td class="px-4 py-4">
                <div class="text-xs font-medium space-y-1">
                  <p>
                    Uy tín:
                    <span :class="user.diemUyTin > 6 ? 'text-green-600' : 'text-red-600'">{{
                      user.diemUyTin
                    }}</span>
                  </p>
                  <p>
                    Giới hạn: <span class="text-(--secondary)">{{ user.gioiHanMuon }} quyển</span>
                  </p>
                </div>
              </td>

              <td class="px-4 py-4 text-center">
                <span
                  :class="
                    user.isActive
                      ? 'bg-green-50 text-green-700 border-green-100'
                      : 'bg-red-50 text-red-700 border-red-100'
                  "
                  class="text-[9px] font-black uppercase tracking-widest px-2 py-1 border inline-block min-w-16"
                >
                  {{ user.isActive ? 'Active' : 'Locked' }}
                </span>
              </td>

              <td class="px-4 py-4 text-right">
                <div class="flex justify-end items-center gap-4">
                  <el-switch
                    :model-value="user.isActive"
                    :loading="loadingId === user.maDocGia"
                    @change="handleToggleStatus(user)"
                    inline-prompt
                    active-text="On"
                    inactive-text="Off"
                  />
                </div>
              </td>
            </tr>

            <tr v-if="users.length === 0">
              <td colspan="8" class="py-20 text-center opacity-40 italic newsreaderFont text-xl">
                Không tìm thấy dữ liệu độc giả nào...
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useStaffStore } from '@/stores/staff'
import userService from '@/services/user.service'
import { ElMessageBox, ElMessage } from 'element-plus'
import { formatDate } from '../../../utils/formatDate'

const staffStore = useStaffStore()
const { users } = storeToRefs(staffStore)
const loadingId = ref(null)

const loadData = async () => {
  try {
    await staffStore.fetchAllData()
  } catch (error) {
    ElMessage.error('Lỗi tải dữ liệu ' + error)
  }
}

const handleToggleStatus = async (user) => {
  const nextStatus = !user.isActive
  const actionText = nextStatus ? 'Kích hoạt' : 'Khóa'

  try {
    await ElMessageBox.confirm(
      `Xác nhận ${actionText.toLowerCase()} tài khoản độc giả ${user.hoLot} ${user.ten}?`,
      'Xác nhận thay đổi',
      {
        confirmButtonText: 'Đồng ý',
        cancelButtonText: 'Hủy bỏ',
        type: nextStatus ? 'success' : 'warning',
      },
    )

    loadingId.value = user.maDocGia

    await userService.updateUser(user.maDocGia, { isActive: nextStatus })

    ElMessage.success(`${actionText} tài khoản thành công`)
    await loadData()
  } catch (error) {
    if (error !== 'cancel') {
      ElMessage.error('Thao tác thất bại: ' + error.message)
    }
  } finally {
    loadingId.value = null
  }
}

onMounted(async () => {
  if (users.value.length === 0) await loadData()
})
</script>

<style scoped></style>
