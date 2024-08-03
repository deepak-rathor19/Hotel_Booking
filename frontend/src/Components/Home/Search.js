import React, { useState } from "react";
import { DatePicker, Space } from "antd";

import { useDispatch } from "react-redux";
import { getAllProperties } from "../../Store/Property/property-action";
import { propertyAction } from "../../Store/Property/property-slice";

const Search = () => {
  const { RangePicker } = DatePicker;
  const [keyword, setkeyword] = useState({});

  const [value, setValue] = useState([]);

  const dispatch = useDispatch();
  
  function searchHandler(e) {
    e.preventDefault();
    dispatch(propertyAction.updateSearchParams(keyword));
    dispatch(getAllProperties());
    setkeyword({
      city: "",
      guests: "",
      dateIn: "",
      dateOut: "",
    });
    setValue([]);
  }

  function returnDates(date, dateString) {
    setValue([date[0], date[1]]);

    updatekeyword("dateIn", dateString[0]);
    updatekeyword("dateOut", dateString[1]);
  }

  const updatekeyword = (field, value) => {
    setkeyword((prevKeyword) => ({
      ...prevKeyword,
      [field]: value,
    }));
  };
  return (
    <>
      <div className="searchbar">
        <input
          className="search"
          id="search_destination"
          placeholder="Search destinations"
          type="text"
          value={keyword.city}
          onChange={(e) => updatekeyword("city", e.target.value)}
        />

        <Space direction="vertical" size={12} className="search">
          <RangePicker
            format="YYYY-MM-DD"
            picker="date"
            className="date_picker"
            disabledDate={(current) => {
              return current && current.isBefore(Date.now(), "day");
            }}
            onChange={returnDates}
          />
        </Space>

        <input
          className="search"
          id="addguest"
          placeholder="Add guest"
          type="number"
          value={keyword.guests}
          onChange={(e) => updatekeyword("guests", e.target.value)}
        />
        <span
          className="material-symbols-outlined searchicon"
          onClick={searchHandler}
        >
          search
        </span>
      </div>
    </>
  );
};

export default Search;
