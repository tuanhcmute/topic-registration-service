import PropTypes from "prop-types";
import Select from "react-select";
import { Modal, Button, TextInput, Label } from "flowbite-react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import { useEffect, useState } from "react";
import {
  roleCode,
  ROLE_LECTURE,
  ROLE_STUDENT,
} from "../../../../utils/constants/roles";

const validationSchema = Yup.object().shape({
  ntid: Yup.string().required("Ntid là bắt buộc"),
  email: Yup.string().required("Email là bắt buộc"),
  name: Yup.string().required("Tên đề tài là bắt buộc"),
  role: Yup.string().required("Loại người dùng là bắt buộc"),
  majorId: Yup.string(),
  clazzId: Yup.string(),
  biography: Yup.string(),
});

function AddUserModal(props) {
  const [selectedRoleOption, setSelectedRoleOption] = useState();
  const { openModal, setOpenModal, createUser } = props;
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
    onSubmit: (values) => {
      console.log(values);
      createUser(values);
    },
    validationSchema,
  });

  function changeSelectRole(...props) {
    // Props[] => [Array(0), {action: "", data}]
    setSelectedRoleOption(props[0]);
  }

  function setCloseModal() {
    setOpenModal(undefined);
    setSelectedRoleOption(null);
    formik.setValues(formik.initialValues);
  }

  useEffect(() => {
    formik.setFieldValue("role", selectedRoleOption?.value);
  }, [selectedRoleOption]);

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
              <Label
                value='Ntid (*)'
                className='mb-2 block'
                htmlFor='ntid'
                color={formik.errors.ntid && "failure"}
              />
              <TextInput
                id='ntid'
                placeholder='Nhập ntid...'
                required
                type='text'
                value={formik.ntid}
                color={formik.errors.ntid && "failure"}
                helperText={formik.errors.ntid}
                onChange={formik.handleChange}
              />
            </div>
            {/* End ntid filed */}
            {/* Email field */}
            <div className='mb-2 block font-Roboto'>
              <Label
                htmlFor='email'
                value='Email (*)'
                color={formik.errors.email && "failure"}
                className='mb-2 block'
              />
              <TextInput
                id='email'
                placeholder='Nhập email...'
                required
                type='text'
                value={formik.values.email}
                color={formik.errors.email && "failure"}
                helperText={formik.errors.email}
                onChange={formik.handleChange}
              />
            </div>
            {/* End email field */}
            {/* Name field */}
            <div className='mb-2 block font-Roboto'>
              <Label
                htmlFor='name'
                value='Họ và tên (*)'
                className='mb-2 block'
                color={formik.errors.name && "failure"}
              />
              <TextInput
                id='name'
                placeholder='Nhập họ và tên...'
                required
                type='text'
                color={formik.errors.name && "failure"}
                helperText={formik.errors.name}
                onChange={formik.handleChange}
              />
            </div>
            {/* End name field */}
            {/* Role field */}
            <div className='mb-2 block font-Roboto'>
              <Label
                htmlFor='role'
                value='Loại người dùng (*)'
                className='mb-2 block'
                color={formik.errors.role && "failure"}
              />
              <Select
                placeholder='Lựa chọn loại người dùng'
                options={Object.values(roleCode).filter(
                  (item) =>
                    item.value === ROLE_STUDENT || item.value === ROLE_LECTURE
                )}
                isSearchable={false}
                onChange={changeSelectRole}
                value={selectedRoleOption}
              />
            </div>
            {/* End role field */}
            {formik.values.role === ROLE_STUDENT && (
              <div className='mb-2 block font-Roboto'>
                <Label
                  htmlFor='major'
                  value='Chuyên ngành (*)'
                  className='mb-2 block'
                />
                <Select
                  id='major'
                  placeholder='Lựa chọn chuyên ngành'
                  isSearchable={false}
                  // onChange={changeSelect}
                />
              </div>
            )}
            {/* Clazz field */}
            {formik.values.role === ROLE_STUDENT && (
              <div className='mb-2 block font-Roboto'>
                <Label htmlFor='clazz' value='Lớp (*)' className='mb-2 block' />
                <Select
                  id='clazz'
                  placeholder='Lựa chọn lớp'
                  isSearchable={true}
                  // onChange={changeSelect}
                />
              </div>
            )}
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
                const data = editor.getData();
                formik.setFieldValue("biography", data);
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
  createUser: PropTypes.func.isRequired,
};
