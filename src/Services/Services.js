import axios from 'axios';


const api = axios.create({
    baseURL: 'https://covid-19-coronavirus-statistics.p.rapidapi.com/v1/',
    headers: {'X-RapidAPI-Host': 'covid-19-coronavirus-statistics.p.rapidapi.com', 'X-RapidAPI-Key': 'c63391f718mshf3fa7743c0a1440p1b8b18jsnb28466998c4a' }
  });


  export default api;
  