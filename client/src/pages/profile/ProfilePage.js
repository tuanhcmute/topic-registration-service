import React, { useState } from "react";
import { useSelector } from "react-redux";
import { PiNewspaperClippingLight } from "react-icons/pi";
import { Button, TextInput, Label } from "flowbite-react";

import { Banner } from "../../components/banner";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { userService } from "../../services";
import { toast } from "react-toastify";
import { HttpStatusCode } from "axios";

function ProfilePage() {
  const currentUser = useSelector((state) => state.user?.currentUser);
  const [biography, setBiography] = useState(
    (currentUser) => currentUser?.biography || ""
  );
  console.log(biography);

  async function updateBiographyInUserProfile() {
    console.log(biography);
    const response = await userService.updateBiographyInUserProfile({
      biography,
    });
    if (response?.data?.statusCode === HttpStatusCode.Ok) {
      toast.success("Cập nhật tiểu sử thành công");
    }
    console.log(response);
  }

  return (
    <React.Fragment>
      {/* Banner */}
      <Banner title='THÔNG TIN CỦA TÔI' />
      <div className='xl:w-[1140px] lg:w-[960px] md:w-full p-3 mx-auto my-0 flex justify-start gap-5 font-Roboto flex-col xl:flex-row mt-10 border border-gray-300 rounded bg-white dark:bg-black-pearl dark:border-gray-400'>
        <div className='md:w-[350px] w-full h-fit flex flex-col gap-5 items-center bg-whiteSmoke p-3 md:p-5 rounded dark:bg-sambuca'>
          {/* Image */}
          <label
            htmlFor='avatar'
            style={{
              backgroundImage: `url("${currentUser?.imageUrl}")`,
            }}
            className='object-cover rounded-full w-32 h-32 bg-center bg-no-repeat cursor-pointer hover:bg-gray-200'
          />
          <input type='file' id='avatar' hidden />
          {/* Info */}
          <div className='text-center'>
            <p className='font-bold text-red-600 text-sm mb-1'>Sinh viên</p>
            <p className='font-bold text-primary text-sm dark:text-gray-300'>
              {currentUser?.name}
            </p>
          </div>
        </div>
        {/* Right content */}
        <div className='w-full border border-lightGrey bg-whiteSmoke md:p-5 p-3 h-fit rounded-md dark:bg-sambuca dark:border-gray-500'>
          {/* Tabs navigation */}
          <ul className='flex items-center gap-4 border-b border-primary pb-2'>
            <li className='flex items-center gap-2 text-primary font-bold font-Roboto text-sm cursor-pointer dark:text-gray-300'>
              <PiNewspaperClippingLight className='w-5 h-5' />
              <p>Lý lịch sơ lược</p>
            </li>
          </ul>
          <div className='my-2 flex flex-col gap-3'>
            <div className='flex items-center gap-2 w-full'>
              <Label
                value='Họ và tên'
                htmlFor='name'
                className='w-[150px] font-bold text-sm text-gray-500 dark:text-gray-300'
              />
              <TextInput
                id='name'
                value={currentUser?.name}
                className='w-full'
                disabled
              />
            </div>
            <div className='flex items-center gap-2 w-full'>
              <Label
                value='Mã người dùng'
                htmlFor='ntid'
                className='w-[150px] font-bold text-sm text-gray-500 dark:text-gray-300'
              />
              <TextInput
                id='ntid'
                value={currentUser?.ntid}
                className='w-full'
                disabled
              />
            </div>
            <div className='flex items-center gap-2 w-full'>
              <Label
                value='Ngành'
                htmlFor='major'
                className='w-[150px] font-bold text-sm text-gray-500 dark:text-gray-300'
              />
              <TextInput
                id='major'
                value={currentUser?.major?.name}
                className='w-full'
                disabled
              />
            </div>
            <div className='flex gap-2 w-full flex-col'>
              <Label
                value='Tiểu sử'
                htmlFor='biography'
                className='font-bold text-sm text-gray-500 dark:text-gray-300'
              />
              <CKEditor
                onReady={(editor) => {
                  // You can store the "editor" and use when it is needed.
                  editor.setData(currentUser?.biography);
                }}
                editor={ClassicEditor}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setBiography(data);
                }}
              />
            </div>
          </div>
          <Button color='gray' onClick={updateBiographyInUserProfile}>
            Lưu thay đổi
          </Button>
        </div>
        {/* End right content */}
      </div>
      {/* End banner */}
    </React.Fragment>
  );
}

export default ProfilePage;
