import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Select from "react-select";
import { Modal, Button, TextInput, Label } from "flowbite-react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import { toast } from "react-toastify";
import { deleteTopicEnrollment } from "../../../../features/topicEnrollment/topicEnrollmentAction";
import _ from "lodash";
import { roleCode } from "../../../../utils/constants/roles";

const validationSchema = Yup.object().shape({
  id: Yup.string().required(),
  topicName: Yup.string().required("Tên đề tài là bắt buộc"),
  goal: Yup.string().required("Yêu cầu đề tài là bắt buộc"),
  requirement: Yup.string().required("Kiến thức cần có là bắt buộc"),
  students: Yup.array(),
  maxSlot: Yup.number()
    .min(1, "Số lượng SVTH phải lớn hơn 0")
    .max(2, "Số lượng SVTH không quá 2"),
});

function EditUserModal(props) {
  const dispatch = useDispatch();
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [isDisabled, setDisabled] = useState(false);
  const { openModal, setOpenModal, data, options, handleUpdateTopic } = props;
  const enrollmentPeriod = useSelector(
    (state) => state.enrollmentPeriod?.enrollmentPeriod
  );
  const currentUser = useSelector((state) => state.user?.currentUser);
  const [initialValues, setInitialValues] = useState({
    id: "",
    maxSlot: 0,
    topicName: "",
    goal: "",
    requirement: "",
    students: [],
  });
  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: (values) => {
      handleUpdateTopic(values);
    },
    validationSchema,
  });

  function changeSelect(...props) {
    if (props.length < 2) return;
    const option = props[1];
    if (option?.action === "remove-value") {
      const isExist = data?.students?.some((item) =>
        _.isEqual(item?.ntid, option?.removedValue?.value)
      );
      console.log(isExist);
      if (isExist) dispatch(deleteTopicEnrollment(option?.removedValue?.value));
    }
    if (props[0]?.length > formik.values.maxSlot) {
      toast.warning(`SVTH không vượt quá ${formik.values.maxSlot}`);
      return;
    }
    setSelectedOptions(props[0]);
  }

  // useEffect(() => {
  //   setInitialValues({
  //     id: data?.id,
  //     topicName: data?.name,
  //     goal: data?.goal,
  //     requirement: data?.requirement,
  //     maxSlot: data?.maxSlot,
  //   });
  //   setSelectedOptions(
  //     data?.students?.map((item) => ({
  //       label: item?.name,
  //       value: item?.ntid,
  //     }))
  //   );
  //   setDisabled(
  //     data?.status === topicStatus.approved.value ||
  //       data?.status === topicStatus.assigned.value
  //   );
  // }, [data]);

  // useEffect(() => {
  //   const studentCodes = selectedOptions?.map((item) => item.value);
  //   formik.setFieldValue("students", studentCodes);
  // }, [selectedOptions]);

  return (
    <Modal
      size='2xl'
      show={openModal === "default"}
      onClose={() => setOpenModal(undefined)}
    >
      <Modal.Header className='pt-4 pb-3 bg-primary'>
        <p className='font-Roboto text-base font-bold uppercase text-white'>
          CHỈNH SỬA THÔNG TIN NGƯỜI DÙNG
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
      {!isDisabled && (
        <Modal.Footer>
          <div className='w-full flex items-center justify-end gap-5'>
            <Button
              color='red'
              onClick={() => setOpenModal(undefined)}
              className='p-0'
            >
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
      )}
    </Modal>
  );
}

export default EditUserModal;

EditUserModal.propTypes = {
  options: PropTypes.array.isRequired,
  openModal: PropTypes.any,
  setOpenModal: PropTypes.func.isRequired,
  handleUpdateTopic: PropTypes.func.isRequired,
  data: PropTypes.object || undefined,
};
