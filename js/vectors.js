function Vector(i,j) {
    this.i=i
    this.j=j

    this.add = function(vector) {
        return new Vector(this.i+vector.i, this.j+vector.j)
    }

    this.sub = function(vector) {
        return new Vector(this.i-vector.i, this.j-vector.j)
    }

    this.unit = function() {
        var denom = Math.sqrt(this.i*this.i + this.j*this.j)
        return new Vector(this.i/denom,this.j/denom)
    }

    this.mul = function(w) {
        return new Vector(w*this.i,w*this.j)
    }

    this.dot = function(vec) {
        return (vec.i*this.i)+(vec.j*this.j)
    }

    this.project = function(dtv) {
        var mgn = this.mag()
        var mgn2 = mgn*mgn
        var coef = dtv/mgn2
        return new Vector(coef*this.i,coef*this.j)
    }

    this.mag = function() {
        return Math.sqrt((this.i*this.i)+(this.j*this.j))
    }

    this.magh = function() {
        return (this.i*this.i)+(this.j*this.j)
    }

    this.sub = function(vec) {
        return new Vector(this.i-vec.i,this.j-vec.j)
    }

    this.perpendicular = function() {
        return new Vector(this.j,-this.i)
    }

    this.limit = function(min,max) {
      var mag = this.mag()

      if(mag<min) {
        return this.unit().mul(min)
      }
      else if (mag>max) {
        return this.unit().mul(max)
      }
      else {
        return this
      }
    }
}
