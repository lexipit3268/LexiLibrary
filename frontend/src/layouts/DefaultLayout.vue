<script setup>
import MainFooter from '@/components/Footers/MainFooter.vue'
import MainHeader from '@/components/Headers/UserHeader.vue'
import { ElBacktop } from 'element-plus'
</script>

<template>
  <MainHeader></MainHeader>
  <RouterView></RouterView>
  <MainFooter></MainFooter>
  <ElBacktop class="primary-btn text-white!"></ElBacktop>
</template>
