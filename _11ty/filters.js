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

const isPlural = function (value) {
  if (value instanceof Array) {
    return true
  } else {
    return false
  }
}

export { readableDate, listFormat, isPlural }
