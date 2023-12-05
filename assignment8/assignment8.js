//const game = new BaseballGame();
let Newbutton = document.querySelector("#new");
let digitButtons = document.querySelectorAll('.digit');
const guessSpan = document.getElementById('guess');

let num=[];

// window.onload = function(e){
//     newbuttonfunction();
// }

Newbutton.addEventListener("click", newbuttonfunction)
function newbuttonfunction() {
    num =[];
    let selectedDigits =[];
    document.getElementById('tbody-stat').innerHTML ='';
    document.getElementById('guess').innerHTML = '';

    let randomValueTest = document.querySelector('#key');
    
    
    num[0]= Math.floor(Math.random() * 10);
    num[1] = Math.floor(Math.random() * 10);
    num[2] = Math.floor(Math.random() * 10);

    while(num[0] == num[1]) {
        num[1]= Math.floor(Math.random() * 10);
    }
    while((num[1] == num[2]) || (num[2] == num[0])) {
        num[2] = Math.floor(Math.random() * 10);
    }
    //let num2 = Math.floor(Math.random() * 10);
    //let num3 = Math.floor(Math.random() * 10);
    randomValueTest.innerHTML = `
    ${num[0]},${num[1]},${num[2]}
    `;

    console.log(randomValueTest.innerHTML);

    digitButtons.forEach(button => {
        button.disabled = false;
    });


digitButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        selectedDigits.push(parseInt(e.target.innerHTML));
        button.disabled = true;
        guessSpan.innerHTML = selectedDigits; 
       // console.log(selectedDigits);
        if(selectedDigits.length==3){
            checkguess(selectedDigits,num)
            selectedDigits=[];
            
            digitButtons.forEach(button => {
                button.disabled = false;
            });

        }
    });
});



    
    

}








// Function to add a guess to the table
function checkguess(guess, target) {
    let strike = 0;
    let ball=0; 
    for(let i=0;i<3;i++){
        if(guess[i] == target[i]){
            strike += 1;
        }
    }

    console.log(guess)
    console.log(target)

    for (let i= 0; i < 3; i++){
        for (let j=0; j < 3; j++){
            if(i==j){
                j++;
            }
            if(guess[i]== target[j]){
                ball+= 1;
    
            }
        }
    }

    if(strike == 3){
        alert('you win')
        digitButtons.forEach(button => {
            button.disabled = true;
        });
    
    }


const tableBody = document.getElementById('tbody-stat');

   

    const guessvalue= document.createElement('td');
    const ballcount= document.createElement('td');
    const strikecount= document.createElement('td');
    guessvalue.innerHTML= guess;
    ballcount.innerHTML= ball; 
    strikecount.innerHTML= strike; 
    const tr= document.createElement('tr'); 
    tr.appendChild(guessvalue); 
    tr.appendChild(ballcount); 
    tr.appendChild(strikecount);
    tableBody.appendChild(tr);

   
    guess ='';
    
    document.getElementById('guess').innerHTML = '';

}
