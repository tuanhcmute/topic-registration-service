import PropTypes from "prop-types";
import Select from "react-select";
import { Modal, Button, TextInput, Label } from "flowbite-react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useEffect, useState } from "react";

import { enrollmentPeriodCode, topicType } from "../../../../utils/constants";

const validationSchema = Yup.object().shape({
  code: Yup.string().required("Mã đăng ký là bắt buộc"),
  type: Yup.string().required("Loại đề tài là bắt buộc"),
  name: Yup.string().required("Mô tả là bắt buộc"),
  startDate: Yup.string().required("Thời gian bắt đầu là bắt buộc"),
  endDate: Yup.string().required("Thời gian kết thúc là bắt buộc"),
});

function AddEnrollmentPeriodModal(props) {
  const [selectedCodeOption, setSelectedCodeOption] = useState(null);
  const [selectedTypeOption, setSelectedTypeOption] = useState(null);
  const { openModal, setOpenModal, createEnrollmentPeriod, data } = props;
  const formik = useFormik({
    initialValues: {
      code: "",
      type: "",
      name: "",
      startDate: "",
      endDate: "",
    },
    onSubmit: (values) => {
      console.log(values);
      createEnrollmentPeriod(data?.id, values);
    },
    validationSchema,
  });

  function changeSelectCode(...props) {
    // Props[] => [Array(0), {action: "", data}]
    setSelectedCodeOption(props[0]);
  }

  function changeSelectType(...props) {
    // Props[] => [Array(0), {action: "", data}]
    setSelectedTypeOption(props[0]);
  }

  function setCloseModal() {
    setOpenModal(undefined);
    setSelectedCodeOption();
    setSelectedTypeOption([]);
    formik.setValues(formik.initialValues);
  }

  useEffect(() => {
    formik.setFieldValue("type", selectedTypeOption?.value);
  }, [selectedTypeOption]);

  useEffect(() => {
    formik.setFieldValue("code", selectedCodeOption?.value);
  }, [selectedCodeOption]);

  return (
    <Modal size='lg' show={openModal === "default"} onClose={setCloseModal}>
      <Modal.Header className='pt-4 pb-3 bg-primary'>
        <p className='font-Roboto text-base font-bold uppercase text-white'>
          THÊM KHOẢNG THỜI GIAN ĐĂNG KÝ
        </p>
      </Modal.Header>
      <Modal.Body>
        <div className='space-y-4'>
          <div className='grid grid-cols-1 gap-3'>
            {/* semester Type field */}
            <div className='mb-2 block font-Roboto'>
              <Label value='Học kỳ (*)' className='mb-2 block' htmlFor='type' />
              <TextInput
                id='name'
                required
                type='text'
                value={data?.name}
                disabled
              />
            </div>
            {/* End semester type filed */}
            {/* Code field */}
            <div className='mb-2 block font-Roboto'>
              <Label
                value='Mã thời gian đăng ký (*)'
                className='mb-2 block'
                htmlFor='type'
                color={formik.errors.code && "failure"}
              />
              <Select
                placeholder='Lựa chọn mã thời gian đăng ký'
                options={Object.values(enrollmentPeriodCode)}
                onChange={changeSelectCode}
                value={selectedCodeOption}
                isSearchable={false}
              />
            </div>
            {/* End type filed */}
            <div className='mb-2 block font-Roboto'>
              <Label
                htmlFor='type'
                value='Thời gian đăng ký dành cho loại đề tài (*)'
                className='mb-2 block'
                color={formik.errors.type && "failure"}
              />
              <Select
                placeholder='Nhập thời gian đăng ký dành cho loại đề tài'
                options={Object.values(topicType).map((item) => ({
                  label: item,
                  value: item,
                }))}
                onChange={changeSelectType}
                value={selectedTypeOption}
                isSearchable={false}
              />
            </div>
            {/* Name field */}
            <div className='mb-2 block font-Roboto'>
              <Label
                htmlFor='name'
                value='Mô tả (*)'
                className='mb-2 block'
                color={formik.errors.name && "failure"}
              />
              <TextInput
                id='name'
                placeholder='Nhập mô tả khoảng thời gian...'
                required
                type='text'
                color={formik.errors.name && "failure"}
                helperText={formik.errors.name}
                value={formik.values.name}
                onChange={formik.handleChange}
              />
            </div>
            {/* End name field */}
            {/* Start date field */}
            <div className='mb-2 block font-Roboto'>
              <Label
                htmlFor='startDate'
                value='Thời gian bắt đầu (*)'
                className='mb-2 block'
                color={formik.errors.startDate && "failure"}
              />
              <TextInput
                id='startDate'
                required
                type='date'
                color={formik.errors.startDate && "failure"}
                value={formik.values.startDate}
                onChange={formik.handleChange}
                helperText={formik.errors.startDate}
              />
            </div>
            {/* End start date field */}
            {/* End date field */}
            <div className='mb-2 block font-Roboto'>
              <Label
                htmlFor='endDate'
                value='Thời gian kết thúc (*)'
                className='mb-2 block'
                color={formik.errors.endDate && "failure"}
              />
              <TextInput
                id='endDate'
                required
                type='date'
                helperText={formik.errors.endDate}
                color={formik.errors.endDate && "failure"}
                value={formik.values.endDate}
                onChange={formik.handleChange}
              />
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

export default AddEnrollmentPeriodModal;

AddEnrollmentPeriodModal.propTypes = {
  openModal: PropTypes.any,
  setOpenModal: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  createEnrollmentPeriod: PropTypes.func.isRequired,
};
