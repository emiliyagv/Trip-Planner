import axios, * as others from 'axios';

const URL = 'https://travel-advisor.p.rapidapi.com/hotels/list-in-boundary'

axios.defaults.timeout = 5000;

export const getPlacesData = async (swlat, swlng, nelng, nelat) => {
  try{ 


    const { data: {data} } = await axios.get(URL, {
        params: {
          tr_longitude: nelng,
          tr_latitude: nelat,
          bl_longitude: swlng,
          bl_latitude: swlat,
        },
        headers: {
          'X-RapidAPI-Key': '898e0d27d6msh368cb33d32f9c13p1f2a78jsn61f496aaab8a',
          'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
        }
      });
      return data;
  }catch(error){
      console.log(error)
  }
}

