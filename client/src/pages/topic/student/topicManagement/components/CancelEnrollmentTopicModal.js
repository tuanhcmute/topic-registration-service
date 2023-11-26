import PropTypes from "prop-types";
import { Modal, Button } from "flowbite-react";
import { useDispatch } from "react-redux";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import {
  deleteTopicEnrollment,
  fetchTopicEnrollmentsByNtid,
} from "../../../../../features/topicEnrollment/topicEnrollmentAction";
import { fetchAllApprovedTopicsInStudentEnrollmentPeriod } from "../../../../../features/topic";
import { topicType } from "../../../../../utils/constants";

function CancelEnrollmentTopicModal(props) {
  const dispatch = useDispatch();
  const { openModal, setOpenModal, data } = props;

  function handleDeleteTopicEnrollment() {
    dispatch(deleteTopicEnrollment(data?.student?.ntid));
    setOpenModal(false);
    dispatch(fetchTopicEnrollmentsByNtid());
    dispatch(
      fetchAllApprovedTopicsInStudentEnrollmentPeriod({ type: topicType.TLCN })
    );
  }

  return (
    <Modal show={openModal} size='md' onClose={() => setOpenModal(false)} popup>
      <Modal.Header />
      <Modal.Body>
        <div className='text-center'>
          <HiOutlineExclamationCircle className='mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200' />
          <h3 className='mb-5 text-lg font-normal text-gray-500 dark:text-gray-400'>
            Xóa đề tài đã đăng ký. Yêu cầu này không thể hoàn tác!
          </h3>
          <div className='flex justify-center gap-4'>
            <Button color='failure' onClick={handleDeleteTopicEnrollment}>
              Xóa đăng ký
            </Button>
            <Button color='gray' onClick={() => setOpenModal(false)}>
              Hủy bỏ
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default CancelEnrollmentTopicModal;

CancelEnrollmentTopicModal.propTypes = {
  openModal: PropTypes.any,
  setOpenModal: PropTypes.func.isRequired,
  data: PropTypes.object,
};
