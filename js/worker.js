self.addEventListener("message", function(i) {
  Boids[i].acc = new Vector(0,0)

  var alignment = Boids[i].align(tree,60,0.1)
  var cohesion = Boids[i].cohesion(tree,60,0.2)
  var seperation = Boids[i].seperation(tree,35,0.4)

  //var acs = Boids[i].ACS(tree,70,0.1,70,0.2,35,0.4)


  //Boids[i].coloracc = Boids[i].colorConform(Boids,70,0.06)


  Boids[i].acc = Boids[i].acc.add(cohesion)
  Boids[i].acc = Boids[i].acc.add(alignment)
  Boids[i].acc = Boids[i].acc.add(seperation)

  //Boids[i].acc = acs

  Boids[i].speed=Boids[i].speed.limit(minspeed,maxspeed)

  Boids[i].updateSpeed()
  //Boids[i].updateColorSpeed()
  Boids[i].updateLocation(window.innerWidth,window.innerHeight)

  postMessage(i)
}, false);
