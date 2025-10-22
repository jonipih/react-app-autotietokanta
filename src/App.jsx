import { useState,useEffect } from 'react'
import axios from 'axios'

import './App.css'



function App() {
  const [cars, setCars] = useState([{"id":1,"merkki":"Toyota","malli":"avensis","vuosimalli":2012,"omistaja":"matti"}]);
  const [uusi, setUusi] = useState("");
  const [malli, setMalli] = useState("");
  const [vuosimalli, setVuosimalli] = useState("");
  const [omistaja, setOmistaja] = useState("");
  const [hae, setHae] = useState("");
console.log("Cars type ",typeof(cars));
console.log("Cars type ",typeof(cars[0]));
  const changeHae=(event) => {
    console.log(event.target.value)
    setHae(event.target.value)
    }

  const changeUusi=(event) => {
    console.log(event.target.value)
    setUusi(event.target.value)
    }
    const changeUusi2=(event) => {
    console.log(event.target.value)
    setMalli(event.target.value)
    }
    const changeUusi3=(event) => {
    console.log(event.target.value)
    setVuosimalli(event.target.value)
    }
    const changeUusi4=(event) => {
    console.log(event.target.value)
    setOmistaja(event.target.value)
    }


   


  useEffect(()=>{//suoritetaan kun sivu ladataan
    axios.get('https://get-autotietokanta.azurewebsites.net/api/httpTrigger1')
      .then(response=>{
        console.log("Type of GET",typeof(response.data.data));
        console.log("Type of print", response.data);
        console.log(typeof(response.data));
        console.log(response.data);
        setCars(response.data)
      })
  },[])

  const addCar = (event) => {
    event.preventDefault()
    axios
    .post('https://get-autotietokanta.azurewebsites.net/api/httpTrigger1', {merkki:uusi,malli:malli,vuosimalli:vuosimalli,omistaja:omistaja})
    .then(response => {
      console.log("Type of POST",typeof(response.data));
      setCars(cars.concat(response.data));
      setUusi("");
      setMalli("");
      setVuosimalli("");
      setOmistaja("");
      console.log(cars);
    })
  }



  console.log(typeof(cars))

  return (
    <>
      <div style={{ borderStyle:"solid"}}><div><h2>Autotietokanta</h2></div>

<form  onSubmit={addCar}>
        
          LISÄÄ AUTO: <input value={uusi} onChange={changeUusi} />
          malli:<input value={malli} onChange={changeUusi2} />
          vuosi:<input value={vuosimalli} onChange={changeUusi3} />
          omistaja:<input value={omistaja} onChange={changeUusi4} />
        <button id="btm" type="submit">Lähetä</button>
        
        
      </form>

<div style={{ padding:"50px",width:"100%"}}>

    

<form>
        <div>
          HAE: <input value={hae}
        onChange={changeHae} />
        </div>
        
      </form>
 <ul>
  {  cars.map( auto =>
  (auto.omistaja.toLowerCase().includes(hae)||
  auto.malli.toLowerCase().includes(hae)||
    auto.merkki.toLowerCase().includes(hae) ||
    auto.vuosimalli===Number(hae))||hae==="" ? <li key={auto.id}> {auto.merkki }        {auto.malli} {auto.vuosimalli} {auto.omistaja} </li> :"")}
 </ul>
{console.log(typeof(Number(hae)))}
{console.log(Number(hae))}
{console.log(typeof(hae))}
{console.log(""===hae)}
    

</div>


       
    
      </div>
         </>
  )
}

export default App
