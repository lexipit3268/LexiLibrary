<script setup>
import CategorySection from '@/components/HomepageSections/CategorySection.vue'
import HeroSection from '@/components/HomepageSections/HeroSection.vue'
import NewArrivalsSection from '@/components/HomepageSections/NewArrivalsSection.vue'
</script>

<template>
  <HeroSection />
  <div class="books-section bg-(--bg-primary)">
    <NewArrivalsSection />
    <CategorySection />
  </div>
  <div class="testimonials-section"></div>
  <div class="quote-section"></div>
</template>
