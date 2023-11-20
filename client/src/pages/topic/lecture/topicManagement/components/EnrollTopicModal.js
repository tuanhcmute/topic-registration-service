import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import Select from "react-select";
import { Modal, Button, TextInput, Label } from "flowbite-react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import * as toipcType from "../../../../../utils/constants/topicType";
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

function EnrollTopicModal(props) {
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

  useEffect(() => {
    const studentCodes = selectedOptions.map((item) => item.value);
    formik.setFieldValue("students", studentCodes);
  }, [selectedOptions]);

  return (
    <Modal size='5xl' show={openModal === "default"} onClose={setCloseModal}>
      <Modal.Header className='pt-4 pb-3 bg-primary'>
        <p className='font-Roboto text-base font-bold uppercase text-white'>
          TIỂU LUẬN CHUYÊN NGÀNH
        </p>
      </Modal.Header>
      <Modal.Body>
        <div className='space-y-4'>
          {/* EnrollmentPeriod */}
          <TextInput
            placeholder='Đợt đề xuất'
            required
            type='text'
            value={enrollmentPeriod?.name}
            disabled
          />
          {/* End EnrollmentPeriod */}
          <div className='grid grid-cols-2 gap-3'>
            {/* Lecture name field */}
            <div className='mb-2 block font-Roboto'>
              <Label
                value='Giảng viên hướng dẫn (*)'
                className='mb-2 block'
                htmlFor='lectureName'
              />
              <TextInput
                id='lectureName'
                placeholder='Nhập giảng viên hưỡng dẫn'
                required
                type='text'
                value={currentUser?.name}
                disabled
              />
            </div>
            {/* End lecture filed */}
            {/* Major field */}
            <div className='mb-2 block font-Roboto'>
              <Label
                htmlFor='major'
                value='Chuyên ngành (*)'
                className='mb-2 block'
              />
              <TextInput
                id='major'
                placeholder='Nhập chuyên ngành'
                required
                type='text'
                value={currentUser?.major?.name}
                disabled
              />
            </div>
            {/* End major field */}
          </div>
          {/* Select student field*/}
          <div className='mb-2 block font-Roboto'>
            <Label htmlFor='email1' value='SVTH' className='mb-2 block' />
            <Select
              placeholder='Lựa chọn SVTH'
              options={options}
              isSearchable={true}
              isMulti={true}
              onChange={changeSelect}
              value={selectedOptions}
            />
          </div>
          {/* End select student field */}
          {/* Topic field */}
          <div className='mb-2 block font-Roboto'>
            <Label
              htmlFor='topicName'
              value='Tên đề tài (*)'
              className='mb-2 block'
              color={formik.errors.topicName && "failure"}
            />
            <TextInput
              color={formik.errors.topicName && "failure"}
              helperText={formik.errors.topicName}
              placeholder='Nhập tên đề tài...'
              required
              type='text'
              id='topicName'
              onChange={formik.handleChange}
              value={formik.values.topicName}
            />
          </div>
          {/* End topic field */}
          {/* Goal field */}
          <div className='mb-2 block font-Roboto'>
            <Label
              color={formik.errors.goal && "failure"}
              htmlFor='goal'
              value='Yêu cầu đề tài (*)'
              className='mb-2 block'
            />
            <CKEditor
              editor={ClassicEditor}
              onChange={(event, editor) => {
                const data = editor.getData();
                formik.values.goal = data;
              }}
            />
          </div>
          {/* End goal field */}
          <div className='mb-2 block font-Roboto'>
            <Label
              color={formik.errors.requirement && "failure"}
              htmlFor='requirement'
              value='Kiến thức cần có (*)'
              className='mb-2 block'
            />
            <CKEditor
              editor={ClassicEditor}
              onChange={(event, editor) => {
                const data = editor.getData();
                formik.values.requirement = data;
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

export default EnrollTopicModal;

EnrollTopicModal.propTypes = {
  openModal: PropTypes.any,
  setOpenModal: PropTypes.func.isRequired,
};
