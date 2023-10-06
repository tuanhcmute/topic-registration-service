import { BiUserCircle } from "react-icons/bi";
import { LogoHeader } from "../assets/images";
import { Button } from "../components/button";
function AppHeader() {
  return (
    <header
      id='app-header'
      className='h-[100px] border border-primary font-Roboto text-xs'
    >
      <div className='w-[1140px] border border-red h-full mx-auto my-0 flex items-center justify-between'>
        <div className='flex justify-center items-center gap-4'>
          <img
            src={LogoHeader}
            alt='logo-header'
            className='w-[200px] object-cover'
          />
          <div className='flex items-center'>
            <Button>Đề tài của tôi</Button>
            <Button>Giảng viên</Button>
          </div>
        </div>
        <div className='flex items-center gap-1 text-primary cursor-pointer'>
          <BiUserCircle />
          <span className='font-bold'>Nguyễn Trần Thi Văn</span>
        </div>
      </div>
    </header>
  );
}

export default AppHeader;
