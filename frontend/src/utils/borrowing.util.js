export const formatStatus = (status) => {
  const map = {
    DangCho: 'Đang Chờ',
    DaDuyet: 'Đã Duyệt',
    DangMuon: 'Đang Mượn',
    DaTra: 'Đã Trả',
    TuChoi: 'Từ Chối',
    DaHuy: 'Đã Hủy',
  }
  return map[status] || status
}

export const getStatusClass = (status) => {
  switch (status) {
    case 'DangCho':
      return 'bg-(--bg-quaternary) text-(--text-color-2) border-(--secondary)/40!'
    case 'DaDuyet':
    case 'DangMuon':
      return 'bg-(--bg-tertiary) text-(--subtext-color) border-(--subtext-color)/40!'
    case 'DaTra':
      return 'bg-green-50 text-green-600  border-green-200!'
    case 'TuChoi':
    case 'DaHuy':
      return 'bg-red-50 text-red-600 border-red-200!'
    default:
      return 'bg-(--bg-primary) text-(--subtext-color) border-(--bg-secondary)!'
  }
}
