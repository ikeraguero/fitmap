
export const getPosition = async function () {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    }).then((res) => {
        const { latitude: lat, longitude: lng } = res.coords;
        return [lat, lng]
  })
};