document.addEventListener('DOMContentLoaded', () =>{
    const grid = document.querySelector('.grid');
    const width = 8;
    const scoreDisplay = document.getElementById('score');
    const squares = [];
    let score=0;

    const candyColors = [
        'url(images/blue_candy.png)',
        'url(images/red_candy.png)',
        'url(images/green_candy.png)',
        'url(images/purple_candy.png)',
        'url(images/yellow_candy.png)',
        'url(images/orange_candy.png)'
    ]



    //create a board

    function createBoard(){
        for (let i=0; i<width*width; i++){
            const square = document.createElement('div');
            square.setAttribute('id',i);
            square.setAttribute('draggable',true);
            const randomCandy = Math.floor(Math.random() * candyColors.length);
            square.style.backgroundImage = candyColors[randomCandy];
            grid.appendChild(square);
            squares.push(square);
        }
    }
    createBoard();

    //dragging the candy

    let candyBeingDragged;
    let candyBeingReplaced;
    let candyIdBeingDragged;
    let candyIdBeingReplaced;
    

    squares.forEach(square => square.addEventListener('dragstart',dragStart));
    squares.forEach(square => square.addEventListener('dragend',dragEnd));
    squares.forEach(square => square.addEventListener('dragover',dragOver));
    squares.forEach(square => square.addEventListener('dragenter',dragEnter));
    squares.forEach(square => square.addEventListener('dragleave',dragLeave));
    squares.forEach(square => square.addEventListener('drop',dragDrop));

    function dragStart(){
        candyBeingDragged = this.style.backgroundImage;
        candyIdBeingDragged = parseInt(this.id);
        //console.log(candyIdBeingDragged);
    }

    function dragOver(e){
        e.preventDefault();
    }

    function dragEnter(e){
        e.preventDefault();
    }

    function dragLeave(){
        this.style.backgroundImage = '';
    }

    function dragDrop(){
        candyBeingReplaced = this.style.backgroundImage;
        
        candyIdBeingReplaced = parseInt(this.id);
        this.style.backgroundImage = candyBeingDragged;
        squares[candyIdBeingDragged].style.backgroundImage = candyBeingReplaced;
        
    }

    function dragEnd(){
        const validMoves = [candyIdBeingDragged-1 , candyIdBeingDragged - width , candyIdBeingDragged + 1 ,candyIdBeingDragged + width];
        let validMove = validMoves.includes(candyIdBeingReplaced);

        if(candyIdBeingReplaced && validMove){
            candyIdBeingReplaced = null;
        }else if(candyIdBeingReplaced && !validMove){
            squares[candyIdBeingReplaced].style.backgroundImage = candyBeingReplaced;
            squares[candyIdBeingDragged].style.backgroundImage = candyBeingDragged;
        }else{
            squares[candyIdBeingDragged].style.backgroundImage = candyBeingDragged;
        }
    }

    
    //moving candies down

    function moveDown(){
        for(let i=0;i<=55;i++){
            if(squares[i+width].style.backgroundImage === ''){
                squares[i+width].style.backgroundImage = squares[i].style.backgroundImage;
                squares[i].style.backgroundImage = '';
            }

            if(squares[i].style.backgroundImage === ''){
                const firstRow = [0,1,2,3,4,5,6,7];
                if(firstRow.includes(i)){
                    let randomCandy = Math.floor(Math.random() * candyColors.length);
                    squares[i].style.backgroundImage = candyColors[randomCandy];
                }
            }

        }
    }

    moveDown();


    //check for matches


      
    checkRowOfFive();
    checkColumnOfFive();
    checkRowOfFour();
    checkColumnOfFour();
    checkRowOfThree();
    checkColumnOfThree();

    
    
    
    //check for row of three

    function checkRowOfThree(){
        for(let i=0;i<=61;i++){
            const rowOfThree = [i, i+1,i+2];
            const decidedCandy = squares[i].style.backgroundImage;
            const isBlank = squares[i].style.backgroundImage === '';

            const inValid = [6,7,14,15,22,23,30,31,38,39,46,47,54,55];
            if(inValid.includes(i))continue;

            if(rowOfThree.every(index => squares[index].style.backgroundImage === decidedCandy) && !isBlank){
                score+=3;
                scoreDisplay.innerHTML = score;
                rowOfThree.forEach(index => {
                    squares[index].style.backgroundImage = '';
                })
            }
        }
    }
    

    //check for row of four

    function checkRowOfFour(){
        for(let i=0;i<=60;i++){
            const rowOfFour = [i, i+1, i+2, i+3];
            const decidedCandy = squares[i].style.backgroundImage;
            let isBlank = squares[i].style.backgroundImage === '';

            const inValid = [5,6,7,13,14,15,21,22,23,29,30,31,37,38,39,45,46,47,53,54,55];
            if(inValid.includes(i)) continue;

            if(rowOfFour.every(index => squares[index].style.backgroundImage === decidedCandy) && !isBlank){
                score+=4;
                scoreDisplay.innerHTML = score;
                rowOfFour.forEach(index =>{
                    squares[index].style.backgroundImage = '';
                })
            }
        }
    }
    

    //check for row of five

    function checkRowOfFive(){
        for(let i=0;i<=59;i++){
            const rowOfFive = [i, i+1, i+2, i+3,i+4];
            const decidedCandy = squares[i].style.backgroundImage;
            let isBlank = squares[i].style.backgroundImage === '';

            const inValid = [4,5,6,7,12,13,14,15,20,21,22,23,28,29,30,31,36,37,38,39,44,45,46,47,52,53,54,55];
            if(inValid.includes(i)) continue;
    
            if(rowOfFive.every(index => squares[index].style.backgroundImage === decidedCandy) && !isBlank){
                score+=5;
                scoreDisplay.innerHTML = score;
                for(let j=0;j<rowOfFive.length;j++){
                       
                    squares[rowOfFive[j]].style.backgroundImage === '';
                    
                }
            }
        }        
    }

    //check for column of three

    function checkColumnOfThree(){
        for(let i=0;i<=47;i++){
            const columnOfThree = [i, i+width, i+ 2*width];
            const decidedCandy = squares[i].style.backgroundImage;
            let isBlank = squares[i].style.backgroundImage === '';

            if(columnOfThree.every(index => squares[index].style.backgroundImage === decidedCandy) && !isBlank){
                score+=3 ; 
                scoreDisplay.innerHTML = score;
                columnOfThree.forEach(index => {
                    squares[index].style.backgroundImage = '';
                }) 
            }
        }
    }

    //check for column of four 

    function checkColumnOfFour(){
        for(let i=0;i<=39;i++){
            const columnOfFour = [i, i+width, i+ 2*width, i+ 3*width];
            const decidedCandy = squares[i].style.backgroundImage;
            let isBlank = squares[i].style.backgroundImage === '';

            if(columnOfFour.every(index => squares[index].style.backgroundImage === decidedCandy) && !isBlank){
                score+=4 ;
                scoreDisplay.innerHTML = score;
                columnOfFour.forEach(index => {
                    squares[index].style.backgroundImage = '';
                }) 
            }
        }
    }

    //check for column of five 

    function checkColumnOfFive(){
        for(let i=0;i<=31;i++){
            const columnOfFive = [i, i+width, i+ 2*width, i+ 3*width, i+ 4*width];
            const decidedCandy = squares[i].style.backgroundImage;
            let isBlank = squares[i].style.backgroundImage === '';

            if(columnOfFive.every(index => squares[index].style.backgroundImage === decidedCandy) && !isBlank){
                score+=5 ;
                scoreDisplay.innerHTML = score;
                
                for(let j=0;j<columnOfFive.length;j++){
                    squares[columnOfFive[j]].style.backgroundImage === '';
                }
            }
        }
    }
 


    window.setInterval(function(){
        moveDown();
       
        checkRowOfFive();
        checkColumnOfFive();
        checkRowOfFour();
        checkColumnOfFour();
        checkRowOfThree();
        checkColumnOfThree();
        
        
    }, 100)
   

})


function loader(){
    document.querySelector('.loader-container').classList.add('fade-out');
  }

  function FadeOut(){
    setInterval(loader,300);
  }


  window.onload=FadeOut;
