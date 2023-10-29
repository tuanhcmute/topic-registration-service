import TopicItem from "./TopicItem";

function THead() {
  return (
    <thead>
      <tr className='bg-gray-200 text-gray-600 text-sm leading-normal p-3'>
        <th className='p-3 text-center border border-collapse border-lightGrey'>
          STT
        </th>
        <th className='p-3 text-center border border-collapse border-lightGrey'>
          Đề tài
        </th>
        <th className='p-3 text-center border border-collapse border-lightGrey'>
          GVHD
        </th>
        <th className='p-3 text-center border border-collapse border-lightGrey'>
          Trạng thái
        </th>
        <th className='p-3 text-center border border-collapse border-lightGrey'>
          Số SVTH
        </th>
        <th className='py-3 px-6 text-center border border-collapse border-lightGrey'></th>
      </tr>
    </thead>
  );
}

function ListTopic() {
  return (
    <div className='p-3'>
      <div className='overflow-x-auto rounded-md'>
        <div className='bg-gray-100 flex items-center justify-center font-Roboto'>
          <div className='w-full'>
            <div className='bg-white shadow-md rounded'>
              <table className='min-w-max w-full table-auto border border-collapse border-lightGrey'>
                <THead />
                <tbody className='text-gray-600 text-sm font-light'>
                  {topics?.map((item, index) => {
                    return (
                      <TopicItem item={item} key={item.id} index={index} />
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListTopic;
