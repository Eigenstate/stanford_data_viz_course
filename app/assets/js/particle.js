// create a simple visualization
function hello_world($p) {

    // canvas size
    $p.size(800, 600);

    // Particle array class
    // Needed so particles are aware of each others' positions nicely
    particlearray = function (n) {
        this.cutoff = 1; // actually cutoff squared, save call to sqrt
        this.n = n;
        this.velocity = 1;
        this.data = [];
        for (var i = 0; i < n; i++) {
            this.data.push(new particle(this.velocity));
        }
        this.type = "particlearray";
        // Update velocity of particles based on neighbors
        this.update = function () {
            var vnextx = new Array(this.n); //2D force
            var vnexty = new Array(this.n);
            for (var i = 0; i < this.n; i++) {
                var num = 0;
                var avgvelx = 0;
                var avgvely = 0;
                for (var j = 0; j < this.n; j++) {
                    var dist = (this.data[i].x - this.data[j].x) * (this.data[i].x - this.data[j].x) + (this.data[i].y - this.data[j].y) * (this.data[i].y - this.data[j].y);
                    if (dist <= this.cutoff) {
                        avgvelx += this.data[j].x_v;
                        avgvely += this.data[j].y_v;
                        num++;
                    }
                }
                avgvelx /= num;
                avgvely /= num;
                console.log(avgvelx, avgvely);
                var costheta = (avgvelx*this.data[i].x_v + avgvely * this.data[i].y_v) / (Math.sqrt(this.data[i].x * this.data[i].x + this.data[i].y * this.data[i].y) * Math.sqrt(avgvelx * avgvelx + avgvely * avgvely));
                vnextx[i] = this.velocity * costheta;
                vnexty[i] = this.velocity * (1 - costheta * costheta);
            }
            // Now apply new velocities
            for (i = 0; i < this.n; i++) {
                this.data[i].update(vnextx[i], vnexty[i]);
            }
        };
        this.draw = function () {
            for (var i = 0; i < this.n; i++) {
                this.data[i].draw();
            }
        };
    };
    // ---------------------------------------------------------
    // particle class

    particle = function (velocity) {
        this.type = "particle";
        this.radius = 20;
        this.y = Math.random() * $p.height;
        this.x = Math.random() * $p.width;
        this.x_v = Math.random() * velocity;
        this.y_v = velocity - this.x_v * this.x_v;
        this.hue = 180 * Math.random();
        this.y_max = $p.height - this.radius;
        this.x_max = $p.width - this.radius;
        this.constrain_x = function () {

            // x
            if (this.x >= this.x_max) {
                this.x = this.radius + 1;
            }
            if (this.x <= this.radius) {
                this.x = this.x_max - 1;
            }
        };
        this.constrain_y = function () {
            // y
            if (this.y >= this.y_max) {
                this.y = this.radius + 1;
            }

            if (this.y <= this.radius) {
                this.y = this.y_max - 1;
            }

        };

        this.update = function (xv, yv) {
            // y direction
            this.x_v = xv;
            this.y_v = yv;
            console.log(xv, yv, this.hue);
            
            if ((Math.abs(this.y_v) > 0)) {
                this.y += this.y_v;
                this.constrain_y();
            }
            // x direction
            if ((Math.abs(this.x_v) > 0)) {
                this.x += this.x_v;
                this.constrain_x();
            }
          
        };

        // draw_based on index
        this.draw = function () {
            // shape bg
            // $p.fill(this.hue, 90, 90, 95);
            $p.fill(this.hue, 180, 180, 180);
            // shape
            $p.ellipse(this.x + 3, this.y - 3, this.radius, this.radius);

        };

        // boost current direction of particle
        this.boost = function () {
            var y_sign = this.y_v > 0 ? 1 : -1;
            var x_sign = this.x_v > 0 ? 1 : -1;
            if (Math.abs(this.y_v) < 1) {

                // random amount of boost
                var ky = Math.random() * 2.5;
                var kx = Math.random() * 1.5;

                this.y_v += ky * y_sign;
                this.y -= ky;
                this.x_v += kx * x_sign;
                this.x += kx;
            } else {
                this.y_v *= 1.1;
            }
        };

    };

    // ---------------------------------------------------------
    // data

    // add particles
    var n = Math.sqrt($p.width * $p.height);
    var system = new particlearray(10);
    system.update();

    // ---------------------------------------------------------
    // setup

    // graphical parameters
    $p.noStroke();
    $p.colorMode($p.HSB, 360, 100, 100);
    $p.ellipseMode($p.CENTER);
    $p.frameRate(1000);

    // ---------------------------------------------------------
    // draw

    $p.draw = function () {
        // transparent bg
        $p.fill(255, 0, 0, 12);
        $p.rect(0, 0, $p.width, $p.height);

        system.draw();
        system.update();
    };

    // ---------------------------------------------------------
    // interaction

    $p.mouseClicked = function () {
        console.log("HALLO");
    };
}

// create a canvas
var canvas = document.getElementById("processing");

// bind basic_bar_chart to canvas
var p = new Processing(canvas, hello_world);
