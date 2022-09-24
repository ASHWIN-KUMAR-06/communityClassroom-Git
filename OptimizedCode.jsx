import React, { useState, memo } from 'react';
import PropTypes from 'prop-types';

// Single List Item
const WrappedSingleListItem = ({         /// removed index props as there is no use of index props in this component
  isSelected,
  onClickHandler,
  text,
}) => {
  return (
    <li
      style={{ backgroundColor: isSelected ? 'green' : 'red'}}
      onClick={onClickHandler}
    >
      {text}
    </li>
  );
};

WrappedSingleListItem.propTypes = {
  index: PropTypes.number,
  isSelected: PropTypes.bool,                     /// here the isSelected props is demanding a boolean value that is why there in the list component(line:45) instead of passing the argumnet as index i passed selectedIndex
  onClickHandler: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

const SingleListItem = memo(WrappedSingleListItem);

// List Component
const WrappedListComponent = ({
  items,
}) => {
  const [selectedIndex, setSelectedIndex] = useState();

  //////// removed the useEffect() method as there was no need for that

  const handleClick = index => {
    setSelectedIndex(!index);               //// reversed the boolean value
  };

  return (
    <ul style={{ textAlign: 'left' }}>
      {items.map((item, index) => (
        <SingleListItem
          onClickHandler={() => handleClick(selectedIndex)}
          text={item.text}
          key={index}         //// removed the index props as there is no use of index props in the SingleListItem component instead passed key props which is necessary to Each child in a list should have a unique "key" prop.
          isSelected={selectedIndex}
        />
      ))}
    </ul>
  )
};

WrappedListComponent.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({      //// here it should be 'arrayOf'  and shape()
    text: PropTypes.string.isRequired,
  })),
};

WrappedListComponent.defaultProps = {
  items: [{text:'text1'}, {text:'text2'}],    ///// instead of null , passed an array of two objects with text properties. 
};

const List = memo(WrappedListComponent);

export default List;