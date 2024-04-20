// import React from 'react';
// import '../Styles/avail.css'
// import { useState } from 'react';
// function DayLayout({availability, submitTime})
// {
//     const [toggle, setToggle] = useState({})
//     const toggleHover = (day, hour) => {
//         setToggle(prevState => {
//           const newState = { ...prevState };
//           // Reset all toggle states for the same day to false
//           Object.keys(newState[day] || {}).forEach(key => {
//             newState[day][key] = false;
//           });
//           // Set the toggle state for the clicked hour
//           newState[day] = { ...newState[day], [hour]: true };
//           return newState;
//         });
//       };
//     let first3 = availability ? availability.sort().slice(0,3) : null;
//     console.log(first3)
//     return (
//     <div>
//     {
//        (first3 != null) ?
//        first3.map((avail)=>{
//        return(
//        <div className='date-hour'>
//        <h5>{avail.avail_day}</h5>
//        <div className='hours'>
//        {avail.avail_hours.map((h)=>{
//         return(
//         <div className={`hour ${toggle[avail.avail_day]?.[h] ? 'hover' : 'noHover'}`} onClick = {()=>{submitTime(h, avail.avail_day); toggleHover(avail.avail_day, h);}}>{h}</div>
//         )
//        })}
//        </div>
//        </div>
//        )
//        }) : <div></div>
//     }
//     </div>
//     )

// }

// export default DayLayout

import React, { useState } from 'react';
import '../Styles/avail.css';

function DayLayout({ availability, submitTime , doc}) {
  const [selectedHour, setSelectedHour] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);

  const handleHourClick = (hour, day, doc) => {
    if (selectedHour === hour) {
      // If the clicked hour is already selected, deselect it
      setSelectedHour(null);
    }
    if(setSelectedDay === day)
    {
      setSelectedHour(null);
    } else {
      // Otherwise, select the clicked hour
      setSelectedHour(hour);
      setSelectedDay(day);
      submitTime(hour, day, doc);
    }
  };

  return (
    <div>
      {availability?.map((avail) => (
        <div className='date-hour' key={avail.avail_day}>
          <h5>{avail.avail_day}</h5>
          <div className='hours'>
            {avail.avail_hours.map((h) => (
              <div
                key={`${avail.avail_day} ${h}`}
                className={`hour ${(selectedHour === h && selectedDay === avail.avail_day)? 'hover' : 'noHover'}`}
                onClick={() => handleHourClick(h, avail.avail_day, doc)}
              >
                {h}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default DayLayout;

