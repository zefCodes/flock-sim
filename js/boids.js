function Boid(x,y,speed,id,color,size) {
    this.x=x
    this.y=y
    this.acc=new Vector(0,0)
    this.speed=speed
    this.id=id
    this.color=color
    this.coloracc=0
    this.skip=false
    this.size=size
    this.padding = this.size/2
    this.rad = this.size/2+this.padding
    this.sizesqrd=(this.rad*this.rad)

    this.updateAcceleration = function(acceleration) {
      this.acc=acceleration
    }

    this.updateSpeed = function() {
      this.speed.i+=this.acc.i
      this.speed.j+=this.acc.j
    }

    this.updateColorSpeed = function() {
      this.color.hue+=this.coloracc
    }

    this.updateLocation = function(rangex,rangey) {
      this.x+=this.speed.i
      this.y+=this.speed.j

      if (this.x>rangex+10) {
        this.x=-10
      }

      if (this.x<-10) {
        this.x=rangex+10
      }

      if (this.y>rangey+10) {
        this.y=-10
      }

      if (this.y<-10) {
        this.y=rangey+10
      }

      // this.x=((this.x%rangex)+rangex)%rangex
      // this.y=((this.y%rangey)+rangey)%rangey
    }

    this.align = function(tree,radius,strength) {
        var Boids = []
        tree.query(new BoundC(this.x,this.y,radius),Boids)
        var avespeedi=0
        var avespeedj=0
        var total=0
        //var currBoids = []
        var i = Boids.length; //or 10
        while(i--) {
          var currBoid = Boids[i]
          if (currBoid.id!=this.id) {
            var me = new Vector(this.x,this.y)
            var other = new Vector(currBoid.x,currBoid.y)
            var disttoother = me.sub(other).magh()
            var sqrr = radius*radius
            if (disttoother<=sqrr) {
              avespeedi+=currBoid.speed.i
              avespeedj+=currBoid.speed.j
              total+=1
              if(disttoother<Math.min(this.sizesqrd,sqrr)) {
                currBoid.skip=true
                //currBoids.push(currBoid)
              }
            }
          }
        }
        var newspeed
        if (total>0) {
          newspeed = new Vector(avespeedi/total,avespeedj/total)
          //console.log("nosame")
        }
        else {
          newspeed = new Vector(0,0)
          //console.log("same")
        }

        var steer = newspeed.sub(this.speed).unit().mul(strength)

        // var n = currBoids.length
        // while (n--) {
        //   currBoids[n].acc.add(steer)
        // }

        return steer
    }

    this.cohesion = function(tree,radius,strength) {
        var Boids = []
        tree.query(new BoundC(this.x,this.y,radius),Boids)
        var avex=0
        var avey=0
        var total=0
        //var currBoids = []
        var i = Boids.length; //or 10
        while(i--) {
            var currBoid = Boids[i]
            if (currBoid.id!=this.id) {
              var me = new Vector(this.x,this.y)
              var other = new Vector(currBoid.x,currBoid.y)
              var disttoother = me.sub(other).magh()
              var sqrr = radius*radius
              if (disttoother<=sqrr) {

                avex+=currBoid.x
                avey+=currBoid.y
                total+=1
                if(disttoother<Math.min(this.sizesqrd,sqrr)) {
                  currBoid.skip=true
                  //currBoids.push(currBoid)
                }

              }
            }
        }

        var steer = new Vector(0,0)
        if (total>0) {
          //console.log(new Vector(this.x,this.y))

          //console.log(this.x+" , "+this.y)

          steer = new Vector(avex/total,avey/total).sub(new Vector(this.x,this.y)).unit().mul(strength)
          //console.log(steer)
        }
        // var n = currBoids.length
        // while (n--) {
        //   currBoids[n].acc.add(steer)
        // }

        return steer


    }

    this.seperation = function(tree,radius,strength) {
        var Boids = []
        tree.query(new BoundC(this.x,this.y,radius),Boids)
        var avex=0
        var avey=0
        var total=0
        //var currBoids=[]
        var i = Boids.length; //or 10
        while(i--) {
            var currBoid = Boids[i]
            if (currBoid.id!=this.id) {
              var me = new Vector(this.x,this.y)
              var other = new Vector(currBoid.x,currBoid.y)
              var disttoother = me.sub(other).magh()
              var sqrr = radius*radius
              if (disttoother<=sqrr) {

                avex+=currBoid.x - this.x
                avey+=currBoid.y - this.y
                total+=1
                if(disttoother<Math.min(this.sizesqrd,sqrr)) {
                  currBoid.skip=true
                  //currBoids.push(currBoid)
                }
              }
            }
        }

        var steer = new Vector(0,0)
        if (total>0) {
          //console.log(new Vector(this.x,this.y))

          //console.log(this.x+" , "+this.y)

          steer = new Vector(-avex/total,-avey/total).unit().mul(strength)
          //console.log(steer)
        }
        // var n = currBoids.length
        // while (n--) {
        //   currBoids[n].acc.add(steer)
        // }

        return steer


    }

    this.colorConform = function(Boids,radius,strength) {
        var avehue=0
        var total=0
        var i = Boids.length; //or 10
        while(i--) {
            var currBoid = Boids[i]
            if (currBoid.id!=this.id) {
              var me = new Vector(this.x,this.y)
              var other = new Vector(currBoid.x,currBoid.y)
              if (me.sub(other).magh()<=radius*radius) {

                avehue+=currBoid.color.hue - this.color.hue
                total+=1

              }
            }
        }

        var steercolor = 0
        if (total>0) {

          steercolor = (avehue/total)*strength

        }

        return Math.max(Math.min(1,steercolor),-1)


    }

}
