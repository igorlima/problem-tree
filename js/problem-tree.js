;(function(window, Raphael) {
  var r,
      connections = [],
      shapes;

  var ProblemTreeClass = function() {
    init();
  };

  var init = function() {
    r = Raphael("holder", 640, 480);
    shapes = [  r.ellipse(190, 100, 30, 20),
                r.rect(290, 80, 60, 40, 10),
                r.rect(290, 180, 60, 40, 2),
                r.ellipse(450, 100, 20, 20)
            ];

    for (var i = 0, ii = shapes.length; i < ii; i++) {
        var color = Raphael.getColor();
        shapes[i].attr({fill: color, stroke: color, "fill-opacity": 0, "stroke-width": 2, cursor: "move"});
        shapes[i].drag(ProblemTreeClass.move, ProblemTreeClass.dragger, ProblemTreeClass.up);
    }

    connections.push(r.connection(shapes[0], shapes[1], "#000"));
    connections.push(r.connection(shapes[1], shapes[2], "#000", "#fff|5"));
    connections.push(r.connection(shapes[1], shapes[3], "#000", "#fff"));

  };

  ProblemTreeClass.fn = ProblemTreeClass.prototype;


  ProblemTreeClass.dragger = function () {
    this.ox = this.type == "rect" ? this.attr("x") : this.attr("cx");
    this.oy = this.type == "rect" ? this.attr("y") : this.attr("cy");
    this.animate({"fill-opacity": .2}, 500);
  };

  ProblemTreeClass.move = function (dx, dy) {
    var att = this.type == "rect" ? {x: this.ox + dx, y: this.oy + dy} : {cx: this.ox + dx, cy: this.oy + dy};
    this.attr(att);
    for (var i = connections.length; i--;) {
      r.connection(connections[i]);
    }
    r.safari();
  };

  ProblemTreeClass.up = function () {
    this.animate({"fill-opacity": 0}, 500);
  };


  window.problemTree = new ProblemTreeClass();  
  
})(window, Raphael);