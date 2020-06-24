const axios = require('axios');

const getLugarLatLng = async ( dir ) => {
    const encodedUrl = encodeURI (dir);
    console.log(encodedUrl);
    
    const instance = axios.create({
        baseURL: `https://community-open-weather-map.p.rapidapi.com/weather?q=${encodedUrl}&units=metric`,
        headers: { 'X-RapidAPI-Key': 'b5a7b01204mshdc8b47ad8088c8ap119dccjsnfeaa0cfca5ee' }
    });
    
    const resp = await instance.get();

    if (!resp.data.cod === 200){
        throw new Error (`No hay resultados para ${dir}`);
    }
    //console.log(resp.data);

    const data = resp.data;
    const direccion =  data.name;
    const coord = data.coord; 
    const lat = coord.lat;
    const lng = coord.lon;

    const temp = data.main.temp;

    return {
        direccion,
        lat,
        lng,
        temp
    }
}

module.exports ={
    getLugarLatLng
}