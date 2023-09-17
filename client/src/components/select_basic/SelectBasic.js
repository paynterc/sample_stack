import React, { useState, useEffect } from 'react';
import Select from "react-select";



function SelectBasic(props) {
          //options = [{value:'foo', label:'bar'},{value:'foo2', label:'bar2'}]

          // Use this if you just want to leave the selected value as is, rather than getting it from the store.
          const valueFromId = (opts, id) => opts.find(o => o.value === id);


          return (
            <>
                <div className="d-inline-block">{props.label}</div>
                <div>
                  <Select
                    className={props.className}
                    classNamePrefix={props.classNamePrefix}
                    value={props.selectedOption}
                    //value={valueFromId(props.options, props.value)}
                    name={props.name}
                    id={props.name}
                    options={props.options}
                    onChange={props.onChange}
                    isLoading={!props.loaded}
                    getOptionLabel={props.optionLabel}
                    filterOption={props.filterOption}
                    isOptionDisabled={(option) => option.isdisabled}
                  />
                </div>

            </>
          );
}

export default SelectBasic;