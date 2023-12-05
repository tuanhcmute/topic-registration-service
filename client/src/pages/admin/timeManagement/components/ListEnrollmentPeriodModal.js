import PropTypes from "prop-types";
import { Modal } from "flowbite-react";
import { useDispatch } from "react-redux";
import { LiaEditSolid } from "react-icons/lia";
import EditEnrollmentPeriodModal from "./EditEnrollmentPeriodModal";
import { useState } from "react";

function ListEnrollmentPeriodModal(props) {
  const [openEditEnrollmentPeriodModal, setOpenEditEnrollmentPeriodModal] =
    useState(undefined);
  const dispatch = useDispatch();
  const { openModal, setOpenModal, data } = props;

  return (
    <Modal
      size='5xl'
      show={openModal === "default"}
      onClose={() => setOpenModal(undefined)}
    >
      <Modal.Header className='pt-4 pb-3 bg-primary'>
        <p className='font-Roboto text-base font-bold uppercase text-white'>
          DANH SÁCH KHOẢNG THỜI GIAN ĐĂNG KÝ
        </p>
      </Modal.Header>
      <Modal.Body>
        {/* Table */}
        <div className='p-3'>
          <div className='overflow-x-auto'>
            <div className='bg-gray-100 flex items-center justify-center font-Roboto'>
              <div className='w-full'>
                <div className='bg-white shadow-md'>
                  <table className='min-w-max w-full table-auto'>
                    <thead>
                      <tr className='bg-gray-200 text-gray-600 text-sm leading-normal p-3 dark:bg-sambuca dark:text-gray-300'>
                        <th className='p-3 text-center border-collapse border'>
                          STT
                        </th>
                        <th className='p-3 text-center border'>Tên</th>
                        <th className='p-3 text-center border'>Trạng thái</th>
                        <th className='p-3 text-center border'>Loại</th>
                        <th className='p-3 text-center border'>Bắt đầu</th>
                        <th className='p-3 text-center border'>kết thúc</th>
                        <th className='p-3 text-center border'></th>
                      </tr>
                    </thead>
                    <tbody className='text-gray-600 text-sm font-light'>
                      {[1]?.map((item, index) => {
                        return (
                          <tr
                            className='bg-whiteSmoke dark:bg-sambuca dark:text-gray-300'
                            key={index}
                          >
                            <td className='p-3 text-center whitespace-nowrap border w-4'>
                              {index + 1}
                            </td>
                            <td className='p-3 text-left border border-collapse border-lightGrey w-[300px]'>
                              <p className='font-normal'>
                                Đợt giảng viên đề xuất đề tài tiểu luận chuyên
                                ngành học kỳ I/2023 (28/08 - 11/09/2023)
                              </p>
                            </td>
                            <td className='p-3 text-left border border-collapse border-lightGrey w-20'>
                              <p className='w-fit'>ACTIVATED</p>
                            </td>
                            <td className='p-3 text-center border border-collapse border-lightGrey w-40'>
                              <div className=''>
                                TLCN (Tiểu luận chuyên ngành)
                              </div>
                            </td>
                            <td className='p-3 text-center border border-collapse border-lightGrey w-40'>
                              <div className=''>28/08/2023</div>
                            </td>
                            <td className='p-3 text-center border border-collapse border-lightGrey w-40'>
                              <div className=''>11/09/2023</div>
                            </td>
                            <td className='p-3 border border-collapse border-lightGrey w-40'>
                              <div className='flex items-center w-full justify-center'>
                                <LiaEditSolid
                                  className='w-6 h-6 cursor-pointer'
                                  onClick={() =>
                                    setOpenEditEnrollmentPeriodModal("default")
                                  }
                                />
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <EditEnrollmentPeriodModal
          openModal={openEditEnrollmentPeriodModal}
          setOpenModal={setOpenEditEnrollmentPeriodModal}
        />

        <div className='w-full flex justify-end p-3'>
          {/* <Pagination /> */}
          {/* <PaginatedItems items={[...Array(100).keys()]} itemsPerPage={10} /> */}
        </div>
        {/* End table */}
      </Modal.Body>
    </Modal>
  );
}

export default ListEnrollmentPeriodModal;

ListEnrollmentPeriodModal.propTypes = {
  openModal: PropTypes.any,
  setOpenModal: PropTypes.func.isRequired,
  data: PropTypes.object || undefined,
};
