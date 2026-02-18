<template>
  <div class="w-full bg-(--bg-primary)">
    <BookDetail :book="selectedBook" />

    <RelatedBook :books="books" />
  </div>
</template>

<script setup>
import BookDetail from '@/components/SingleBook/BookDetail.vue'
import RelatedBook from '@/components/SingleBook/RelatedBook.vue'
const books = [
  {
    title: 'Mắt biếc',
    author: 'Nguyễn Nhật Ánh',
    publisher: 'Nhà xuất bản Trẻ',
    price: 500,
    image: 'https://www.nxbtre.com.vn/Images/Book/nxbtre_full_01372019_043734.jpg',
    description:
      'Một câu chuyện nhẹ nhàng và đầy day dứt về tình yêu đơn phương của Ngạn dành cho Hà Lan, gợi lại ký ức tuổi thơ và những rung động đầu đời.',
    quantity: 23,
  },
  {
    title: 'Tiệm sách của nàng',
    author: 'Nguyễn Nhật Ánh',
    publisher: 'Nhà xuất bản Trẻ',
    price: 450,
    image: 'https://www.nxbtre.com.vn/Images/Book/nxbtre_full_25412024_024109.jpg',
    description:
      'Câu chuyện xoay quanh một tiệm sách nhỏ và những mối quan hệ tinh tế, nơi mỗi nhân vật đều mang theo một nỗi niềm riêng.',
    quantity: 14,
  },
  {
    title: 'Cô gái đến từ hôm qua',
    author: 'Nguyễn Nhật Ánh',
    publisher: 'Nhà xuất bản Trẻ',
    price: 480,
    image: 'https://www.nxbtre.com.vn/Images/Book/nxbtre_full_06202025_092033.jpg',
    description:
      'Tác phẩm kể về tuổi học trò hồn nhiên, những trò nghịch ngợm và cảm xúc ngây ngô của mối tình đầu đầy trong trẻo. Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage,',
    quantity: 31,
  },
  {
    title: 'Tôi thấy hoa vàng trên cỏ xanh',
    author: 'Nguyễn Nhật Ánh',
    publisher: 'Nhà xuất bản Trẻ',
    price: 520,
    image: 'https://www.nxbtre.com.vn/Images/Book/NXBTreStoryFull_02482010_104821.jpg',
    description:
      'Bức tranh làng quê yên bình với tình anh em, tình bạn và những kỷ niệm tuổi thơ vừa đẹp đẽ vừa man mác buồn.',
    quantity: 18,
  },
  {
    title: 'Ngồi khóc trên cây',
    author: 'Nguyễn Nhật Ánh',
    publisher: 'Nhà xuất bản Trẻ',
    price: 400,
    image: 'https://www.nxbtre.com.vn/Images/Book/nxbtre_full_31252025_082543.jpg',
    description:
      'Một câu chuyện tình cảm trong sáng giữa khung cảnh miền quê, pha chút bí ẩn và những cảm xúc sâu lắng.',
    quantity: 9,
  },
]

const selectedBook = books[2]
</script>
