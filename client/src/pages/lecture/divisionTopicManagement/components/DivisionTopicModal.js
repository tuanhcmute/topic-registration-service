import PropTypes from "prop-types";
import Select from "react-select";
import { Modal, Button, TextInput, Label } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { createDivisionByTopicType } from "../../../../features/division";
import { topicType } from "../../../../utils/constants";

const validationSchema = Yup.object().shape({
  startDate: Yup.date().required("Vui lòng nhập ngày phản biện"),
  specifiedTime: Yup.string().required("Vui lòng nhập thời gian phản biện"),
  place: Yup.string().required("Vui lòng nhập địa điểm phản biện"),
  lectureCode: Yup.string().required(),
  topicId: Yup.string().required(),
});

function DivisionTopicModal(props) {
  const dispatch = useDispatch();
  const { openModal, setOpenModal, data } = props;
  const currentUser = useSelector((state) => state.user?.currentUser);
  const options = useSelector((state) => state?.user?.lectures);
  const formik = useFormik({
    initialValues: {
      topicId: data?.id,
      startDate: "",
      specifiedTime: "",
      place: "",
      lectureCode: "",
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      dispatch(
        createDivisionByTopicType({
          type: topicType.TLCN,
          data: values,
          setOpenModal,
        })
      );
    },
  });

  function changeSelect(selectedOption) {
    formik.setFieldValue("lectureCode", selectedOption?.value);
  }

  console.log(options);

  return (
    <Modal
      size='5xl'
      show={openModal === "default"}
      onClose={() => setOpenModal(undefined)}
    >
      <Modal.Header className='pt-4 pb-3 bg-primary'>
        <p className='font-Roboto text-base font-bold uppercase text-white'>
          PHÂN CÔNG PHẢN BIỆN TIỂU LUẬN CHUYÊN NGÀNH
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
                value={data?.lecture?.name}
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
                value={currentUser?.name}
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
                placeholder='Nhập số lượng sinh viên...'
                required
                type='number'
                value={data?.maxSlot}
                disabled
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
            />
            <TextInput
              placeholder='Tên đề tài...'
              required
              type='text'
              id='topicName'
              value={data?.name}
              disabled
            />
          </div>
          {/* End topic field */}
          {/* Goal field */}
          <div className='mb-2 block font-Roboto'>
            <Label
              htmlFor='goal'
              value='Yêu cầu đề tài (*)'
              className='mb-2 block'
            />
            <div
              dangerouslySetInnerHTML={{ __html: data?.goal }}
              className='border dark:border-gray-500 p-3 dark:text-gray-400 text-sm rounded-md cursor-not-allowed bg-whiteSmoke text-gray-500 dark:bg-transparent'
            ></div>
          </div>
          {/* End goal field */}
          {/* Requirement field */}
          <div className='mb-2 block font-Roboto'>
            <Label
              htmlFor='requirement'
              value='Kiến thức cần có (*)'
              className='mb-2 block'
            />
            <div
              dangerouslySetInnerHTML={{ __html: data?.requirement }}
              className='border dark:border-gray-500 p-3 dark:text-gray-400 text-sm rounded-md cursor-not-allowed bg-whiteSmoke text-gray-500 dark:bg-transparent'
            ></div>
          </div>
          {/* End requirement field */}
          <div className='grid grid-cols-3 gap-3'>
            {/* Start date field */}
            <div className='mb-2 block font-Roboto'>
              <Label
                htmlFor='startDate'
                value='Ngày phản biện (*)'
                className='mb-2 block'
                color={formik.errors.startDate && "failure"}
              />
              <TextInput
                placeholder='Lựa chọn thời gian phản biện...'
                required
                type='date'
                id='startDate'
                value={formik.values.startDate}
                onChange={formik.handleChange}
                color={formik.errors.startDate && "failure"}
                helperText={formik.errors.startDate}
              />
            </div>
            {/* End start date field */}
            {/* Specified time field */}
            <div className='mb-2 block font-Roboto'>
              <Label
                htmlFor='specifiedTime'
                value='Thời gian phản biện (*)'
                className='mb-2 block'
                color={formik.errors.specifiedTime && "failure"}
              />
              <TextInput
                placeholder='Lựa chọn thời gian phản biện...'
                required
                type='text'
                id='specifiedTime'
                value={formik.values.specifiedTime}
                onChange={formik.handleChange}
                color={formik.errors.specifiedTime && "failure"}
                helperText={formik.errors.specifiedTime}
              />
            </div>
            {/* End start date field */}
            {/* Start date field */}
            <div className='mb-2 block font-Roboto'>
              <Label
                htmlFor='place'
                value='Địa điểm phản biện (*)'
                className='mb-2 block'
                color={formik.errors.place && "failure"}
              />
              <TextInput
                placeholder='Lựa chọn địa điểm phản biện...'
                required
                type='text'
                id='place'
                value={formik.values.place}
                onChange={formik.handleChange}
                color={formik.errors.place && "failure"}
                helperText={formik.errors.place}
              />
            </div>
            {/* End start date field */}
          </div>
          {/* Lecture select */}
          <div className='grid grid-cols-1 gap-3'>
            <div className='mb-2 block font-Roboto'>
              <Label
                value='Giảng viên phản biện (*)'
                className='mb-2 block'
                color={formik.errors.lectureCode && "failure"}
              />
              <Select
                options={options?.map((item) => ({
                  value: item?.ntid,
                  label: item?.name,
                }))}
                onChange={(selectedOption) => changeSelect(selectedOption)}
              />
            </div>
          </div>
          {/* End lecture select */}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div className='w-full'>
          <div className='w-full flex items-center justify-end gap-5'>
            <Button
              color='red'
              className='p-0'
              onClick={() => setOpenModal(undefined)}
            >
              Hủy bỏ
            </Button>
            <form onSubmit={formik.handleSubmit}>
              <Button className='p-0' color='green' type='submit'>
                Phân công
              </Button>
            </form>
          </div>
        </div>
      </Modal.Footer>
    </Modal>
  );
}

export default DivisionTopicModal;

DivisionTopicModal.propTypes = {
  openModal: PropTypes.any,
  setOpenModal: PropTypes.func.isRequired,
  data: PropTypes.object || undefined,
};
