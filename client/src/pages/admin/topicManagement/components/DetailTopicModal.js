import PropTypes from "prop-types";
import Select from "react-select";
import { Modal, Button, TextInput, Label, Textarea } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { topicStatus } from "../../../../utils/constants";
import { useEffect } from "react";
import { fetchDivisionByTopic } from "../../../../features/division";

function DetailTopicModal(props) {
  const dispatch = useDispatch();
  const divisions = useSelector((state) => state.division?.divisions);
  const { openModal, setOpenModal, data } = props;

  useEffect(() => {
    dispatch(fetchDivisionByTopic(data?.id));
  }, [data]);

  return (
    <Modal
      size='4xl'
      show={openModal === "default"}
      onClose={() => setOpenModal(undefined)}
    >
      <Modal.Header className='pt-4 pb-3 bg-primary'>
        <p className='font-Roboto text-base font-bold uppercase text-white'>
          CHI TIẾT ĐỀ TÀI
        </p>
      </Modal.Header>
      <Modal.Body>
        <div className='space-y-4'>
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
                value={data?.major?.name}
                disabled
              />
            </div>
            {/* End major field */}
            {/* Status field */}
            <div className='mb-2 block font-Roboto'>
              <Label
                htmlFor='status'
                value='Trạng thái đề tài (*)'
                className='mb-2 block'
              />
              <TextInput
                placeholder='Nhập chuyên ngành'
                required
                type='text'
                value={topicStatus[data?.status?.toLowerCase()]?.label}
                disabled
              />
            </div>
            {/* End type field */}
            {/* Type field */}
            <div className='mb-2 block font-Roboto'>
              <Label
                htmlFor='type'
                value='Loại đề tài (*)'
                className='mb-2 block'
              />
              <TextInput required type='text' value={data?.type} disabled />
            </div>
            {/* End type field */}
            {/* division field */}
            <div className='mb-2 block font-Roboto'>
              <Label
                htmlFor='division'
                value='Giảng viên phản biện (*)'
                className='mb-2 block'
              />
              <TextInput
                required
                type='text'
                value={divisions?.length > 0 && divisions[0]?.lecture?.name}
                disabled
              />
            </div>
            {/* End division field */}
            <div className='mb-2 block font-Roboto'>
              <Label value='SVTH' className='mb-2 block' />
              <Select
                isDisabled={true}
                isSearchable
                isMulti
                // value={}
              />
            </div>
          </div>
          <div className='mb-2 block font-Roboto'>
            <Label
              htmlFor='topicName'
              value='Tên đề tài (*)'
              className='mb-2 block'
            />
            <Textarea
              placeholder='Tên đề tài...'
              required
              type='text'
              id='topicName'
              value={data?.name}
              disabled
            />
          </div>
          {/* End topic field */}
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
          {/* Select field*/}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div className='w-full flex items-center justify-end gap-5'>
          <Button
            color='green'
            onClick={() => setOpenModal(undefined)}
            className='p-0'
          >
            Thoát
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}

export default DetailTopicModal;

DetailTopicModal.propTypes = {
  openModal: PropTypes.any,
  setOpenModal: PropTypes.func.isRequired,
  data: PropTypes.object || undefined,
};
