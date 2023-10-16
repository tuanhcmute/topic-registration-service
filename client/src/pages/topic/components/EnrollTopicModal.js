import PropTypes from "prop-types";
import Select from "react-select";
import { Modal, Button, TextInput, Label, Textarea } from "flowbite-react";
import * as Yup from "yup";
import { useFormik } from "formik";

const validationSchema = Yup.object().shape({
  topicName: Yup.string().required("Tên đề tài là bắt buộc"),
  goal: Yup.string().required("Yêu cầu đề tài là bắt buộc"),
  expectation: Yup.string().required("Mục tiêu đề tài là bắt buộc"),
  requirement: Yup.string().required("Kiến thức cần có là bắt buộc"),
});

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

function EnrollTopicModal(props) {
  const { openModal, setOpenModal } = props;
  const formik = useFormik({
    initialValues: {
      topicName: "",
      goal: "",
      expectation: "",
      requirement: "",
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
    validationSchema,
  });

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
            placeholder='name@flowbite.com'
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
                value='Nguyen Tran Thi Van'
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
                value='Công nghệ thông tin'
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
          </div>
          {/* Topic field */}
          <div className='mb-2 block font-Roboto'>
            <Label
              htmlFor='topicName'
              value='Tên đề tài (*)'
              className='mb-2 block'
              color={formik.errors.topicName ? "failure" : "gray"}
            />
            <TextInput
              color={formik.errors.topicName ? "failure" : "gray"}
              helperText={formik.errors.topicName}
              placeholder='Tên đề tài...'
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
              color={formik.errors.goal ? "failure" : "gray"}
              htmlFor='goal'
              value='Yêu cầu đề tài (*)'
              className='mb-2 block'
            />
            <Textarea
              id='goal'
              color={formik.errors.goal ? "failure" : "gray"}
              value={formik.values.goal}
              onChange={formik.handleChange}
              helperText={formik.errors.goal}
              placeholder='Nhập yêu cầu đề tài....'
              required
              type='text'
              rows={4}
            />
          </div>
          {/* End goal field */}
          {/* Expectation field */}
          <div className='mb-2 block font-Roboto'>
            <Label
              color={formik.errors.expectation ? "failure" : "gray"}
              htmlFor='expectation'
              value='Mục tiêu đề tài (*)'
              className='mb-2 block'
            />
            <Textarea
              id='expectation'
              color={formik.errors.expectation ? "failure" : "gray"}
              value={formik.values.expectation}
              onChange={formik.handleChange}
              helperText={formik.errors.expectation}
              placeholder='Nhập mục tiêu đề tài....'
              required
              type='text'
              rows={4}
            />
          </div>
          {/* End expectation field */}
          <div className='mb-2 block font-Roboto'>
            <Label
              color={formik.errors.requirement ? "failure" : "gray"}
              htmlFor='requirement'
              value='Kiến thức cần có (*)'
              className='mb-2 block'
            />
            <Textarea
              id='requirement'
              color={formik.errors.requirement ? "failure" : "gray"}
              value={formik.values.requirement}
              onChange={formik.handleChange}
              helperText={formik.errors.requirement}
              placeholder='Nhập kiến thức cần có....'
              required
              type='text'
              rows={4}
            />
          </div>
          <div className='grid grid-cols-2 gap-3'>
            <div className='mb-2 block font-Roboto'>
              <Label
                htmlFor='email1'
                value='Sinh viên thực hiện 1'
                className='mb-2 block'
              />
              <Select options={options} isSearchable={true} />
            </div>
          </div>
          <Button color='gray' className='p-0'>
            Thêm SVTH
          </Button>
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
          <Button
            className='p-0'
            color='green'
            onClick={() => {
              console.log(formik.isSubmitting);
            }}
            // onClick={() => setOpenModal(undefined)}
            type='submit'
          >
            Lưu lại
          </Button>
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
