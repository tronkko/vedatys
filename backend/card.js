/* Construct playing card */
function Card (suit, value) {
    this.suit = suit;
    this.value = value;
}
Card.prototype = {};
Card.prototype.constructor = Card;


module.exports = Card;

