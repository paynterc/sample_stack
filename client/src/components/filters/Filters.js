import { useDispatch, useSelector } from "react-redux";

import SelectBasic from "../select_basic/SelectBasic.js";
import { setSelectedKingdom,setSelectedClass } from '../store/KingdomSlice';

// This component interacts with a redux data store using useSelector and useDispatch. This store can be accessed by any component.
function Filters(props) {
        const dispatch = useDispatch();
        const { selectedKingdom, selectedClass } = useSelector(state => state.kingdom);

        const options1 = [
            {value:'animal', label:'Animal'},
            {value:'vegetable', label:'Vegetable'},
            {value:'mineral', label:'Mineral'},
        ];

        const options2 = [
            {value:'lion', label:'Lion', class:'animal'},
            {value:'tiger', label:'Tiger', class:'animal'},
            {value:'bear', label:'Bear', class:'animal'},
            {value:'carrot', label:'Carrot', class:'vegetable'},
            {value:'potato', label:'Potato', class:'vegetable'},
            {value:'broccoli', label:'Broccoli', class:'vegetable'},
            {value:'diamond', label:'Diamond', class:'mineral'},
            {value:'iron', label:'Iron', class:'mineral'},
            {value:'chalk', label:'Chalk', class:'mineral'},
        ];

        const handleChange1 = (selectedOption, menu) => {
            dispatch(setSelectedClass(null));
            dispatch(setSelectedKingdom(selectedOption));
        }

        const handleChange2 = (selectedOption, menu) => {
            dispatch(setSelectedClass(selectedOption));
        }

        const filterOptions2 = (option) => {
            return option.data.class === selectedKingdom?.value;
        };

        return (
        <>
            <h3>Filters</h3>
            <p className="App-intro">This component interacts with a redux data store using useSelector and useDispatch. This store can be accessed by any component.</p>
                <div>
                <SelectBasic options={options1}  loaded={true} onChange={handleChange1} selectedOption={selectedKingdom}/>
                </div>
                <div>
                <SelectBasic options={options2}  loaded={true} onChange={handleChange2} filterOption={filterOptions2} selectedOption={selectedClass}/>
                </div>

        </>
        );
}

export default Filters;
