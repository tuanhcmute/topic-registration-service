import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Select from "react-select";
import { Modal, Button, TextInput, Label } from "flowbite-react";
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

function EditTimeModal(props) {
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
      size='lg'
      show={openModal === "default"}
      onClose={() => setOpenModal(undefined)}
    >
      <Modal.Header className='pt-4 pb-3 bg-primary'>
        <p className='font-Roboto text-base font-bold uppercase text-white'>
          CHỈNH SỬA HỌC KỲ
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

export default EditTimeModal;

EditTimeModal.propTypes = {
  options: PropTypes.array.isRequired,
  openModal: PropTypes.any,
  setOpenModal: PropTypes.func.isRequired,
  handleUpdateTopic: PropTypes.func.isRequired,
  data: PropTypes.object || undefined,
};
