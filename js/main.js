var backgroundcolor = "rgb(30,30,30)"
var color = "rgb(20,188,255)"
var c=document.getElementById("drawCanvas")
var ctx=c.getContext("2d")
var maxspeed = 10
var minspeed = 3
var noBoids = 0
var mousedown = false

var textcolor = "white"
var boidcolor = "rgb(48,167,232)"

var lastCalledTime;
var fps;

var mousex = 0
var mousey = 0

var maxinitspeed = maxspeed
var mininitspeed = minspeed

var alignmentRadius = 70, alignmentStrength = 0.25;
var cohesionRadius = 70, cohesionStrength =  0.4;
var seperationRadius = 40, seperationStrength = 0.7;


var Boids = []
var noqueries = 0
var step = 1

var boidcount=0

var tree = new QuadTree(new Bound(0,0,window.innerWidth, window.innerHeight),4,0,4)

function startview(){
  requestAnimationFrame(mainLoop);
}

function genBoid(x,y) {

  if (x==null) {
    x = Math.floor(Math.random() * window.innerWidth)
    y = Math.floor(Math.random() * window.innerHeight)
  }


  var diri = Math.round(Math.random()) * 2 - 1
  var dirj = Math.round(Math.random()) * 2 - 1
  var randi = Math.random()*diri
  var randj = Math.random()*dirj

  var magg = ((Math.random()*maxinitspeed)+mininitspeed)

  var hue = Math.random()
  var rgb = new Color(hue)

  //console.log(randx)
  //console.log(randy)

  return new Boid(x,y,new Vector(randi,randj).unit().mul(magg),boidcount,rgb.getColor(),30)
}

function setup() {
  ctx.canvas.width = window.innerWidth
  ctx.canvas.height = window.innerHeight

  var i = noBoids; //or 10
  while(i--) {
    var newBoid = genBoid(null,null)
    //console.log(newBoid)
    Boids.push(newBoid)
    boidcount++

  }
}

function setmouseup(evt) {
  mousedown=false
}

function setmousedown(evt) {
  mousedown=true
}

function addBoid(x,y) {
  if(mousedown) {
    var newBoid = genBoid(x,y)
    Boids.push(newBoid)
    boidcount++
  }
}

function updateQuadTree() {
  tree.clear()
  var i = boidcount; //or 10
  while(i--) {
    tree.insert(Boids[i])
  }
}

function setcoords(evt) {
  mousex = evt.clientX
  mousey = evt.clientY
}

function render() {
  // var bound = new BoundC(400,400,130)
  // var res = []
  // tree.query(bound,res)
  // console.log(res)
  // drawCircle(bound)


  //tree.draw()
  drawBoids(Boids)
  drawText("15px Arial","Boids                        " + boidcount,40,50,textcolor)
  drawText("15px Arial","FPS                          " + Math.round(fps),40,70,textcolor)
  drawText("15px Arial","Quad Tree Queries  " + noqueries,40,90,textcolor)

  // for (var i = 0; i<res.length;i++) {
  //   drawPoint(res[i].x,res[i].y)
  // }

}

function drawBoids(Boids) {
  var i = boidcount; //or 10
  while(i--) {
    var boid = Boids[i]
    drawBoid(boid.x,boid.y,boid.speed,boid.color,boid.size,boid.rad)

  }
}


function drawText(font,text,x,y,color) {
  ctx.font = font
  ctx.fillStyle = color
  ctx.fillText(text,x,y)
}

function update() {
  noqueries=0
  var t = true
  var i = 0
  var n = boidcount

  if (step==1) {

    t = function() {
      //console.log("forward")
      return i<n
    }

  }
  else {

    i=n-1
    t = function() {
      //console.log("back")
      return i>0
    }

  }


  while(t()) {
    var lboid = Boids[i]

    lboid.acc = new Vector(0,0)

    if(lboid.skip) {
      //console.log("skipping")

      lboid.skip=false
    }
    else {
      noqueries++
      var alignment = lboid.align(tree,alignmentRadius,alignmentStrength)
      var cohesion = lboid.cohesion(tree,cohesionRadius,cohesionStrength)
      var seperation = lboid.seperation(tree,seperationRadius,seperationStrength)

      //var acs = Boids[i].ACS(tree,70,0.1,70,0.2,35,0.4)
      //Boids[i].coloracc = Boids[i].colorConform(Boids,70,0.06)

      lboid.acc = lboid.acc.add(cohesion)
      lboid.acc = lboid.acc.add(alignment)
      lboid.acc = lboid.acc.add(seperation)

      //Boids[i].acc = acs

    }

    lboid.speed=lboid.speed.limit(minspeed,maxspeed)

    lboid.updateSpeed()



    //Boids[i].updateColorSpeed()
    lboid.updateLocation(window.innerWidth,window.innerHeight)
    i+=step
  }
  step*=-1

  addBoid(mousex,mousey)
  updateQuadTree()
}

function drawRect(boundary) {
  ctx.strokeStyle = "rgb(100,100,100)"
  ctx.rect(boundary.x, boundary.y, boundary.w, boundary.h);
  ctx.stroke();
}

function drawPoint(x,y){
  ctx.beginPath()
  ctx.arc(x,y,10, 0, Math.PI*2, true)
  ctx.fillStyle = "rgb(255,0,0)"
  ctx.closePath()
  ctx.fill()
}

function drawCircle(bound){
  ctx.beginPath()
  ctx.arc(bound.x,bound.y,bound.r, 0, Math.PI*2, true)
  ctx.strokeStyle = boidcolor
  ctx.closePath()
  ctx.stroke()
}

function drawBoid(x,y,direction,bcolor,size,rad) {

  var dir = direction.unit().mul(size)
  var perpdir = dir.perpendicular()
  var dj2 = dir.j/2
  var di2 = dir.i/2
  var perpi = perpdir.i/3
  var perpj = perpdir.j/3

  var relx = x-di2
  var rely = y-dj2
  var prelx = x+di2
  var prely = y+dj2



  ctx.fillStyle = bcolor
  ctx.strokeStyle = bcolor
  //ctx.strokeStyle = "rgb(30,30,30)"
  ctx.beginPath()
  ctx.moveTo(relx,rely)
  ctx.lineTo(relx+perpi,rely+perpj)
  ctx.lineTo(prelx,prely)
  ctx.lineTo(relx-perpi,rely-perpj)
  ctx.closePath()
  ctx.fill()

  ctx.stroke()

  //drawCircle(new BoundC(x,y,rad))

}

function mainLoop() {
  clear()
  update()
  render()
  requestAnimationFrame(mainLoop)

  if(!lastCalledTime) {
     lastCalledTime = Date.now();
     fps = 0;
     return;
  }
  delta = (Date.now() - lastCalledTime)/1000;
  lastCalledTime = Date.now();
  fps = 1/delta;
}

function clear() {
  ctx.beginPath()
  ctx.fillStyle = backgroundcolor
  ctx.fillRect(0, 0, window.innerWidth, window.innerHeight)
  ctx.stroke()
  ctx.closePath()
}

$(document).ready(function() {
  setup()
  startview()
});
