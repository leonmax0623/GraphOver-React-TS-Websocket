export const convertDate = dateISO => {
  try {
    return new Date(dateISO).toLocaleString('ru', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    });
  } catch (err) {
    return '';
  }
};
export const convertDateMn = dateISO => {
  try {
    return new Date(dateISO).toLocaleString('ru', {
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    });
  } catch (err) {
    return '';
  }
};
export const convertDateWithoutTime = dateISO => {
  try {
    return new Date(dateISO).toLocaleString('ru', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    });
  } catch (err) {
    return '';
  }
};

export function declOfNum(number, titles) {
  const cases = [2, 0, 1, 1, 1, 2];
  return titles[number % 100 > 4 && number % 100 < 20 ? 2 : cases[number % 10 < 5 ? number % 10 : 5]];
}
