function describe (pick) {
    /* Count number of cards of each value */
    let counts = [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
    ];
    for (let i in pick) {
        let card = pick[i];
        counts[card.value]++;
    }

    /* Pick the highest number of cards */
    let highest = 2;
    for (let i = 3; i <= 14; i++) {
        if (counts[i] >= counts[highest]) {
            highest = i;
        }
    }

    /* Format name */
    let result = '';
    switch (counts[highest]) {
    case 0:
        result = '';
        break;

    case 1:
        switch (highest) {
        case 2:
            result = 'Kakkoshai';
            break;

        case 3:
            result = 'Kolmoshai';
            break;

        case 4:
            result = 'Neloshai';
            break;

        case 5:
            result = 'Vitoshai';
            break;

        case 6:
            result = 'Kutoshai';
            break;

        case 7:
            result = 'Seiskahai';
            break;

        case 8:
            result = 'Kasihai';
            break;

        case 9:
            result = 'Ysihai';
            break;

        case 10:
            result = 'Kymppihai';
            break;

        case 11:
            result = 'Jätkähai';
            break;

        case 12:
            result = 'Akkahai';
            break;

        case 13:
            result = 'Kurkohai';
            break;

        case 14:
        case 1:
            result = 'Ässähai';
            break;

        default:
            throw new Error ('Virheellinen kortti ' + highest);
        }
        break;

    case 2:
        switch (highest) {
        case 2:
            result = 'Kakkospari';
            break;

        case 3:
            result = 'Kolmospari';
            break;

        case 4:
            result = 'Nelospari';
            break;

        case 5:
            result = 'Vitospari';
            break;

        case 6:
            result = 'Kutospari';
            break;

        case 7:
            result = 'Seiskapari';
            break;

        case 8:
            result = 'Kasipari';
            break;

        case 9:
            result = 'Ysipari';
            break;

        case 10:
            result = 'Kymppipari';
            break;

        case 11:
            result = 'Jätkäpari';
            break;

        case 12:
            result = 'Akkapari';
            break;

        case 13:
            result = 'Kurkopari';
            break;

        case 14:
        case 1:
            result = 'Ässäpari';
            break;

        default:
            throw new Error ('Virheellinen kortti ' + highest);
        }
        break;

    case 3:
    case 4:
        switch (counts[highest]) {
        case 3:
            result = 'Kolme';
            break;

        case 4:
            result = 'Neljä';
            break;
        }
        result += ' ';
        switch (highest) {
        case 2:
            result += 'kakkosta';
            break;

        case 3:
            result += 'kolmosta';
            break;

        case 4:
            result += 'nelosta';
            break;

        case 5:
            result += 'vitosta';
            break;

        case 6:
            result += 'kutosta';
            break;

        case 7:
            result += 'seiskaa';
            break;

        case 8:
            result += 'kasia';
            break;

        case 9:
            result += 'ysiä';
            break;

        case 10:
            result += 'kymppiä';
            break;

        case 11:
            result += 'jätkää';
            break;

        case 12:
            result += 'akkaa';
            break;

        case 13:
            result += 'kurkoa';
            break;

        case 14:
        case 1:
            result += 'ässää';
            break;

        default:
            throw new Error ('Virheellinen kortti ' + highest);
        }
        break;

    default:
        throw new Error ('Liikaa kortteja');
    }
    return result;
}

function cardname (suit, value) {
    let result = '';

    /* Get suit */
    let suitname = '';
    switch (suit) {
    case 'heart':
        suitname = 'Hertta';
        break;

    case 'club':
        suitname = 'Risti';
        break;

    case 'spade':
        suitname = 'Pata';
        break;

    case 'diamond':
        suitname = 'Ruutu';
        break;

    default:
        throw new Error ('Invalid suit ' + suit);
    }

    /* Get value */
    let valuename = '';
    switch (parseInt(value, 10)) {
    case 2:
        valuename = 'kakkonen';
        break;

    case 3:
        valuename = 'kolmonen';
        break;

    case 4:
        valuename = 'nelonen';
        break;

    case 5:
        valuename = 'vitonen';
        break;

    case 6:
        valuename = 'kutonen';
        break;

    case 7:
        valuename = 'seiska';
        break;

    case 8:
        valuename = 'kasi';
        break;

    case 9:
        valuename = 'ysi';
        break;

    case 10:
        valuename= 'kymppi';
        break;

    case 11:
        valuename = 'jätkä';
        break;

    case 12:
        if (suit != 'heart' && suit != 'spade') {
            valuename = 'akka';
        } else {
            /* Hertta-akka, Pata-akka*/
            valuename = '-akka';
        }
        break;

    case 13:
        valuename = 'kunkku';
        break;

    case 14:
    case 1:
        valuename = 'ässä';
        break;

    default:
        throw new Error ('Invalid value ' + value);
    }

    /* Construct name */
    return suitname + valuename;
}

