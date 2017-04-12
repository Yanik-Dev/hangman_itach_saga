

let core = {
    lives : 3,
    outputArray : [''],
    repoChoice: '',
    previousWord : '',

    loadRandomWord : function(){
        this.repoChoice = repositoryList[Math.floor(Math.random() * repositoryList.length)]
    },
    setToDefault : function(){
        this.lives = 3
        this.outputArray = ['']
        this.repoChoice= ''
        this.previousWord = ''
        document.getElementById("lives").innerHTML=this.lives
        document.body.style.backgroundImage = "none"
        document.getElementById("hint-btn").disabled = false;
    },
    init : function(){
        this.setToDefault();
        this.loadRandomWord()
        for(i=0; i < this.repoChoice.word.length; i++){
            this.outputArray[i] = "_" 
        }
        document.getElementById("output").innerHTML= this.outputArray.join(" ")
        document.getElementById("word-count").innerHTML=this.repoChoice.word.length
    },

    loadHint : function(){
       document.getElementById("hint-btn").disabled = true;
       document.getElementById("hint-btn").className = "rotate"
       document.getElementById('hint-sound').play();
       document.body.style.backgroundImage = "url('./assets/img/hint-bg.jpg')";
    },

    crossReference: function(event){
        let char = event.value || event
        if(event.value){
           event.disabled = true;

        }
    
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

        if(this.flag < 1){
            this.lives--
            this.attack(this.lives)
            document.getElementById("lives").innerHTML=this.lives
             document.getElementById('wrong-sound').pause();
            document.getElementById('wrong-sound').currentTime = 0;
            document.getElementById('wrong-sound').play()
        }
        if(this.lives == 0){
            //alert("You have exhausted your chakra... ");
            //window.location.reload()
            return;
        }
        if(this.outputArray.join("") == this.repoChoice.word){
            alert("You won... ");
        }
    },
    attack: function(count){
        if(count == 0){
            document.getElementById("attack").className = "attack-stage-3";
        }
        if(count == 1){
            document.getElementById("attack").className = "attack-stage-2";
        }
        if(count == 2){
            document.getElementById("attack").className = "attack-stage-1";
        }
    }
}

core.init()

//capture keypress events
document.onkeypress = function(evt) {
    evt = evt || window.event;
    var charCode = evt.keyCode || evt.which;
    var charStr = String.fromCharCode(charCode);
    var alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]
    for(i=0; i < alphabet.length; i++){
        if(charStr.toLowerCase() == alphabet[i]){
            if(!document.getElementById(alphabet[i]).disabled){
                core.crossReference(charStr.toLowerCase());
            }
            document.getElementById(alphabet[i]).disabled= true;

            return;
        }
    }
};