<template>
  <div class="bg-pattern min-h-screen flex items-center justify-center">
    <component :is="formType"></component>
  </div>
</template>
<script setup>
const { formType } = defineProps({
  formType: Object,
})
</script>
