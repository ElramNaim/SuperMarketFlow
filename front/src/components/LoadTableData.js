import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import "./LoadTableData.css";

function LoadTableData() {
  const [data, setData] = useState([]);
  const [currentHours, setCurrentHours] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get("/loadtable");
      setData(result.data);
    };

    fetchData();

    // Update the current time every second
    const intervalId = setInterval(() => {
      setCurrentHours(new Date().getHours());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const currentDay = new Date().getDay() + 1;
  const currentTime = new Date().getHours();
  const currentLoadStatus = data.find(
    (row) => row.time.substring(0, 2) === currentTime.toString()
  )?.load_status;

  return currentTime.toString() < 23 ? (
    <div className="page">
      <div className="table-container">
        <div className="title">
          <h2>
            The time now is {currentHours}:00 and the current load situation is{" "}
            <span
              style={{
                color:
                  currentLoadStatus === "low"
                    ? "red"
                    : currentLoadStatus === "medium"
                    ? "gold"
                    : "green",
              }}
            >
              {currentLoadStatus}
            </span>{" "}
            .
          </h2>

          {/* <h2>
            The Hours now is {currentHours}:00 and the current load status is{" "}
            {currentLoadStatus}
          </h2> */}
        </div>
        <div className="page-table">
          <table className="table">
            <thead>
              <tr>
                <th>Day</th>
                <th>Hours</th>
                <th>Load Status</th>
              </tr>
            </thead>
            <tbody>
              {data
                .filter(
                  (row) =>
                    row.day === currentDay &&
                    row.time.substring(0, 2) > currentTime.toString()
                )
                .map((row) => (
                  <tr key={row.time}>
                    <td>{row.day}</td>
                    <td>{row.time}</td>
                    <td>{row.load_status}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div className="back">
          <nav>
            <Link to="/">Back Home </Link>
          </nav>
        </div>
      </div>
    </div>
  ) : (
    <div className="page">
      <div className="table-container">
        <div className="title">
          <h2>נתוני צפיפות עבור מחר</h2>
        </div>
        <div>
          <table className="table">
            <thead>
              <tr>
                {/* <th>Day</th> */}
                <th>Hours</th>
                <th>Load Status</th>
              </tr>
            </thead>
            <tbody>
              {data
                .filter((row) => row.day === currentDay + 1)

                .map((row) => (
                  <tr key={row.time}>
                    {/* <td>{row.day}</td> */}
                    <td>{row.time}</td>
                    <td>{row.load_status}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div className="back">
          <nav>
            <Link to="/">Back Home </Link>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default LoadTableData;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";

// import "./LoadTableData.css";

// function LoadTableData() {
//   const [data, setData] = useState([]);
//   const [currentHours, setCurrentHours] = useState("");

//   useEffect(() => {
//     const fetchData = async () => {
//       const result = await axios.get("/loadtable");
//       setData(result.data);
//     };

//     fetchData();

//     // Update the current time every second
//     const intervalId = setInterval(() => {
//       setCurrentHours(new Date().getHours());
//     }, 1000);

//     return () => clearInterval(intervalId);
//   }, []);

//   const currentDay = new Date().getDay() + 1;
//   const currentTime = new Date().getHours();
//   const currentLoadStatus = data.find(
//     (row) => row.time.substring(0, 2) === currentTime.toString()
//   )?.load_status;

//   return currentTime.toString() < 23 ? (
//     <div className="page">
//       <div className="table-container">
//         <div className="title">
//           <h2>
//             The time now is {currentHours}:00 and the current load situation is{" "}
//             <span
//               style={{
//                 color:
//                   currentLoadStatus === "free"
//                     ? "green"
//                     : currentLoadStatus === "Medium congestion"
//                     ? "gold"
//                     : "red",
//               }}
//             >
//               {currentLoadStatus}
//             </span>{" "}
//             .
//           </h2>

//           {/* <h2>
//             The Hours now is {currentHours}:00 and the current load status is{" "}
//             {currentLoadStatus}
//           </h2> */}
//         </div>
//         <div className="page-table">
//           <table className="table">
//             <thead>
//               <tr>
//                 {/* <th>Day</th> */}
//                 <th>Hours</th>
//                 <th>Load Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               {data
//                 .filter(
//                   (row) =>
//                     row.day === currentDay &&
//                     row.time.substring(0, 2) > currentTime.toString()
//                 )
//                 .map((row) => (
//                   <tr key={row.time}>
//                     {/* <td>{row.day}</td> */}
//                     <td>{row.time}</td>
//                     <td>{row.load_status}</td>
//                   </tr>
//                 ))}
//             </tbody>
//           </table>
//         </div>
//         <div className="back">
//           <nav>
//             <Link to="/">Back Home </Link>
//           </nav>
//         </div>
//       </div>
//     </div>
//   ) : (
//     <div className="page">
//       <div className="table-container">
//         <div className="title">
//           <h2>נתוני צפיפות עבור מחר</h2>
//         </div>
//         <div>
//           <table className="table">
//             <thead>
//               <tr>
//                 {/* <th>Day</th> */}
//                 <th>Hours</th>
//                 <th>Load Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               {data
//                 .filter((row) => row.day === currentDay + 1)

//                 .map((row) => (
//                   <tr key={row.time}>
//                     {/* <td>{row.day}</td> */}
//                     <td>{row.time}</td>
//                     <td>{row.load_status}</td>
//                   </tr>
//                 ))}
//             </tbody>
//           </table>
//         </div>
//         <div className="back">
//           <nav>
//             <Link to="/">Back Home </Link>
//           </nav>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default LoadTableData;
