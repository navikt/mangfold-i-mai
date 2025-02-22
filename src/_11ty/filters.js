import { DateTime } from 'luxon';

const readableDate = function (date, format) {
  return DateTime.fromISO(date, {
      zone: 'Europe/Paris',
  })
      .setLocale('nb-NO')
      .toFormat(format);
};

const listFormat = function (list) {
  if (Array.isArray(list)) {
    return new Intl.ListFormat('no', {
      style: 'long',
      type: 'conjunction',
    }).format(list)
  } else {
    return list
  }
}

const exclude = (arr, exclude) => arr.filter((el) => el !== exclude)
const limit = (arr, limit) => arr.slice(0, limit)

const pluck = (arr, selections, attr) => {
  return arr.filter((item) => selections.includes(item.data[attr]))
}

export { readableDate, listFormat, pluck }
