<script setup>
import { ElDivider } from 'element-plus'
import AppLogo from '../AppLogo.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faTiktok, faFacebook, faGithub, faYoutube } from '@fortawesome/free-brands-svg-icons'
import SubcribeFooter from './SubcribeFooter.vue'
import { Splide, SplideSlide } from '@splidejs/vue-splide'
import { AutoScroll } from '@splidejs/splide-extension-auto-scroll'
import '@splidejs/vue-splide/css'

const socials = [
  { icon: faFacebook, link: '#' },
  { icon: faYoutube, link: '#' },
  { icon: faGithub, link: '#' },
  { icon: faTiktok, link: '#' },
]

const navLinks = [
  { name: 'Trang chủ', path: '/' },
  { name: 'Sách', path: '/book' },
  { name: 'Lịch sử', path: '/history' },
]

const splideOptions = {
  type: 'loop',
  focus: 'center',
  arrows: false,
  pagination: false,
  autoWidth: true,
  gap: '60px',
  autoScroll: {
    speed: -0.4,
    pauseOnHover: false,
  },
  breakpoints: {
    768: { gap: '40px' },
    480: { gap: '30px' },
  },
}
</script>

<template>
  <SubcribeFooter />
  <div class="flex flex-col items-center justify-end bg-(--secondary) min-h-160">
    <div class="flex gap-40 w-full max-w-380 px-18 text-white mb-6">
      <div class="flex flex-col items-center">
        <AppLogo class="w-24" />
      </div>

      <div class="flex flex-col gap-2 w-52">
        <h3 class="newsreaderFont text-2xl">Văn phòng</h3>
        <p>Lầu 8 - Lanmark 81, 720A Điện Biên Phủ, Thạnh Mỹ Tây, TP Hồ Chí Minh</p>
        <p class="text-xs!">Lexipit: 0999053268</p>
        <p class="text-xs!">Nguyễn Lộc: 0993200068</p>
      </div>

      <div class="flex flex-col gap-2 w-52">
        <h3 class="newsreaderFont text-2xl">Liên kết</h3>
        <router-link
          v-for="link in navLinks"
          :key="link.path"
          :to="link.path"
          class="hover:text-(--primary) transition-colors duration-150"
        >
          {{ link.name }}
        </router-link>
        <a href="#" class="hover:text-(--primary) transition-colors duration-150">Liên hệ</a>
      </div>

      <div class="flex flex-col gap-2 w-52">
        <h3 class="newsreaderFont text-2xl">Mạng xã hội</h3>
        <div class="grid grid-cols-2 grid-rows-2 w-fit gap-4 text-2xl">
          <div
            v-for="(social, index) in socials"
            :key="index"
            class="flex items-center justify-center w-20 h-20 bg-amber-800/30 hover:bg-amber-700/30 group transition-colors duration-200 cursor-pointer"
          >
            <FontAwesomeIcon
              :icon="social.icon"
              class="group-hover:-translate-y-1.5 transition-all duration-200"
            />
          </div>
        </div>
      </div>
    </div>

    <ElDivider class="w-[90%]! border-(--primary)!" />

    <div class="brands-section w-full pb-8">
      <Splide :options="splideOptions" :extensions="{ AutoScroll }">
        <SplideSlide v-for="index in 10" :key="index">
          <div class="LexiLibrary text-(--primary) text-[7rem]! my-4">
            <router-link to="/">Lexilibrary - </router-link>
          </div>
        </SplideSlide>
      </Splide>
    </div>
  </div>

  <div class="w-full px-18 py-2 flex flex-col items-center justify-center bg-(--bg-primary)">
    <img src="/brands/Lexipit8.svg" class="w-40" />
    <div class="flex items-center justify-center gap-1 ml-4 text-xs">
      <p>&copy; 2026 Lexipit3268. All Rights Reserved</p>
    </div>
  </div>
</template>
