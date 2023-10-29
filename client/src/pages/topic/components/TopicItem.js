import PropTypes from "prop-types";

function TopicItem({ item, index }) {
  return (
    <tr className={item % 2 === 0 ? "bg-whiteSmoke" : ""} key={item.id}>
      <td className='p-3 text-center whitespace-nowrap border border-collapse border-lightGrey'>
        {index + 1}
      </td>
      <td className='p-3 text-left border border-collapse border-lightGrey w-[300px]'>
        <p className='font-normal'>{item.name}</p>
      </td>
      <td className='p-3 text-left border border-collapse border-lightGrey'>
        <div className=''>
          <span className='bg-orange-400 py-1 px-2 text-sm font-normal rounded'>
            9513
          </span>
          <span className='block mt-2 font-normal'>Nguyễn Trần Thi Văn</span>
        </div>
      </td>
      <td className='p-3 text-center border border-collapse border-lightGrey'>
        <span className='bg-orange-400 py-1 px-3 text-sm font-normal rounded'>
          {item.status}
        </span>
      </td>
      <td className='p-3 text-center border border-collapse border-lightGrey'>
        <span className='bg-orange-400 py-1 px-3 text-sm font-normal rounded'>
          {item.maxSlot}
        </span>
      </td>
      <td className='border border-collapse border-lightGrey'>
        <div className='flex justify-center'>
          <LiaEditSolid
            className='w-6 h-6 cursor-pointer'
            onClick={() => setOpenEditTopicMode("default")}
          />
        </div>
      </td>
    </tr>
  );
}

export default TopicItem;

TopicItem.propTypes = {
  item: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
};
