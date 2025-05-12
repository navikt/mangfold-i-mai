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

const eventsBySpeaker = (arr, value) => {
  return arr.filter((item) => {
    if (item.data.speakers != null) {
      return item.data.speakers.includes(value)
    }
  })
}

const where_includes = (arr, a, b) => {
  return arr.filter((item) => {
    if (a != null) {
      return a.includes(b)
    }
  })
}

export { readableDate, sentence, eventsBySpeaker, where_includes }
