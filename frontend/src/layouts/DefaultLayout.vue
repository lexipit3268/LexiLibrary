<script setup>
import MainFooter from '@/components/Footers/MainFooter.vue'
import MainHeader from '@/components/Headers/UserHeader.vue'
</script>

<template>
  <MainHeader></MainHeader>
  <RouterView></RouterView>
  <MainFooter></MainFooter>
</template>
