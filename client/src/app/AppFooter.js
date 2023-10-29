function AppFooter() {
  return (
    <footer
      id='app-footer'
      className='font-Roboto py-5 bg-alabaster dark:bg-black-pearl'
    >
      <div className='xl:w-[1140px] lg:w-[960px] md:w-full md:px-5 px-3 h-full mx-auto my-0 flex gap-5 md:flex-row flex-col items-center'>
        {/* Footer logo */}
        <div className='bg-footer-logo bg-center bg-contain bg-no-repeat w-1/6 min-h-[100px] min-w-[100px]'></div>
        {/* Footer info */}
        <div className='flex flex-col gap-1 w-full'>
          <h1 className='font-bold md:text-base text-primary text-sm dark:text-gray-300'>
            THÔNG TIN LIÊN HỆ
          </h1>
          <div className='w-full h-[2px] bg-primary'></div>
          <h2 className='font-bold text-black md:text-sm text-[11px] dark:text-gray-300'>
            PHÒNG ĐÀO TẠO <br />
            Trường Đai Học Sư Phạm Kỹ Thuật TP.Hồ Chí Minh
          </h2>
          <p className='font-medium md:text-xs text-[10px] dark:text-gray-300'>
            Địa Chỉ: Số 1 Võ Văn Ngân, P. Linh Chiểu, TP. Thủ Đức, TP. Hồ Chí
            Minh
            <br />
            Điện Thoại: (+84.28) 37225766 hoặc 37221223 (số nội bộ 8125)
            <br />
            Email Tư Vấn Viên: ptchc@hcmute.edu.vn
          </p>
        </div>
      </div>
    </footer>
  );
}

export default AppFooter;
