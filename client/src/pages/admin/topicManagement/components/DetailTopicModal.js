import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Select from "react-select";
import { Modal, Button, TextInput, Label, Textarea } from "flowbite-react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";

import { toast } from "react-toastify";
import { deleteTopicEnrollment } from "../../../../features/topicEnrollment/topicEnrollmentAction";
import _ from "lodash";

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

function DetailTopicModal(props) {
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

  function handleChange(...props) {
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
      size='4xl'
      show={openModal === "default"}
      onClose={() => setOpenModal(undefined)}
    >
      <Modal.Header className='pt-4 pb-3 bg-primary'>
        <p className='font-Roboto text-base font-bold uppercase text-white'>
          CHI TIẾT ĐỀ TÀI
        </p>
      </Modal.Header>
      <Modal.Body>
        <div className='space-y-4'>
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
                value='Công nghệ phần mềm'
                disabled
              />
            </div>
            {/* End major field */}
            {/* Status field */}
            <div className='mb-2 block font-Roboto'>
              <Label
                htmlFor='status'
                value='Trạng thái đề tài (*)'
                className='mb-2 block'
              />
              <TextInput
                placeholder='Nhập chuyên ngành'
                required
                type='text'
                value='Đã phân công'
                disabled
              />
            </div>
            {/* End type field */}
            {/* Type field */}
            <div className='mb-2 block font-Roboto'>
              <Label
                htmlFor='major'
                value='Loại đề tài (*)'
                className='mb-2 block'
              />
              <TextInput
                placeholder='Nhập chuyên ngành'
                required
                type='text'
                value='TLCN (Tiểu luận chuyên ngành)'
                disabled
              />
            </div>
            {/* End type field */}
            {/* division field */}
            <div className='mb-2 block font-Roboto'>
              <Label
                htmlFor='division'
                value='Giảng viên phản biện (*)'
                className='mb-2 block'
              />
              <TextInput
                placeholder='Nhập chuyên ngành'
                required
                type='text'
                value='Huynh Xuan Phung'
                disabled
              />
            </div>
            {/* End division field */}
            <div className='mb-2 block font-Roboto'>
              <Label value='SVTH' className='mb-2 block' />
              <Select
                isDisabled={isDisabled}
                options={options}
                isSearchable
                isMulti
                value={selectedOptions}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className='mb-2 block font-Roboto'>
            <Label
              htmlFor='topicName'
              value='Tên đề tài (*)'
              className='mb-2 block'
              color={formik.errors.topicName && "failure"}
            />
            <Textarea
              color={formik.errors.topicName && "failure"}
              helperText={formik.errors.topicName}
              placeholder='Tên đề tài...'
              required
              type='text'
              id='topicName'
              onChange={formik.handleChange}
              // value={formik.values.topicName}
              value='Sử dụng ngôn ngữ Python với thư viện Framework: Flask và ReactJS để phát triển hệ thống thông tin hỗ trợ quản lý đào tạo lập trình trực tuyến.'
              disabled
              rows={4}
            />
          </div>
          {/* End topic field */}
          <div className='mb-2 block font-Roboto'>
            <Label
              htmlFor='topicName'
              value='Yêu cầu đề tài (*)'
              className='mb-2 block'
              color={formik.errors.topicName && "failure"}
            />
            <div
              dangerouslySetInnerHTML={{
                __html:
                  "<ul><li>- Phát triển WebApp thực tiễn cho&nbsp;<br>- Học viên:Join class, Assessment, Forum<br>- Giảng viên: Materials &amp; Assessments Management<br>- WinApp Nhân viên hệ thống: Class &amp; Schedules Management&nbsp;</li></ul>",
              }}
              className='border dark:border-gray-500 p-3 dark:text-gray-400 text-sm rounded-md cursor-not-allowed  text-gray-500'
            ></div>
          </div>
          <div className='mb-2 block font-Roboto'>
            <Label
              htmlFor='topicName'
              value='Kiến thức cần có (*)'
              className='mb-2 block'
              color={formik.errors.topicName && "failure"}
            />
            <div
              dangerouslySetInnerHTML={{
                __html:
                  "<ul><li>- Dùng Python với<br>- Framework: Flask, ReactJS</li></ul>",
              }}
              className='border dark:border-gray-500 p-3 dark:text-gray-400 text-sm rounded-md cursor-not-allowed  text-gray-500'
            ></div>
          </div>
          {/* Select field*/}
        </div>
      </Modal.Body>
      {!isDisabled && (
        <Modal.Footer>
          <div className='w-full flex items-center justify-end gap-5'>
            <Button
              color='green'
              onClick={() => setOpenModal(undefined)}
              className='p-0'
            >
              Thoát
            </Button>
          </div>
        </Modal.Footer>
      )}
    </Modal>
  );
}

export default DetailTopicModal;

DetailTopicModal.propTypes = {
  options: PropTypes.array.isRequired,
  openModal: PropTypes.any,
  setOpenModal: PropTypes.func.isRequired,
  handleUpdateTopic: PropTypes.func.isRequired,
  data: PropTypes.object || undefined,
};
