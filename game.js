let goal;

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
        this.interval = setInterval(directionChange, 1000);
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
    limit();
    GoalCollision();

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
            } else if (GoalCollision === true) {
                console.log("dot on the goal")

            }
            //(dotsarray[i].x >= goal.x && (dotsarray[i].x <= goal.x + goal.radius) && dotsarray[i].y >= goal.y &&  )

            if (typeof dotsarray[0] == 'undefined') {
                myGameArea.stop();
                //console.log("All dots are DEAD");
            } else {
                dotsarray[i].newPos();
                dotsarray[i].update();
                goal.update();
            }
    }

    if (typeof deadarray[0] != 'undefined') {
        for (let j = 0; j < deadarray.length; j++){
            deadarray[j].update();
        }
    }
}

function GoalCollision() {
    let collision;
    for (let i = 0; i < dotsarray.length; i++) {
        let dx = dotsarray[i].x - goal.x;
        let dy = dotsarray[i].y - goal.y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < dotsarray[i].radius + goal.radius) {
            dotsarray[i].dead = true;
            deleteDot(dotsarray[i], i);
            console.log("dot on the goal");
            return collision = true
        }
    }
}


function Dot(posx, posy, velx, vely, accx, accy, colour, radius) {
    this.radius = radius
    this.x = posx;
    this.y = posy;
    this.colour = colour;
    this.velx = velx;
    this.vely = vely;
    this.newPos = function() {
        limit();
        this.x += velx //* accx;
        //console.log(velx + " * " + accx);
        this.y += vely //* accy;
        //console.log(vely + " * " + accy);
    },
        this.update = function() {
            ctx = myGameArea.context;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, 2* Math.PI);//r=2.4
            ctx.fillStyle = colour
            ctx.fill();
            ctx.stroke();
        }
}

function limit() {
    for (let i = 0; i < dotsarray.length; i++) {
        if (dotsarray[i].velx >= 5) {
            dotsarray[i].velx = 5;
        } else if (dotsarray[i].velx <= -5) {
            dotsarray[i].velx = -5;
        }

        if (dotsarray[i].vely >= 5) {
            dotsarray[i].vely = 5;
        } else if (dotsarray[i].vely <= -5) {
            dotsarray[i].vely = -5;
        }
    }
}

function getRandom(i, velx, vely) {
    //limit()
    let rnd = (Math.random() * 10) - 5;
    if (vely === null) {
        if (velx > 0) {
            rnd += velx;
            if (rnd >= 5) {
                rnd = (Math.random() * 10) - 5;
            } else if (rnd < 0) {
                rnd = rnd * -1;
            }
        } else if (velx < 0) {
            rnd += velx;
            if (rnd <= -5) {
                rnd = (Math.random() * 10) - 5;
            } else if (rnd > 0) {
                rnd = rnd * -1;
            }
        }
    } else if (velx === null) {
        if (vely > 0) {
            rnd += vely;
            if (rnd >= 5) {
                rnd = (Math.random() * 10) - 5;
            } else if (rnd < 0) {
                rnd = rnd * -1;
            }
        } else if (vely < 0) {
            rnd += vely;
            if (rnd <= -5) {
                rnd = (Math.random() * 10) - 5;
            } else if (rnd > 0) {
                rnd = rnd * -1;
            }
        }
    }
    //console.log(rnd);
    return rnd;
}

function getAccx() {
    let accx = 2;
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
    size = 100;
    //dot = new Dot(500, 300, velx, vely, 1000, 600);
    dotsarray = [];
    deadarray = [];


    //create new dots with random vectors
    for (let i = 0; i < size; i++) { //loop through length of population array
        dotsarray.push(new Dot(500, 300, velx = getRandom(), vely = getRandom(), accx = getAccx(), accy = getAccy(), "black", 2.4));//500, 300
        dotsarray[i].dead = false;
        //console.log(dotsarray[i]);
        //console.log(vely);
    }
    //dot.update();
    for (let i = 0; i < dotsarray.length; i++) {
        dotsarray[i].update();
    }

    goal = new Dot(500, 100, 0, 0, 0, 0, "green", 5);
        goal.update();
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
        let velx = dotsarray[i].velx;
        let vely = dotsarray[i].vely;

        dotsarray[i] = new Dot(dotsarray[i].x, dotsarray[i].y, velx = getRandom(i, velx, null), vely = getRandom(i, null, vely), accx = getAccy(), accy = getAccy(), "black", 2.4);
    }
}

function getRandom2(velx, vely) {
    if (velx > 0) {

    }
}
