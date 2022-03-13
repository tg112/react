const { default: axios } = require('axios');
const express = require('express');

const app = express();
app.use(express.json());

const events = [];


app.post('/events', async (req, res) => {
    const event = req.body;
    events.push(event);
    await axios.post('http://localhost:4000/events', event).catch(e => console.log(e.message));
    await axios.post('http://localhost:4001/events', event).catch(e => console.log(e.message));
    await axios.post('http://localhost:4002/events', event).catch(e => console.log(e.message));
    await axios.post('http://localhost:4003/events', event).catch(e => console.log(e.message));

    res.send({status: 'OK'})
})

app.get('/events', (req, res) => {
    res.send(events);
})

app.listen(4005, () => {
    console.log('listening 4005');
})