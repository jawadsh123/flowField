
var xoff = 0;
var yoff = 0;
var zoff = 0;
var inc = 0.1;
var res = 20;
var cols, rows;
var fr;
var flowField;
var numberOfParticles = 1000;

var particles = []

function setup() {
	createCanvas(window.innerWidth, window.innerHeight);
	background(255);

	rows = floor(height/res);
	cols = floor(width/res);
	fr = createP("");

	for (var i=0; i<numberOfParticles; i++){
		particles[i] = new Particle();
	}

	flowField = new Array(cols+1);
	for (var i=0; i<=cols; i++) {
		flowField[i] = new Array(rows+1);
	}
}

function draw() {


	yoff = 0;
	for (var y=0; y<=cols; y++){
		xoff = 0;
		for (var x=0; x<=rows; x++){
			noStroke();
			var v = p5.Vector.fromAngle(noise(xoff, yoff, zoff)*TWO_PI*4);
			v.setMag(1);

			flowField[y][x] = v;
			
			// push();
			// stroke(0, 5);
			// translate(y*res, x*res);
			// rotate(v.heading());
			// line(0, 0, res, 0);
			// pop();

			xoff += inc;
		}
		yoff += inc;
		zoff += 0.0003;
	}

	for (var i=0; i<particles.length; i++){
		var x_pos = floor(particles[i].pos.x / res);
		var y_pos = floor(particles[i].pos.y / res);
		var force = flowField[x_pos][y_pos];
		particles[i].applyForce(force);
		particles[i].update();
		particles[i].show();
	}


	fr.html("FPS:" + floor(frameRate()));
	// zoff += 0.0003;
	// noLoop();
}
