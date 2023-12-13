import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";

import { Dropdown } from "../../../../components/dropdown1";
import { topicType } from "../../../../utils/constants";

const filterOptions = [
  {
    id: uuidv4(),
    lebel: "Lọc theo GVHD",
  },
  // {
  //   id: uuidv4(),
  //   lebel: "Lọc theo chuyên ngành",
  // },
  {
    id: uuidv4(),
    lebel: "Lọc theo năm học",
  },
  {
    id: uuidv4(),
    lebel: "Lọc theo loại",
    child: [...Object.values(topicType)],
  },
];

function TopicFilter({ anchorSelect }) {
  return (
    <Dropdown
      place='right-right'
      className='p-0 bg-whiteSmoke rounded border border-gray-300 dark:bg-sambuca dark:opacity-100 opacity-100'
      anchorSelect={`#${anchorSelect}`}
    >
      <div className='flex flex-col gap-2 p-3'>
        {filterOptions.map((item) => {
          return (
            <div key={item.id}>
              <div
                className='text-sm px-2 py-1 dark:text-gray-400 dark:hover:text-gray-200 cursor-pointer'
                id={`_${item.id}`}
              >
                {item.lebel}
              </div>
              {item?.child && (
                <Dropdown
                  anchorSelect={`#_${item.id}`}
                  place='right-right'
                  className='p-0 bg-whiteSmoke rounded border border-gray-300 dark:bg-sambuca dark:opacity-100 opacity-100'
                >
                  <div className='flex flex-col gap-2 p-3'>
                    {item?.child?.map((item2) => {
                      return (
                        <div className='text-sm px-2 py-1 dark:text-gray-400 dark:hover:text-gray-200 cursor-pointer'>
                          {item2}
                        </div>
                      );
                    })}
                  </div>
                </Dropdown>
              )}
            </div>
          );
        })}
      </div>
    </Dropdown>
  );
}

export default TopicFilter;

TopicFilter.propTypes = {
  anchorSelect: PropTypes.string.isRequired,
};
