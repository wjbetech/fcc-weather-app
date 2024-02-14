const searchBarCity = () => {
    const cities = [
      "New York",
      "Seoul",
      "Tokyo",
      "Bangkok",
      "Mexico City",
      "London",
      "Paris",
      "Mumbai",
      "Beijing",
      "Shanghai",
      "Sydney",
      "Delhi",
      "Moscow",
      "Lyon",
      "Miami",
      "Chicago",
      "New Delhi",
      "Bangalore",
      "Kolkata",
      "Brussels",
      "Lima",
      "Oslo",
      "Amsterdam",
      "Hong Kong",
      "Manchester",
      "Milan",
      "Rome",
      "Riga",
      "Vienna",
      "Prague",
    ];
    const city = cities[Math.floor(Math.random() * cities.length)];
    return city;
}

export default searchBarCity;