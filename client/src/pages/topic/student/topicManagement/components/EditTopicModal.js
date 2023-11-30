import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Modal, Button, TextInput, Label } from "flowbite-react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import { topicStatus, topicType } from "../../../../../utils/constants";
import { createTopicEnrollment } from "../../../../../features/topicEnrollment/topicEnrollmentAction";
import UnavailableEnrollmentTopicModal from "./UnavailableEnrollmentTopicModal";
import { fetchAllApprovedTopicsInStudentEnrollmentPeriod } from "../../../../../features/topic";

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

function EditTopicModal(props) {
  const dispatch = useDispatch();
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [isDisabled, setDisabled] = useState(false);
  const [
    openUnavailableEnrollmentTopicModal,
    setOpenUnavailableEnrollmentTopicModal,
  ] = useState(undefined);
  const { openModal, setOpenModal, data, handleUpdateTopic } = props;
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

  function handleCreateTopicEnrollment() {
    const request = {
      ntid: currentUser?.ntid,
      topicId: data?.id,
    };
    dispatch(createTopicEnrollment({ data: request, setOpenModal }));
    dispatch(
      fetchAllApprovedTopicsInStudentEnrollmentPeriod({ type: topicType.TLCN })
    );
  }

  useEffect(() => {
    setInitialValues({
      id: data?.id,
      topicName: data?.name,
      goal: data?.goal,
      requirement: data?.requirement,
      maxSlot: data?.maxSlot,
    });
    setSelectedOptions(
      data?.students?.map((item) => ({
        label: item?.name,
        value: item?.ntid,
      }))
    );
    setDisabled(
      data?.status === topicStatus.approved.value ||
        data?.status === topicStatus.assigned.value
    );
  }, [data]);

  useEffect(() => {
    const studentCodes = selectedOptions?.map((item) => item.value);
    formik.setFieldValue("students", studentCodes);
  }, [selectedOptions]);

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
            value={enrollmentPeriod?.name}
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
          </div>
          {/* Topic field */}
          <div className='mb-2 block font-Roboto'>
            <Label
              htmlFor='topicName'
              value='Tên đề tài (*)'
              className='mb-2 block'
            />
            <TextInput
              helperText={formik.errors.topicName}
              placeholder='Tên đề tài...'
              required
              type='text'
              id='topicName'
              onChange={formik.handleChange}
              value={formik.values.topicName}
              disabled={isDisabled}
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
            {data?.status === topicStatus.approved.value ||
            data?.status === topicStatus.assigned.value ? (
              <div
                dangerouslySetInnerHTML={{ __html: data?.goal }}
                className='border dark:border-gray-500 p-3 dark:text-gray-400 text-sm rounded-md cursor-not-allowed bg-whiteSmoke text-gray-500'
              ></div>
            ) : (
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
            )}
          </div>
          {/* End goal field */}
          <div className='mb-2 block font-Roboto'>
            <Label
              htmlFor='requirement'
              value='Kiến thức cần có (*)'
              className='mb-2 block'
            />
            {data?.status === topicStatus.approved.value ||
            data?.status === topicStatus.assigned.value ? (
              <div
                dangerouslySetInnerHTML={{ __html: data?.requirement }}
                className='border dark:border-gray-500 p-3 dark:text-gray-400 text-sm rounded-md cursor-not-allowed bg-whiteSmoke text-gray-500'
              ></div>
            ) : (
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
            )}
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
          {/* <form> */}
          <Button
            className='p-0'
            color='green'
            onClick={() => {
              if (data?.availableSlot > 0) handleCreateTopicEnrollment();
              else setOpenUnavailableEnrollmentTopicModal("default");
            }}
          >
            Đăng ký
          </Button>
          {/* </form> */}
        </div>
        <UnavailableEnrollmentTopicModal
          openModal={openUnavailableEnrollmentTopicModal}
          setOpenModal={setOpenUnavailableEnrollmentTopicModal}
        />
      </Modal.Footer>
    </Modal>
  );
}

export default EditTopicModal;

EditTopicModal.propTypes = {
  options: PropTypes.array.isRequired,
  openModal: PropTypes.any,
  setOpenModal: PropTypes.func.isRequired,
  handleUpdateTopic: PropTypes.func.isRequired,
  data: PropTypes.object || undefined,
};
