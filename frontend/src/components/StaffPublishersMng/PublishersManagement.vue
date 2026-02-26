<template>
  <div
    class="p-6 font-['Montserrat'] bg-(--bg-primary) min-h-[calc(100vh-80px)] overflow-y-auto text-(--text-color)"
  >
    <div class="bg-white p-6 shadow-sm border border-(--primary)/10 flex flex-col min-h-100">
      <div class="flex items-center justify-between mb-6">
        <h3 class="newsreaderFont text-2xl flex items-center gap-3">
          <span class="w-8 h-px bg-(--primary)"></span>
          Danh sách đơn vị
        </h3>
        <button
          @click="openModal()"
          class="primary-btn px-6! py-3! flex items-center gap-2 font-bold shadow-lg shadow-(--primary)/20"
        >
          <FontAwesomeIcon :icon="faPlus" />
          <span class="text-xs uppercase tracking-widest">Thêm nhà xuất bản</span>
        </button>
      </div>

      <div class="overflow-x-auto grow">
        <table class="w-full text-left border-spacing-y-2">
          <thead>
            <tr class="text-[9px] uppercase tracking-widest text-(--subtext-color) font-black">
              <th class="px-4 pb-2">Mã định danh</th>
              <th class="px-4 pb-2">Tên nhà xuất bản</th>
              <th class="px-4 pb-2">Địa chỉ trụ sở</th>
              <th class="px-4 pb-2 text-right">Thao tác</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-(--bg-primary)">
            <tr
              v-for="pub in publishers"
              :key="pub.maNXB"
              class="group hover:bg-(--bg-primary)/70 h-20 transition-colors duration-300 divide-y divide-(--bg-secondary)"
            >
              <td class="px-4 py-4 text-xs font-bold text-(--primary) newsreaderFont">
                {{ pub.maNXB }}
              </td>
              <td class="px-4 py-4">
                <p class="font-bold text-sm">{{ pub.tenNXB }}</p>
              </td>
              <td class="px-4 py-4 text-[11px] text-(--subtext-color) italic max-w-xs truncate">
                {{ pub.diaChi }}
              </td>
              <td class="px-4 py-4 text-right border-b border-(--bg-secondary)">
                <div
                  class="flex justify-end gap-2 opacity-40 group-hover:opacity-100 transition-opacity"
                >
                  <button
                    @click="openModal(pub)"
                    class="staff-header-icon w-7! h-7! bg-white! border border-(--primary)/20 hover:text-(--secondary)"
                  >
                    <FontAwesomeIcon :icon="faPen" class="text-[9px]" />
                  </button>
                  <button
                    @click="handleDelete(pub.maNXB)"
                    class="staff-header-icon w-7! h-7! bg-white! border border-red-100 hover:bg-red-50! hover:text-red-600!"
                  >
                    <FontAwesomeIcon :icon="faTrash" class="text-[9px]" />
                  </button>
                </div>
              </td>
            </tr>

            <tr v-if="publishers.length === 0">
              <td colspan="4" class="py-10 text-center text-(--subtext-color) italic text-sm">
                Chưa có dữ liệu nhà xuất bản nào được ghi nhận.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <PublisherModal
      :is-open="isModalOpen"
      :is-editing="isEditing"
      :data="selectedPub"
      @close="isModalOpen = false"
      @save="onSave"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useStaffStore } from '@/stores/staff'
import { ElMessageBox, ElMessage } from 'element-plus'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faPen, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons'
import publisherService from '@/services/publisher.service'
import PublisherModal from '@/components/StaffPublishersMng/PublisherModal.vue'

const staffStore = useStaffStore()
const { publishers } = storeToRefs(staffStore)

const isModalOpen = ref(false)
const isEditing = ref(false)
const selectedPub = ref(null)

const openModal = (pub = null) => {
  if (pub) isEditing.value = true
  selectedPub.value = pub ? pub : { maNXB: '', tenNXB: '', diaChi: '' }
  isModalOpen.value = true
}

const onSave = async (formData) => {
  try {
    if (isEditing.value) {
      await publisherService.updatePublisher(formData.maNXB, formData)
      ElMessage.success('Cập nhật thông tin thành công')
    } else {
      await publisherService.createPublisher(formData)
      ElMessage.success('Thêm nhà xuất bản mới thành công')
    }

    await staffStore.fetchAllData()
    isModalOpen.value = false
  } catch (error) {
    ElMessage.error('Thao tác thất bại, vui lòng thử lại!')
    console.error(error)
  }
}

const handleDelete = async (id) => {
  try {
    await ElMessageBox.confirm(
      `Bạn có chắc chắn muốn ngừng hợp tác với nhà xuất bản #${id}?`,
      'Xác nhận xóa',
      {
        confirmButtonText: 'Xác nhận',
        cancelButtonText: 'Hủy bỏ',
        type: 'warning',
      },
    )

    const response = await publisherService.deletePublisher(id)
    if (response) {
      staffStore.publishers = staffStore.publishers.filter((pub) => pub.maNXB !== id)
      ElMessage.success('Đã xóa đơn vị thành công')
    }
  } catch (error) {
    if (error !== 'cancel') {
      ElMessage.error('Không thể xóa dữ liệu vào lúc này')
    }
  }
}

onMounted(async () => {
  if (publishers.value.length === 0) {
    await staffStore.fetchAllData()
  }
})
</script>
