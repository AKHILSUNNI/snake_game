const can = document.getElementById("snakeHtml");
const con = can.getContext("2d");

var box = 32;
var d = null;
var score = 0;
var collis_var = false;
var gameWin = false;

// to create seperate levels

var  op = 1;

//upload images

var bg = new Image();
bg.src = "image/ground.png";

var food =  new Image();
food.src = "image/food.png";

var bidFood =  new Image();
bidFood.src = "image/bigFood.png";

var snakeHead = new Image();
snakeHead.src = "image/snakeHead.jpeg";

var brick = new Image();
brick.src = "image/brick.jpeg";

var brick2 = new Image();
brick2.src = "image/brick2.jpeg";

//upload audio 

var dead = new Audio();
dead.src = "audio/audio_dead.mp3";

var eat = new Audio();
eat.src = "audio/audio_eat.mp3";

var levelUp = new Audio();
levelUp.src = "audio/levelUp.wav";

var winner =  new Audio();
winner.src = "audio/winner.mp3";


//creating an object for food

var Food ={
    x : Math.floor(Math.random()*17 + 1),
    y : Math.floor(Math.random()*15 + 3)
}

// create the snake body

let  snake = [];
snake[0] = {
    x : 9*box ,
    y : 10*box
}

//levels

const level_2 = [
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
 ]

 const level_3 = [
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [1,1,1,1,1,1,1,0,0,0,0,0,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [0,0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0,0,0],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,0,0,0,0,0,1,1,1,1,1,1,1],
 ]

// creating motion listener

document.addEventListener("keydown",(ev) =>{
    if(ev.keyCode === 37 && d != "right"){
        d = "left";
    }
    else if(ev.keyCode === 38 && d != "down"){
        d = "up";
    }
    else if(ev.keyCode === 39 && d != "left"){
        d = "right";
    }
    else if(ev.keyCode === 40 && d != "up"){
        d = "down";
    }
})

// to create reload

document.addEventListener("mousedown",(ev) =>{
    let mouse = {
        x : ev.x - can.offsetLeft,
        y : ev.y - can.offsetTop 
    }
    if(collis_var){
    if(mouse.x >= 304 && mouse.y >= 312 && mouse.x < 424 && mouse.y < 338){
        location.reload();
    }
 }

})

//to create dynamic stroke

document.addEventListener("mousemove",(ev) =>{
    let mouse = {
        x : ev.x - can.offsetLeft,
        y : ev.y - can.offsetTop 
    }
    if(collis_var){
    if(mouse.x >= 304 && mouse.y >= 312 && mouse.x < 424 && mouse.y < 338){
        con.strokeStyle ="red";
        con.strokeRect(can.width/2,can.height/2+.25*box,3.75*box,1*box);
    }
 }

})

// to create replay 

document.addEventListener("mousedown",(ev) =>{
    let mouse = {
        x : ev.x - can.offsetLeft,
        y : ev.y - can.offsetTop 
    }
    if(gameWin){
    if(mouse.x >= 304 && mouse.y >= 312 && mouse.x < 424 && mouse.y < 338){
        location.reload();
    }
 }

})

//to create dynamic replay text

document.addEventListener("mousemove",(ev) =>{
    let mouse = {
        x : ev.x - can.offsetLeft,
        y : ev.y - can.offsetTop 
    }
    if(gameWin){
    if(mouse.x >= 304 && mouse.y >= 312 && mouse.x < 424 && mouse.y < 338){
        con.fill ="black";
        con.strokeRect(can.width/2,can.height/2+.25*box,3.75*box,1*box);
        con.fillStyle = "black";
        con.font = "28px verdana";
        con.fillText("REPLAY",304,336);
    }
 }

})

//function to check whether the body get colide or not

function bodymeet(head,snake){
    for(let i = 1 ; i < snake.length ; i++){
    if(head.x == snake[i].x && head.y == snake[i].y){
        return true;
    }
   }
    return false;
}

// to check collision

function collision(){
    collis_var = true;
    dead.play();
    clearInterval(game);
}

//draw

function draw(){
     if(op == 1){
        con.drawImage(bg,0,0);    
    
        if(score == 0){
        con.drawImage(food,Food.x*box,Food.y*box);
        }
        
        //creating snake body
        
        for(let i=0 ;i < snake.length ;i++){
            con.fillStyle = (i === 0)? "green" : "white";
            con.fillRect(snake[i].x,snake[i].y,box,box);
            con.strokeStyle = "red";
            con.strokeRect(snake[i].x,snake[i].y,box,box);
        }
        
        // old head position
    
        let snakeX = snake[0].x;
        let snakeY = snake[0].y;
    
        //creating movement
    
        if(d === "left") snakeX = snake[0].x - 1*box; 
        if(d === "up") snakeY = snake[0].y - 1*box;
        if(d === "right") snakeX = snake[0].x + 1*box;
        if(d === "down") snakeY = snake[0].y + 1*box;
    
        //if food eatten snake grows
    
        if(snake[0].x == Food.x*box && snake[0].y == Food.y*box){
            score++
            eat.play();
             Food = {
                x : Math.floor(Math.random()*17 + 1),
                y : Math.floor(Math.random()*15 + 3)
            }
        }
        else{
            snake.pop();
        }
    
        let newHead = {
            x : snakeX,
            y : snakeY
        }
        snake.unshift(newHead);
        
        //creating score
    
        con.fillStyle = "black";
        con.font = "26px Changa one";
        con.fillText("SCORE : "+score,2*box,1.5*box);

        //collision
    
        if(bodymeet(newHead,snake)){
            collision();
        }

        // snake level 1 

        if(newHead.x < 1*box)
          newHead.x = newHead.x + 17*box;
        if(newHead.y < 3*box)
          newHead.y = 17*box;
        if(newHead.x > 17*box)
          newHead.x = 1*box;
        if(newHead.y > 17*box)
          newHead.y = 3*box;
    
        // creating reload button
    
        if(collis_var){
            con.fillStyle = "white";
            con.fillRect(304,312,120,32);
    
            con.fillStyle = "black";
            con.font = "28px verdana";
            con.fillText("RELOAD",304,336);
        }

        // creating level name

        con.fillStyle = "black";
        con.font = "26px Changa one";
        con.fillText("LEVEL : "+op,15*box,1.5*box);

        
        //to create bonuds food
      
        if(score != 0){
            if(score % 5 == 0){
                con.drawImage(bidFood,Food.x*box,Food.y*box);
                if(newHead.x  == Food.x*box && newHead.y == Food.y*box){
                    score = score + 2;
                  } 
               }
               else{
                   con.drawImage(food,Food.x*box,Food.y*box);
               }
            }
            if(score >= 40){
                op = 2;
                d = null;
                snake = [];
                snake[0] = {
                    x : 9*box,
                    y : 10*box
                }
                score = 0 ;
            }
         }

     if(op == 2){
     if(d == null){
       levelUp.play();
     }
    con.drawImage(bg,0,0);    
    
    if(score == 0){
    con.drawImage(food,Food.x*box,Food.y*box);
    }
    
    //creating snake body
    
    for(let i=0 ;i < snake.length ;i++){
        con.fillStyle = (i === 0)? "green" : "white";
        con.fillRect(snake[i].x,snake[i].y,box,box);
        con.strokeStyle = "red";
        con.strokeRect(snake[i].x,snake[i].y,box,box);
    }
    
    // old head position

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    //creating movement

    if(d === "left") snakeX = snake[0].x - 1*box; 
    if(d === "up") snakeY = snake[0].y - 1*box;
    if(d === "right") snakeX = snake[0].x + 1*box;
    if(d === "down") snakeY = snake[0].y + 1*box;

    //if food eatten snake grows

    if(snake[0].x == Food.x*box && snake[0].y == Food.y*box){
        score++
        eat.play();
         Food = {
            x : Math.floor(Math.random()*17 + 1),
            y : Math.floor(Math.random()*15 + 3)
        }
    }
    else{
        snake.pop();
    }

    let newHead = {
        x : snakeX,
        y : snakeY
    }
    snake.unshift(newHead);
    
    //creating score

    con.fillStyle = "black";
    con.font = "26px Changa one";
    con.fillText("SCORE : "+score,2*box,1.5*box);

        //creating level 2 blocks

        for(var i= 0 ; i < 19 ; i++){
            for(var j= 0 ; j < 19 ; j++){
                
                //to create an object for level 2
    
                
                if(level_2[j][i] == 1){
                    var level_1_ob ={
                    x : i*box,
                    y : j*box
                   }

                   // to check whether food and block came at same position
                   
                   if(Food.x*box == level_1_ob.x && Food.y*box == level_1_ob.y){
                     Food ={
                        x : Math.floor(Math.random()*17 + 1),
                        y : Math.floor(Math.random()*15 + 3)
                    }
                   }
    
                   //to check collison
    
                   if(level_1_ob.x == newHead.x && level_1_ob.y == newHead.y){
                       collision();
                   }
                    con.drawImage(brick,level_1_ob.x,level_1_ob.y);
                    con.strokeStyle = "green";
                    con.strokeRect(level_1_ob.x,level_1_ob.y,box,box);
                }
    
            }
        }
    
        

    //collision

    if(newHead.x < 1*box || newHead.x > 17*box || newHead.y < 3*box || newHead.y > 17*box || bodymeet(newHead,snake)){
        collision();
    }

    // creating reload button

    if(collis_var){
        con.fillStyle = "white";
        con.fillRect(304,312,120,32);

        con.fillStyle = "black";
        con.font = "28px verdana";
        con.fillText("RELOAD",304,336);
    }
    // creating level name

    con.fillStyle = "black";
    con.font = "26px Changa one";
    con.fillText("LEVEL : "+op,15*box,1.5*box);

    //to create bonuds food
  
    if(score != 0){
        if(score % 5 == 0){
            con.drawImage(bidFood,Food.x*box,Food.y*box);
            if(newHead.x  == Food.x*box && newHead.y == Food.y*box){
                score = score + 2;
              } 
           }
           else{
               con.drawImage(food,Food.x*box,Food.y*box);
           }
        }
        
        if(score >= 30){
            op = 3;
            d = null;
            snake = [];
            snake[0] = {
                x : 9*box,
                y : 10*box
            }
            score = 0 ;
        }
     }

 if(op == 3){
    if(d == null){
        levelUp.play();
      }

    con.drawImage(bg,0,0);    
    
    if(score == 0){
    con.drawImage(food,Food.x*box,Food.y*box);
    }
    
    //creating snake body
    
    for(let i=0 ;i < snake.length ;i++){
        con.fillStyle = (i === 0)? "green" : "white";
        con.fillRect(snake[i].x,snake[i].y,box,box);
        con.strokeStyle = "red";
        con.strokeRect(snake[i].x,snake[i].y,box,box);
    }
    
    // old head position

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    //creating movement

    if(d === "left") snakeX = snake[0].x - 1*box; 
    if(d === "up") snakeY = snake[0].y - 1*box;
    if(d === "right") snakeX = snake[0].x + 1*box;
    if(d === "down") snakeY = snake[0].y + 1*box;

    //if food eatten snake grows

    if(snake[0].x == Food.x*box && snake[0].y == Food.y*box){
        score++
        eat.play();
         Food = {
            x : Math.floor(Math.random()*17 + 1),
            y : Math.floor(Math.random()*15 + 3)
        }
    }
    else{
        snake.pop();
    }

    let newHead = {
        x : snakeX,
        y : snakeY
    }
    snake.unshift(newHead);
    
    //creating score

    con.fillStyle = "black";
    con.font = "26px Changa one";
    con.fillText("SCORE : "+score,2*box,1.5*box);

        //creating level 3 blocks

        for(var i= 0 ; i < 19 ; i++){
            for(var j= 0 ; j < 19 ; j++){
                
                //to create an object for level 3
    
                
                if(level_3[j][i] == 1){
                    var level_1_ob ={
                    x : i*box,
                    y : j*box
                   }

                   // to check whether food and block came at same position
                   
                   if(Food.x*box == level_1_ob.x && Food.y*box == level_1_ob.y){
                     Food ={
                        x : Math.floor(Math.random()*17 + 1),
                        y : Math.floor(Math.random()*15 + 3)
                    }
                   }
    
                   //to check collison
    
                   if(level_1_ob.x == newHead.x && level_1_ob.y == newHead.y){
                       collision();
                   }
                    con.drawImage(brick2,level_1_ob.x,level_1_ob.y);
                    con.strokeStyle = "green";
                    con.strokeRect(level_1_ob.x,level_1_ob.y,box,box);
                }
    
            }
        }
    
        

    //collision

    if(bodymeet(newHead,snake)){
        collision();
    }

    // level 3 movement

    if(newHead.x < 1*box && newHead.y >= 8*box && newHead.y <= 11*box )
      newHead.x = 17*box ;
    if(newHead.x > 17*box && newHead.y >= 8*box && newHead.y <= 11*box )
      newHead.x = 1*box;
    if(newHead.y < 2*box && newHead.x >= 7*box && newHead.x <= 11*box )
      newHead.y = 17*box;
    if(newHead.y > 17*box && newHead.x >= 7*box && newHead.x <= 11*box )
      newHead.y = 2*box;
    // creating reload button

    if(collis_var){
        con.fillStyle = "white";
        con.fillRect(304,312,120,32);

        con.fillStyle = "black";
        con.font = "28px verdana";
        con.fillText("RELOAD",304,336);
    }
    // creating level name

    con.fillStyle = "black";
    con.font = "26px Changa one";
    con.fillText("LEVEL : "+op,15*box,1.5*box);

    //to create bonuds food
  
    if(score != 0){
        if(score % 5 == 0){
            con.drawImage(bidFood,Food.x*box,Food.y*box);
            if(newHead.x  == Food.x*box && newHead.y == Food.y*box){
                score = score + 2;
              } 
           }
           else{
               con.drawImage(food,Food.x*box,Food.y*box);
           }
        }
    //when gamer wins the game

    if(score == 25){

        gameWin = true;
        clearInterval(game);

    }

    // creating replay button

    if(gameWin){
        winner.play();
        con.fillStyle = "white";
        con.font = "50px verdana";
        con.fillText("WINNER...WINNER",104,150);
        con.fillStyle = "red";
        con.fillRect(304,312,120,32);

        con.fillStyle = "white";
        con.font = "28px verdana";
        con.fillText("REPLAY",304,336);
    }
 }
}

draw();


var game =  setInterval(draw,150);