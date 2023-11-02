import PropTypes from "prop-types";
import { Modal } from "flowbite-react";
import { approvalHistoryService } from "../../../../../services";
import { useEffect, useState } from "react";
import { HttpStatusCode } from "axios";
import { topicStatus } from "../../../../../utils/constants";

function ApprovalTopicModal(props) {
  const { openModal, setOpenModal, data } = props;
  const [approvalHistories, setApprovalHistories] = useState([]);

  async function fetchApprovalHistoryByTopicId(topicId) {
    try {
      const response = await approvalHistoryService.getApprovalHistoryByTopicId(
        topicId
      );
      console.log(response);
      if (response?.data?.statusCode === HttpStatusCode.Ok) {
        // setEnrollmentPeriod(response?.data?.data?.enrollmentPeriod);
        setApprovalHistories(response.data?.data?.approvalHistories);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchApprovalHistoryByTopicId(data?.id);
  }, [data]);

  return (
    <Modal
      size='4xl'
      show={openModal === "default"}
      onClose={() => setOpenModal(undefined)}
    >
      <Modal.Header className='pt-4 pb-3 bg-primary'>
        <p className='font-Roboto text-base font-bold uppercase text-white'>
          LỊCH SỬ DUYỆT ĐỀ TÀI
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
                        <th className='p-3 text-center border'>Lý do</th>
                        <th className='p-3 text-center border'>Trạng thái</th>
                        <th className='p-3 text-center border'>Ngày duyệt</th>
                        <th className='p-3 text-center border'>
                          Ngày duyệt lần cuối
                        </th>
                      </tr>
                    </thead>
                    <tbody className='text-gray-600 text-sm font-light'>
                      {approvalHistories?.map((item, index) => {
                        return (
                          <tr className='bg-whiteSmoke dark:bg-sambuca dark:text-gray-300'>
                            <td className='p-3 text-center whitespace-nowrap border'>
                              {index + 1}
                            </td>
                            <td className='p-3 text-left border border-collapse border-lightGrey w-[300px]'>
                              <p
                                className='font-normal'
                                dangerouslySetInnerHTML={{
                                  __html: item?.reason,
                                }}
                              ></p>
                            </td>
                            <td className='p-3 text-left border border-collapse border-lightGrey'>
                              <div className=''>
                                {
                                  topicStatus?.[item?.status.toLowerCase()]
                                    .label
                                }
                              </div>
                            </td>
                            <td className='p-3 text-center border border-collapse border-lightGrey bg-'>
                              <div className=''>20/11/2023</div>
                            </td>
                            <td className='p-3 text-center border border-collapse border-lightGrey'>
                              <div className=''>20/11/2023</div>
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
        <div className='w-full flex justify-end p-3'>
          {/* <Pagination /> */}
          {/* <PaginatedItems items={[...Array(100).keys()]} itemsPerPage={10} /> */}
        </div>
        {/* End table */}
      </Modal.Body>
    </Modal>
  );
}

export default ApprovalTopicModal;

ApprovalTopicModal.propTypes = {
  openModal: PropTypes.any,
  setOpenModal: PropTypes.func.isRequired,
  data: PropTypes.object || undefined,
};
