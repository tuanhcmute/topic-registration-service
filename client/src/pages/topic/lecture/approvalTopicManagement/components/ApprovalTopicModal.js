import PropTypes from "prop-types";
import Select from "react-select";
import { Modal, Button, TextInput, Label } from "flowbite-react";
import { useSelector } from "react-redux";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useFormik } from "formik";
import * as Yup from "yup";

import { topicStatus } from "../../../../../utils/constants";
import { topicService } from "../../../../../services";

const validationSchema = Yup.object().shape({
  reason: Yup.string().required(),
  status: Yup.string().required(),
});

function ApprovalTopicModal(props) {
  const { openModal, setOpenModal, data, options } = props;
  const currentUser = useSelector((state) => state.user?.currentUser);
  const formik = useFormik({
    initialValues: {
      id: data?.id,
      status: topicStatus.rejected.value,
      reason: "",
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      handleUpdateStatusTopic(values);
    },
  });

  async function handleUpdateStatusTopic(values) {
    console.log(values);
    // topicService;
    const response = await topicService.approveTopicInLectureEnrollmentPeriod(
      values
    );
    console.log(response);
  }

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
              className='border dark:border-gray-500 p-3 dark:text-gray-400 text-sm rounded-md cursor-not-allowed bg-whiteSmoke text-gray-500'
            ></div>
          </div>
          {/* End goal field */}
          <div className='mb-2 block font-Roboto'>
            <Label
              htmlFor='requirement'
              value='Kiến thức cần có (*)'
              className='mb-2 block'
            />
            <div
              dangerouslySetInnerHTML={{ __html: data?.requirement }}
              className='border dark:border-gray-500 p-3 dark:text-gray-400 text-sm rounded-md cursor-not-allowed bg-whiteSmoke text-gray-500'
            ></div>
          </div>
          <div className='grid grid-cols-1 gap-3'>
            <div className='mb-2 block font-Roboto'>
              <Label value='SVTH' className='mb-2 block' />
              <Select
                isDisabled
                options={options}
                isSearchable
                isMulti
                defaultValue={data?.students.map((item) => ({
                  label: item?.name,
                  value: item?.ntid,
                }))}
              />
            </div>
          </div>
        </div>
      </Modal.Body>
      {data?.status !== topicStatus.approved.value && (
        <Modal.Footer>
          <div className='w-full'>
            <div className='mb-10 block font-Roboto'>
              <Label
                value='Lý do không duyệt'
                className='mb-2 block'
                color={formik.errors.reason && "failure"}
              />
              <CKEditor
                editor={ClassicEditor}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  formik.setFieldValue("reason", data);
                }}
              />
            </div>
            <div className='w-full flex items-center justify-end gap-5'>
              <form onSubmit={formik.handleSubmit}>
                <Button
                  color='red'
                  // onClick={() => setOpenModal(undefined)}
                  className='p-0'
                  type='submit'
                >
                  Không duyệt
                </Button>
              </form>
              <Button
                className='p-0'
                color='green'
                onClick={() =>
                  handleUpdateStatusTopic({
                    id: data?.id,
                    status: topicStatus.approved.value,
                    reason: topicStatus.approved.label,
                  })
                }
              >
                Duyệt đề tài
              </Button>
            </div>
          </div>
        </Modal.Footer>
      )}
    </Modal>
  );
}

export default ApprovalTopicModal;

ApprovalTopicModal.propTypes = {
  options: PropTypes.array.isRequired,
  openModal: PropTypes.any,
  setOpenModal: PropTypes.func.isRequired,
  handleUpdateTopic: PropTypes.func.isRequired,
  data: PropTypes.object || undefined,
};
