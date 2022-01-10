class View {
    constructor(model, width, height, horizontal_margin, vertical_margin, node_size, sketch) {

        this.model = model;
        this.width = width;
        this.height = height;
        this.horizontal_margin = horizontal_margin;
        this.vertical_margin = vertical_margin;
        this.p5nodes = {};
        this.p5edges = [];
        this.r = node_size;
        this.mode = 'horizontal';
        this.sketch = sketch;
    }

    get_nodes() {
        return Object.values(this.p5nodes)
    }


    update_nodes(meta, layout) {
        for (let id of Object.keys(meta)) {
            let coords = this.fit(layout[id].x, layout[id].y)
            if (Object.keys(this.p5nodes).includes(id)) {
                const p5node = this.p5nodes[id];
                p5node.set_target_x(coords[0]);
                p5node.set_target_y(coords[1]);
            }
            else {
                this.p5nodes[id] = (new P5Node(
                    id,
                    coords[0],
                    coords[1],
                    this.r,
                    meta[id].label,
                    meta[id].class,
                    this.sketch
                ));
            }
        }
    }

    remove_node(node_id) {
        delete this.p5nodes[node_id];
    }

    update_edges(edges) {
        for (let i = this.p5edges.length - 1; i >= 0; i--) {
            delete this.p5edges[i];
        }
        this.p5edges = []
        for (let edge of edges) {
            this.p5edges.push(new P5ArrowConnector(this.p5nodes[edge.from], this.p5nodes[edge.to], edge.label, false, this.sketch))
        }
    }

    fit(x, y) {
        let new_x;
        let new_y;

        if (this.mode == 'horizontal') {
            new_x = y * (this.width - 2 * this.horizontal_margin) + this.horizontal_margin;
            new_y = x * (this.height - 2 * this.vertical_margin) + this.vertical_margin;
        }
        else {
            new_x = x * (this.width - 2 * this.horizontal_margin) + this.horizontal_margin;
            new_y = y * (this.height - 2 * this.vertical_margin) + this.vertical_margin;

        }
        return [new_x, new_y]
    }



    switch_mode() {
        if (this.mode == 'horizontal') this.mode = 'vertical';
        else this.mode = 'horizontal';
    }


    update_data(exclude_node_id = false) {
        let exclude_node = null;
        if (exclude_node_id) {
            exclude_node = this.p5nodes[exclude_node_id]
        }

        this.update_nodes(this.model.get_meta(), this.model.get_layout())

        if (exclude_node_id) {
            this.p5nodes[exclude_node_id] = exclude_node;
        }
        this.update_edges(this.model.get_edges())

    }



    update_canvas() {

        for (let p5edge of this.p5edges) {
            p5edge.show()
        }
        for (let p5node of Object.values(this.p5nodes)) {
            let node_color = null;
            if (p5node.class == "http://www.w3.org/ns/dqv#Category") node_color = this.sketch.color(123, 169, 255)
            if (p5node.class == "http://www.w3.org/ns/dqv#Dimension") node_color = this.sketch.color(255, 167, 132)
            if (p5node.class == "http://www.w3.org/ns/dqv#Metric") node_color = this.sketch.color(76, 240, 166)
            p5node.show(node_color)
        }

    }
}