

function Particle(){

	this.pos = createVector(random(width), random(height));
	// this.vel = p5.Vector.random2D();
	this.vel = createVector(0, 0);
	this.acc = createVector(0, 0);
	this.prevPos = this.pos.copy();
	this.maxSpeed = 2;

	this.update = function(){
		this.vel.add(this.acc);
		this.vel.limit(this.maxSpeed);
		this.pos.add(this.vel);
		this.acc.mult(0);

		this.edgeCheck();
	}

	this.applyForce = function(force){
		this.acc = force;
	}

	this.edgeCheck = function(){
		if (this.pos.x > width) {
			this.pos.x = 0;
			this.updatePrev();
		}
		if (this.pos.x < 0) {
			this.pos.x = width;
			this.updatePrev();
		}
		if (this.pos.y > height) {
			this.pos.y = 0;
			this.updatePrev();
		}
		if (this.pos.y < 0) {
			this.pos.y = height;
			this.updatePrev();
		}
	}

	this.updatePrev = function(){
		this.prevPos = this.pos.copy();
	}

	this.show = function(){
		push();
		stroke(0, 5);
		strokeWeight(1);
		line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
		pop();

		this.updatePrev();
	}

}