window.onload = () =>{
  /* 
  question()
    submitAnsw()
    canvasSize()
    initialCar()
    */

/*
const canvas = ()=>{
  const cv = document.getElementById('anim')   
  return cv
} 

const draw = () =>{
  const shape = canvas().getContext('2d')
  return shape

*/

//global
const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

let shipSetting =''
let playing = false
let mouseX, mouseY

function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}

  canvas.addEventListener('click', function(evt){
    let mousePos = getMousePos(canvas, evt)
   mouseX = mousePos.x
   mouseY = mousePos.y
   } )



/*
canvas.addEventListener('mousemove', function(evt) {
  var mousePos = getMousePos(canvas, evt);
  console.log('Mouse position: ' + mousePos.x + ',' + mousePos.y);
}, false);
*/



/*
canvas.addEventListener('click', function(evt) {
  return mousePos = (getMousePos(canvas, evt))

})
*/




/*Note: In the polish phase, we'll need to make the canvas height and width more 
adaptabl to window changes */
canvas.width = window.innerWidth/1.5
canvas.height = window.innerHeight/1.5 //When we want to make this reponsize, we'll come back here.

class CanvasText {
  constructor(text, xPos, yPos, color){
    this.text = text;
    this.xPos = xPos;
    this.yPos = yPos;
    this.color = color;
  }
  writeText(sizefont){
    ctx.fillStyle = "white"
    ctx.font = sizefont
    ctx.fillText(this.text, this.xPos, this.yPos)
  }
}
const playText = new CanvasText('Play', canvas.width/2.30, canvas.height/1.1, 'white')
const authorText = new CanvasText('By Thomas Czernek', canvas.width/1.3, canvas.height/1.1, 'white')

class CanvasRects {
  constructor(x, y, width, height, color, setting){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.setting = setting;
  }
  drawRec (){
    ctx.fillStyle = this.color
    ctx.fillRect(this.x, this.y, this.width, this.height)
  }
  clickHomeRects (objs, set){
    if(playing){
      return
    }


    canvas.addEventListener('click', function(evt) {

      if(playing){
        return
      }
      let mousePos = (getMousePos(canvas, evt))
    
      if (mouseX >= objs[set].x && mouseX <=  (objs[set].x + objs[set].width )){
        if (mouseY >= objs[set].y && mouseY <= (objs[set].y + objs[set].height)) {
         
          for(let i = 0; i < objs.length; i++){
            ctx.fillStyle = 'white'
            ctx.fillRect(objs[i].x, objs[i].y, objs[i].width, objs[i].height)
          }
          ctx.fillStyle = 'red'
          ctx.fillRect(objs[set].x, objs[set].y, objs[set].width, objs[set].height) 
        shipSetting = objs[set].setting

          alienShip.drawShip()
          humanShip.drawShip()
          triShip.drawShip()
       }
      }
    });
  }
    restartRect(button){

      canvas.addEventListener('click', function() {
      
        if (mouseX >= button.x && mouseX <=  (button.x + button.width )){
          if (mouseY >= button.y && mouseY <= (button.y + button.height)) {
            //will need to clear the animation here once we get to that

            if(playing === false){
              return
            }
          
            clearHome()
            allRecs()
            
            authorText.writeText('15px Arial')
            playText.writeText('70px Arial')
            drawShips()
          
            playing = false



          }
        }

    })
  }
  playButton(play){

    if(playing){
      return
    }

      if (mouseX >= play.x && mouseX <=  (play.x + play.width )){
        if (mouseY >= play.y && mouseY <= (play.y + play.height)) {
          

          
          playing = true


          gamePlay()

        }
      }
  }

}
const background = new CanvasRects(0, 0, canvas.width, canvas.height, "black")


const rectY = canvas.height/7
const rectWidth = canvas.width/4
const rectHeight = canvas.height/2.2

const square1 = new CanvasRects(38, rectY, rectWidth, rectHeight, "white", 'ship-1')
const square2 = new CanvasRects(canvas.width/2.7, rectY, rectWidth, rectHeight, "white", 'ship-2')
const square3 = new CanvasRects(canvas.width/1.48, rectY, rectWidth, rectHeight, "white", 'ship-3')
const playSquare = new CanvasRects(canvas.width/3, canvas.height-(canvas.height/3.2), canvas.width/3, canvas.height/3.4, "silver")

const menuElements = [background, playSquare, square1, square2, square3]
const shipChoice = [square1, square2, square3]

const allRecs =()=>{
for(let i = 0; i < menuElements.length; i++){
  menuElements[i].drawRec()
  }
}
allRecs()



shipChoice.forEach(function(element){
	element.clickHomeRects(shipChoice, shipChoice.indexOf(element));
});



authorText.writeText('15px Arial')
playText.writeText('70px Arial')

class Images {
  constructor(shipId, imgX, imgY, imgWidth, imgHeight){
    this.shipId = shipId;
    this.imgX = imgX;
    this.imgY = imgY;
    this.imgWidth = imgWidth;
    this.imgHeight = imgHeight;
  }
  drawShip(){
  let ship = document.getElementById(this.shipId)
  ctx.drawImage(ship, this.imgX, this.imgY, this.imgWidth, this.imgHeight)

  }
}


const alienShip = new Images('ship-1',  -25, canvas.height/20, 350, 350)
const humanShip = new Images('ship-2', canvas.width/3.4, 10, 350, 350)
const triShip = new Images('ship-3', canvas.width/1.67, -10, 350, 350)

const drawShips = ()=>{
alienShip.drawShip()
humanShip.drawShip()
triShip.drawShip()
}
drawShips()

canvas.addEventListener('click', function(){
  playSquare.playButton(playSquare)
}
)


//Start of the actual gamplay


const gamePlay = () => {
  animate()
  //clearHome()
  //drawPlayer()
}



const clearHome =()=>{
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  background.drawRec()


}

const drawPlayer =()=>{
  const playerShip = new Images(shipSetting,  canvas.width/3.3, canvas.height/3, 350, 350)
  playerShip.drawShip()
}

const score =()=>{
  const scoreText = new CanvasText('Score: 0 ', canvas.width/1.2, canvas.height/1.1, 'white')
  scoreText.writeText('20px Arial')
}

const restart =()=>{
  const homeRect = new CanvasRects(20, canvas.height/1.2, canvas.width/11, canvas.height/8, "grey")
 homeRect.drawRec()
 homeRect.restartRect(homeRect)

 const homeText = new CanvasText('Home', 30, canvas.height/1.1, 'white')
 homeText.writeText('20px Arial')

}


//Note we may draw the meteors as a function, but then rewrite it later as a sub-class to replicate them on score increments









const animate = () =>{

    clearHome()
    drawPlayer()
    score()
    restart()
 // requestAnimationFrame(animate);
}













//let ship1 = new CanvasRects(canvas.width/15, canvas.height/7, canvas.width/4, canvas.height/2, "white")
//background.drawRec()
//ship1.drawRec()



}
/*
const question =()=>{
   const ques = document.getElementById("question")
   ques.innerHTML = "A vehicle is traveling down the road with a mass of " + massNum(1500, 10000) + " kg and an acceleration of " + accelNum(1, 70) + " m/s^2. How much force is it moving with?" 
   
}

let probNum = []

const massNum = (min, max) =>{
    let mass = Math.floor(Math.random()* (max - min)) + min
    probNum[0] = mass
    return insertComma(mass)
}

const accelNum = (min, max) =>{
    let accel = Math.floor(Math.random()* (max - min)) + min
    probNum[1] = accel
    return insertComma(accel)
}

const insertComma = (number) => { //this function takes any number, deconstructs, and converts it to string version of that number with commas
  let strNum = number.toString();
  let mod = [];

    if (strNum.length <= 3) {
      return number;
    }
    
  for (let i = strNum.length-1; i > -1; --i) {

    if (i === 0) {
      mod.unshift(strNum[i]);    
      return mod.join("");
    }

    mod.unshift(strNum[i]);
    if (mod.join("").replace(/,/g, '').length % 3 === 0) { //if the length of the original number is divisible cleanly by 3, we add a comma.
      mod.unshift(",");
    }
  }
};

const submitAnsw = () =>{
    document.getElementById("Check").addEventListener("click", checkAnsw)
}
 
const checkAnsw = ()=>{
    
    let resultMes = document.getElementById("message")
    const submit = document.getElementById("answer").value
    let answer = probNum[0]* probNum[1]
    if (answer == submit || submit == insertComma(answer)){
        
        resultMes.innerHTML= "That's correct! Good Job!"
        document.getElementById('Next').style.display = 'inline-block'
        nextBut()
        animate()

    }
    else {
        resultMes.innerHTML = "Not quite. Youre almost there. Keep going!"
    }
}

const nextQues =()=>{
    question()
    submitAnsw()
    clear()
}

const nextBut =()=>{
  const next = document.getElementById("Next")
  next.addEventListener("click", nextQues)
}
const clear =()=>{
    document.getElementById("message").innerHTML = ""
    document.getElementById("answer").value = ""
    document.getElementById('Next').style.display = 'none'
}

const canvas = ()=>{
    const cv = document.getElementById('anim')   
    return cv
} 

const draw = () =>{
    const shape = canvas().getContext('2d')
    return shape
}
    
const canvasSize =()=>{
    canvas().width = window.innerWidth/2
    canvas().height = window.innerHeight/2
    //resize 
    window.addEventListener('resize', () => {
    canvas().width = window.innerWidth/2
    canvas().height = window.innerHeight/2
    draw().fillRect(xPos, canvas().height/2.5, 50, 50);
})
}

let xPos = 0

const initialCar = () =>{
    draw().fillRect(xPos, canvas().height/2.5, 50, 50);
}    

const animate = () =>{
    
    draw().clearRect(0, 0, canvas().width, canvas().height)
    
    xPos = xPos + 2
    
    draw().fillRect(xPos, canvas().height/2.5, 50, 50);
    
    requestAnimationFrame(animate);
}



/*

      // reset canvas function
      function resetCanvas() {
        // stop animation
        cancelAnimationFrame(requestAnimationFrame(animate));

        // reset rectangle position
        x = 50;
        y = 50;

        // clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // restart animation
        animate();
      }

      // add event listener to reset button
      const resetBtn = document.getElementById('resetBtn');
      resetBtn.addEventListener('click', resetCanvas);
    </script>

*/

