const axios = require('axios').default

const handleWeather = async(ctx) => {
  // const ciudad= ctx.message.text.split(' ')[1];
  // const ciudad = ctx.message.text.slice(9)
  const ciudad = ctx.message.text.split('/weather ')[1].trim;// esto hace limpiar los espacios por delante o por detras y asi no aparece como ha dejado de funcionar la app  

  const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${process.env.OWM_API_KEY}&units=metric`)
  //console.log(response.data);

  const res = `La temperatura en ${ciudad} es:
  TEMP: ${ response.data.main.temp}º
  MAX: ${response.data.main.temp_max}º
  MIN: ${response.data.main.temp_min}º
  HUMEDAD: ${response.data.main.humidity}%`

  ctx.reply(res)


}


// Weather Madrid

module.exports = handleWeather