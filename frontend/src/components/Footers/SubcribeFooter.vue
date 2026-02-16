<script setup>
import { ElDivider } from 'element-plus'
</script>

<template>
  <div
    class="w-full min-h-38 bg-(--bg-quaternary) flex flex-row justify-between items-center py-10 px-18"
  >
    <div class="flex gap-4">
      <ElDivider class="w-36! border-black!"></ElDivider>
      <div class="flex flex-row items-center gap-4">
        <h3 class="text-5xl newsreaderFont">Đăng ký</h3>
        <p class="text-(--subtext-color) max-w-72">Để nhận được thông báo cập nhật sớm nhất!</p>
      </div>
    </div>
    <div class="w-full max-w-2xl flex-1 flex min-h-12">
      <input type="text" name="" id="" placeholder="Nhập email..." class="basis-3/4 bg-white p-2" />
      <button type="button" class="basis-1/4 primary-btn">Đăng ký</button>
    </div>
  </div>
</template>
