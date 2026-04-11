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
