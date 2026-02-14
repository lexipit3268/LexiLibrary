<script setup lang="ts">
import MainTitle from '../MainTitle.vue'
import BadgesBox from './BadgesBox.vue'
</script>

<template>
  <div
    class="w-full min-h-100 px-18 py-10 flex items-center justify-between relative overflow-hidden"
  >
    <img src="../../../public/Vector1.svg" alt="" class="absolute bottom-0 left-0" loading="lazy" />
    <MainTitle
      type="row"
      :title="`Uy tín \n& Trách nhiệm`"
      subtext="Uy tín được đặt lên hàng đầu với nhiều nhà cộng tác lớn nhỏ"
    ></MainTitle>
    <div class="badges flex gap-10 h-full">
      <div class="flex flex-col gap-10">
        <div class="blank-space w-full min-h-10"></div>
        <BadgesBox title="Fast" subtext="Mượn sách chỉ trong vài cú click" />
        <BadgesBox title="Discounts" subtext="Có nhiều khuyến mãi bất ngờ" />
      </div>
      <div class="flex flex-col gap-10">
        <BadgesBox title="Freeship" subtext="Miễn phí vận chuyển nội thành" />
        <BadgesBox title="Security" subtext="An toàn bảo mật tuyệt đối" />
      </div>
    </div>
  </div>
</template>
