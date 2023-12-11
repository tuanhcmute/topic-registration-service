import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Select from "react-select";
import { Modal, Button, TextInput, Label } from "flowbite-react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import { topicStatus } from "../../../../utils/constants";
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

function EditTopicModal(props) {
  const dispatch = useDispatch();
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [isDisabled, setDisabled] = useState(false);
  const { openModal, setOpenModal, data, options, handleUpdateTopic } = props;
  const enrollmentPeriod = useSelector(
    (state) => state.enrollmentPeriod?.enrollmentPeriod
  );
  const currentUser = useSelector((state) => state.user?.currentUser);
  const formik = useFormik({
    initialValues: {
      id: "",
      maxSlot: 0,
      topicName: "",
      goal: "",
      requirement: "",
      students: [],
    },
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
      const isExist = data?.topicEnrollments?.some((item) =>
        _.isEqual(item?.student?.ntid, option?.removedValue?.value)
      );
      console.log({ isExist });
      if (isExist) dispatch(deleteTopicEnrollment(option?.removedValue?.value));
    }
    if (props[0]?.length > formik.values.maxSlot) {
      toast.warning(`SVTH không vượt quá ${formik.values.maxSlot}`);
      return;
    }
    setSelectedOptions(props[0]);
  }

  useEffect(() => {
    formik.setValues({
      id: data?.id,
      topicName: data?.name,
      goal: data?.goal,
      requirement: data?.requirement,
      maxSlot: data?.maxSlot,
    });
    setSelectedOptions(
      data?.topicEnrollments?.map((item) => ({
        label: item?.student?.name,
        value: item?.student?.ntid,
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
          </div>
          {/* Select field*/}
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
          {/* End select field */}
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
              value={formik.values.topicName}
              disabled={isDisabled}
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
              color={formik.errors.requirement && "failure"}
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

export default EditTopicModal;

EditTopicModal.propTypes = {
  options: PropTypes.array.isRequired,
  openModal: PropTypes.any,
  setOpenModal: PropTypes.func.isRequired,
  handleUpdateTopic: PropTypes.func.isRequired,
  data: PropTypes.object || undefined,
};
