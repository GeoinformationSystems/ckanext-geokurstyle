class P5Node {
    constructor(id, x, y, r, label, node_class, sketch) {
        this.x = x;
        this.y = y;
        this.id = id;
        this.label = label;
        this.r = r;
        this.class = node_class;
        this.color = 180;
        this.text_color = 0;
        this.target_x = null;
        this.target_y = null;
        this.drag = false;
        this.sketch = sketch;
    }


    set_x(x) { this.x = x }
    set_y(y) { this.y = y }
    get_x() { return this.x }
    get_y() { return this.y }
    set_target_x(x) { this.target_x = x }
    set_target_y(y) { this.target_y = y }
    get_target_x() { return this.target_x }
    get_target_y() { return this.target_y }

    double_clicked() {
        let distance = this.sketch.dist(this.sketch.mouseX, this.sketch.mouseY, this.x, this.y);
        if (distance < this.r) {
            return this.id;
        }
        else {
            return null
        }
    }

    left_clicked() {
        let distance = this.sketch.dist(this.sketch.mouseX, this.sketch.mouseY, this.x, this.y);
        if (distance < this.r) {
            this.drag = true
            return true
        }

    }

    strg_plus_left_clicked() {
        let distance = this.sketch.dist(this.sketch.mouseX, this.sketch.mouseY, this.x, this.y);
        if (distance < this.r) {
            this.drag = false;
            window.location = this.id;
        }
    }

    released() {
        this.drag = false
    }

    right_clicked() {
        let distance = this.sketch.dist(this.sketch.mouseX, this.sketch.mouseY, this.x, this.y);
        if (distance < this.r) {
            return this.id;
        }
        else {
            return null
        }
    }

    dragged() {
        if (this.drag) {
            this.x = this.sketch.mouseX;
            this.target_x = null;
            this.y = this.sketch.mouseY;
            this.target_y = null;
        }

    }


    show(color, text_color) {
        let damp = 0.05
        if (this.target_x) {
            this.x += damp * (this.target_x - this.x);
            if (Math.abs(this.x - this.target_x) <= 0.1) {
                this.target_x = null;
            }
        }
        if (this.target_y) {
            this.y += damp * (this.target_y - this.y);
            if (Math.abs(this.y - this.target_y) <= 0.1) {
                this.target_y = null;
            }
        }

        this.sketch.push();
        this.sketch.translate(this.x, this.y);

        if (color) this.color = color
        this.sketch.fill(this.color)
        this.sketch.noStroke()
        this.sketch.circle(0, 0, 2 * this.r);

        if (text_color) this.text_color = text_color
        this.sketch.fill(this.text_color)
        this.sketch.textAlign(this.sketch.CENTER, this.sketch.CENTER);

        this.sketch.text(this.label, 0, 0);
        this.sketch.pop();
    }
}