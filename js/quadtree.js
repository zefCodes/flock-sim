function QuadTree(boundary,capacity,subs,maxsubs) {
    this.boundary = boundary
    this.capacity = capacity

    this.Boids = []
    this.subdivided=false
    this.subs=subs

    this.nw
    this.ne
    this.sw
    this.se

    this.insert = function(boid) {
      if (!boundary.contains(boid.x,boid.y)) {
        return false
      }
      if (this.Boids.length<this.capacity) {
        this.Boids.push(boid)
        return true
      }
      else {
        if (!this.subdivided) {
          if (subs>maxsubs) {
            this.Boids.push(boid)
            return true
          }
          else {
            this.subdivide()
          }

        }

        if(this.nw.insert(boid)) {return true}
        if(this.ne.insert(boid)) {return true}
        if(this.sw.insert(boid)) {return true}
        if(this.se.insert(boid)) {return true}

      }
    }

    this.subdivide = function() {
      this.subs+=1
      var bh = boundary.h/2
      var bw = boundary.w/2
      var byh = boundary.y+bh
      var bxw = boundary.x+bw

      var nwb = new Bound(boundary.x,boundary.y,bw,bh)
      this.nw = new QuadTree(nwb,this.capacity)

      var neb = new Bound(bxw,boundary.y,bw,bh)
      this.ne = new QuadTree(neb,this.capacity)

      var swb = new Bound(boundary.x,byh,bw,bh)
      this.sw = new QuadTree(swb,this.capacity)

      var seb = new Bound(bxw,byh,bw,bh)
      this.se = new QuadTree(seb,this.capacity)




      this.subdivided=true
    }

    this.query = function(check_boundary,inRangeBoids) {

      if (!this.boundary.intersectsCircle(check_boundary)) {
        //console.log("NOIPE")
        return check_boundary
      }
    //  console.log("YEP")
        var i = this.Boids.length; //or 10
        while(i--) {
        var tboid = this.Boids[i]
        if (check_boundary.contains(tboid.x,tboid.y)) {
          inRangeBoids.push(tboid)
          //console.log("inrange")
        }
      }

      if (!this.subdivided) {
        return check_boundary
      }

      this.nw.query(check_boundary,inRangeBoids)
      this.ne.query(check_boundary,inRangeBoids)
      this.sw.query(check_boundary,inRangeBoids)
      this.se.query(check_boundary,inRangeBoids)

      return check_boundary
    }

    this.draw = function() {
      drawRect(boundary)
      if (this.subdivided) {
        this.nw.draw()
        this.ne.draw()
        this.sw.draw()
        this.se.draw()
      }
    }

    this.clear = function() {
      this.Boids = []
      this.subdivided=false
    }

}
