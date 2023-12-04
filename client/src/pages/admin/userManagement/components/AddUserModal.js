import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import Select from "react-select";
import { Modal, Button, TextInput, Label } from "flowbite-react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import * as toipcType from "../../../../utils/constants/topicType";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { roleCode } from "../../../../utils/constants/roles";

const validationSchema = Yup.object().shape({
  type: Yup.string().required(),
  majorCode: Yup.string().required(),
  ntid: Yup.string().required(),
  topicName: Yup.string().required("Tên đề tài là bắt buộc"),
  goal: Yup.string().required("Yêu cầu đề tài là bắt buộc"),
  requirement: Yup.string().required("Kiến thức cần có là bắt buộc"),
  maxSlot: Yup.number()
    .min(1, "Số lượng SVTH phải lớn hơn 0")
    .max(2, "Số lượng SVTH không quá 2")
    .required("Số lượng SVTH là bắt buộc"),
  students: Yup.array(),
});

function AddUserModal(props) {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const enrollmentPeriod = useSelector(
    (state) => state.enrollmentPeriod?.enrollmentPeriod
  );
  const { openModal, setOpenModal, handleNewTopic, options } = props;
  const currentUser = useSelector((state) => state.user?.currentUser);
  const formik = useFormik({
    initialValues: {
      type: toipcType.TLCN,
      majorCode: currentUser?.major?.code,
      ntid: currentUser?.ntid,
      maxSlot: 2,
      topicName: "",
      goal: "",
      requirement: "",
      students: [],
    },
    onSubmit: (values) => {
      handleNewTopic(values);
    },
    validationSchema,
  });

  function changeSelect(...props) {
    // Props[] => [Array(0), {action: "", data}]
    // if (props.length < 2) return;
    // if (props[0]?.length > formik.values.maxSlot) {
    //   toast.warning(`SVTH không vượt quá ${formik.values.maxSlot}`);
    //   return;
    // }
    // setSelectedOptions(props[0]);
  }

  function setCloseModal() {
    setOpenModal(undefined);
    setSelectedOptions([]);
    formik.setValues(formik.initialValues);
  }

  useEffect(() => {
    // const studentCodes = selectedOptions.map((item) => item.value);
    // formik.setFieldValue("students", studentCodes);
  }, [selectedOptions]);

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
                isSearchable={true}
                onChange={changeSelect}
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
                const data = editor.getData();
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
