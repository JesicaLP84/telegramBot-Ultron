const { Wit, log } = require('node-wit');
const fs = require('fs');
const googleTTs = require('google-tts-api')

const client = new Wit({

  accessToken: process.env.WIT_TOKEN,
  logger: new log.Logger(log.DEBUG)
  


})

const handleNlu = async (ctx) => {
  const res = await client.message(ctx.message.text)
  if (res.intents.length === 0) {
    ctx.reply('No te entiendo');
  } else {
    if (res.intents[0].confidence > 0.75) {
          //La IA me entiende
        const intent = res.intents[0].name;
        const content = fs.readFileSync(`./frases/${intent}.txt`, 'utf-8')
      
        const frases = content.split('\n') // representa un salto de linea en un fichero plano -> /n;
        
        const fraseSeleccionada = frases[Math.floor(Math.random() * frases.length)]
        const audioUrl = googleTTs.getAudioUrl(fraseSeleccionada, {
        lang: 'es',
        slow: false
      })

        // ctx.reply(fraseSeleccionada);
        ctx.replyWithAudio(audioUrl)
      
      // console.log('INTENT', res.intents[0].name);
      // ctx.reply('Te entiendo')
    } else {
      ctx.reply('No te entiendo')
    }
      
  }
    


}

module.exports= handleNlu