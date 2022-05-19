const express = require('express');
const { Telegraf } = require('telegraf');


require('dotenv').config();

const app = express();
const bot = new Telegraf(process.env.BOT_TOKEN);

// Configuración
app.use(bot.webhookCallback('/url_telegram'));
bot.telegram.setWebhook(process.env.BOT_URL + '/url_telegram');

app.post('/url_telegram', (req, res) => {
    res.end('Termina la petición');
});

// COMANDOS
bot.command('test', require('./commands/test'));
bot.command('weather', require('./commands/weather'));
bot.command('where', require('./commands/where'));

bot.on('text', require('./nlu')); /// Creacion de Inteligancia Artificial


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en puerto ${PORT}`);
});