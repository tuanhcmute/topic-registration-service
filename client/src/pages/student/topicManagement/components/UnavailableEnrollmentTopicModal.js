import PropTypes from "prop-types";
import { Modal, Button } from "flowbite-react";
import { useDispatch } from "react-redux";
import { HiOutlineExclamationCircle } from "react-icons/hi";

function UnavailableEnrollmentTopicModal(props) {
  const dispatch = useDispatch();
  const { openModal, setOpenModal } = props;

  return (
    <Modal show={openModal} size='md' onClose={() => setOpenModal(false)} popup>
      <Modal.Header />
      <Modal.Body>
        <div className='text-center'>
          <HiOutlineExclamationCircle className='mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200' />
          <h3 className='mb-5 text-lg font-normal text-gray-500 dark:text-gray-400'>
            Đề tài đã đủ người đăng ký. Vui lòng chọn đề tài khác
          </h3>
          <div className='flex justify-center gap-4'>
            <Button color='failure' onClick={() => setOpenModal(false)}>
              Quay lại
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default UnavailableEnrollmentTopicModal;

UnavailableEnrollmentTopicModal.propTypes = {
  openModal: PropTypes.any,
  setOpenModal: PropTypes.func.isRequired,
};
