<script setup>
import StaffHeader from '@/components/Headers/StaffHeader.vue'
import SideMenu from '@/components/SideMenu.vue'
import { ElBacktop } from 'element-plus'
</script>

<template>
  <div class="flex flex-row">
    <!-- side menu -->
    <SideMenu></SideMenu>
    <!-- main content -->
    <div class="w-full">
      <StaffHeader></StaffHeader>
      <RouterView></RouterView>
    </div>
  </div>
  <ElBacktop class="primary-btn text-white!"></ElBacktop>
</template>
