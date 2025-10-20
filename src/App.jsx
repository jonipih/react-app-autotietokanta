import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    Polyline
} from 'react-leaflet';

import 'leaflet/dist/leaflet.css';
import axios from 'axios';

import { useState, useEffect } from 'react';
import {
  Chart as ChartJS,  CategoryScale,  LinearScale,  PointElement,  LineElement,  Title,  Tooltip,  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Scatter } from 'react-chartjs-2';
ChartJS.register(  CategoryScale,  LinearScale,  PointElement,  LineElement,  Title,  Tooltip,  Legend
);


function LineChart({ korkeus_data }) {
  return (
    <div  style={{  width:"600px", height:"400px"}}>
      
      <Line
        data={{
            labels: korkeus_data.map((coord)=>coord.id),
              // datasets is an array of objects where each object represents a set of data to display corresponding to the labels above. for brevity, we'll keep it at one object
            datasets: [
              {
                pointRadius: 0.1, // disable for a single dataset
              showLine: true, // disable for a single dataset
              borderColor:'blue',
              borderWidth:1,
              label: 'korkeus',
              data: korkeus_data.map((coord)=>coord.height)              
            }
              ]
                }}
        options={{
            animation: false,
            scales: {
          x: {
               type: 'linear',
               position: 'bottom',
               min:0, max:700
             },
          y: {
               type: 'linear',min:50,max:95
             }
                  },
            plugins: {
              title: {
                  display: true,
                  text: "KORKEUS"
              },
            legend: {
              display: false
            }
          }
        }}
      />
    </div>
  );
}
//X Y Koordinaatit   https://www.chartjs.org/docs/latest/axes/cartesian/
function ScattChartxy({ xy_data }) {
  return (
    <div style={{ width:"900px", height:"900px"}}>
      <Scatter
        data={{         
              // datasets is an array of objects where each object represents a set of data to display corresponding to the labels above. for brevity, we'll keep it at one object
            datasets: [
            {
              pointRadius: 0.1, // disable for a single dataset
              showLine: true, // disable for a single dataset
              borderColor:'blue',
              borderWidth:2,
              label: 'ENU koordinaatti',
              //data:[[1,0],[5,0],[6,10],[7,10],[1,11]],
              data: xy_data.map((coord)=>[coord.east,coord.north])              
                }
                ]
                   
              }}
        options={{
            aspectRatio:1,
            animation: false,
            plugins: {
              title: {
              display: true,
              text: "East North Koordinaatit"
            },
            legend: {
              display: false
            }
            
              },
          scales: {
            x: {
                min: -300,
                max: 1000
            },
            y: {
                min: -100,
                max: 1500
            }
        }
        }}
      />
    </div>
  );
}






const ShowMap = ({locations}) => {

  // Create an array of [latitude, longitude] pairs for the Polyline
  const positions = locations.map(location => [location.latitude, location.longitude]);

  return (
    <MapContainer
      center={[62.762761, 22.83487416]}
      zoom={15}
      style={{height: "700px", width:"700px"}}
      >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Polyline positions={positions} color="blue" />
    </MapContainer>
  )
}
//https://on-on-on-joni.azurewebsites.net/api/get_get_get?id=33
const App = () => {
  const [locations, setLocations] = useState([])
  const [count, setCount] = useState(1);
  
  
  console.log('App hakee reittia 700ms valein https://on-on-on-joni.azurewebsites.net/api/get_get_get?id=33 ')
  console.log("count alussa",count)
  
  

   useEffect(() => {
     console.log('useEffect')
    
     axios
     .get('https://on-on-on-joni.azurewebsites.net/api/get_get_get',{params: {id: 666 }})

    .then(response=>{
      console.log(response)
      console.log(typeof(response))
      console.log(typeof(response.data.id))
      console.log(response.data.lat)
    })
  
   } , [])



useEffect(() => {
    console.log("useEffect2",count);
    let timer = setTimeout(() => {
      console.log("timer");
if(count<650){//maksimi maara hakuja
    axios
      .get('https://on-on-on-joni.azurewebsites.net/api/get_get_get',{params: {id: count }})

      .then(response=>{
       console.log(response)
       console.log(typeof(response))
       console.log(typeof(response.data.id))
        console.log(response.data.lat)
       const newpoint={
         "id":response.data.id,
         "latitude": response.data.lat,
         "longitude": response.data.lon,
         "height":response.data.height,
         "east":response.data.east,
          "north":response.data.north,
          "up":response.data.up

       }
       console.log("newPoint",newpoint);
       setLocations((locations)=>locations.concat(newpoint));
     })



        setCount((count)=>count + 1);
      
    }//if end
      }, 700)//700ms valein
    
    

    return () => clearTimeout(timer)

    } , [count,locations])//pitaa olla jotta useeffect nakeee ne hyvin yleensa

  


console.log("jälkeen useEffect",count)
  return (
    <div><p>REITTI POLKUPYÖRÄLLÄ UBLOX REPUSSA LÄPPÄRIIN KYTKETTYNÄ</p>
      <div style={{borderStyle:"solid",display:"flex",flexWrap: "wrap"}}>
      <LineChart korkeus_data={locations}/>
      <ScattChartxy xy_data={locations}/>

      <div>
          <h1>Leaflet Location Map</h1>
           {locations.length > 0 && (
           <>
             <ShowMap locations={locations}/>
          
             </>
             )}
      </div>
      
      </div>
      
      
      
      
    </div>
  )
}

export default App