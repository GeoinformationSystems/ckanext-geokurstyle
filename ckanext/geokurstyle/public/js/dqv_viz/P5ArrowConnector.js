class P5ArrowConnector {
    constructor(nodeFrom, nodeTo, label, sketch) {
        this.nodeFrom = nodeFrom;
        this.nodeTo = nodeTo;
        this.label = label;
        this.sketch = sketch;
    }



    show(color, font) {

        this.sketch.angleMode(this.sketch.DEGREES)
        let a = this.sketch.abs(this.nodeTo.get_y() - this.nodeFrom.get_y());
        let b = this.sketch.abs(this.nodeTo.get_x() - this.nodeFrom.get_x());
        let phi = this.sketch.atan(a / b);
        if (this.nodeFrom.get_y() < this.nodeTo.get_y() && this.nodeFrom.get_x() > this.nodeTo.get_x()) {
            phi = 90 + 90 - this.sketch.atan(a / b);
        }
        if (this.nodeFrom.get_y() > this.nodeTo.get_y() && this.nodeFrom.get_x() > this.nodeTo.get_x()) {
            phi = 90 + 90 + this.sketch.atan(a / b);
        }
        if (this.nodeFrom.get_y() > this.nodeTo.get_y() && this.nodeFrom.get_x() < this.nodeTo.get_x()) {
            phi = 360 - this.sketch.atan(a / b);
        }

        let x = this.sketch.cos(phi) * this.nodeFrom.r
        let y = this.sketch.sin(phi) * this.nodeFrom.r

        let arrowheadX = this.nodeTo.get_x() - x
        let arrowheadY = this.nodeTo.get_y() - y
        let arrowLength = 8;
        let arrowAngle = 40;
        let x1 = arrowheadX - this.sketch.cos(phi + arrowAngle / 2) * (arrowLength / this.sketch.cos(arrowAngle / 2));
        let y1 = arrowheadY - this.sketch.sin(phi + arrowAngle / 2) * (arrowLength / this.sketch.cos(arrowAngle / 2));
        let x2 = arrowheadX - this.sketch.cos(phi - arrowAngle / 2) * (arrowLength / this.sketch.cos(arrowAngle / 2));
        let y2 = arrowheadY - this.sketch.sin(phi - arrowAngle / 2) * (arrowLength / this.sketch.cos(arrowAngle / 2));

        let conn_color = "dimgray"
        if (color) conn_color = color
        this.sketch.stroke(conn_color);

        this.sketch.line(this.nodeFrom.get_x(), this.nodeFrom.get_y(), this.nodeTo.get_x(), this.nodeTo.get_y());
        this.sketch.noStroke();
        this.sketch.fill(conn_color)
        this.sketch.triangle(arrowheadX, arrowheadY, x1, y1, x2, y2)




        this.sketch.push()

        this.sketch.noStroke();
        this.sketch.textAlign(this.sketch.CENTER, this.sketch.CENTER);
        this.sketch.textFont(font);
        const text_size = 12;
        this.sketch.textSize(text_size);
        const line_height = this.sketch.textLeading()
        this.sketch.translate(
            (this.nodeTo.get_x() + this.nodeFrom.get_x()) / 2,
            (this.nodeTo.get_y() + this.nodeFrom.get_y()) / 2
        )
        this.sketch.rotate(phi)

        this.sketch.text(this.label, 0, -line_height / 2 - 1)

        this.sketch.pop()
    }
}