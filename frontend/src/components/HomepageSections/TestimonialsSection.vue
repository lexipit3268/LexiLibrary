<script setup lang="ts">
import MainTitle from '../MainTitle.vue'
import TestimonialBox from './TestimonialBox.vue'
</script>

<template>
  <div class="flex bg-(--bg-tertiary) min-h-175 w-full relative px-18 py-31.5">
    <img src="/handing_girl.svg" alt="" loading="lazy" class="absolute bottom-0 left-20" />
    <MainTitle
      type="row"
      title="Nhận xét từ bạn đọc"
      subtext="Những câu chuyện thật, những cảm xúc thật từ những người yêu sách  đang cùng chúng tôi xây dựng thư viện số hiện đại."
      class="h-fit mt-15"
    />
    <div class="flex gap-10 flex-1 justify-end">
      <TestimonialBox
        comment="Sách chất lượng, dịch vụ nhanh gọn đúng như cam kết. Ưng nhất là khâu bảo mật và mấy chương trình giảm giá cho sinh viên"
        name="Nguyễn Lộc"
        infor="Vĩnh Long"
        avatar="https://avatars.githubusercontent.com/u/62460969?s=400&u=51ce7e1b7504698732f6b66b541a4599cf4b4be6&v=4"
      />
      <TestimonialBox
        comment="Web trình bày gọn, dễ nhìn. Cảm giác mượn sách ở đây rất nhẹ nhàng, không bị rối rắm như mấy trang thư viện cũ. Một góc nhỏ khá ổn cho mấy đứa nghiện đọc."
        name="Lexipit3268"
        infor="Sinh Viên ĐHCT"
      />
    </div>
  </div>
</template>

<style scoped>
:deep(.mainTitle-title) {
  font-size: 40px;
  margin-bottom: 15px;
}
</style>
