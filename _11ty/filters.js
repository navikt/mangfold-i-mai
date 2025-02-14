import { DateTime } from 'luxon';

const readableDate = function (date, format) {
  return DateTime.fromISO(date, {
      zone: 'Europe/Paris',
  })
      .setLocale('nb-NO')
      .toFormat(format);
};

const listFormat = function(list) {
  if (Array.isArray(list)) {
   return new Intl.ListFormat("no", {
    style: "long",
    type: "conjunction",
  }).format(list) } else { return list }
};

export { readableDate, listFormat };
