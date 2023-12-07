import PropTypes from "prop-types";
import Select from "react-select";
import { Modal, Button, TextInput, Label } from "flowbite-react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useEffect, useState } from "react";

import { semesterType } from "../../../../utils/constants";

const validationSchema = Yup.object().shape({
  type: Yup.string().required("Type là bắt buộc"),
  name: Yup.string().required("Mô tả là bắt buộc"),
  startDate: Yup.string().required("Start date là bắt buộc"),
  endDate: Yup.string().required("End date là bắt buộc"),
});

function AddTimeModal(props) {
  const [selectedOption, setSelectedOption] = useState();
  const { openModal, setOpenModal, createSemester } = props;
  const formik = useFormik({
    initialValues: {
      type: "",
      name: "",
      startDate: "",
      endDate: "",
    },
    onSubmit: (values) => {
      console.log(values);
      createSemester(values);
    },
    validationSchema,
  });

  function changeSelect(...props) {
    // Props[] => [Array(0), {action: "", data}]
    setSelectedOption(props[0]);
  }

  function setCloseModal() {
    setOpenModal(undefined);
    setSelectedOption([]);
    formik.setValues(formik.initialValues);
  }

  useEffect(() => {
    formik.setFieldValue("type", selectedOption?.value);
  }, [selectedOption]);

  return (
    <Modal size='lg' show={openModal === "default"} onClose={setCloseModal}>
      <Modal.Header className='pt-4 pb-3 bg-primary'>
        <p className='font-Roboto text-base font-bold uppercase text-white'>
          THÊM HỌC KỲ
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
                color={formik.errors.type && "failure"}
              />
              <Select
                placeholder='Lựa chọn loại học kỳ'
                options={Object.values(semesterType)}
                onChange={changeSelect}
                value={selectedOption}
                isSearchable={false}
              />
            </div>
            {/* End type filed */}
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
                placeholder='Nhập mô tả...'
                required
                type='text'
                onChange={formik.handleChange}
                value={formik.values.name}
                helperText={formik.errors.name}
                color={formik.errors.name && "failure"}
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
                onChange={formik.handleChange}
                value={formik.values.startDate}
                helperText={formik.errors.startDate}
                color={formik.errors.startDate && "failure"}
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
                onChange={formik.handleChange}
                value={formik.values.endDate}
                helperText={formik.errors.endDate}
                color={formik.errors.endDate && "failure"}
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

export default AddTimeModal;

AddTimeModal.propTypes = {
  openModal: PropTypes.any,
  setOpenModal: PropTypes.func.isRequired,
  createSemester: PropTypes.func,
};
