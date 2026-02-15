<script setup>
import BrandSlider from '@/components/BrandSlider.vue'
import CategorySection from '@/components/HomepageSections/CategorySection.vue'
import HeroSection from '@/components/HomepageSections/HeroSection.vue'
import NewArrivalsSection from '@/components/HomepageSections/NewArrivalsSection.vue'
import QuoteSection from '@/components/HomepageSections/QuoteSection.vue'
import SocialproofSection from '@/components/HomepageSections/SocialproofSection.vue'
import TestimonialsSection from '@/components/HomepageSections/TestimonialsSection.vue'
</script>

<template>
  <HeroSection />
  <div class="books-section bg-(--bg-primary)">
    <NewArrivalsSection />
    <CategorySection />
  </div>
  <div class="social-proof-section">
    <SocialproofSection />
    <BrandSlider />
  </div>
  <TestimonialsSection />
  <QuoteSection />
</template>
