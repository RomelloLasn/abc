import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const OPENWEATHERMAP_API_KEY = process.env.OPENWEATHERMAP_API_KEY;
const CACHE_DURATION = 5 * 60 * 1000;

const cache = new Map();

export const getWeather = async (req, res) => {
    try {
        const { city } = req.params;
        const cacheKey = city.toLowerCase();

        if (cache.has(cacheKey)) {
            const cachedData = cache.get(cacheKey);
            if (Date.now() - cachedData.timestamp < CACHE_DURATION) {
                return res.json(cachedData.data);
            } else {
                cache.delete(cacheKey);
            }
        }

        const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${OPENWEATHERMAP_API_KEY}&units=metric`;
        
        const response = await axios.get(url);
        const { main: { temp }, name } = response.data;
        
        const weatherData = {
            city: name,
            temperature: temp
        };

        cache.set(cacheKey, {
            timestamp: Date.now(),
            data: weatherData
        });

        res.json(weatherData);
    } catch (error) {
        if (error.response && error.response.status === 404) {
            res.status(404).json({ message: 'City not found' });
        } else {
            res.status(500).json({ message: 'Error fetching weather data' });
        }
    }
};