const durationFormater = (from: Date, toDate: Date) => {
  let duration = Math.abs(from.getTime() - toDate.getTime());
  duration /= (1000*60)

  duration = Math.floor(duration)

  let hours = duration / 60;
  let minutes = duration % 60;

  return `${Math.floor(hours)} hr ${minutes} m`;
};

export default durationFormater;
