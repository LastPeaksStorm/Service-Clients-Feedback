import React from 'react';
import MyInput from "./UI/input/MyInput";
import MySelect from "./UI/select/MySelect";

const PostFilter = ({filter, setFilter}) => {
  return (
    <div>
      <MyInput
        value={filter.query}
        onChange={e => setFilter({...filter, query: e.target.value})}
        placeholder='Search...'
      />
      <MySelect value={filter.sortOption}
                onChange={selectedSort => setFilter({...filter, sortOption: selectedSort})}
                options={[
                  {value: 'title', name: 'By title'},
                  {value: 'body', name: 'By description'},
                  {value: 'id', name: 'By id'}
                ]}
                defaultValue='Sort by'
      />
    </div>
  );
};

export default PostFilter;
