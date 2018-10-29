var elements;
var score;
var colors = ["Linen","LightGoldenrod","SandyBrown","Peru","DarkOrange","OrangeRed","Yellow"];
init();

function init(){
    elements =  [
        2,0,0,0,
        2,0,4,4,
        2,4,0,0,
        2,4,8,0,
    ];
    score = 0;
    document.onkeydown = Move;
    generateDom();
}

function generateDom(){
    //console.log(elements);
    document.getElementById("score-num").innerHTML = ""+score;
    for(let i = 0; i < 16; i++){
        let value = elements[i];
        let parent = document.getElementById(""+i);
        if(value == 0){
            parent.innerHTML = "";
            continue;
        }
        let elem;
        if(parent.hasChildNodes()){
            elem = parent.firstChild;
        }else{
            elem = document.createElement("div");
            document.getElementById(""+i).appendChild(elem);
        }
        elem.className = 'number';
        elem.style.zIndex = "9999";
        elem.style.color = colors[value%5];
        elem.innerHTML = value;
    }

}

function add2OrEnd(){
    let data = [];
    for(let i = 0; i < 16; i++){
        if(elements[i] == 2048){
            GAMEOVER();
            return;
        }
        if(elements[i] == 0){
            data.push(i);
        }
    }
    let choice = parseInt(Math.random()*data.length, 10);
    elements[data[choice]] = 2;
}

function GAMEOVER(){
    for(let i = 0; i < 16; i++){
        switch(i){
            case 5:
                elements[i] = 'YOU';
                break;
            case 6:
                elements[i] = 'WIN';
                break;
            case 8:
                elements[i] = 'G';
                break;
            case 9:
                elements[i] = 'A';
                break;
            case 10:
                elements[i] = 'M';
                break;
            case 11:
                elements[i] = 'E';
                break;
            case 12:
                elements[i] = 'O';
                break;
            case 13:
                elements[i] = 'V';
                break;
            case 14:
                elements[i] = 'E';
                break;
            case 15:
                elements[i] = 'R';
                break;
            default:
                elements[i] = 0;
                break;
        }
    }
    document.onkeydown = '';
}

async function Move(){
    let e = event;
    let data;
    let realData;
    switch(e.keyCode){
        case 37:           //左移函数
            data = LMove();
            //console.log(data);
            realData = [];
            for(elem of data){
                let child = document.getElementById(""+elem.id).firstChild;
                child.style.right = "0px";
                realData.push({childnode: child,
                                    distance: elem.dist});
            }
            for(let i = 0; i < 12; i+=1){
                for(elem of realData){
                    //console.log(child);
                    //console.log(elem.dist + parseInt(child.style.right));
                    elem.childnode.style.right = elem.distance*10 + parseInt(elem.childnode.style.right) + "px"; 
                }
                await sleep(10);
            }
            for(elem of realData){
                elem.childnode.style.right = "0px";
            }
            add2OrEnd();
            generateDom();
            break;

        case 38:
            data = UMove();
            //console.log(data);
            realData = [];
            for(elem of data){
                let child = document.getElementById(""+elem.id).firstChild;
                child.style.bottom = "0px";
                realData.push({childnode: child,
                                    distance: elem.dist});
            }
            for(let i = 0; i < 10; i+=1){
                for(elem of realData){
                    //console.log(child);
                    //console.log(elem.dist + parseInt(child.style.right));
                    elem.childnode.style.bottom = elem.distance*12 + parseInt(elem.childnode.style.bottom) + "px"; 
                }
                await sleep(10);
            }
            for(elem of realData){
                elem.childnode.style.bottom = "0px";
            }
            add2OrEnd();
            generateDom();
            break;

        case 39:
            data = RMove();
            //console.log(data);
            realData = [];
            for(elem of data){
                let child = document.getElementById(""+elem.id).firstChild;
                child.style.left = "0px";
                realData.push({childnode: child,
                                    distance: elem.dist});
            }
            for(let i = 0; i < 10; i+=1){
                for(elem of realData){
                    //console.log(child);
                    //console.log(elem.dist + parseInt(child.style.right));
                    elem.childnode.style.left = elem.distance*12 + parseInt(elem.childnode.style.left) + "px"; 
                }
                await sleep(10);
            }
            for(elem of realData){
                elem.childnode.style.left = "0px";
            }
            add2OrEnd();
            generateDom();
            break;

        case 40:
            data = DMove();
            //console.log(data);
            realData = [];
            for(elem of data){
                let child = document.getElementById(""+elem.id).firstChild;
                child.style.top = "0px";
                realData.push({childnode: child,
                                    distance: elem.dist});
            }
            for(let i = 0; i < 10; i+=1){
                for(elem of realData){
                    //console.log(child);
                    //console.log(elem.dist + parseInt(child.style.right));
                    elem.childnode.style.top = elem.distance*12 + parseInt(elem.childnode.style.top) + "px"; 
                }
                await sleep(10);
            }
            for(elem of realData){
                elem.childnode.style.top = "0px";
            }
            add2OrEnd();
            generateDom();
            break;
    }
}

function LMove(){
    var data = [];
    for(let i = 0; i < 4; i++){      //逐行处理
        let head = 4*i;
        for(let j = 1; j < 4; j++){
            if(elements[4*i+j] != 0){
                if(elements[head] == 0){
                    data.push({id: 4*i+j, dist: 4*i+j-head});
                    elements[head] = elements[4*i+j];
                    elements[4*i+j] = 0;
                }else if(elements[head] == elements[4*i+j]){
                    data.push({id: 4*i+j, dist: 4*i+j-head});
                    elements[head] *= 2;
                    elements[4*i+j] = 0;
                    score++;
                    head++;
                }else{
                    head++;
                    if(head != (4*i+j)){
                        elements[head] = elements[4*i+j];
                        elements[4*i+j] = 0;
                        data.push({id: 4*i+j, dist: 4*i+j-head});
                    }
                }
            }
        }
    }
    //console.log(elements);
    return data;
}

function RMove(){
    var data = [];
    for(let i = 0; i < 4; i++){      //逐行处理
        let head = 4*i + 3;
        for(let j = 2; j >= 0; j--){
            let id = 4*i+j;
            if(elements[id] != 0){
                if(elements[head] == 0){
                    data.push({id: id, dist: head-id});
                    elements[head] = elements[id];
                    elements[id] = 0;
                }else if(elements[head] == elements[id]){
                    data.push({id: id, dist: head-id});
                    elements[head] *= 2;
                    elements[id] = 0;
                    score++;
                    head--;
                }else{
                    head--;
                    if(head != id){
                        elements[head] = elements[id];
                        elements[id] = 0;
                        data.push({id: id, dist: head-id});
                    }
                }
            }
        }
    }
    //console.log(elements);
    return data;
}

function UMove(){
    var data = [];
    for(let i = 0; i < 4; i++){      //逐行处理
        let head = i;
        for(let j = 1; j < 4; j++){
            let id = i+4*j;
            if(elements[id] != 0){
                if(elements[head] == 0){
                    data.push({id: id, dist: (id - head)/4});
                    elements[head] = elements[id];
                    elements[id] = 0;
                }else if(elements[head] == elements[id]){
                    data.push({id: id, dist: (id-head)/4});
                    elements[head] *= 2;
                    elements[id] = 0;
                    score++;
                    head+=4;
                }else{
                    head+=4;
                    if(head != id){
                        elements[head] = elements[id];
                        elements[id] = 0;
                        data.push({id: id, dist: (id - head)/4});
                    }
                }
            }
        }
    }
    //console.log(elements);
    return data;
}

function DMove(){
    var data = [];
    for(let i = 12; i < 16; i++){      //逐lie处理
        let head = i;
        for(let j = 1; j < 4; j++){
            let id = i-4*j;
            if(elements[id] != 0){
                if(elements[head] == 0){
                    data.push({id: id, dist: (head-id)/4});
                    elements[head] = elements[id];
                    elements[id] = 0;
                }else if(elements[head] == elements[id]){
                    data.push({id: id, dist: (head-id)/4});
                    elements[head] *= 2;
                    elements[id] = 0;
                    score++;
                    head-=4;
                }else{
                    head-=4;
                    if(head != id){
                        elements[head] = elements[id];
                        elements[id] = 0;
                        data.push({id: id, dist: (head-id)/4});
                    }
                }
            }
        }
    }
    //console.log(elements);
    return data;
}

function sleep(ms) {
    return new Promise((resolve) => 
                    setTimeout(resolve, ms));
}
