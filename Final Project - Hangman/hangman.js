//hangman.js
console.log("hangman.js has loaded")
//values

var characterName;

$('#starWars').click(function (e) {
    $("body").css("background-image", "url('r2d2.jpg')");
    starWars();
    hideCategory();
});

$('#pokemon').click(function (e) {
    $("body").css("background-image", "url('pkc.jpg')");
    pokemon();
    hideCategory();
})

/**
 * Initilizing Game
 */
function initGame() {
    
        console.log('Characters Name: ' + characterName);
        var life = characterName.length;

        var string1 = characterName.toUpperCase();
        var string2 = "";
        var string1Array = string1.split("");
        var string2Array = string2.split("");
        var guessLetter;

        // show A - Z buttons
        showAtoZButtons();

        //methods
        printName(string1);
        updateLife();


        //listener
        $("button").click(function (e) {
            var userChoice = $(this).data("choice");
            //console.log(userChoice);
            inputGuess(userChoice);
            $("#guessWord").text(string2Array.join(''));
            string2 = string2Array.join("");
            checkWin();
            checkLose();
            updateLife();
        })

        $("#reset").click(function (e) {
            location.reload(true);
        })

        //functions
        /**set up the Character to be guessed
         * 
         * @param {string} test //string to be guessed
         */
        function printName(Character) {
            for (let x = 0; x < Character.length; x++) {
                if (Character.charAt(x) == " ") {
                    string2Array[x] = " ";
                }
                else if (Character.charAt(x) == "-") {
                    string2Array[x] = "-";
                }
                else {
                    string2Array[x] = "_";
                }
            }
            $("#guessWord").text(string2Array.join(''));
        }


        /**checks if the character is within string1
         * 
         * @param {character} guessLetter 
         */
        function inputGuess(guessLetter) {
            if (string1.includes(guessLetter)) {
                for (let x = 0; x < string1.length; x++) {
                    if (guessLetter == string1.charAt(x)) {
                        string2Array[x] = guessLetter;
                        disableButton(guessLetter);
                    }
                }
            }
            else {
                disableButton(guessLetter);
                //console.log(string2Array);
                life--;
            }
        }

        /**Disables button based on the idtag entered as param
         * 
         * @param {string} x idtag
         */
        function disableButton(x) {
            $("#" + x).attr("disabled", "");
        }

        /**Check if the win condition has been met
         * 
         */
        function checkWin() {
            if (string1 == string2) {
                $("#win").removeAttr("hidden");
                $(".button_letters").hide();
                $("#reset").removeAttr("hidden");
                $('#imgWL').removeAttr('hidden');
            }
        }

        /**Check if the lose condition has been met
         * 
         */
        function checkLose() {
            if (life <= 0) {
                $("#lose").removeAttr("hidden");
                $(".button_letters").hide();
                $("#reset").removeAttr("hidden");
                $('#answer').text('The Answer Is ' + characterName.toUpperCase());
                $('#imgWL').attr('src', 'https://66.media.tumblr.com/960515c55083912f5bcaef8493d5dc79/tumblr_mgc21rbVEZ1qlmd4co1_500.gifv').removeAttr('hidden');
            }
        }

        /**Updates the amount of tries left
         * 
         */
        function updateLife() {
            $("#life").text(life + " Attempt(s) Remaining");
        }

}

/**Displays the A to Z input button group
 * 
 */
function showAtoZButtons() {
    $('.button_letters').removeAttr('hidden');
}

/**Hides the category once selected */
function hideCategory() {
    $('#category').hide();
}

/**fetch starWars character api and appends the hint to the html
 * 
 */
function starWars() {
    var randomNum = Math.floor(Math.random() * 50) + 1;
    $.getJSON('https://swapi.co/api/people/' + randomNum, function (resultData) {

        characterName = resultData.name;

        //create div
        var div = $('<div></div>').attr('id', 'hintContainer');
        $('#lifeWordHint').append(div);

        // create Text Abilities
        var text = $('<p></p>').text('Description:');
        $('#hintContainer').append(text);

        // create order List
        var orderList = $('<ol></ol>').attr('id', 'hint');
        $('#hintContainer').append(orderList);

        //gender
        var hintList = $('<li></li>').text('Gender: ' + resultData.gender.toUpperCase());
        $('#hint').append(hintList);

        //Hair Color
        var hintList = $('<li></li>').text('Hair Color: ' + resultData.hair_color.toUpperCase());
        $('#hint').append(hintList);

        //height
        var hintList = $('<li></li>').text('Height: ' + resultData.height + ' cm');
        $('#hint').append(hintList);

        //skin color
        var hintList = $('<li></li>').text('Skin Color: ' + resultData.skin_color.toUpperCase());
        $('#hint').append(hintList);

        // Initilize Game
        initGame();

        // console.log(name);
        // console.log('randomnumb:' + randomNum);
        // console.log(typeof (name));

    });

}

/**fetch pokemon api and appends the hint to the html
 * 
 */
function pokemon() {
    var randomNum = Math.floor(Math.random() * 50) + 1;
    $.getJSON('https://pokeapi.co/api/v2/pokemon/' + randomNum, function (resultData) {

        characterName = resultData.forms[0].name; // pokemon character name
        //console.log(resultData.forms[0].name);

        //create div
        var div = $('<div></div>').attr('id', 'hintContainer');
        $('#lifeWordHint').append(div);

        // create Text Abilities
        var text = $('<p></p>').text('Abilities:');
        $('#hintContainer').append(text);

        // create order List
        var orderList = $('<ol></ol>').attr('id', 'hint');
        $('#hintContainer').append(orderList);

        // abilities
        for (var i = 0; i < resultData.abilities.length; i++) {

            var hintList = $('<li></li>').text(resultData.abilities[i].ability.name);
            $('#hint').append(hintList);

            //console.log(resultData.abilities[i].ability.name);
        }

        // Initilize Game
        initGame();

        //console.log(resultData);

    });
}