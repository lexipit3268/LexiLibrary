<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/10 backdrop-blur-[2px] font-['Montserrat']"
  >
    <div class="bg-white w-full max-w-md p-8 shadow-2xl border border-(--primary)/15">
      <h3 class="newsreaderFont text-2xl mb-6 text-(--primary)">
        {{ isEditing ? 'Cập nhật' : 'Thêm' }} Nhà xuất bản
      </h3>

      <form @submit.prevent="submitForm" class="space-y-5">
        <div class="flex flex-col gap-1.5">
          <label class="text-[9px] uppercase font-bold tracking-widest text-(--subtext-color) ml-1">
            Mã Nhà xuất bản
          </label>
          <input
            v-model="localForm.maNXB"
            type="text"
            :disabled="isEditing"
            class="bg-(--bg-primary)/70 px-4 py-3 text-sm outline-none focus:border-(--primary) disabled:opacity-50 transition-all"
            placeholder="NXB-XXX"
          />
        </div>

        <div class="flex flex-col gap-1.5">
          <label class="text-[9px] uppercase font-bold tracking-widest text-(--subtext-color) ml-1">
            Tên đơn vị
          </label>
          <input
            v-model="localForm.tenNXB"
            type="text"
            class="bg-(--bg-primary)/70 px-4 py-3 text-sm outline-none focus:border-(--primary) transition-all"
            placeholder="Tên chính thức..."
          />
        </div>

        <div class="flex flex-col gap-1.5">
          <label class="text-[9px] uppercase font-bold tracking-widest text-(--subtext-color) ml-1">
            Địa chỉ trụ sở
          </label>
          <textarea
            v-model="localForm.diaChi"
            rows="3"
            class="bg-(--bg-primary)/70 px-4 py-3 text-sm resize-none outline-none focus:border-(--primary) transition-all"
            placeholder="Địa chỉ đầy đủ..."
          ></textarea>
        </div>

        <div class="flex justify-end gap-4 mt-8">
          <button
            type="button"
            @click="$emit('close')"
            class="secondary-btn px-6! py-2! text-[10px]! border-transparent!"
          >
            Hủy bỏ
          </button>
          <button
            type="submit"
            class="primary-btn px-8 py-2 font-bold text-xs uppercase tracking-widest shadow-lg shadow-(--primary)/20"
          >
            Xác nhận
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, watch } from 'vue'

const props = defineProps({
  isOpen: Boolean,
  isEditing: Boolean,
  data: Object,
})

const emit = defineEmits(['close', 'save'])

const localForm = reactive({ maNXB: '', tenNXB: '', diaChi: '' })

watch(
  () => props.data,
  (newVal) => {
    Object.assign(localForm, newVal || { maNXB: '', tenNXB: '', diaChi: '' })
  },
  { deep: true, immediate: true },
)

const submitForm = () => {
  emit('save', { ...localForm })
}
</script>
