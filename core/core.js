/**
 * Defines the all the core properties, methods and events that 
 * are required to run the game
 * @author Yanik Blake
 * @version 1.0
 */


let core = {
    //Global properties
    lives : 3,
    outputArray : [''],
    repoChoice: {},
    previousWord : '',

    //load a random word from the list
    loadRandomWord : function(){
        this.repoChoice = repositoryList[Math.floor(Math.random() * repositoryList.length)]
    },

    //loads a random message to the player if player win or lose
    loadRandomMsg: function(status){
        if(status){
            return winMessages[Math.floor(Math.random() * winMessages.length)]
        }else{
            return loseMessages[Math.floor(Math.random() * loseMessages.length)]
        }
    },

    //resets game
    setToDefault : function(){
        this.lives = 3
        this.outputArray = ['']
        this.repoChoice= {}
        this.previousWord = ''
        document.getElementById("lives").innerHTML=this.lives
        document.body.style.backgroundImage = "none"
        document.getElementById("hint-btn").disabled = false;
        document.getElementById("attack").className = "";
        var alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]
        for(i=0; i < alphabet.length; i++){
            document.getElementById(alphabet[i]).disabled= false;
        }
        
    },

    //setup game for gameplay
    init : function(){
        this.setToDefault();
        this.loadRandomWord()
        document.getElementById('hint-p').innerHTML = '';
        for(i=0; i < this.repoChoice.word.length; i++){
            this.outputArray[i] = "_" 
        }
        document.getElementById("output").innerHTML= this.outputArray.join(" ")
        document.getElementById("word-count").innerHTML=this.repoChoice.word.length
    },

    //load the hint for the displayed word
    loadHint : function(){
        //hide instructions if showing
       document.getElementById("instructions").style.display = "none";

       document.getElementById("hint-btn").disabled = true;
       document.getElementById("hint-btn").className = "rotate"
       document.getElementById('hint-sound').play();
       document.body.style.backgroundImage = "url('./assets/img/hint-bg.jpg')";
       //displays hint
       document.getElementById('hint-p').innerHTML = this.repoChoice.hint;
    },

    //checks if letter pressed exist in the displayed word
    //if so that key is revealed, if not player loses a life.
    crossReference: function(event){
        let char = event.value || event
        if(event.value){
           event.disabled = true;
        }else{
            document.getElementById(event).disabled= true;
        }
        //hide instructions if showing
        document.getElementById("instructions").style.display = "none";
        this.flag = 0 
        for(i = 0; i< this.repoChoice.word.length; i++ ){
            if(char == this.repoChoice.word[i].toLowerCase()){
                this.outputArray[i]= this.repoChoice.word[i]
                document.getElementById('correct-sound').pause();
                document.getElementById('correct-sound').currentTime = 0;
                document.getElementById('correct-sound').play();
                this.flag++
            }
        }

        document.getElementById("output").innerHTML= this.outputArray.join(" ")
        
        //handles incorrect inputs
        if(this.flag < 1){
            this.lives--
            this.attack(this.lives)
            document.getElementById("lives").innerHTML=this.lives
            document.getElementById('wrong-sound').pause();
            document.getElementById('wrong-sound').currentTime = 0;
            document.getElementById('wrong-sound').play()
        }
        
        //checks if player has no lives 
        //and terminates game
        if(this.lives == 0){
            alert(this.loadRandomMsg(false));
            window.location.reload()
            return;
        }

        //checks if player has figured out all the letters
        //and more to next random word
        if(this.outputArray.join("") == this.repoChoice.word){

            //remove the word that was figured out
            let index = repositoryList.indexOf(this.repoChoice)
            repositoryList.splice(index, 1)
            
            //load next word otherwise reset game
            if(repositoryList != null){
                alert(this.loadRandomMsg(true));
                this.init();
            }else{
                alert("Nice work! Never thought you would've make it to the end.. Feel free to play again");
                window.location.reload();
            }
        }
    },
    
    //displays flame animation based on player's lives
    attack: function(count){
        if(count == 0){
            document.getElementById('attack-sound').pause();
            document.getElementById('attack-sound').currentTime = 0;
            document.getElementById('attack-sound').play();
            document.getElementById("attack").className = "attack-stage-3";
        }
        if(count == 1){
            document.getElementById('attack-sound').pause();
            document.getElementById('attack-sound').currentTime = 0;
            document.getElementById('attack-sound').play();
            document.getElementById("attack").className = "attack-stage-2";
        }
        if(count == 2){
            document.getElementById('attack-sound').pause();
            document.getElementById('attack-sound').currentTime = 0;
            document.getElementById('attack-sound').play();
            document.getElementById("attack").className = "attack-stage-1";
        }
    },

    //show game instructions
    showInstructions(){
        document.getElementById("instructions").style.display = "block";
    }
}



//captures when a key is pressed on the keyboard
//then checks to see if that key is a letter
//if so that key is disabled and passed to crossReference function
document.onkeypress = function(evt) {
    evt = evt || window.event;
    var charCode = evt.keyCode || evt.which;
    var charStr = String.fromCharCode(charCode);
    var alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]
    for(i=0; i < alphabet.length; i++){
       
        if(charStr.toLowerCase() == alphabet[i]){
            if(!document.getElementById(charStr.toLowerCase()).disabled){
                core.crossReference(charStr.toLowerCase());
            }else{
                document.getElementById(charStr.toLowerCase()).disabled= true;
            }
            
            return;
        }
    }
};

///contains a array of messages to display to the user 
winMessages = [ 
                "Beginner's Luck..", 
                "Hmm.. We'll see how far u get",
                "You are getting there..",
                "Let's see you get this one..",
                "Giving you the benefit of the doubt..",
             ]
loseMessages = [ 
                "Better luck next time..", 
                "Try again when you have watched enough naruto",
                "What a drag you can't even guess a simple word..",
                "We had dumb, dumber then we have you..",
             ]