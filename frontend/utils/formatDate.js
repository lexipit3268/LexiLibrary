import dayjs from 'dayjs'

export const formatDate = (date) => {
  if (!date) return '---'
  return dayjs(date).format('DD-MM-YYYY')
}

export const formatTime = (date) => {
  return dayjs(date).format('HH:mm DD-MM-YYYY')
}
