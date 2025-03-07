import { DateTime } from 'luxon';

const readableDate = function (date, format) {
  return DateTime.fromISO(date, {
      zone: 'Europe/Paris',
  })
      .setLocale('nb-NO')
      .toFormat(format);
};

const sentence = function (list) {
  if (Array.isArray(list)) {
    return new Intl.ListFormat('no', {
      style: 'long',
      type: 'conjunction',
    }).format(list)
  } else {
    return list
  }
}

const pluck = (arr, selections, attr) => {
  return arr.filter((item) => selections.includes(item.data[attr]))
}

export { readableDate, sentence, pluck }
