import { DateTime } from 'luxon';

export default {
  mode: process.env.ELEVENTY_RUN_MODE,
  title: 'Mangfold i mai',
  summary: 'Feir mangfold, inkludering og universell utforming!',
  url: 'https://mangfoldimai.no',
  // url: 'https://navikt.github.io/mangfold-i-mai/',
  github_repository: 'https://github.com/navikt/mangfold-i-mai/',
  today: DateTime.fromISO(new Date().toISOString()),
}
