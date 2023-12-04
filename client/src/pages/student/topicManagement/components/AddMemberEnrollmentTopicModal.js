import PropTypes from "prop-types";
import { Modal, Button, Label } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import ReactSelect from "react-select";
import _ from "lodash";
import { useEffect, useState } from "react";
import { fetchStudentsNotEnrolledInTopic } from "../../../../features/user";
import { createTopicEnrollment } from "../../../../features/topicEnrollment/topicEnrollmentAction";

function AddMemberEnrollmentTopicModal(props) {
  console.log(props);
  const dispatch = useDispatch();
  const { openModal, setOpenModal, data } = props;
  const studentOptions = useSelector(
    (state) => state.user?.studentsNotEnrolledInTopic
  );
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    // Fetch student options
    if (
      _.isEmpty(studentOptions) ||
      _.isNull(studentOptions) ||
      _.isUndefined(studentOptions)
    ) {
      dispatch(fetchStudentsNotEnrolledInTopic());
    }
  }, []);

  function handleChange(selectedOption) {
    setSelectedOption(selectedOption);
  }
  function handleCreateTopicEnrollment() {
    dispatch(
      createTopicEnrollment({
        data: { ntid: selectedOption?.value, topicId: data?.topic?.id },
        setOpenModal,
      })
    );
  }

  return (
    <Modal show={openModal} size='lg' onClose={() => setOpenModal(false)} popup>
      <Modal.Header className='pt-4 pb-3 bg-primary'>
        <p className='font-Roboto text-base font-bold uppercase text-white'>
          THÊM SINH VIÊN THỰC HIỆN
        </p>
      </Modal.Header>
      <Modal.Body>
        <div className='space-y-4'>
          <div className='mb-2 block font-Roboto'>
            <Label htmlFor='email1' value='SVTH' className='mb-2 block' />
            <ReactSelect
              placeholder='Lựa chọn SVTH'
              options={studentOptions}
              isSearchable={true}
              onChange={handleChange}
              value={selectedOption}
            />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div className='w-full flex items-center justify-end gap-5'>
          <Button
            color='red'
            className='p-0'
            onClick={() => setOpenModal(false)}
          >
            Hủy bỏ
          </Button>
          <Button
            className='p-0'
            color='green'
            onClick={handleCreateTopicEnrollment}
          >
            Lưu lại
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}

export default AddMemberEnrollmentTopicModal;

AddMemberEnrollmentTopicModal.propTypes = {
  openModal: PropTypes.any,
  setOpenModal: PropTypes.func.isRequired,
  data: PropTypes.object,
};
