var m=parseInt(document.getElementById("rows").innerHTML);
var n=parseInt(document.getElementById("columns").innerHTML);
let arr=[],flag,timeout,b=[];

window.addEventListener("keydown", function(e) {
    if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
        e.preventDefault();
    }
}, false);

if(localStorage.getItem("3-3")){
    let obj=JSON.parse(localStorage.getItem("3-3"));
    document.getElementById("3-time").innerHTML=obj.time;
    document.getElementById("3-move").innerHTML=obj.move;
}

if(localStorage.getItem("4-4")){
    let obj=JSON.parse(localStorage.getItem("4-4"));
    document.getElementById("4-time").innerHTML=obj.time;
    document.getElementById("4-move").innerHTML=obj.move;
}

if(localStorage.getItem("5-5")){
    let obj=JSON.parse(localStorage.getItem("5-5"));
    document.getElementById("5-time").innerHTML=obj.time;
    document.getElementById("5-move").innerHTML=obj.move;
}

if(localStorage.getItem("6-6")){
    let obj=JSON.parse(localStorage.getItem("6-6"));
    document.getElementById("6-time").innerHTML=obj.time;
    document.getElementById("6-move").innerHTML=obj.move;
}

function init(m,n){
    const puzzle=document.getElementById("puzzle-container");

    var child = puzzle.lastElementChild; 
    while(child){
        puzzle.removeChild(child);
        child = puzzle.lastElementChild;
    }

    puzzle.style=`position:relative;width:${n*1.1}rem;height:${m*1.1}rem;`;

    for(var i=1;i<m*n;i++){
        var cell=document.createElement("div");
        cell.classList.add("cell");
        cell.innerHTML=`${i}`;
        cell.style.top=`${Math.floor((i-1)/n)*(100/m)}%`;
        cell.style.left=`${((i-1)%n)*(100/n)}%`;
        puzzle.appendChild(cell);

        cell.setAttribute("id",`cell ${i}`);
    }

    document.getElementById("move-count").innerHTML="0";
    document.getElementById("time").innerHTML="0";
    flag=0;
    clearTimeout(timeout);
}

init(m,n);


var new_game=document.getElementById("new-game");
new_game.onclick=()=>{
    arr=[];
    for(var i=1;i<m*n;i++) arr.push(i);
    arr.push(0);

    shuffle();

    document.getElementById("move-count").innerHTML="0";
    document.getElementById("time").innerHTML="0";
    flag=0;
    clearTimeout(timeout);

    document.onkeydown=checkKey;

    let cells=Array.from(document.getElementsByClassName("cell"));   
    cells.forEach(cell=>{cell.addEventListener("click",function hi(){canmove(cell)});});
    
}


function timer(){
    let time=parseInt(document.getElementById("time").innerHTML);
    document.getElementById("time").innerHTML=`${time+1}`;
    timeout=setTimeout(timer,1000);
}

function shuffle(){
    b=arr.slice(0);

    for(var i=0;i<100;i++){
        let x=Math.floor(Math.random()*(m*n-1));
        let y=Math.floor(Math.random()*(m*n-1));
        if(x==y){i--;continue;}
        let t;
        t=arr[x];
        arr[x]=arr[y];
        arr[y]=t;
    }
    //console.log(arr)

    const puzzle=document.getElementById("puzzle-container");

    var child = puzzle.lastElementChild; 
    while(child){
        puzzle.removeChild(child);
        child = puzzle.lastElementChild;
    }

    puzzle.style=`position:relative;width:${n*1.1}rem;height:${m*1.1}rem;`;

    for(var i=0;i<m*n-1;i++){
        //if(arr[i]==0) continue;
        var cell=document.createElement("div");
        cell.classList.add("cell");
        cell.innerHTML=`${arr[i]}`;
        cell.style.top=`${Math.floor((i)/n)*(100/m)}%`;
        cell.style.left=`${((i)%n)*(100/n)}%`;
        puzzle.appendChild(cell);

        cell.setAttribute("id",`cell ${arr[i]}`);
    }

    document.getElementById("move-count").innerHTML="0";
    document.getElementById("time").innerHTML="0";
    flag=0;
    clearTimeout(timeout);

}

function solved(){
    for(var i=0;i<m*n;i++){
        if(arr[i]!=b[i]) return false;
    }
    return true;
}

function gameover(){
    clearTimeout(timeout);
    let cells=Array.from(document.getElementsByClassName("cell"));
    cells.forEach(cell=>{ cell.style.cursor="auto";cell.style.background="#37fd12";
        cell.replaceWith(cell.cloneNode(true));});
    document.onkeydown=null;

    if(m==3 && n==3){
        let result={
            time: document.getElementById("time").innerHTML,
            move: document.getElementById("move-count").innerHTML
        };
            
        let obj_des=JSON.parse(localStorage.getItem("3-3"));

        if(obj_des==null){
            localStorage.setItem("3-3",JSON.stringify(result));
            document.getElementById("3-time").innerHTML=result.time;
            document.getElementById("3-move").innerHTML=result.move;
        }

        else if(parseInt(obj_des.time)>parseInt(result.time) ||
           (parseInt(obj_des.time)==parseInt(result.time) && parseInt(obj_des.move)>parseInt(result.move))){
            localStorage.setItem("3-3",JSON.stringify(result));
            document.getElementById("3-time").innerHTML=result.time;
            document.getElementById("3-move").innerHTML=result.move;
        }
    }


    else if(m==4 && n==4){
        let result={
            time: document.getElementById("time").innerHTML,
            move: document.getElementById("move-count").innerHTML
        };
            
        let obj_des=JSON.parse(localStorage.getItem("4-4"));

        if(obj_des==null){
            localStorage.setItem("4-4",JSON.stringify(result));
            document.getElementById("4-time").innerHTML=result.time;
            document.getElementById("4-move").innerHTML=result.move;
        }

        else if(parseInt(obj_des.time)>parseInt(result.time) ||
           (parseInt(obj_des.time)==parseInt(result.time) && parseInt(obj_des.move)>parseInt(result.move))){
            localStorage.setItem("4-4",JSON.stringify(result));
            document.getElementById("4-time").innerHTML=result.time;
            document.getElementById("4-move").innerHTML=result.move;
        }
    }

    else if(m==5 && n==5){
        let result={
            time: document.getElementById("time").innerHTML,
            move: document.getElementById("move-count").innerHTML
        };
            
        let obj_des=JSON.parse(localStorage.getItem("5-5"));

        if(obj_des==null){
            localStorage.setItem("5-5",JSON.stringify(result));
            document.getElementById("5-time").innerHTML=result.time;
            document.getElementById("5-move").innerHTML=result.move;
        }

        else if(parseInt(obj_des.time)>parseInt(result.time) ||
           (parseInt(obj_des.time)==parseInt(result.time) && parseInt(obj_des.move)>parseInt(result.move))){
            localStorage.setItem("5-5",JSON.stringify(result));
            document.getElementById("5-time").innerHTML=result.time;
            document.getElementById("5-move").innerHTML=result.move;
        }
    }


    else if(m==3 && n==3){
        let result={
            time: document.getElementById("time").innerHTML,
            move: document.getElementById("move-count").innerHTML
        };
            
        let obj_des=JSON.parse(localStorage.getItem("6-6"));

        if(obj_des==null){
            localStorage.setItem("6-6",JSON.stringify(result));
            document.getElementById("6-time").innerHTML=result.time;
            document.getElementById("6-move").innerHTML=result.move;
        }

        else if(parseInt(obj_des.time)>parseInt(result.time) ||
           (parseInt(obj_des.time)==parseInt(result.time) && parseInt(obj_des.move)>parseInt(result.move))){
            localStorage.setItem("6-6",JSON.stringify(result));
            document.getElementById("6-time").innerHTML=result.time;
            document.getElementById("6-move").innerHTML=result.move;
        }
    }

}

function canmove(cell){
    let ind=arr.indexOf(parseInt(cell.innerHTML));

    if((ind+1)<m*n && arr[ind+1]==0){
        let zind=arr.indexOf(0),temp;

        temp=arr[ind];
        arr[ind]=arr[zind];
        arr[zind]=temp;
        //moveright(cell);

        cell.style.left=`${((zind)%n)*(100/n)}%`;

        cell.style.pointerEvents="none";
        cell.addEventListener("transitionend",()=>{cell.style.pointerEvents="auto";});

        let moves=parseInt(document.getElementById("move-count").innerHTML);
        document.getElementById("move-count").innerHTML=`${moves+1}`;

        
        if(flag==0){flag=1;timer();}
        if(solved()) gameover();
        
    }

    else if((ind+n)<m*n && arr[ind+n]==0){
        let zind=arr.indexOf(0),temp;
        temp=arr[ind];
        arr[ind]=arr[zind];
        arr[zind]=temp;
        //movedown(cell);
        cell.style.top=`${Math.floor((zind)/n)*(100/m)}%`;

        cell.style.pointerEvents="none";
        cell.addEventListener("transitionend",()=>{cell.style.pointerEvents="auto";});

        let moves=parseInt(document.getElementById("move-count").innerHTML);
        document.getElementById("move-count").innerHTML=`${moves+1}`;

        if(flag==0){flag=1;timer();}
        if(solved()) gameover();
    }

    else if((ind-1)>=0 && arr[ind-1]==0){
        let zind=arr.indexOf(0),temp;
        temp=arr[ind];
        arr[ind]=arr[zind];
        arr[zind]=temp;
        //moveleft(cell);

        cell.style.left=`${((zind)%n)*(100/n)}%`;

        cell.style.pointerEvents="none";
        cell.addEventListener("transitionend",()=>{cell.style.pointerEvents="auto";});

        let moves=parseInt(document.getElementById("move-count").innerHTML);
        document.getElementById("move-count").innerHTML=`${moves+1}`;

        if(flag==0){flag=1;timer();}

        if(solved()) gameover();
    }

    else if((ind-n)>=0 && arr[ind-n]==0){
        let zind=arr.indexOf(0),temp;
        temp=arr[ind];
        arr[ind]=arr[zind];
        arr[zind]=temp;
        //moveup(cell);
        cell.style.top=`${Math.floor((zind)/n)*(100/m)}%`;

        cell.style.pointerEvents="none";
        cell.addEventListener("transitionend",()=>{cell.style.pointerEvents="auto";});
        
        let moves=parseInt(document.getElementById("move-count").innerHTML);
        document.getElementById("move-count").innerHTML=`${moves+1}`;

        if(flag==0){flag=1;timer();}

        if(solved()) gameover();
    }


}

function checkKey(e) {
    let zind=arr.indexOf(0),temp;
    e = e || window.Event;

    if ((zind+n<m*n) && e.keyCode == '38') {
        let ind=zind+n;
        let cell=document.getElementById(`cell ${arr[ind]}`);
        temp=arr[ind];
        arr[ind]=arr[zind];
        arr[zind]=temp;
        cell.style.top=`${Math.floor((zind)/n)*(100/m)}%`;
        
        let moves=parseInt(document.getElementById("move-count").innerHTML);
        document.getElementById("move-count").innerHTML=`${moves+1}`;

        if(flag==0){flag=1;timer();}
        if(solved()) gameover();
    }

    else if ((zind-n >=0) && e.keyCode == '40') {
        let ind=zind-n;
        let cell=document.getElementById(`cell ${arr[ind]}`);
        temp=arr[ind];
        arr[ind]=arr[zind];
        arr[zind]=temp;
        cell.style.top=`${Math.floor((zind)/n)*(100/m)}%`;
        
        let moves=parseInt(document.getElementById("move-count").innerHTML);
        document.getElementById("move-count").innerHTML=`${moves+1}`;

        if(flag==0){flag=1;timer();}
        if(solved()) gameover();
    }

    else if ((zind%n !=(n-1)) && e.keyCode == '37') {
        let ind=zind+1;
        let cell=document.getElementById(`cell ${arr[ind]}`);
        temp=arr[ind];
        arr[ind]=arr[zind];
        arr[zind]=temp;
        cell.style.left=`${Math.floor((zind)%n)*(100/n)}%`;
        
        let moves=parseInt(document.getElementById("move-count").innerHTML);
        document.getElementById("move-count").innerHTML=`${moves+1}`;

        if(flag==0){flag=1;timer();}
        if(solved()) gameover();
    }

    else if ((zind%n) && e.keyCode == '39') {
        let ind=zind-1;
        let cell=document.getElementById(`cell ${arr[ind]}`);
        temp=arr[ind];
        arr[ind]=arr[zind];
        arr[zind]=temp;
        cell.style.left=`${Math.floor((zind)%n)*(100/n)}%`;
        
        let moves=parseInt(document.getElementById("move-count").innerHTML);
        document.getElementById("move-count").innerHTML=`${moves+1}`;

        if(flag==0){flag=1;timer();}
        if(solved()) gameover();
    }

}



var row_content=document.getElementsByClassName("row-content");

row_content[0].addEventListener("click",()=>{
    document.getElementById("rows").innerHTML=row_content[0].innerHTML;
    m=parseInt(document.getElementById("rows").innerHTML);init(m,n);    
})

row_content[1].addEventListener("click",()=>{
    document.getElementById("rows").innerHTML=row_content[1].innerHTML;
    m=parseInt(document.getElementById("rows").innerHTML);init(m,n);
})

row_content[2].addEventListener("click",()=>{
    document.getElementById("rows").innerHTML=row_content[2].innerHTML;
    m=parseInt(document.getElementById("rows").innerHTML);init(m,n);
})

row_content[3].addEventListener("click",()=>{
    document.getElementById("rows").innerHTML=row_content[3].innerHTML;
    m=parseInt(document.getElementById("rows").innerHTML);init(m,n);
})


var col_content=document.getElementsByClassName("col-content");

col_content[0].addEventListener("click",()=>{
    document.getElementById("columns").innerHTML=col_content[0].innerHTML;
    n=parseInt(document.getElementById("columns").innerHTML);init(m,n);
})

col_content[1].addEventListener("click",()=>{
    document.getElementById("columns").innerHTML=col_content[1].innerHTML;
    n=parseInt(document.getElementById("columns").innerHTML);init(m,n);
})

col_content[2].addEventListener("click",()=>{
    document.getElementById("columns").innerHTML=col_content[2].innerHTML;
    n=parseInt(document.getElementById("columns").innerHTML);init(m,n);
})

col_content[3].addEventListener("click",()=>{
    document.getElementById("columns").innerHTML=col_content[3].innerHTML;
    n=parseInt(document.getElementById("columns").innerHTML);init(m,n);
})