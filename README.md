# Vedätys

Vedätys on korttipeli, missä huijaaminen on sallittua ja jopa välttämätöntä!


## Pelin kulku

1. Pelaajat asettuvat rinkiin.

2. Jakaja antaa pakasta jokaiselle pelaajalle 5 korttia, ja arpoo
aloitusvuoron.  Jokaisella pelaajalla tulee olla 5 korttia kädessään koko
pelin ajan.

3. Jokaisen vuoron alussa pelaaja, myös pelin aloittaja, voi laittaa 1-5
korttia kädestään selkäpuoli ylöspäin pöydälle, jonka jälkeen jakaja antaa
takaisin yhtä monta uutta korttia pakasta kuin mitä pelaaja laittoi pöydälle.
Jos pakassa ei riitä kortteja, niin jakaja yhdistää jäljellä olevan pakan ja
pöydällä olevat kortit, sekoittaa ne ja tekee siitä uuden pakan.

4. Pelin aloittaja esittää väitteen, esimerkiksi "minulla on kasihai"
tai "minulla on kaksi ässää".

5. Väittäjän vasemmalla puolella istuva pelaaja voi haastaa tai hyväksyä
väitteen.

6. Jos pelaaja hyväksyy väitteen, niin vuoro vaihtuu.  Vuoron alussa pelaaja
voi vaihtaa kortteja, jonka jälkeen hänen tulee esittää vielä korkeampi väite.
Jos esimerkiksi pelaaja hyväksyy väitteen: "minulla on kasihai", niin pelaajan
tulee esittää omaavansa vähintään ysihain tai minkä tahansa parin.
Vastaavasti jos pelaaja hyväksyy väitteen: "minulla on kaksi ässää", niin
hänen tulee väittää omaavansa vähintään kolme kakkosta.

7. Jos pelaaja haastetaan, niin hänen tulee näyttää korttinsa.  Jos väite oli
tosi, niin haastaja putoaa pelistä ja jos väite oli valetta, niin väitteen
esittäjä putoaa pelistä.  Haasteen jälkeen peliä jatketaan jäljellä olevien
pelaajien kesken siten, että haastaja tai hänen vasemmalla puolellaan oleva
pelaaja esittää uuden väitteen.  Pelin voittaa viimeiseksi
jäljelle jäävä pelaaja.


## Korttien arvo

Pelissä korkeammaksi katsotaan väite, jossa (1) on yhtä monta kortia, mutta
kortit ovat arvoltaan suurempia, tai (2) on useampia kortteja.  Ässä katsotaan
kuningasta korkeammaksi.

Siten esimerkiksi kurkohai on pienempi kuin ässähai, ja ässähai on pienempi
kuin kakkospari.  Vastaavasti kakkospari on pienempi kuin kolmospari tai kolme
kakkosta.  Pelin arvokkain käsi on neljä ässää, jota ei voi lyödä.  Siksi jos
joku väittää omaavansa neljä ässää, niin hänet tulee haastaa heti.


# Asennusohjeet

## Vaatimukset

Pelin asentamiseksi tarvitset internettiin kytketyn Linux serverin, jolle
on asennettu seuraavat ohjelmat:

- Git https://git-scm.com/
- Nodejs https://nodejs.org/en/


## Asennus

1. Lataa koodit githubista komennolla

        git clone git@github.com:tronkko/vedatys.git

2. Mene cd:llä hakemistoon vedatys ja asenna NPM moduulit komennolla

        cd vedatys
        npm install

2. Käynnistä Nodejs serveri komennolla

        node server.js

3. Avaa nettiselain ja menee osoitteeseen omadomain:3000, missä omadomain
on Linux serverisi verkkotunnus.


