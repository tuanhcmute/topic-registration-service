import React, { useLayoutEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Google, UTELogo } from "../../assets/images";
import { GOOGLE_AUTH_URL } from "../../utils/constants";

function LoginPage() {
  const navigate = useNavigate();
  const authenticated = useSelector((state) => state.auth.authenticated);

  useLayoutEffect(() => {
    authenticated && navigate(-1);
    return () => console.log("Cleanup function is executed");
  }, [authenticated, navigate]);

  return (
    <div className='bg-athensGray h-screen'>
      <header className='lg:h-20 md:h-18 h-16 xl:text-4xl lg:text-3xl md:text-xl text-lg flex justify-center items-center font-bold font-Roboto bg-primary text-white'>
        ĐẠI HỌC SƯ PHẠM KỸ THUẬT TP.HCM
      </header>
      <div className='xl:mt-[3.125rem] lg:mt-10 mt-[1.875rem] flex justify-center items-center flex-col gap-5'>
        <img
          alt='UTE logo'
          src={UTELogo}
          className='object-cover xl:w-[150px] lg:w-32 md:w-28 w-24'
        />
        <div className='xl:w-[31.25rem] md:w-[25rem] w-[18.75rem] xl:py-[50px] lg:py-10 md:py-[30px] py-5 border rounded-[5px] px-[20px] bg-white border-lightGrey'>
          <p className='text-primary font-bold font-Roboto xl:text-3xl lg:text-2xl text-xl xl:pb-[50px] lg:pb-10 md:pb-[30] pb-5'>
            Đăng nhập
          </p>
          <a
            className='flex items-center lg:gap-[10px] gap-[5px] w-full border rounded-[5px] lg:py-[10px] py-[5px] justify-center border-primary xl:text-base lg:text-sm text-xs hover:bg-athensGray cursor-pointer transition ease-in-out'
            href={GOOGLE_AUTH_URL}
          >
            <img
              src={Google}
              className='object-cover xl:w-6 w-5'
              alt='Google icon'
            />
            <span className='text-primary'>Đăng nhập với Google</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
