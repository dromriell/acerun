const getHaversineDistance = (position1, position2) => {
  var R = 3958.8; // Radius of the Earth in miles
  var rlat1 = position1.lat * (Math.PI / 180); // Convert degrees to radians
  var rlat2 = position2.lat * (Math.PI / 180); // Convert degrees to radians
  var difflat = rlat2 - rlat1; // Radian difference (latitudes)
  var difflon = (position2.lng - position1.lng) * (Math.PI / 180); // Radian difference (longitudes)

  var d =
    2 *
    R *
    Math.asin(
      Math.sqrt(
        Math.sin(difflat / 2) * Math.sin(difflat / 2) +
          Math.cos(rlat1) *
            Math.cos(rlat2) *
            Math.sin(difflon / 2) *
            Math.sin(difflon / 2)
      )
    );
  const distanceInFeet = (d * 5280).toFixed(2);
  return distanceInFeet;
};

export default getHaversineDistance;
