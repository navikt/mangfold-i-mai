# Dette er [nettstedet for Mangfold i Mai 2022](https://navikt.github.io/mangfold-i-mai).

Ta kontakt med [Sarah via Slack](https://nav-it.slack.com/archives/D02G9037P1B) hvis du har kommentarer eller spørsmål.  

__Den er en "work in progress" og er ikke klar for publisering ennå.__  Den er ikke kompatibilitetstestet.  Det er en del feil og mangler knyttet skjermleser og mobilvisning.  Det er mye design som mangler, og mange felter som mangler.  

Du kan derimot begynne å legge inn innhold.  

## Foredragssidene
Legg til en foredrag ved å velge "Add file > Create new file" i [events-mappa](https://github.com/navikt/mangfold-i-mai/tree/main/_events). Navngi filen med foredragets tittel, separert med bindestrekk, f.eks. [aria-basics.md](https://github.com/navikt/mangfold-i-mai/blob/main/_speakers/aria-basics.md). 

Legg gjerne inn til en side til foredragsholderen, om ikke denne allerede eksisterer.

På foredragssidene kan du legge inn følgende informasjon:
- **title:** navnet til foredraget.
- **speakers:** foredragsholdere.  Ved flere foredragsholdere kan du liste disse separert med kommaer mellom square brackets.  Se kildekoden til [Hjemme hos Aksel](https://github.com/navikt/mangfold-i-mai/edit/main/_events/Hjemme%20hos%20Aksel.md) for å se hvordan dette fungerer.
- **summary**: en kort setning til bruk i arrangementsoversikten (fritekst)
- **privacy:** om eventet er åpent for alle eller ei ("internal", "public")
- **location-type:** om eventet er streamet eller skjer fysisk ("in-person", "stream")
- **location-name**: Lenketeksten til hvor eventet tar plass (fritekst, e.g. "Teams" eller "FYA1")
- **location-link**: URLen til hvor eventet tar plass (fritekst, e.g. teams-lenke eller Google maps-lenke) 
- **registration-link**: URLen til påmelding.
- **event-date:** starttidspunktet i ISO 8601-format (e.g. 2022-05-02T14:00)
- **event-date-end:** starttidspunktet i ISO 8601-format
- Beskrivelse av arrangementet, på en ny linje etter `---`.  Bruk markdown for å formattere teksten.

### Språk
Foredragssidene tilbyr en meget basic form for internasjonalisering av deler av innholdet.  Dette skal brukes når selve foredraget er i et annet språk.  

Om du vil at sidens `h1` og beskrivelse skal være på et annet språk, legg til `language: xx` i sidens egenskaper, der `xx` er [ISO 639-koden](https://www.tutorialrepublic.com/html-reference/html-language-codes.php) til innholdets språk.  [Kildekoden til siden om UD-day](https://github.com/navikt/mangfold-i-mai/edit/main/_events/ud-day.md) viser hvordan dette funker for en foredrag som skal holdes på engelsk.


## Foredragsholder-sidene
Legg til en foredragsholder ved å velge "Add file > Create new file" i [speakers-mappa](https://github.com/navikt/mangfold-i-mai/tree/main/_speakers).  Navngi filen med foredragsholderens navn, separert med bindestrekk, f.eks. [sarah-brodwall.md](https://github.com/navikt/mangfold-i-mai/blob/main/_speakers/sarah-brodwall.md).

Så langt er det støtte for følgende informasjon:
- **name:** navnet til foredragsholder
- **image:** bilde (som lastes opp til [/assets/images/speakers/](https://github.com/navikt/mangfold-i-mai/tree/main/assets/images/speakers))
- Litt info om foredragsholderen på en ny linje etter `---`.  Bruk markdown for å formattere teksten.