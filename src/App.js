import React from 'react';
import './App.css';

const data = [{
  "from": "2023-05-30T05:56:28+00:00",
  "to": "2023-05-30T05:57:10+00:00",
}, {
  "from": "2023-05-30T06:01:01+00:00",
  "to": "2023-05-30T06:49:31+00:00",
}, {
  "from": "2023-05-30T07:04:21+00:00",
  "to": "2023-05-30T07:05:26+00:00",
}, {
  "from": "2023-05-30T08:27:42+00:00",
  "to": "2023-05-30T08:28:52+00:00",
}, {
  "from": "2023-05-30T08:29:43+00:00",
  "to": "2023-05-30T08:31:28+00:00",
}, {
  "from": "2023-05-30T10:19:15+00:00",
  "to": "2023-05-30T10:21:02+00:00",
}, {
  "from": "2023-05-30T16:50:26+00:00",
  "to": "2023-05-30T16:50:49+00:00",
}, {
  "from": "2023-05-30T17:03:12+00:00",
  "to": "2023-05-30T17:04:24+00:00",
}, {
  "from": "2023-05-30T17:05:11+00:00",
  "to": "2023-05-30T17:05:55+00:00",
}, {
  "from": "2023-05-30T19:29:46+00:00",
  "to": "2023-05-30T19:31:04+00:00",
}, {
  "from": "2023-05-30T20:42:28+00:00",
  "to": "2023-05-30T20:43:31+00:00",
}]

const fullDay = 24 * 60 * 60 * 1000

const millisecondsSinceStartOfDay = data.map(interval => {
  const fromTime = new Date(interval.from);
  const startOfDay = new Date(fromTime.toISOString()).setUTCHours(0, 0, 0, 0);
  const toTime = new Date(interval.to);   //<----

  return [fromTime - startOfDay, (toTime - fromTime) / fullDay * 100]; //<----
});

let percents = [];

const setCircles = () => {
  millisecondsSinceStartOfDay.forEach((time) => {
    percents.push([time[0] / fullDay * 100, time[1]])  //<----
  })
  return percents
}

console.log(setCircles())
const screenWidth = window.innerWidth;
console.log(24 / screenWidth * 100)


function BlueStripe() {
  return (
    <div className="blue-stripe" >
      {percents.map((interval, index) => {
        let width = Math.max(24, screenWidth / 100 * interval[1]);  //<----
        console.log(width)
        const circleStyle = {
          'left': `${interval[0]}%`, 
          'width': `${width}px`  //<----
        };

        return <BlueCircle key={index} style={circleStyle} />;
      })}
    </div>
  );
}

function BlueCircle({ style }) {
  return <div className="blue-circle" style={style}></div>;
}

function App() {
  const firstDate = data.length > 0 ? new Date(data[0].from) : null;

  const monthNames = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  const day = firstDate.toLocaleString('en-US', { weekday: 'short' }); 
  const date = firstDate.getDate(); 
  const month = monthNames[firstDate.getMonth()]; 
  let dateString = `${day} ${date} ${month}`;

  return (
    <div className="App">
      <div className='date'>
        <p>{dateString}</p>
        <p>{data.length} walks</p>
      </div>
      <BlueStripe/>
    </div>
  );
}

export default App;
