class P5Node {
    constructor(id, x, y, r, label, description, node_classes, sketch, outgoing_edges, ingoing_edges) {
        this.x = x;
        this.y = y;
        this.id = id;
        this.label = label;
        this.description = description;
        this.r = r;
        this.classes = node_classes;
        this.color = 'rgb(180,180,180)';
        this.text_color = 0;
        this.target_x = null;
        this.target_y = null;
        this.clicked = false;
        this.begin_hover;
        this.hovered_prolonged = false;
        this.hovered = false;
        this.sketch = sketch;
    }


    set_x(x) { this.x = x }
    set_y(y) { this.y = y }
    set_r(r) { this.r = r }
    get_x() { return this.x }
    get_y() { return this.y }
    set_target_x(x) { this.target_x = x }
    set_target_y(y) { this.target_y = y }
    get_target_x() { return this.target_x }
    get_target_y() { return this.target_y }
    get_id() { return this.id }
    get_classes() { return this.classes }
    get_ingoing_edges() { return this.ingoing_edges }
    get_outgoing_edges() { return this.outgoing_edges }


    focussed() {
        let focussed = false;
        if (this.hovered) focussed = true;
        return focussed;
    }

    double_clicked() {
        const distance = this.sketch.dist(this.sketch.mouseX, this.sketch.mouseY, this.x, this.y);
        if (distance < this.r) {
            return this.id;
        }
        else {
            return null
        }
    }

    strg_plus_left_clicked() {
        const distance = this.sketch.dist(this.sketch.mouseX, this.sketch.mouseY, this.x, this.y);
        if (distance < this.r) {
            this.clicked = false;
            window.open(this.id, "_self");
        }
    }

    left_clicked() {
        const distance = this.sketch.dist(this.sketch.mouseX, this.sketch.mouseY, this.x, this.y);
        if (distance < this.r) {
            this.clicked = true
            // this.hovered_prolonged = true;
        }
        return this.clicked;
    }

    released() {
        this.clicked = false
    }

    right_clicked() {
        const distance = this.sketch.dist(this.sketch.mouseX, this.sketch.mouseY, this.x, this.y);
        if (distance < this.r) {
            return this.id;
        }
        else {
            return null
        }
    }

    dragged() {
        if (this.clicked) {
            this.x = this.sketch.mouseX;
            this.target_x = null;
            this.y = this.sketch.mouseY;
            this.target_y = null;
            return true;
        }
        else {
            return false;
        }
    }

    hover() {
        const distance = this.sketch.dist(this.sketch.mouseX, this.sketch.mouseY, this.x, this.y);
        if (distance < this.r) {

            if (!(this.hovered)) {
                this.begin_hover = this.sketch.millis();
            }
            this.hovered = true;
            // console.log(millis() - this.begin_hover)
            if ((this.sketch.millis() - this.begin_hover) > 500) {
                this.hovered_prolonged = true;
            }
        }
        else {
            this.hovered = false;
            this.hovered_prolonged = false;
        }
    }

    wrap_text(str, maxWidth) {
        // hacked with logics from P5.js' function text(str, x, y, [x2], [y2])
        let line;
        let lines;
        let words;
        let testLine;
        let testWidth;
        // Replaces tabs with double-spaces and splits string on any line
        // breaks present in the original string
        str = str.replace(/(\t)/g, '  ');
        lines = str.split('\n');

        // Render lines of text according to settings of textWrap
        // Splits lines at spaces, for loop adds one word + space
        // at a time and tests length with next word added

        let nlines = [];
        for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
            line = '';
            words = lines[lineIndex].split(' ');
            for (let wordIndex = 0; wordIndex < words.length; wordIndex++) {
                testLine = ''.concat(line + words[wordIndex]) + ' ';
                testWidth = this.sketch.textWidth(testLine);
                if (testWidth > maxWidth && line.length > 0) {
                    nlines.push(line);
                    line = ''.concat(words[wordIndex]) + ' ';
                } else {
                    line = testLine;
                }
            }
            nlines.push(line);

        }
        return nlines;
    }


    show(color, font, text_color) {
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

        if (this.hovered) {
            let corona_hsl = rgbToHsl(this.sketch.red(this.color), this.sketch.green(this.color), this.sketch.blue(this.color))
            let lightness = corona_hsl[2] - 0.2;
            if (lightness < 0) lightness = 0;
            let corona_color = hslToRgb(corona_hsl[0], corona_hsl[1], lightness)
            corona_color = 'rgb(' + this.sketch.floor(corona_color[0]) + ',' + this.sketch.floor(corona_color[1]) + ',' + this.sketch.floor(corona_color[2]) + ')'
            this.sketch.noStroke()
            this.sketch.fill(corona_color)
            this.sketch.circle(0, 0, 2.1 * this.r);
        }


        this.sketch.fill(this.color)
        this.sketch.noStroke()
        this.sketch.circle(0, 0, 2 * this.r);

        this.sketch.textFont(font);
        if (text_color) this.text_color = text_color
        const text_size = 14;
        this.sketch.textSize(text_size);
        const line_height = this.sketch.textLeading()

        let label_width = 300;
        const label_lines = this.wrap_text(this.label, label_width);
        label_width = 0;
        for (let line of label_lines) {
            if (this.sketch.textWidth(line) > label_width) label_width = this.sketch.textWidth(line);

        }
        const label_height = line_height * label_lines.length;


        this.sketch.fill(('rgba(255,255,255,0.8)'));
        this.sketch.noStroke()
        this.sketch.rect(-label_width / 2 - 8, -label_height / 2, label_width + 8, label_height);
        this.sketch.fill(this.text_color)
        this.sketch.textAlign(this.sketch.CENTER, this.sketch.TOP);
        this.sketch.text(this.label, -label_width / 2, -label_height / 2, label_width, label_height);

        if (this.hovered_prolonged) {
            if (this.description) {
                const desc_width = 150;
                const desc_lines = this.wrap_text(this.description, desc_width);
                const desc_height = line_height * desc_lines.length;

                this.sketch.fill('rgba(130,130,130,0.9)');
                this.sketch.rect(-desc_width / 2 - 4, label_height / 2 + 3, desc_width + 4, desc_height + 4);
                this.sketch.fill(255);
                this.sketch.noStroke();
                this.sketch.textAlign(this.sketch.CENTER, this.sketch.TOP);
                this.sketch.text(this.description, -desc_width / 2, label_height / 2 + 3, desc_width, desc_height);
            }
        }
        this.sketch.pop();
    }
}