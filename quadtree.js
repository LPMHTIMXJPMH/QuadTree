let width = 1200;
let height = 1200;

class QuadTree{
    constructor(x, y, depth){
        this.depth = depth
        this.x = x;
        this.y = y;
        this.w = width / (2 ** this.depth)
        this.h = height / (2 ** this.depth)

        this.capacity = 8;
        this.full = false;
        this.points = [];

        this.left_top = null;
        this.right_top = null;
        this.left_bottom = null;
        this.right_bottom = null;
    }

    subdevide(){
        this.left_top = new QuadTree(this.x - this.w / 2, this.y - this.h / 2, this.depth + 1);
        this.right_top = new QuadTree(this.x + this.w / 2, this.y - this.h / 2, this.depth + 1);
        this.left_bottom = new QuadTree(this.x - this.w / 2, this.y + this.h / 2, this.depth + 1);
        this.right_bottom = new QuadTree(this.x + this.w / 2, this.y + this.h / 2, this.depth + 1);
        for (let point of this.points){
            let where = this.where_to_go(point);
            if (where === 'left_top') {this.left_top.insert(point);}
            if (where === 'right_top') {this.right_top.insert(point);}
            if (where === 'left_bottom') {this.left_bottom.insert(point);}
            if (where === 'right_bottom') {this.right_bottom.insert(point);}
        }
    }

    check_full(){
        if (this.points.length > this.capacity - 1) {this.full = true;}
    }
    
    where_to_go(x, y){
        if (x < this.x){if (y < this.y) {return 'left_top';} else {return 'left_bottom';}
        }               else {if (y < this.y) {return 'right_top'} else {return 'right_bottom';}}
    }

    insert(x, y){
        if (x < this.x - this.w || x > this.x + this.w || y < this.y - this.h || y > this.y + this.h){return;}
        this.check_full();
        if (this.full){
            if (this.left_top == null){this.subdevide();}
            let where = this.where_to_go(x, y);
            if (where === 'left_top') {this.left_top.insert(x, y);}
            if (where === 'right_top') {this.right_top.insert(x, y);}
            if (where === 'left_bottom') {this.left_bottom.insert(x, y);}
            if (where === 'right_bottom') {this.right_bottom.insert(x, y);}
        } else {
            if (!this.points.includes(str(x) + '_' + str(y))){
                this.points.push(str(x) + '_' + str(y));}
            else{
                console.log('repeated!!', [x, y]);
            } 
        }
    }

    show(){
        stroke(255);
        strokeWeight(2);
        noFill();
        rectMode(CENTER);
        rect(this.x, this.y, this.w * 2, this.h * 2);
        for (let p of this.points){point(p.split('_')[0], p.split('_')[1]);}
        if (this.left_top != null){

            this.left_top.show();
            this.right_top.show();
            this.left_bottom.show();
            this.right_bottom.show();}
    }

}