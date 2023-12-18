import axios from "axios";

const options = {
  method: 'GET',
  url: 'https://yahoo-weather5.p.rapidapi.com/weather',
  params: {
    location: 'newyork',
    format: 'json',
    u: 'f'
  },
  headers: {
    'X-RapidAPI-Key': '81804428ffmsh380a5361443c3d7p1c6cd5jsnf295b49baef8',
    'X-RapidAPI-Host': 'yahoo-weather5.p.rapidapi.com'
  }
};

async function test(){
    try {
        const response = await axios.request(options);
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
}

test();
