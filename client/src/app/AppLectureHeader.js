import { useEffect, useRef } from "react";
import { HiOutlineUserGroup } from "react-icons/hi";
import { CiDark, CiLogout } from "react-icons/ci";
import { FaBars } from "react-icons/fa";
import { PiUserCircleGearLight } from "react-icons/pi";
import { FiBook } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import { Dropdown } from "../components/dropdown";
import { logout } from "../features/auth/authSlice";
import { toggleTheme } from "../features/theme/themeSlice";
import { paths } from "../utils/constants";

const dropdownItems = [
  {
    id: uuidv4(),
    text: "Thông tin cá nhân",
    icon: PiUserCircleGearLight,
    to: "/lecture/profile",
  },
  {
    id: uuidv4(),
    text: "Đăng xuất",
    icon: CiLogout,
    to: paths.LOGOUT,
  },
];

function AppLectureHeader() {
  const dispatch = useDispatch();
  const overlayRef = useRef();
  const navigationRef = useRef();
  const currentUser = useSelector((state) => state.auth.currentUser);
  const darkMode = useSelector((state) => state.theme.darkMode);

  function toggleOverlay() {
    overlayRef.current.classList.toggle("hidden");
    toggleNavigation();
  }
  function toggleNavigation() {
    navigationRef.current.classList.toggle("-translate-x-full");
  }
  function clickBarsIcon() {
    toggleOverlay();
  }
  function clickLogout(e) {
    e.preventDefault();
    dispatch(logout());
  }

  useEffect(() => {
    darkMode
      ? document.getElementsByTagName("html")[0].classList.add("dark")
      : document.getElementsByTagName("html")[0].classList.remove("dark");
  }, [darkMode]);

  return (
    <header
      id='app-header'
      className='dark:bg-slate xl:h-24 lg:h-20 md:h-16 h-14 font-Roboto text-xs fixed top-0 left-0 right-0 bg-alabaster shadow-sm shadow-alabaster-500/40 z-10'
    >
      <div className='xl:w-[1140px] lg:w-[960px] md:w-full md:px-5 px-3 h-full mx-auto my-0 flex items-center justify-between gap-4'>
        {/* Logo UTE */}
        <NavLink
          replace
          to='/lecture/home'
          className='xl:w-[200px] lg:w-44 md:w-40 w-36 object-cover cursor-pointer bg-header-logo bg-contain bg-no-repeat h-full bg-center'
        ></NavLink>
        {/* End logo UTE */}
        {/* Navigation */}
        <div
          className='flex md:items-center md:justify-between md:w-full md:flex-row md:static md:bg-transparent md:-translate-x-0 gap-2 flex-col fixed z-30 top-0 bottom-0 left-0 bg-white -translate-x-full transition-all ease-in-out min-w-[200px] dark:bg-slate dark:bg-opacity-90 md:dark:bg-transparent md:dark:bg-opacity-100'
          ref={navigationRef}
        >
          <div className='flex md:items-center md:flex-row md:border-none font-bold text-primary flex-col items-start border-b'>
            <Link
              to='/lecture/topic'
              className='hover:bg-primary hover:text-white transition-all ease-in-out flex items-center gap-1 w-full min-w-fit text-start md:p-2 px-2 py-3 dark:text-white'
            >
              <FiBook className='w-4 h-4 md:hidden' />
              <span>Đề tài của tôi</span>
            </Link>
            <Link
              to='/lecture/view'
              className='hover:bg-primary hover:text-white transition-all ease-in-out flex items-center gap-1 w-full min-w-fit text-start md:p-2 px-2 py-3 dark:text-white'
            >
              <HiOutlineUserGroup className='w-4 h-4 md:hidden' />
              <span>Giảng viên</span>
            </Link>
          </div>
          {/* Profile */}
          <div
            className='flex items-center text-primary cursor-pointer px-2 py-3 dark:text-whiteSmoke gap-1'
            id='info'
          >
            <img
              className='object-cover w-6 h-6 rounded-full'
              src={currentUser.imageUrl}
              alt=''
            />
            <span className='font-bold'>{currentUser.name}</span>
          </div>
          {/* End profile */}
          {/* Dropdown will be displayed when hovering on Profile */}
          <Dropdown
            className='p-0 bg-whiteSmoke rounded border-gray-400 dark:bg-sambuca dark:opacity-100 opacity-100'
            anchorSelect='#info'
          >
            <div className='w-44 text-sm shadow-md hover:shadow-lg transition-shadow ease-linear'>
              <div
                onClick={() => dispatch(toggleTheme())}
                className='flex items-center gap-1 w-full p-[10px] cursor-pointer text-gray-700 hover:text-primary transition-all ease-in-out dark:text-gray-300'
              >
                <CiDark className='w-5 h-5' />
                <span className='font-bold text-xs'>Chế độ tối</span>
              </div>
              {dropdownItems.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    className='flex items-center gap-1 w-full p-[10px] cursor-pointer text-gray-700 hover:text-primary transition-all ease-in-out dark:text-gray-300'
                    key={item.id}
                    to={item.to}
                    onClick={
                      item.to === paths.LOGOUT ? (e) => clickLogout(e) : null
                    }
                  >
                    <Icon className='w-5 h-5' />
                    <span className='font-bold text-xs'>{item.text}</span>
                  </NavLink>
                );
              })}
            </div>
          </Dropdown>
          {/* End dropdown */}
        </div>
        {/* End navigation */}
        {/* Bar will be displayed in mobile */}
        <FaBars
          className='md:hidden font-bold cursor-pointer h-5 w-5 text-primary dark:text-whiteSmoke'
          onClick={clickBarsIcon}
        />
        {/* End FaBars */}
      </div>
      {/* Overlay will be displayed when clicking on FaBars */}
      <div
        className='bg-black w-screen h-screen fixed top-0 opacity-40 hidden z-20'
        ref={overlayRef}
        onClick={toggleOverlay}
      ></div>
    </header>
  );
}

export default AppLectureHeader;
