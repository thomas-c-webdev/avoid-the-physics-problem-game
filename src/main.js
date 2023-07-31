window.onload = () =>{

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

let movingParts =[]

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
  checkCollision(rect1, rect2) {
    // Same collision detection code as before
    const horizontalOverlap =
      rect1.imgX < rect2.imgX + rect2.imgWidth && rect1.imgX + rect1.imgWidth > rect2.imgX;
    const verticalOverlap =
      rect1.imgY < rect2.imgY + rect2.imgHeight && rect1.imgY + rect1.imgHeight > rect2.imgY;
    return horizontalOverlap && verticalOverlap;
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
let animationId

let intervalID

let test = 0
const gamePlay = () => {

  intervalID = setInterval(function () {
    test += 1;
}, 1000);

movingParts.push(user())

  meteors.forEach((meteor) =>{
    movingParts.push(meteor)
  })

  


  animate()
  
}



const clearHome =()=>{
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  background.drawRec()
}



class Player extends Images {
  constructor(shipId, imgX, imgY, imgWidth, imgHeight){

  super(shipId, imgX, imgY, imgWidth, imgHeight)

 

  }

  boundaries (){
    if(this.imgX <=  (0 - this.imgWidth/2) ){
      
      x =  canvas.width/1.4

    } else if ( this.imgX + (this.imgWidth/2) >= canvas.width){
      x = (0 - this.imgWidth/2 + (3))

    }


    if(this.imgY < (0 - this.imgHeight/2)){

      y = canvas.height/2

    } else if (this.imgY + (this.imgHeight/2) >= canvas.height){

      y = (0 - this.imgHeight/2 )
    }
  }

  detectMeteors(){
//predicated on the player ship being the first in the array
    for(let i = 0, j = 1; i < movingParts.length; j++){
      if(this.checkCollision(movingParts[i], movingParts[j])){
        // pause
        //require a question
        //reverse meteor direction
        
      }

    }
/*
for (let i = 0; i < rectangles.length; i++) {
  for (let j = i + 1; j < rectangles.length; j++) {
    if (checkCollision(rectangles[i], rectangles[j])) {
      // Collision detected between rectangles[i] and rectangles[j]
      console.log(`Collision between rectangles ${i} and ${j}`);
    }
  }
}

*/



  }
  
}

let x = 250
let y = 50




const user =()=>{
  const playerShip = new Player(shipSetting, x, y, 350, 350)
  movingParts.push(playerShip)
  return playerShip
}  

const drawPlayer = () => {
  user().imgX = x
  user().imgY = y
  user().drawShip()
  user().boundaries()


  console.log(movingParts)
 // user().detectMeteors()
};

// Register the keydown event listener outside the drawPlayer function
canvas.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowLeft') {
    x -= 4
  } else if (event.key === 'ArrowRight') {
    x += 4
  } else if (event.key === 'ArrowUp'){
    y -= 4
    event.preventDefault();
  } else if (event.key === 'ArrowDown'){
    y += 4
    event.preventDefault();
  }

});






class Meteor extends Images {
  constructor(shipId, imgX, imgY, imgWidth, imgHeight, xVelocity, yVelocity){
    super(shipId, imgX, imgY, imgWidth, imgHeight)
    this.xVelocity = xVelocity
    this.yVelocity = yVelocity

   
}

update(){
 this.imgX += this.xVelocity 
  this.imgY += this.yVelocity

//canvas boundaries
if( this.imgX  < -60 || this.imgX  > canvas.width - (this.imgWidth - 60)){
  this.xVelocity = this.xVelocity * -1
}
if( this.imgY  < -40 || this.imgY + (this.imgHeight/2) > canvas.height){
  this.yVelocity = this.yVelocity * -1
}
}

/*

- detect player
- pause game/animation 
- write text to solve the question

- if the player solves the question right, reverse meteor direction

*/

}
  
const meteor1 = new Meteor('meteor-1', canvas.width/12, canvas.height/12, 300, 300, 1, 3)
const meteor2 = new Meteor('meteor-2', canvas.width/1.5, canvas.height/12, 300, 300, 2, 1)
const meteor3 = new Meteor('meteor-3', canvas.width/1.5, canvas.height/2, 150, 150, 3, 2)



let meteors = [meteor1, meteor2, meteor3 ]

meteors.forEach ((meteor) => {
  movingParts.push(meteor)
})

const makeMeteor = ()=>{

  return meteors
  

}


const score =()=>{
  const scoreText = new CanvasText('Score: ' + test, canvas.width/1.2, canvas.height/1.1, 'white')
  scoreText.writeText('20px Arial')
}

const restart =()=>{
  const homeRect = new CanvasRects(20, canvas.height/1.2, canvas.width/11, canvas.height/8, "grey")
 homeRect.drawRec()
 homeRect.restartRect(homeRect)

 const homeText = new CanvasText('Home', 30, canvas.height/1.1, 'white')
 homeText.writeText('20px Arial')
 return homeRect
}

const animate = () =>{
    clearHome()
    drawPlayer()
    score()
    restart()

    const meteors = makeMeteor();

    meteors.forEach((meteor) => {
      meteor.update();
      meteor.drawShip();
      
    });
  

 animationId = requestAnimationFrame(animate);
}
 

canvas.addEventListener('click', function() {
  if(playing === false){
    return
  }

  if (mouseX >= restart().x && mouseX <=  (restart().x + restart().width )){
    if (mouseY >= restart().y && mouseY <= (restart().y + restart().height)) {
      //will need to clear the animation here once we get to that

      cancelAnimationFrame(animationId);      
      clearHome()
      allRecs()
  
      authorText.writeText('15px Arial')
      playText.writeText('70px Arial')
      drawShips()

      playing = false
      
      clearInterval(intervalID)
      test = 0  
    } 
  }

})
}