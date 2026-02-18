<template>
  <button type="button" @click="handleClick" class="primary-btn cta-btn m-0!">
    <FontAwesomeIcon :icon="faCartPlus" />
    Thêm vào giỏ
  </button>
</template>
<script setup>
import { faCartPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const props = defineProps({
  book: Object,
})

const emit = defineEmits(['addToCart'])
const handleClick = () => {
  emit('addToCart', props.book.title)
}
</script>
