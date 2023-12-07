import PropTypes from "prop-types";
import { Modal } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { LiaEditSolid } from "react-icons/lia";
import EditEnrollmentPeriodModal from "./EditEnrollmentPeriodModal";
import { useEffect, useState } from "react";
import {
  fetchEnrollmentPeriodBySemesterId,
  updateEnrollmentPeriod,
} from "../../../../features/enrollmentPeriod/enrollmentPeriodAction";

function ListEnrollmentPeriodModal(props) {
  const [openEditEnrollmentPeriodModal, setOpenEditEnrollmentPeriodModal] =
    useState(undefined);
  const dispatch = useDispatch();
  const { openModal, setOpenModal, data } = props;
  const enrollmentPeriods = useSelector(
    (state) => state.enrollmentPeriod.enrollmentPeriods
  );
  const [selectedEnrollmentPeriod, setSelectedEnrollmentPeriod] =
    useState(null);

  function handleUpdateEnrollmentPeriod(id, requestData) {
    dispatch(
      updateEnrollmentPeriod({
        id,
        data: requestData,
        semesterId: data?.id,
        setOpenEditEnrollmentPeriodModal,
      })
    );
  }

  useEffect(() => {
    dispatch(fetchEnrollmentPeriodBySemesterId(data?.id));
  }, [data]);

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
                      {enrollmentPeriods?.map((item, index) => {
                        return (
                          <tr
                            className='bg-whiteSmoke dark:bg-sambuca dark:text-gray-300'
                            key={index}
                          >
                            <td className='p-3 text-center whitespace-nowrap border w-4'>
                              {index + 1}
                            </td>
                            <td className='p-3 text-left border border-collapse border-lightGrey w-[300px]'>
                              <p className='font-normal'>{item?.name}</p>
                            </td>
                            <td className='p-3 text-left border border-collapse border-lightGrey w-20'>
                              <p className='w-fit'>{item?.status}</p>
                            </td>
                            <td className='p-3 text-center border border-collapse border-lightGrey w-40'>
                              <div className=''>
                                {item?.type} (Tiểu luận chuyên ngành)
                              </div>
                            </td>
                            <td className='p-3 text-center border border-collapse border-lightGrey w-40'>
                              <div className=''>{item?.startDate}</div>
                            </td>
                            <td className='p-3 text-center border border-collapse border-lightGrey w-40'>
                              <div className=''>{item?.endDate}</div>
                            </td>
                            <td className='p-3 border border-collapse border-lightGrey w-40'>
                              <div className='flex items-center w-full justify-center'>
                                <LiaEditSolid
                                  className='w-6 h-6 cursor-pointer'
                                  onClick={() => {
                                    setOpenEditEnrollmentPeriodModal("default");
                                    setSelectedEnrollmentPeriod(item);
                                  }}
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
          data={selectedEnrollmentPeriod}
          updateEnrollmentPeriod={handleUpdateEnrollmentPeriod}
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