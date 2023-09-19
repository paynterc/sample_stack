import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import './GridBasic.css';
import {fetchLifeFormData,setData} from '../store/LifeFormSlice';

function GridCalc(props) {



      const defaultColDef = {
          // set every column width
          width: 80,
          // make every column editable
          editable: true,
      }

      const [columnDefs] = useState([
        { field: 'life_form', headerName: 'Life Form', width: 150, editable: false },
        { field: 'type', headerName: 'Type', width: 100, editable: false },
          { field: 'w1' },
          { field: 'w2' },
          { field: 'w3' },
          { field: 'w4' },
          { field: 'w5' },
          { field: 'w6' },
          { field: 'w7' },
      ]);

      const dispatch = useDispatch();
      const dataStatus = useSelector(state => state.lifeforms.status)
      const rowData = useSelector(state => state.lifeforms.data)
      useEffect(() => {
          if(dataStatus==='idle'){
            dispatch(fetchLifeFormData());
          }
      },[]);

      const onCellValueChanged = (event) => {

          // Clone the entire data set. You can't update the stored dataset directly.
          let rowDataClone = JSON.parse(JSON.stringify(rowData));

          const editedRow = event.data;
          const editedField = event.colDef.field;

          // Modify the changed row in the cloned dataset.
          const modifedRowData = rowDataClone.map(obj => {
              if (obj.life_form === editedRow.life_form && obj.type === 'birth') {
                  obj[editedField] = event.newValue
              }
              return obj;
          });

          // Update the store, setting the state dataset to your updated dataset.
          dispatch(setData(modifedRowData));
      };
      // readOnlyEdit prevents the cell edit from trying to directly update the store, which is immutable. You would get "Attempted to assign to readonly property otherwise."
      // onCellEditRequest sends the new value to a custom function
      return (
        <>
        <h3>Calculation Grid</h3>
        <p className="App-intro">Made with AG Grid. Uses data from a Redux store shared with the chart above. Rows for deaths and final population are calculated based on births, previous week population and the populations of other life forms that feed on them..</p>
          <div className="ag-theme-alpine grid-basic">
              <AgGridReact
                  rowData={rowData}
                  columnDefs={columnDefs}
                  defaultColDef={defaultColDef}
                  readOnlyEdit={true}
                  onCellEditRequest={onCellValueChanged}
              >
              </AgGridReact>
          </div>
        </>

      );

}

export default GridCalc;
