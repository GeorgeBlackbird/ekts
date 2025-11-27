interface WeatherData {
  main: {
    temp: number;
  };
  weather: Array<{
    main: string;
    description: string;
    id: number;
  }>;
}

async function getWeather(): Promise<WeatherData> {
  const weather = await $fetch('https://api.openweathermap.org/data/2.5/weather', 
    {
      query: {
        appid: '3797567f1c1f4aa536ddbb4c0bb957fc',
        lang: 'ru',
        q: 'Yekaterinburg',
        units: 'metric',
      }
    }
  )
  return weather as WeatherData
}

export type { WeatherData }
export { getWeather }