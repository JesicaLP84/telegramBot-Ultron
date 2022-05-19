const NodeGeocoder = require('node-geocoder');

const options = {
  provider: 'google',

  apiKey: process.env.GOOGLE_API_KEY 
}
const handleWhere = async (ctx) => {
  try {
    const direccion = ctx.message.text.split('/where ')[1].trim().toLowerCase();

    //Geocode 
    const geocoder = NodeGeocoder(options)
    const res = await geocoder.geocode(direccion)

    // Creacion Imagen Goole Map Static
    const imgMap = `https://maps.googleapis.com/maps/api/staticmap?center=${res[0].latitude},${res[0].longitude}&zoom=13&size=600x300&maptype=roadmap&markers=color:blue%7Clabel:S%7C${res[0].latitude},${res[0].longitude}&key=${process.env.GOOGLE_API_KEY}`;


    // console.log(imgMap);


    ctx.replyWithLocation(res[0].latitude, res[0].longitude)
    ctx.replyWithPhoto(imgMap)
  }catch{
    ctx.reply(' Ha ocurrido un error, intentalo con otra direccion')
  }
  
};




module.exports = handleWhere