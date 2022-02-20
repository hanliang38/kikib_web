import React, { useEffect, useRef, useState } from 'react';

function RouteTimeTable({ busNumber }) {
  const data = require('../assets/GyeonggiBusData/businfo.json');
  const [headHeight, setHeadHeight] = useState();

  const routeData = data[busNumber];
  // console.log(routeData);
  const routeStationData = routeData.stnList;

  // table-head 높이값 체크
  const divElRef = useRef();
  const styles = { height: `calc(100% - ${headHeight}px)` };

  useEffect(() => {
    setHeadHeight(divElRef.current.clientHeight);
  }, []);

  return (
    <>
      <div className="routetable-box">
        <div className="table-head" ref={divElRef}>
          {/* <div className="table-head"> */}
          <div>
            <strong className="point">기점</strong>
            <br />
            <span className="station">{routeData.info.startStationName}</span>
          </div>
          <div>
            <strong className="point">종점</strong>
            <br />
            <span className="station">{routeData.info.endStationName}</span>
          </div>
        </div>

        <div className="table-body" style={styles}>
          <ul>
            {routeStationData.map((row, i) => (
              <li key={`stationList-${i}`}>{row.stationName}</li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default RouteTimeTable;
