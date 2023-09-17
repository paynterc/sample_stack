import React, { useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import './GridBasic.css';

function GridBasic(props) {

    const [rowData] = useState([
          {make: "Toyota", model: "Celica", price: 35000},
          {make: "Ford", model: "Mondeo", price: 32000},
          {make: "Porsche", model: "Boxster", price: 72000}
      ]);

      const [columnDefs] = useState([
          { field: 'make' },
          { field: 'model' },
          { field: 'price' }
      ]);

      const defaultColDef = {
          wrapHeaderText: true,
          autoHeaderHeight: true,
          resizable: true,
      };

      return (
        <>
        <h3>Grid</h3>
        <p className="App-intro">Made with AG Grid for React. Hard-coded data. No API.</p>
          <div className="ag-theme-alpine grid-basic">
              <AgGridReact
                  rowData={rowData}
                  columnDefs={columnDefs}
                  defaultColDef={defaultColDef}
              >
              </AgGridReact>
          </div>
        </>

      );

}

export default GridBasic;
