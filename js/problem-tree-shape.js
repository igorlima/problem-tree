var ProblemTree = (function(ProblemTree) {

  var Shape = ProblemTree.Shape = {},
      r = ProblemTree.canvas(),
      problem,
      connections = [],
      effects = [],
      causes = []
      color_problem = Raphael.getColor(),
      color_cause = Raphael.getColor(),
      color_effect = Raphael.getColor(),
      DEFAULT = {
        WIDTH: 30,
        HEIGHT: 20
      };

  /********************************
   * Public
   ********************************/

  Shape.problem = function() {
    var color;

    if (!problem) {
      problem = r.rect(290, 80, DEFAULT.WIDTH*2, DEFAULT.HEIGHT*2, 10);
      problem = config_shape(problem, color_problem, "problem");
    }

    return problem;

  };

  Shape.effect = function() {
    var problem = Shape.problem(),
        effect;

    effect = r.ellipse(290, 27, DEFAULT.WIDTH, DEFAULT.HEIGHT);
    effect = config_shape(effect, color_effect, "effect");
    connect(effect, problem, "#000");

    effects.push(effect);
    return effect;

  };

  Shape.cause = function() {
    var problem = Shape.problem(),
        cause;

    cause = r.ellipse(290, 180, DEFAULT.WIDTH, DEFAULT.HEIGHT);
    cause = config_shape(cause, color_cause, "cause");
    connect(cause, problem, "#000");

    causes.push(cause);
    return cause;

  };



  /********************************
   * Private
   ********************************/

  function connect(obj1, obj2, color_line, color_background) {
    var connection = r.connection(obj1, obj2, color_line, color_background);
    connections.push(connection);

    return connection;
  }

  function dragger() {
    this.ox = this.type == "rect" ? this.attr("x") : this.attr("cx");
    this.oy = this.type == "rect" ? this.attr("y") : this.attr("cy");
    this.animate({"fill-opacity": .2}, 500);
  }

  function move(dx, dy) {
    var att = this.type == "rect" ? {x: this.ox + dx, y: this.oy + dy} : {cx: this.ox + dx, cy: this.oy + dy};
    this.attr(att);
    move_text(this);
    update_connections();
    r.safari();
  }

  function up() {
    this.animate({"fill-opacity": 0}, 500);
  }

  function update_connections() {
    for (var i = connections.length; i--;) {
      r.connection(connections[i]);
    }
  }

  function config_shape(shape, color, str_text) {
    shape.attr({fill: color, stroke: color, "fill-opacity": 0, "stroke-width": 2, cursor: "move"});
    shape.drag(move, dragger, up);
    create_text(shape, str_text);
    shape.dblclick(function() {
      change_text(this.data('text'));
    });
    return shape;
  }

  function create_text(shape, str_text) {
    var text = r.text(0, 0, str_text || "");
    text.data('shape', shape);
    shape.data('text', text);
    move_text(shape);
    text.dblclick(function(){
      change_text(this);
    });
  }

  function move_text(shape) {
    var text = shape.data("text"),
        att = shape.type == "rect" ? {x: shape.attrs['x'] + shape.attrs['width']/2, y: shape.attrs['y'] + shape.attrs['height']/2} : {x: shape.attrs['cx'], y: shape.attrs['cy']};

    text.attr(att);
  }

  function change_text(text) {
    var new_text = prompt("Type a new text", text.attr('text'));
    text.attr('text', new_text);
  }

  // Return the module
  return ProblemTree;
  
}(ProblemTree));
