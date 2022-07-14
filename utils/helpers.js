module.exports = {

    // make date readable
    format_date: date => {
        return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(date
        ).getFullYear()}`;
    },

    // singular and plural as appropriate (only will be used for 'comment' and 'point')
    format_plural: (word, amount) => {
        if (amount !== 1) {
            return `${word}s`;
        }
        return word;
    },

    // shorten a URL string
    format_url: url => {
        return url
            .replace('http://' , '')
            .replace('https://' , '')
            .replace('www.' , '')
            .split('/')[0]
            .split('?')[0];
    }
}

