function getUrlRua()
{
    const countryname = 'Portugal'
    const cityname = 'Braga';
    const streetname = 'Avenida da liberdade'
    const query = `${streetname}, ${cityname}, ${countryname}`;
    const url = `https://nominatim.openstreetmap.org/search?q=${query}&format=json`;
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onload = () => {
      if (xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);
        if (response.length > 0) {
          const lat = response[0].lat;
          const lon = response[0].lon;
          const osmLink = `https://www.openstreetmap.org/#map=20/${lat}/${lon}`;
          console.log(osmLink);
        } else {
          console.error("City not found");
        }
      } else {
        console.error("Error making request");
      }
    };
    xhr.send();
}
