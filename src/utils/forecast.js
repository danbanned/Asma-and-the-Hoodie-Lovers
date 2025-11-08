// Takes the messy 3-hour weather data and turns it into clean daily forecasts

// What this does:
// Takes a bunch of 3-hour weather chunks and gives me back simple daily weather
// Each day gets: date, lowest temp, highest temp, weather icon, and description

export function summarizeForecast(list = [], days = 5) {
  if (!Array.isArray(list) || list.length === 0) return [];

  // Put all the weather chunks into buckets by date
  const byDate = list.reduce((acc, item) => {
    const date = item.dt_txt.split(' ')[0];
    acc[date] ||= [];
    acc[date].push(item);
    return acc;
  }, {});

  const daily = Object.entries(byDate)
    .slice(0, days) // just grab the number of days I want
    .map(([date, entries]) => {
      let min = Infinity;
      let max = -Infinity;

      // grab the noon weather to represent the whole day (or middle if no noon data)
      let midday = entries.find(e => e.dt_txt.includes('12:00:00')) || entries[Math.floor(entries.length / 2)];
      let icon = midday?.weather?.[0]?.icon || '01d';
      let description = midday?.weather?.[0]?.description || 'clear sky';

      for (const e of entries) {
        if (typeof e.main?.temp_min === 'number') min = Math.min(min, e.main.temp_min);
        if (typeof e.main?.temp_max === 'number') max = Math.max(max, e.main.temp_max);
      }

      // backup plan if the weather API is missing data
      if (min === Infinity) min = Math.round(midday?.main?.temp || 0);
      if (max === -Infinity) max = Math.round(midday?.main?.temp || 0);

      return {
        date,
        min: Math.round(min),
        max: Math.round(max),
        icon,
        description,
      };
    });

  return daily.slice(0, days);
}
