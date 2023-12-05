const game = new BaseballGame();
let Newbutton = document.querySelector("#new");
let digitButtons = document.querySelectorAll('.digit');
const guessSpan = document.getElementById('guess');

window.onload = function(e){
    newbuttonfunction();
}

Newbutton.addEventListener("click", newbuttonfunction)
function newbuttonfunction() {
    game.num = [];
    game.selectedDigits = [];
    game.ball = 0;
    game.strike = 0;
    document.getElementById('tbody-stat').innerHTML = '';
    document.getElementById('guess').innerHTML = '';
    const randomValueTest = document.querySelector('#key');
    game.num[0] = Math.floor(Math.random() * 10);
    game.num[1] = Math.floor(Math.random() * 10);
    game.num[2] = Math.floor(Math.random() * 10);

    while (game.num[0] == game.num[1]) {
        game.num[1] = Math.floor(Math.random() * 10);
    }
    while ((game.num[1] == game.num[2]) || (game.num[2] == game.num[0])) {
        game.num[2] = Math.floor(Math.random() * 10);
    }

    randomValueTest.innerHTML = `
    ${game.num[0]}, ${game.num[1]}, ${game.num[2]}
    `;


    digitButtons.forEach(button => {
        button.disabled = false;
    });

    digitButtons.forEach(button => {
        button.onclick = function (e) {
            game.selectedDigits.push(e.target.innerHTML);
            digitButtons.forEach(btn => {
                btn.disabled = false;
            });
    
         
            button.disabled = true;
    
            
            guessSpan.innerHTML = game.selectedDigits.join(', ');
    
            if (game.selectedDigits.length === 3) {
                checkguess();
                game.selectedDigits = [];
            }
        }
    });
    
}



function checkguess() {
    game.strike =0;
    game.ball = 0;


    for (let i = 0; i < 3; i++) {
        if (game.num[i] == game.selectedDigits[i]) {
            game.strike += 1;
        }
    }

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (i == j) {
                j++;
            }
            if (game.num[i] == game.selectedDigits[j]) {
                game.ball += 1;

            }
        }
    }
   
    if (game.strike == 3) {
        alert(`you win with ${game.selectedDigits}`)
        digitButtons.forEach(button => {
            button.disabled = true;
        });
    }

    const tableBody = document.getElementById('tbody-stat');
    const guessvalue = document.createElement('td');
    const ballcount = document.createElement('td');
    const strikecount = document.createElement('td');
    guessvalue.innerHTML = game.selectedDigits;
    ballcount.innerHTML = game.ball;
    strikecount.innerHTML = game.strike;
    const tr = document.createElement('tr');
    tr.appendChild(guessvalue);
    tr.appendChild(ballcount);
    tr.appendChild(strikecount);
    tableBody.appendChild(tr);



    document.getElementById('guess').innerHTML = '';

}
