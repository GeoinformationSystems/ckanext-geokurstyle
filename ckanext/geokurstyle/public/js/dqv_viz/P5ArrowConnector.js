class P5ArrowConnector {
    constructor(nodeFrom, nodeTo, label, reverseDirection, sketch) {
        this.nodeFrom = nodeFrom;
        this.nodeTo = nodeTo
        if (reverseDirection) {
            this.nodeTo = nodeFrom;
            this.nodeFrom = nodeTo;
        }
        this.r = nodeFrom.r;
        this.label = label;
        this.sketch = sketch;
    }



    show(color) {

        this.sketch.angleMode(this.sketch.DEGREES)
        let a = this.sketch.abs(this.nodeTo.y - this.nodeFrom.y);
        let b = this.sketch.abs(this.nodeTo.x - this.nodeFrom.x);
        let phi = this.sketch.atan(a / b);
        if (this.nodeFrom.y < this.nodeTo.y && this.nodeFrom.x > this.nodeTo.x) {
            phi = 90 + 90 - this.sketch.atan(a / b);
        }
        if (this.nodeFrom.y > this.nodeTo.y && this.nodeFrom.x > this.nodeTo.x) {
            phi = 90 + 90 + this.sketch.atan(a / b);
        }
        if (this.nodeFrom.y > this.nodeTo.y && this.nodeFrom.x < this.nodeTo.x) {
            phi = 360 - this.sketch.atan(a / b);
        }

        let x = this.sketch.cos(phi) * this.r
        let y = this.sketch.sin(phi) * this.r

        let arrowheadX = this.nodeTo.x - x
        let arrowheadY = this.nodeTo.y - y
        let arrowLength = 8;
        let arrowAngle = 40;
        let x1 = arrowheadX - this.sketch.cos(phi + arrowAngle / 2) * (arrowLength / this.sketch.cos(arrowAngle / 2));
        let y1 = arrowheadY - this.sketch.sin(phi + arrowAngle / 2) * (arrowLength / this.sketch.cos(arrowAngle / 2));
        let x2 = arrowheadX - this.sketch.cos(phi - arrowAngle / 2) * (arrowLength / this.sketch.cos(arrowAngle / 2));
        let y2 = arrowheadY - this.sketch.sin(phi - arrowAngle / 2) * (arrowLength / this.sketch.cos(arrowAngle / 2));

        this.sketch.push(); //start new drawing state
        let conn_color = "dimgray"
        if (color) conn_color = color
        this.sketch.stroke(conn_color);
        this.sketch.line(this.nodeFrom.x, this.nodeFrom.y, this.nodeTo.x, this.nodeTo.y);
        this.sketch.noStroke();
        this.sketch.fill(conn_color)
        this.sketch.triangle(arrowheadX, arrowheadY, x1, y1, x2, y2)
        this.sketch.pop()
    }
}