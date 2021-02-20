/****************************************
    FCC Random Quote Machine
    by RoLo
****************************************/

$(document).ready(function() {

    //Colors and Fallback Quotes
    var colors = [
        {regularColor: "#69D2E7", lightColor: "#7bd7ea"},
        {regularColor: "#cc33b0", lightColor: "#d147b8"},
        {regularColor: "#775ca3", lightColor: "#8a73b0"},
        {regularColor: "#ca524e", lightColor: "#d06662"},
        {regularColor: "#cf1717", lightColor: "#e61919"},
        {regularColor: "#36c98e", lightColor: "#4acf9a"},
        {regularColor: "#96a15e", lightColor: "#a0aa6e"},
        {regularColor: "#2d4052", lightColor: "#364d63"},
        {regularColor: "#68974e", lightColor: "#76aa5a"},
        {regularColor: "#6daba3", lightColor: "#7db5ad"},
        {regularColor: "#5d3c42", lightColor: "#6c474d"},
        {regularColor: "#da8b0b", lightColor: "#f29a0d"}
    ];
    var fallbackQuotes = [
        {quoteAuthor: "Kevin Kruse", quoteText: "Life is about making an impact, not making an income."},
        {quoteAuthor: "Napoleon Hill", quoteText: "Whatever the mind of man can conceive and believe, it can achieve"},
        {quoteAuthor: "Albert Einstein", quoteText: "Strive not to be a success, but rather to be of value."},
        {quoteAuthor: "Robert Frost", quoteText: "Two roads diverges in a wood, and I—I took the one less traveled by, And that has made all the difference."},
        {quoteAuthor: "Florence Nightingale", quoteText: "I attribute my success to this: I never gave or took any excuse."},
        {quoteAuthor: "Wayne Gretzky", quoteText: "You miss 100% of the shots you don't take."},
        {quoteAuthor: "Amelia Earhart", quoteText: "The most difficult thing is the decision to act, the rest is merely tenacity."},
        {quoteAuthor: "Babe Ruth", quoteText: "Every strike brings be closer to the next home run."},
        {quoteAuthor: "John Lennon", quoteText: "Life is what happens to you while you're busy making other plans."},
        {quoteAuthor: "Earl Nightingale", quoteText: "We become what we think about."},
        {quoteAuthor: "Mark Twain", quoteText: "Twenty years from now you will be more disappointed by the things that you didn't do than by the ones you did do, so throw off the bowlines, sail away from safe harbor, catch the trade winds in your sails. Explore, Dream, Discover."},
        {quoteAuthor: "Charles Swindoll", quoteText: "Life is 10% what happens to me and 90% of how I react to it."},
        {quoteAuthor: "Alice Walker", quoteText: "The most common way people give up their power is by thinking they don't have any."},
        {quoteAuthor: "Buddha", quoteText: "The mind is everything. What you think you become."},
        {quoteAuthor: "Chinese Proverb", quoteText: "The best time to plant a tree was 20 years ago. The second best time is now"},
        {quoteAuthor: "Socrates", quoteText: "An unexamined life is not worth living"},
        {quoteAuthor: "Steve Jobs", quoteText: "Your time is limited, so don't waste it living someone else's life."}
    ];

    // get random item functions
    function getRandomIndex(array) {
        return Math.floor(Math.random() * array.length);
    }

    function getNewItem(array, index) {
        var random = getRandomIndex(array);

        if (index) {
            while (random == parseInt(index)) {
                random = getRandomIndex(array);
            }
        }

        var result = array[random];
        if (!result.index) {
            result.index = random;
        }
        return result;
    }


    // changes and saves color
    var colorIndex = 0;
    function changeColor() {
        var randomColor = getNewItem(colors, colorIndex);
        colorIndex = randomColor.index;

        $('body, .buttons button').animate( {backgroundColor: randomColor.regularColor} , 'slow');

        $('#quote-box').animate( {color: randomColor.regularColor} , 'slow');
    }


    // check forismatic for quote, else fallback
    var $quote = $('#quote-text');
    var $author = $('#author-text');

    function getQuote() {
        $.ajax({
            url: 'http://api.forismatic.com/api/1.0/',
            jsonp: 'jsonp',
            dataType: 'jsonp',
            data : {
                method: 'getQuote',
                lang: 'en',
                format: 'jsonp'
            },
            success: function(response) {
                $quote.fadeOut('slow', function() {$quote.text(response.quoteText);});
                $author.fadeOut('slow', function() {
                    $author.text('— ' + response.quoteAuthor);
                    changeColor();
                });

                $quote.fadeIn('slow');
                $author.fadeIn('slow');
            },
            error: function() {
                var randomQuote = getNewItem(fallbackQuotes);

                $quote.fadeOut('slow', function() {$quote.text(randomQuote.quoteText);} );
                $author.fadeOut('slow', function() {
                    $author.text('— ' + randomQuote.quoteAuthor);
                    changeColor();
                });

                $quote.fadeIn('slow');
                $author.fadeIn('slow');
            }
        });
    }


    // onLoad
    $quote.hide();
    $author.hide();
    getQuote();

    // click and hover
    $('#tweetButton').click(function(event) {
        event.preventDefault();
        window.open('https://twitter.com/intent/tweet?text=' + encodeURIComponent($quote.text() + ' ' + $author.text()));
    });

    $('#quoteButton').click(function(event) {
        event.preventDefault();
        getQuote();
    });

    // buttons brighten on hover
    $('.buttons button').hover(function() {
        $(this).css({backgroundColor: colors[colorIndex].lightColor}, 100);
    }, function() {
        $(this).css({backgroundColor: colors[colorIndex].regularColor}, 100);
    });
// End document.ready
});
