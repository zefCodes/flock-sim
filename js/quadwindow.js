function Bound(x,y,w,h) {
  this.x=x
  this.y=y
  this.w=w
  this.h=h

  this.contains = function(x,y) {
      return (x>this.x && x<this.x+this.w && y>this.y && y<this.y+this.h)
  }
  this.intersectsAABB = function(other) {
    return (this.x+this.w>other.x &&
           other.x+other.w>this.x &&
           this.y+this.h>other.y &&
           other.y+other.h>this.y)
  }

  this.intersectsCircle = function(other) {
    var dx = other.x - Math.max(this.x, Math.min(other.x, this.x+this.w))
    var dy = other.y - Math.max(this.y, Math.min(other.y, this.y+this.h))
    return (((dx*dx) + (dy*dy)) < (other.r*other.r))
  }

  //TODO
}


function BoundC(x,y,r) {
  this.x=x
  this.y=y
  this.r=r

  this.contains = function(a,b) {
      return (((this.x-a)*(this.x-a) + (this.y-b)*(this.y-b)) <= this.r*this.r)
  }
}
