import PropTypes from "prop-types";
import Select from "react-select";
import { Modal, Button, TextInput, Label } from "flowbite-react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useSelector } from "react-redux";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useEffect, useState } from "react";

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

const options = [
  { value: "20110756", label: "Pham Nguyen Nhut Truong" },
  { value: "20110623", label: "Bui Thanh Duy" },
  { value: "20110205", label: "Vu Hoang Anh" },
  { value: "20110202", label: "Tran Chi My" },
];

function EditTopicModal(props) {
  const { openModal, setOpenModal, data, handleUpdateTopic } = props;
  const currentUser = useSelector((state) => state.auth?.currentUser);
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
      alert(JSON.stringify(values, null, 2));
    },
    validationSchema,
  });

  useEffect(() => {
    setInitialValues({
      id: data?.id,
      topicName: data?.name,
      goal: data?.goal,
      requirement: data?.requirement,
      maxSlot: data?.maxSlot,
    });
  }, [data]);

  return (
    <Modal
      size='5xl'
      show={openModal === "default"}
      onClose={() => setOpenModal(undefined)}
    >
      <Modal.Header className='pt-4 pb-3 bg-primary'>
        <p className='font-Roboto text-base font-bold uppercase text-white'>
          TIỂU LUẬN CHUYÊN NGÀNH
        </p>
      </Modal.Header>
      <Modal.Body>
        <div className='space-y-4'>
          {/* EnrollmentPeriod */}
          <TextInput
            placeholder='enrollmentPeriod'
            required
            type='text'
            value='Đợt đề xuất tiểu luận chuyên ngành học kỳ I/2023 (ĐK và duyệt: 01/10 - 20/10/2023)'
            disabled
          />
          {/* End EnrollmentPeriod */}
          <div className='grid grid-cols-2 gap-3'>
            {/* Lecture name field */}
            <div className='mb-2 block font-Roboto'>
              <Label value='Giảng viên hướng dẫn (*)' className='mb-2 block' />
              <TextInput
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
                placeholder='Nhập chuyên ngành'
                required
                type='text'
                value={currentUser?.major?.name}
                disabled
              />
            </div>
            {/* End major field */}
            {/* Head field*/}
            <div className='mb-2 block font-Roboto'>
              <Label
                htmlFor='head'
                value='Trưởng bộ môn duyệt (*)'
                className='mb-2 block'
              />
              <TextInput
                placeholder='Nhập trưởng bộ môn'
                required
                type='text'
                value='Huynh Xuan Phung'
                disabled
              />
            </div>
            {/* End head field */}
            {/* Max slot field*/}
            <div className='mb-2 block font-Roboto'>
              <Label
                htmlFor='maxSlot'
                value='Số lượng SVTH (*)'
                className='mb-2 block'
              />
              <TextInput
                id='maxSlot'
                color={formik.errors.maxSlot ? "failure" : "gray"}
                helperText={formik.errors.maxSlot}
                placeholder='Nhập số lượng sinh viên...'
                required
                type='number'
                onChange={formik.handleChange}
                value={formik.values.maxSlot}
              />
            </div>
            {/* End max slot field */}
          </div>
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
              placeholder='Tên đề tài...'
              required
              type='text'
              id='topicName'
              onChange={formik.handleChange}
              // defaultValue={data?.name}
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
              onReady={(editor) => {
                editor.setData(formik.values.goal);
              }}
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
              onReady={(editor) => {
                // You can store the "editor" and use when it is needed.
                editor.setData(formik.values.requirement);
              }}
              editor={ClassicEditor}
              onChange={(event, editor) => {
                const data = editor.getData();
                formik.values.requirement = data;
              }}
            />
          </div>
          <div className='grid grid-cols-1 gap-3'>
            <div className='mb-2 block font-Roboto'>
              <Label value='SVTH' className='mb-2 block' />
              <Select options={options} isSearchable isMulti />
            </div>
          </div>
        </div>
      </Modal.Body>
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
              // onClick={() => setOpenModal(undefined)}
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

export default EditTopicModal;

EditTopicModal.propTypes = {
  openModal: PropTypes.any,
  setOpenModal: PropTypes.func.isRequired,
  handleUpdateTopic: PropTypes.func.isRequired,
  data: PropTypes.object || undefined,
};
