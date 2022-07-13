const {format_date} = require('../utils/helpers');
// const format_ plural??

// make date readable
test('format_date() returns a date string', () => {
    const date = new Date('2020-03-20 16:12:03');

    expect(format_date(date)).toBe('3/20/2020');
});

// plural word
test('format_plural() correctly pluralizes words', () => {
    const word = new Word('Tiger', 2);

    expect(format_plural(word)).toBe('tigers');
});

// singular word
test('format_plural() correctly pluralizes words', () => {
    const word = new Word('Lion', 1);

    expect(format_plural(word)).toBe('lion');
});

// shorten a URL

