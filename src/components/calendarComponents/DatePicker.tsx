import React, { useState } from "react";
import DatePicker from "react-datepicker";
import fr from 'date-fns/locale/fr'; // Import the French locale

import "react-datepicker/dist/react-datepicker.css";

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

interface PropsInterface {
saveDate:(date:string)=>void
}

const DatePickerComponent = ({saveDate}:PropsInterface) => {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <div className="w-full flex flex-col ">
    <DatePicker  className=" rounded-md h-12 w-full"
     showIcon  locale={fr}
    dateFormat="MM/yyyy"
      placeholderText="MM/YYYY"
      showMonthYearPicker
    
    selected={startDate} onChange={(date:Date)=>{
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
      
        saveDate(`${year}-${month}`)

        setStartDate(date)}} />
        </div>
  );
};
export default DatePickerComponent