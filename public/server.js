const express = require('express');
const path = require('path');
const app = express();
const supabase = require('./supabaseClient');
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
const page = path.join(__dirname, 'index.html');

app.get('/', (req, res) => {
    res.sendFile(page);
    supabase.from('urls').select('*').then(({data, error}) => {
        if (error) {
            console.error('Error fetching URLs:', error);
        } else {
            console.log('Fetched URLs:', data);
        }
  });
});

app.listen(PORT, () => {
    console.log(`Server listening on port : ${PORT}`)
});