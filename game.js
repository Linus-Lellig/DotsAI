function startGame() {
    myGameArea.start();
    DotSpawn();
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 1000;
        this.canvas.height = 600;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setTimeout(stop, 20000);
        this.interval = setInterval(directionChange, 500);
        this.interval = setInterval(updateGameArea, 50);

    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop : function() {
        clearInterval(this.interval);
    }
};

function stop() {
    myGameArea.stop();
}


function updateGameArea() {
    myGameArea.clear();
    //dot.newPos();
    //dot.update();

    for (let i = 0; i < dotsarray.length; i++) {
            if (dotsarray[i].x < 3 || dotsarray[i].x > 1000 - 3) {
                dotsarray[i].dead = true;
                //console.log("The Dot is dead = " + dotsarray[i].dead);
                deleteDot(dotsarray[i], i);
                for (let j = 0; j < deadarray.length; j++){
                    deadarray[j].update();
                }
            } else if (dotsarray[i].y < 3 || dotsarray[i].y > 600 - 3) {
                dotsarray[i].dead = true;
                //console.log("The Dot is dead = " + dotsarray[i].dead)
                deleteDot(dotsarray[i], i);
                for (let j = 0; j < deadarray.length; j++){
                    deadarray[j].update();
                }
            }

            if (typeof dotsarray[0] == 'undefined') {
                myGameArea.stop();
                //console.log("All dots are DEAD");
            } else {
                dotsarray[i].newPos();
                dotsarray[i].update();
            }
    }

    if (typeof deadarray[0] != 'undefined') {
        for (let j = 0; j < deadarray.length; j++){
            deadarray[j].update();
        }
    }
}


function Dot(posx, posy, velx, vely, accx, accy, width, height) {
    this.width = width;
    this.height = height;
    this.x = posx;
    this.y = posy;
    this.newPos = function() {
        this.x += velx * accx;
        //console.log(velx + " * " + accx);
        this.y += vely * accy;
        //console.log(vely + " * " + accy);
    },
        this.update = function() {
            ctx = myGameArea.context;
            ctx.beginPath();
            ctx.arc(this.x, this.y, 2.4, 0, 2* Math.PI);
            ctx.fill();
            ctx.stroke();
        }
}

function getRandom() {
    var rnd = (Math.random() * 10) - 5;
    /*if (rnd > 1) {
        return rnd;
    } else if (rnd < -1){
        return rnd;
    } else if (rnd < 0){
        rnd += -1;
        console.log("rnd edited = " + rnd);
        return rnd;
    } else if (rnd > 0) {
        rnd += 1;
        console.log("rnd edited = " + rnd);
        return rnd;
    } else {
        console.log("no conditions match for getRandom(), rnd = " + rnd)
    }*/
    return rnd;
}

function getAccx() {
    /*if (velx < 0) {
        accx = -1;
    } else {
        accx = 1;
    }*/
    accx = 2;
    return accx;
}

function getAccy() {
    /*if (vely < 0) {//not useful for vel * acc
        accy = -1;
    } else {
        accy = 1;
    }*/
    accy = 2;
    return accy;
}


function DotSpawn() {
    velx = 2;
    vely = 2;
    size = 500;
    //dot = new Dot(500, 300, velx, vely, 1000, 600);
    dotsarray = [];
    deadarray = [];
    //create new dots with random vectors
    for (let i = 0; i < size; i++) { //loop through length of population array
        dotsarray.push(new Dot(500, 300, velx = getRandom(), vely = getRandom(), accx = getAccx(), accy = getAccy(), 1000, 600));
        dotsarray[i].dead = false;
        //console.log(dotsarray[i]);
        //console.log(vely);
    }
    //dot.update();
    for (let i = 0; i < dotsarray.length; i++) {
        dotsarray[i].update();
    }
    //console.log("dot.x = " + dot.x);
    //console.log("dot.y = " + dot.y);
}


function deleteDot(dot, i) {
    deadarray.push(dot);
    dotsarray.splice(i, 1);
    //console.log("alive = " + dotsarray);
    //console.log("dead = " + deadarray);
}


function directionChange() {
    for (let i = 0; i < dotsarray.length; i++) {
        dotsarray[i] = new Dot(dotsarray[i].x, dotsarray[i].y, velx = getRandom(), vely = getRandom(), accx = getAccy(), accy = getAccy(), 1000, 600);
    }
}

