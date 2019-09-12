function OctoTree(boundary,capacity) {
    this.boundary = boundary
    this.capacity = capacity

    this.Boids = []
    this.subdivided=false

    this.nw_nw
    this.ne_nw
    this.sw_nw
    this.se_nw

    this.nw_sw
    this.ne_sw
    this.sw_sw
    this.se_sw

    this.nw_ne
    this.ne_ne
    this.sw_ne
    this.se_ne

    this.nw_se
    this.ne_se
    this.sw_se
    this.se_se

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
          this.subdivide()
        }

        if(this.nw_nw.insert(boid)) {return true}
        if(this.ne_nw.insert(boid)) {return true}
        if(this.sw_nw.insert(boid)) {return true}
        if(this.se_nw.insert(boid)) {return true}
        if(this.nw_sw.insert(boid)) {return true}
        if(this.ne_sw.insert(boid)) {return true}
        if(this.sw_sw.insert(boid)) {return true}
        if(this.se_sw.insert(boid)) {return true}
        if(this.nw_ne.insert(boid)) {return true}
        if(this.ne_ne.insert(boid)) {return true}
        if(this.sw_ne.insert(boid)) {return true}
        if(this.se_ne.insert(boid)) {return true}
        if(this.nw_se.insert(boid)) {return true}
        if(this.ne_se.insert(boid)) {return true}
        if(this.sw_se.insert(boid)) {return true}
        if(this.se_se.insert(boid)) {return true}



      }
    }

    this.subdivide = function() {

      var bw4 = boundary.w/4
      var bh4 = boundary.h/4

      var bw2 = boundary.w/2
      var bh2 = boundary.h/2

      var bxbw4 = boundary.x+bw4
      var bybh4 = boundary.y+bh4

      var bxbw2 = boundary.x+bw2
      var bybh2 = boundary.y+bh2

      var nw_nwb = new Bound(boundary.x,boundary.y,bw4,bh4)
      this.nw_nw = new OctoTree(nw_nwb,this.capacity)
      var nw_neb = new Bound(bxbw4,boundary.y,bw4,bh4)
      this.nw_ne = new OctoTree(nw_neb,this.capacity)
      var nw_swb = new Bound(boundary.x,bybh4,bw4,bh4)
      this.nw_sw = new OctoTree(nw_swb,this.capacity)
      var nw_seb = new Bound(bxbw4,bybh4,bw4,bh4)
      this.nw_se = new OctoTree(nw_seb,this.capacity)


      var ne_nwb = new Bound(bxbw2,boundary.y,bw4,bh4)
      this.ne_nw = new OctoTree(ne_nwb,this.capacity)
      var ne_neb = new Bound(bxbw2+bw4,boundary.y,bw4,bh4)
      this.ne_ne = new OctoTree(ne_neb,this.capacity)
      var ne_swb = new Bound(bxbw2,bybh4,bw4,bh4)
      this.ne_sw = new OctoTree(ne_swb,this.capacity)
      var ne_seb = new Bound(bxbw2+bw4,bybh4,bw4,bh4)
      this.ne_se = new OctoTree(ne_seb,this.capacity)

      var sw_nwb = new Bound(boundary.x,bybh2,bw4,bh4)
      this.sw_nw = new OctoTree(sw_nwb,this.capacity)
      var sw_neb = new Bound(bxbw4,bybh2,bw4,bh4)
      this.sw_ne = new OctoTree(sw_neb,this.capacity)
      var sw_swb = new Bound(boundary.x,bybh2+bh4,bw4,bh4)
      this.sw_sw = new OctoTree(sw_swb,this.capacity)
      var sw_seb = new Bound(bxbw4,bybh2+bh4,bw4,bh4)
      this.sw_se = new OctoTree(sw_seb,this.capacity)


      var se_nwb = new Bound(bxbw2,bybh2,bw4,bh4)
      this.se_nw = new OctoTree(se_nwb,this.capacity)
      var se_neb = new Bound(bxbw2+bw4,bybh2,bw4,bh4)
      this.se_ne = new OctoTree(se_neb,this.capacity)
      var se_swb = new Bound(bxbw2,bybh2+bh4,bw4,bh4)
      this.se_sw = new OctoTree(se_swb,this.capacity)
      var se_seb = new Bound(bxbw2+bw4,bybh2+bh4,bw4,bh4)
      this.se_se = new OctoTree(se_seb,this.capacity)




      this.subdivided=true
    }

    this.query = function(check_boundary,inRangeBoids) {

      if (!this.boundary.intersectsCircle(check_boundary)) {
        //console.log("NOIPE")
        return inRangeBoids
      }
    //  console.log("YEP")
      var i = this.Boids.length
      while(i--) {
        if (check_boundary.contains(this.Boids[i].x,this.Boids[i].y)) {
          inRangeBoids.push(this.Boids[i])
          //console.log("inrange")
        }
      }

      if (!this.subdivided) {
        return inRangeBoids
      }

      this.nw_nw.query(check_boundary,inRangeBoids)
      this.ne_nw.query(check_boundary,inRangeBoids)
      this.sw_nw.query(check_boundary,inRangeBoids)
      this.se_nw.query(check_boundary,inRangeBoids)
      this.nw_sw.query(check_boundary,inRangeBoids)
      this.ne_sw.query(check_boundary,inRangeBoids)
      this.sw_sw.query(check_boundary,inRangeBoids)
      this.se_sw.query(check_boundary,inRangeBoids)
      this.nw_ne.query(check_boundary,inRangeBoids)
      this.ne_ne.query(check_boundary,inRangeBoids)
      this.sw_ne.query(check_boundary,inRangeBoids)
      this.se_ne.query(check_boundary,inRangeBoids)
      this.nw_se.query(check_boundary,inRangeBoids)
      this.ne_se.query(check_boundary,inRangeBoids)
      this.sw_se.query(check_boundary,inRangeBoids)
      this.se_se.query(check_boundary,inRangeBoids)

      return inRangeBoids
    }

    this.draw = function() {
      drawRect(boundary)
      if (this.subdivided) {
        this.nw_nw.draw()
        this.ne_nw.draw()
        this.sw_nw.draw()
        this.se_nw.draw()
        this.nw_sw.draw()
        this.ne_sw.draw()
        this.sw_sw.draw()
        this.se_sw.draw()
        this.nw_ne.draw()
        this.ne_ne.draw()
        this.sw_ne.draw()
        this.se_ne.draw()
        this.nw_se.draw()
        this.ne_se.draw()
        this.sw_se.draw()
        this.se_se.draw()
      }
    }

    this.clear = function() {
      this.Boids = []
      this.subdivided=false
    }

}
