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

function AddTimeModal(props) {
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
    if (props.length < 2) return;
    if (props[0]?.length > formik.values.maxSlot) {
      toast.warning(`SVTH không vượt quá ${formik.values.maxSlot}`);
      return;
    }
    setSelectedOptions(props[0]);
  }

  function setCloseModal() {
    setOpenModal(undefined);
    setSelectedOptions([]);
    formik.setValues(formik.initialValues);
  }

  // useEffect(() => {
  //   const studentCodes = selectedOptions.map((item) => item.value);
  //   formik.setFieldValue("students", studentCodes);
  // }, [selectedOptions]);

  return (
    <Modal size='lg' show={openModal === "default"} onClose={setCloseModal}>
      <Modal.Header className='pt-4 pb-3 bg-primary'>
        <p className='font-Roboto text-base font-bold uppercase text-white'>
          THÊM HỌC KỲ
        </p>
      </Modal.Header>
      <Modal.Body>
        <div className='space-y-4'>
          <div className='grid grid-cols-1 gap-3'>
            {/* Type field */}
            <div className='mb-2 block font-Roboto'>
              <Label
                value='Loại học kỳ (*)'
                className='mb-2 block'
                htmlFor='type'
              />
              <Select
                placeholder='Lựa chọn loại học kỳ'
                options={options}
                onChange={changeSelect}
                value={selectedOptions}
              />
            </div>
            {/* End type filed */}
            {/* Name field */}
            <div className='mb-2 block font-Roboto'>
              <Label htmlFor='name' value='Mô tả (*)' className='mb-2 block' />
              <TextInput
                id='name'
                placeholder='Nhập mô tả...'
                required
                type='text'
              />
            </div>
            {/* End name field */}
            {/* Start date field */}
            <div className='mb-2 block font-Roboto'>
              <Label
                htmlFor='startDate'
                value='Thời gian bắt đầu (*)'
                className='mb-2 block'
              />
              <TextInput id='startDate' required type='date' />
            </div>
            {/* End start date field */}
            {/* End date field */}
            <div className='mb-2 block font-Roboto'>
              <Label
                htmlFor='endDate'
                value='Thời gian kết thúc (*)'
                className='mb-2 block'
              />
              <TextInput id='endDate' required type='date' />
            </div>
            {/* End date field */}
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

export default AddTimeModal;

AddTimeModal.propTypes = {
  openModal: PropTypes.any,
  setOpenModal: PropTypes.func.isRequired,
};
