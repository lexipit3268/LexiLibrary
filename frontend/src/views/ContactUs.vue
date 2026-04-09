<script setup>
import { ref } from 'vue'
import BreadcrumbComponent from '@/components/BreadcrumbComponent.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faEnvelope, faPhone, faLocationDot, faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { ElMessage } from 'element-plus'

const form = ref({
  name: '',
  email: '',
  message: '',
})

const isSending = ref(false)

const handleSubmit = () => {
  isSending.value = true
  setTimeout(() => {
    ElMessage.success({ message: 'Yêu cầu của bạn đã được gửi thành công.', offset: 100 })
    isSending.value = false
    form.value = { name: '', email: '', message: '' }
  }, 1000)
}
</script>

<template>
  <BreadcrumbComponent
    title="Liên hệ"
    :paths="[
      { label: 'Trang chủ', path: '/' },
      { label: 'Liên hệ', path: '/contact' },
    ]"
  />

  <div class="bg-(--bg-primary) min-h-screen py-12 px-6 lg:px-20 flex items-center justify-center">
    <div
      class="max-w-7xl w-full h-160 bg-white shadow-2xl border border-gray-100 flex flex-col lg:flex-row overflow-hidden"
    >
      <div class="lg:w-5/12 p-8 md:p-12 flex flex-col justify-between">
        <div>
          <div class="mb-5">
            <h2 class="newsreaderFont text-4xl font-semibold text-(--secondary) mb-3">Liên hệ</h2>
            <p class="text-sm text-gray-400">
              Gửi lời nhắn để chúng tôi có thể hỗ trợ bạn tốt nhất.
            </p>
          </div>

          <form @submit.prevent="handleSubmit" class="space-y-6">
            <div class="space-y-2">
              <label class="text-xs font-bold uppercase tracking-widest text-gray-500"
                >Họ và tên</label
              >
              <input
                v-model="form.name"
                type="text"
                placeholder="Nhập tên của bạn"
                required
                class="w-full text-base border-b border-gray-200 py-2 focus:border-(--secondary) outline-none transition-all placeholder:text-sm placeholder:italic"
              />
            </div>

            <div class="space-y-2">
              <label class="text-xs font-bold uppercase tracking-widest text-gray-500">Email</label>
              <input
                v-model="form.email"
                type="email"
                placeholder="example@email.com"
                required
                class="w-full text-base border-b border-gray-200 py-2 focus:border-(--secondary) outline-none transition-all placeholder:text-sm placeholder:italic"
              />
            </div>

            <div class="space-y-2">
              <label class="text-xs font-bold uppercase tracking-widest text-gray-500"
                >Nội dung</label
              >
              <textarea
                v-model="form.message"
                rows="4"
                placeholder="Nhập nội dung trao đổi..."
                required
                class="w-full h-20 text-base border-b border-gray-200 py-2 focus:border-(--secondary) outline-none transition-all placeholder:text-sm placeholder:italic resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              :disabled="isSending"
              class="group w-full px-8 py-4 bg-(--secondary) text-white text-xs font-bold uppercase tracking-widest hover:bg-(--primary) transition-all flex items-center justify-center gap-3"
            >
              <span>{{ isSending ? 'Đang gửi' : 'Gửi lời nhắn' }}</span>
              <FontAwesomeIcon
                :icon="faPaperPlane"
                class="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
              />
            </button>
          </form>
        </div>

        <div class="grid grid-cols-1 gap-4 border-t border-gray-50 pt-8">
          <div class="flex items-center gap-3 text-gray-500">
            <FontAwesomeIcon :icon="faPhone" class="text-xs" />
            <span class="text-sm font-medium">(+84) 302 608 999</span>
          </div>
          <div class="flex items-center gap-3 text-gray-500">
            <FontAwesomeIcon :icon="faEnvelope" class="text-xs" />
            <span class="text-sm font-medium">contact@library.com</span>
          </div>
        </div>
      </div>

      <div class="lg:w-7/12 relative bg-gray-100">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2844.229452317493!2d106.7185897781134!3d10.795000982124641!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317527c2f8f30911%3A0x36ac5073f8c91acd!2sLandmark%2081%20skyview!5e0!3m2!1svi!2s!4v1775748039494!5m2!1svi!2s"
          class="absolute inset-0 w-full h-full grayscale-75 contrast-[1.1]"
          style="border: 0"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        >
        </iframe>

        <div
          class="absolute bottom-10 left-10 right-10 bg-(--secondary) text-white p-8 shadow-2xl backdrop-blur-sm bg-opacity-95 md:max-w-md"
        >
          <div class="flex gap-5">
            <FontAwesomeIcon :icon="faLocationDot" class="mt-1 text-lg" />
            <div>
              <p class="text-xs font-bold uppercase tracking-[0.2em] opacity-60 mb-2">
                Văn phòng đại diện
              </p>
              <p class="text-sm font-medium leading-relaxed">
                Lầu 8 - Landmark 81, 720A Điện Biên Phủ, <br />
                Phường 22, Quận Bình Thạnh, <br />
                TP. Hồ Chí Minh, Việt Nam
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Chống nhảy layout khi focus */
input:focus::placeholder,
textarea:focus::placeholder {
  opacity: 0;
}
</style>
