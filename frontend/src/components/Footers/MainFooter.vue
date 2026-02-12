<script setup>
import { ElDivider } from 'element-plus'
import AppLogo from '../AppLogo.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faTiktok, faFacebook, faGithub, faYoutube } from '@fortawesome/free-brands-svg-icons'
import SubcribeFooter from './SubcribeFooter.vue'
</script>

<template>
  <SubcribeFooter />
  <div class="flex flex-col items-center justify-end bg-(--secondary) min-h-140">
    <div class="flex gap-40 w-full max-w-380 px-18 text-white mb-6">
      <div class="flex flex-col items-center"><AppLogo class="w-24"></AppLogo></div>
      <div class="flex flex-col gap-2 w-52">
        <h3 class="newsreaderFont text-2xl">Văn phòng</h3>
        <p>Lầu 8 - Lanmark 81, 720A Điện Biên Phủ, Thạnh Mỹ Tây, TP Hồ Chí Minh</p>
        <p class="text-xs!">Lexipit: 0999053268</p>
        <p class="text-xs!">Nguyễn Lộc: 0993200068</p>
      </div>
      <div class="flex flex-col gap-2 w-52">
        <h3 class="newsreaderFont text-2xl">Liên kết</h3>
        <router-link class="hover:text-(--primary) transition-colors duration-150" to="/"
          >Trang chủ</router-link
        >
        <router-link class="hover:text-(--primary) transition-colors duration-150" to="/book"
          >Sách</router-link
        >
        <router-link class="hover:text-(--primary) transition-colors duration-150" to="/history"
          >Lịch sử</router-link
        >
        <a href="#" class="hover:text-(--primary) transition-colors duration-150">Liên hệ</a>
      </div>
      <div class="flex flex-col gap-2 w-52">
        <h3 class="newsreaderFont text-2xl">Mạng xã hội</h3>
        <div class="grid grid-cols-2 grid-rows-2 w-fit gap-4 text-2xl">
          <div
            class="flex items-center justify-center w-20 h-20 bg-amber-800/30 hover:bg-amber-700/30 group transition-colors duration-200 cursor-pointer"
          >
            <FontAwesomeIcon
              :icon="faFacebook"
              class="group-hover:-translate-y-1.5 transition-all duration-200"
            ></FontAwesomeIcon>
          </div>
          <div
            class="flex items-center justify-center w-20 h-20 bg-amber-800/30 hover:bg-amber-700/30 group transition-colors duration-200 cursor-pointer"
          >
            <FontAwesomeIcon
              :icon="faYoutube"
              class="group-hover:-translate-y-1.5 transition-all duration-200"
            ></FontAwesomeIcon>
          </div>
          <div
            class="flex items-center justify-center w-20 h-20 bg-amber-800/30 hover:bg-amber-700/30 group transition-colors duration-200 cursor-pointer"
          >
            <FontAwesomeIcon
              :icon="faGithub"
              class="group-hover:-translate-y-1.5 transition-all duration-200"
            ></FontAwesomeIcon>
          </div>
          <div
            class="flex items-center justify-center w-20 h-20 bg-amber-800/30 hover:bg-amber-700/30 group transition-colors duration-200 cursor-pointer"
          >
            <FontAwesomeIcon
              :icon="faTiktok"
              class="group-hover:-translate-y-1.5 transition-all duration-200"
            ></FontAwesomeIcon>
          </div>
        </div>
      </div>
    </div>
    <ElDivider class="w-[90%]! border-(--primary)!" />
    <div class="LexiLibrary text-(--primary) text-[5rem]! my-4">
      <router-link to="/">Lexilibrary</router-link>
    </div>
  </div>
</template>

<style scoped></style>
