window.onload = () =>{
    question()
    submitAnsw()
    canvasSize()
    initialCar()
}

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

