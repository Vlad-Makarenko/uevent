export const prepareCategories = (rawCategories) => rawCategories
  .map((category) => ({ ...category, isChecked: false }));

export const getTimes = [
  { name: 'Today', value: 'today', isChecked: false },
  { name: 'Tomorrow', value: 'tomorrow', isChecked: false },
  { name: 'This week', value: 'this_week', isChecked: false },
  { name: 'This month', value: 'this_month', isChecked: false },
  { name: 'Past', value: 'past', isChecked: false },
];

export const filterByTime = (events, selectedTimes) => {
  const currentDate = new Date();
  const tomorrowDate = new Date(currentDate.getTime() + 24 * 60 * 60 * 1000);
  const nextWeekDate = new Date(
    currentDate.getTime() + 7 * 24 * 60 * 60 * 1000
  );
  const nextMonthDate = new Date(
    currentDate.getTime() + 30 * 24 * 60 * 60 * 1000
  );

  return events.filter((event) => {
    const eventDate = new Date(event.startEvent);
    switch (selectedTimes) {
      case 'today':
        return eventDate.toDateString() === currentDate.toDateString();
      case 'tomorrow':
        return eventDate.toDateString() === tomorrowDate.toDateString();
      case 'this_week':
        return eventDate >= currentDate && eventDate <= nextWeekDate;
      case 'this_month':
        return eventDate >= currentDate && eventDate <= nextMonthDate;
      case 'past':
        return eventDate < currentDate;
      default:
        return true;
    }
  });
};
