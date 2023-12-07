import PropTypes from "prop-types";
import Select from "react-select";
import { Modal, Button, TextInput, Label } from "flowbite-react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import { useEffect, useState } from "react";
import { roleCode } from "../../../../utils/constants/roles";

const validationSchema = Yup.object().shape({
  ntid: Yup.string().required("Ntid là bắt buộc"),
  email: Yup.string().required("Email là bắt buộc"),
  name: Yup.string().required("Tên đề tài là bắt buộc"),
  role: Yup.string().required("Loại người dùng là bắt buộc"),
  majorId: Yup.string(),
  clazzId: Yup.string(),
});

function AddUserModal(props) {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const { openModal, setOpenModal } = props;
  const formik = useFormik({
    initialValues: {
      ntid: "",
      email: "",
      name: "",
      role: "",
      majorId: "",
      clazzId: "",
      biography: "",
    },
    onSubmit: (values) => {},
    validationSchema,
  });

  function changeSelect(...props) {
    // Props[] => [Array(0), {action: "", data}]
  }

  function setCloseModal() {
    setOpenModal(undefined);
    setSelectedOptions([]);
    formik.setValues(formik.initialValues);
  }

  useEffect(() => {}, [selectedOptions]);

  return (
    <Modal size='2xl' show={openModal === "default"} onClose={setCloseModal}>
      <Modal.Header className='pt-4 pb-3 bg-primary'>
        <p className='font-Roboto text-base font-bold uppercase text-white'>
          THÊM NGƯỜI DÙNG
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
                // value={currentUser?.name}
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
                // value={currentUser?.major?.name}
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
                isSearchable={false}
                onChange={changeSelect}
                isSearchablek
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
              <Select
                id='major'
                placeholder='Lựa chọn chuyên ngành'
                options={Object.values(roleCode)}
                isSearchable={true}
                onChange={changeSelect}
              />
            </div>
            {/* End major field */}
            {/* Clazz field */}
            <div className='mb-2 block font-Roboto'>
              <Label htmlFor='clazz' value='Lớp (*)' className='mb-2 block' />
              <Select
                id='clazz'
                placeholder='Lựa chọn lớp'
                options={Object.values(roleCode)}
                isSearchable={true}
                onChange={changeSelect}
              />
            </div>
            {/* End clazz field */}
          </div>
          {/* Goal field */}
          <div className='mb-2 block font-Roboto'>
            <Label
              color={formik.errors.goal && "failure"}
              htmlFor='biography'
              value='Tiểu sử'
              className='mb-2 block'
            />
            <CKEditor
              editor={ClassicEditor}
              onChange={(event, editor) => {
                // const data = editor.getData();
                // formik.values.goal = data;
              }}
            />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div className='w-full flex items-center justify-end gap-5'>
          <Button color='red' onClick={setCloseModal} className='p-0'>
            Hủy bỏ
          </Button>
          <form onSubmit={formik.handleSubmit}>
            <Button
              onSubmit={formik.handleSubmit}
              className='p-0'
              color='green'
              type='submit'
            >
              Lưu lại
            </Button>
          </form>
        </div>
      </Modal.Footer>
    </Modal>
  );
}

export default AddUserModal;

AddUserModal.propTypes = {
  openModal: PropTypes.any,
  setOpenModal: PropTypes.func.isRequired,
};
