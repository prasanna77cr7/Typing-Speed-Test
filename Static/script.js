const sentences=[ "When I've built up my savings, I'll be able to travel to Mexico.",
"Wouldn't it be lovely to enjoy a week soaking up the culture?",
"The plots failed because of some trusted friends of the king.",
"After the death of the king, everyone wanted to be a king.",
"Your love makes me strong, Your hate makes me unstoppable.",
"War does not bring anything good to the common people.",
"If opportunity doesn't knock, build a door."]
const len=sentences.length;
var total_err=0
var error=0
var wpm=0
var characterTyped=0
var accuracy=0
var correct_char=0
var timer=null
var time_elapsed=0
var texttotype=document.getElementById("texttotype")
function getsentence()
{
    texttotype.textContent=null;
    var text=sentences[Math.floor(Math.random()* len)];
    text.split('').forEach(char => { 
        const cspan = document.createElement('span') 
        cspan.innerText = char 
        texttotype.appendChild(cspan) 
      }) 
}
getsentence();
function process(){
    curr_input = document.querySelector('.input_text').value; 
    document.querySelector('.input_text').addEventListener('keydown',(e)=>{
        if(e.key=='Enter'){
           show_results();
        }
    })
    curr_input_arr = curr_input.split(''); 
    
    characterTyped++; 
    
    errors = 0; 
    quote_arr=texttotype.querySelectorAll('span');
    quote_arr.forEach((char, index) => { 
        let curr_char = curr_input_arr[index] 
      
        if (curr_char == null) { 
          char.classList.remove('correct'); 
          char.classList.remove('incorrect'); 
      
        } else if (curr_char === char.innerText) { 
          char.classList.add('correct'); 
          char.classList.remove('incorrect'); 
      
        } else { 
          char.classList.add('incorrect'); 
          char.classList.remove('correct'); 
      
          errors++; 
        } 
      });
    correct_char = (characterTyped - (total_err + errors)); 
    wpm = Math.round((((characterTyped / 5) / time_elapsed) * 60)); 
    accuracy = ((correct_char / characterTyped) * 100); 

}
function start_game()
{   
    clearInterval(timer)
    console.log(timer)
    timer=setInterval(updatetimer,1000)
}
function updatetimer(){
    time_elapsed++;
}
function reset()
{
   time_elapsed = 0; 
   errors = 0; 
   total_err = 0; 
   accuracy = 0; 
   characterTyped = 0; 
   wpm=0;
   getsentence();
   document.querySelector('.input_text').value="";
   document.querySelector('.input_text').disabled=false;
   document.querySelector(".r1").textContent="";
   document.querySelector(".r2").textContent="";
   document.querySelector(".r3").textContent="";

}

function show_results(){
    document.querySelector(".r1").textContent="TIME: "+time_elapsed+"sec";
    document.querySelector(".r2").textContent="ACCURACY: "+Math.floor(accuracy);
    document.querySelector(".r3").textContent="WPM: "+wpm;
    console.log(accuracy,wpm);
    console.log(time_elapsed)
}