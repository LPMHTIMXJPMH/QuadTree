let real_quadtree;

function setup(){
    let width = 1200;
    let height = 1200;
    createCanvas(width, height);
    real_quadtree = new QuadTree(width / 2, height / 2, 1);

    show_random = false;
    if (show_random){
        background(0);
        stroke(255);
        strokeWeight(2);
        noFill();
        let i = 64;
        while (i > 0){
            let x = random(width);
            let y = random(height);
            point(x, y);
            real_quadtree.insert(x, y);
            i--;
        }
        real_quadtree.show();
    }
}

function draw(){
    if (mouseIsPressed){
        let x = int(mouseX)
        let y = int(mouseY);
        real_quadtree.insert(x, y);
    }
    background(0);
    real_quadtree.show();
}