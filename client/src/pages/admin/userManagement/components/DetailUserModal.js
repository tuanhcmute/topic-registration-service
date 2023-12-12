import PropTypes from "prop-types";
import Select from "react-select";
import { Modal, Button, TextInput, Label } from "flowbite-react";

import { roleCode } from "../../../../utils/constants/roles";
import { useEffect, useState } from "react";

function DetailUserModal(props) {
  const { openModal, setOpenModal, data } = props;
  const [selectedRoleOptions, setSelectedRoleOptions] = useState([]);

  useEffect(() => {
    setSelectedRoleOptions(() => {
      return data?.userRoles.map((item) => roleCode[item?.role?.code]);
    });
  }, [data]);

  return (
    <Modal
      size='2xl'
      show={openModal === "default"}
      onClose={() => setOpenModal(undefined)}
    >
      <Modal.Header className='pt-4 pb-3 bg-primary'>
        <p className='font-Roboto text-base font-bold uppercase text-white'>
          CHI TIẾT THÔNG TIN NGƯỜI DÙNG
        </p>
      </Modal.Header>
      <Modal.Body>
        <div className='space-y-4'>
          <div className='grid grid-cols-2 gap-3'>
            {/* Ntid name field */}
            <div className='mb-2 block font-Roboto'>
              <Label value='Ntid (*)' className='mb-2 block' htmlFor='ntid' />
              <TextInput
                id='ntid'
                placeholder='Nhập ntid...'
                required
                type='text'
                value={data?.ntid}
                disabled
              />
            </div>
            {/* End ntid filed */}
            {/* Email field */}
            <div className='mb-2 block font-Roboto'>
              <Label htmlFor='email' value='Email (*)' className='mb-2 block' />
              <TextInput
                id='email'
                placeholder='Nhập email...'
                required
                type='text'
                value={data?.email}
                disabled
              />
            </div>
            {/* End email field */}
            {/* Name field */}
            <div className='mb-2 block font-Roboto'>
              <Label
                htmlFor='name'
                value='Họ và tên (*)'
                className='mb-2 block'
              />
              <TextInput
                id='name'
                placeholder='Nhập họ và tên...'
                required
                type='text'
                value={data?.name}
                disabled
              />
            </div>
            {/* End name field */}
            {/* Role field */}
            <div className='mb-2 block font-Roboto'>
              <Label
                htmlFor='role'
                value='Loại người dùng (*)'
                className='mb-2 block'
              />
              <Select
                placeholder='Lựa chọn loại người dùng'
                options={Object.values(roleCode)}
                isMulti
                isDisabled
                value={selectedRoleOptions}
              />
            </div>
            {/* End role field */}
            {/* Major field */}
            <div className='mb-2 block font-Roboto'>
              <Label
                htmlFor='major'
                value='Chuyên ngành (*)'
                className='mb-2 block'
              />
              <TextInput
                id='major'
                required
                type='text'
                value={data?.major?.name}
                disabled
              />
            </div>
            {/* End major field */}
            {/* Clazz field */}
            <div className='mb-2 block font-Roboto'>
              <Label htmlFor='clazz' value='Lớp (*)' className='mb-2 block' />
              <TextInput
                id='clazz'
                required
                type='text'
                value={data?.clazz?.code}
                disabled
              />
            </div>
            {/* End clazz field */}
          </div>
          {/* biography field */}
          <div className='mb-2 block font-Roboto'>
            <Label htmlFor='biography' value='Tiểu sử' className='mb-2 block' />
            <div
              dangerouslySetInnerHTML={{ __html: data?.biography }}
              className='border dark:border-gray-500 p-3 dark:text-gray-400 text-sm rounded-md cursor-not-allowed bg-whiteSmoke text-gray-500'
            ></div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div className='w-full flex items-center justify-end gap-5'>
          <Button
            className='p-0'
            color='green'
            type='button'
            onClick={() => setOpenModal(undefined)}
          >
            Thoát
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}

export default DetailUserModal;

DetailUserModal.propTypes = {
  options: PropTypes.array.isRequired,
  openModal: PropTypes.any,
  setOpenModal: PropTypes.func.isRequired,
  handleUpdateTopic: PropTypes.func.isRequired,
  data: PropTypes.object || undefined,
};
