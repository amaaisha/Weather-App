import React from 'react'
import Title from "./component/Title";
import Form from './component/Form'
import Weather from "./component/Weather";


const API_KEY = '5ddf72f86a90e5fd0b15a5829614c7a7'

class App extends React.Component {

   state={
     temperature: undefined,
     city: undefined,
     country: undefined,
     humidity: undefined,
     description: undefined,
     error: undefined
   }

   getWeather = async (e) => {
     e.preventDefault()
     const city = e.target.elements.city.value
     const country = e.target.elements.country.value

     const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`)
     const data = await api_call.json()
     if (city && country) {
       console.log(data)
       this.setState({
         temperature: data.main.temp,
         city: data.main,
         country: data.sys.country,
         humidity: data.main.humidity,
         description: data.weather[0].description,
         error: ''

       })
     }else{
       this.setState({
         temperature: undefined,
         city: undefined,
         country: undefined,
         humidity: undefined,
         description: undefined,
         error: 'Please enter the values!'
       })
     }
   }

  render() {
    return (
      <div>
        <Title/>
        <Form getWeather={this.getWeather}/>
        <Weather
          temperature={this.state.temperature}
          city={this.state.city}
          country={this.state.country}
          humidity={this.state.humidity}
          description={this.state.description}
          error={this.state.error}
        />
      </div>
    )
  }

}

 export default App

