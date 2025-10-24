import { useState,useEffect } from 'react'



const Lisaaauto= (props)=>{
  const [uusi, setUusi] = useState("");
  const [malli, setMalli] = useState("");
  const [vuosimalli, setVuosimalli] = useState("");
  const [omistaja, setOmistaja] = useState("");

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

    const addCar = (event) => {
    event.preventDefault()   
    props.setCars(props.car.concat({"id":props.car.length+1,"merkki":uusi,"malli":malli,"vuosimalli":Number(vuosimalli),"omistaja":omistaja}));
    setUusi("");
    setMalli("");
    setVuosimalli("");
    setOmistaja("");
    console.log(props.car);    
  }

  return(
          <form  onSubmit={addCar}>
        
            LISÄÄ AUTO: <input value={uusi} onChange={changeUusi} />
            malli:<input value={malli} onChange={changeUusi2} />
            vuosi:<input value={vuosimalli} onChange={changeUusi3} />
            omistaja:<input value={omistaja} onChange={changeUusi4} />
            <button id="btm" type="submit">Lähetä</button>
        
        
          </form>
      )
}

const HaejaNayta =(props)=>{
  const [hae, setHae] = useState("");
  const changeHae=(event) => {
    console.log(event.target.value)
    setHae(event.target.value)
    }

const muotoileteksti=(x)=>{
  return x.concat("", "-----------------------------------------").slice(0, 20);;
}

const muotoiletekstill=(x)=>{
  return x.concat("", "-----------------------------------------").slice(0, 13);;
}

    return(
      <div>
       <div> 
            <form>
                HAE: <input value={hae}
                 onChange={changeHae} />       
            </form> 
          </div>
      <ul>
          {  props.cars.map( auto =>
          (auto.omistaja.toLowerCase().includes(hae)||
          auto.malli.toLowerCase().includes(hae)||
            auto.merkki.toLowerCase().includes(hae) ||
            auto.vuosimalli.toString().includes(hae))||hae==="" ? <li key={auto.id}> {muotoileteksti(auto.merkki) } {muotoiletekstill(auto.malli)} {muotoiletekstill(auto.vuosimalli.toString())} {muotoiletekstill(auto.omistaja)} </li> :"")}
      </ul>
    </div>
    )

}


function App() {
  const [cars, setCars] = useState([
    {id:1,merkki:"Toyota",malli:"avensis",vuosimalli:2012,omistaja:"matti"},
    {id:2,merkki:"Toyota",malli:"corolla",vuosimalli:2011,omistaja:"jonne"},
    {id:3,merkki:"Chevrolet",malli:"express",vuosimalli:2000,omistaja:"jack"},
    {id:4,merkki:"Lada",malli:"samara",vuosimalli:1999,omistaja:"heikki"}  
  ]);
  
    
    console.log("Cars type ",typeof(cars));
    console.log("Cars type ",typeof(cars[0]));  


  console.log(typeof(cars))
// 
  return (
    <>
      <div style={{ borderStyle:"solid"}}>
        <div>
          <h2 style={{ display: "inline"}}>Autotietokanta </h2>   <a href="https://github.com/jonipih/react-app-autotietokanta">Linkki github</a>
        </div>

        <div>
          <Lisaaauto car={cars} setCars={setCars}/>
        </div>

        <div style={{ padding:"50px",width:"100%"}}>

          <HaejaNayta cars={cars}/>

          </div>    
      </div>
         </>
  )
}

export default App
