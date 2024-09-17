import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const OPENWEATHERMAP_API_KEY = process.env.OPENWEATHERMAP_API_KEY;

export const getWeather = async (req, res) => {
    try {
        const { city } = req.params;
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${OPENWEATHERMAP_API_KEY}&units=metric`;
        
        const response = await axios.get(url);
        const { main: { temp }, name } = response.data;
        
        res.json({
            city: name,
            temperature: temp
        });
    } catch (error) {
        if (error.response && error.response.status === 404) {
            res.status(404).json({ message: 'City not found' });
        } else {
            res.status(500).json({ message: 'Error fetching weather data' });
        }
    }
};