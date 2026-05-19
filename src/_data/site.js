import { DateTime } from 'luxon';

export default {
  mode: process.env.ELEVENTY_RUN_MODE,
  env: process.env.ELEVENTY_ENV,
  title: 'Mangfold i mai',
  summary: 'Feir mangfold, inkludering og universell utforming!',
  url: 'https://mangfoldimai.no',
  email: 'mangfold.i.mai@nav.no',
  github_repository: 'https://github.com/navikt/mangfold-i-mai/',
  today: DateTime.fromISO(new Date().toISOString()),
  livestream: 'https://vimeo.com/event/5115379/910dd41941',
  livetext: 'https://text-on-tap.live/#e=mangfoldimai',
}
