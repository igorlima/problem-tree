;(function(ProblemTreeClass) {

  var fn = ProblemTreeClass.prototype,
      color_problem = Raphael.getColor(),
      color_cause = Raphael.getColor(),
      color_effect = Raphael.getColor(),
      color_background = "#ffffff",
      DEFAULT = {
        IDENT_X: 160,
        IDENT_Y: 180,
        WIDTH: 30,
        HEIGHT: 20,
        MAX_CHAR: 9,
        WIDTH_CHAR: 30/9 // WIDTH/MAX_CHAR
      };

  fn.connections = [];
  fn.effects = [];
  fn.causes = [];

  /********************************
   * Public
   ********************************/

  fn.problem = function(x, y, str_text) {
    var r = this.canvas(),
        tree = this,
        problem = r.rect(x || DEFAULT.IDENT_X, y || DEFAULT.IDENT_Y, DEFAULT.WIDTH*2, DEFAULT.HEIGHT*2, 10);

    config_shape(tree, problem, color_problem, str_text || "problem", 3);

    return (this.problem = function () {
      return problem;
    })();

  };

  fn.effect = function(x, y, str_text) {
    var r = this.canvas(),
        tree = this,
        problem = this.problem(),
        effects = this.effects,
        effect = r.ellipse(x || DEFAULT.IDENT_X, y || DEFAULT.IDENT_Y - 100, DEFAULT.WIDTH, DEFAULT.HEIGHT);

    config_shape(tree, effect, color_effect, str_text || "effect");
    connect(tree, effect, problem, "#000");
    effects.push(effect);
    return effect;
  };

  fn.cause = function(x, y, str_text) {
    var r = this.canvas(),
        tree = this,
        problem = this.problem(),
        causes = this.causes,
        cause;

    cause = r.ellipse(x || DEFAULT.IDENT_X, y || DEFAULT.IDENT_Y + 150, DEFAULT.WIDTH, DEFAULT.HEIGHT);
    cause = config_shape(tree, cause, color_cause, str_text || "cause");
    connect(tree, cause, problem, "#000");

    causes.push(cause);
    return cause;
  };



  /********************************
   * Private
   ********************************/

  function connect(instanceTree, obj1, obj2, color_line, color_background, opacity) {
    var r = instanceTree.canvas(),
        connection = r.connection(obj1, obj2, color_line, color_background, opacity),
        connections = instanceTree.connections;

    connections.push(connection);
    return connection;
  }

  function dragger() {
    var shape = this;
    shape.ox = shape.type == "rect" ? shape.attr("x") : shape.attr("cx");
    shape.oy = shape.type == "rect" ? shape.attr("y") : shape.attr("cy");
    shape.attr("fill", shape.attr("stroke"));
    shape.animate({"fill-opacity": .2}, 500);
  }

  function move(dx, dy) {
    var shape = this,
        r = shape.paper,
        att = shape.type == "rect" ? {x: shape.ox + dx, y: shape.oy + dy} : {cx: shape.ox + dx, cy: shape.oy + dy};

    shape.attr(att);
    move_text(shape);
    update_connections(tree);
    r.safari();
  }

  function up() {
    var shape = this;
    shape.attr("fill", color_background);
    shape.animate({"fill-opacity": 1}, 500);
  }

  function update_connections(instanceTree) {
    var r = instanceTree.canvas(),
        connections = instanceTree.connections;

    for (var i = connections.length; i--;) {
      r.connection(connections[i]);
    }
  }

  function config_shape(instanceTree, shape, color, str_text, stroke_width) {
    shape.attr({fill: color_background, stroke: color, "fill-opacity": 1, "stroke-width": stroke_width || 2, cursor: "move"});
    shape.drag(move, dragger, up);

    create_text(instanceTree, shape, str_text);
    shape.dblclick(function() {
      change_text(shape.data('text'));
      update_connections(instanceTree);
    });
    return shape;
  }

  function create_text(instanceTree, shape, str_text) {
    var tree = instanceTree,
        r = tree.canvas(),
        text = r.text(0, 0, str_text || "");

    text.attr('font', "10px \"Courier\"");
    text.data('shape', shape);
    shape.data('text', text);
    size_text_shape(text);
    text.dblclick(function() {
      change_text(text);
      update_connections(tree);
    });
  }

  function change_text(text) {
    var new_text = prompt("Type a new text", text.attr('text'));
    text.attr('text', new_text);
    size_text_shape(text);
  }

  function size_text_shape(text) {
    var str = text.attr('text'),
        shape = text.data('shape'),
        width_shape = DEFAULT.MAX_CHAR >= str.length ? DEFAULT.WIDTH : str.length * DEFAULT.WIDTH_CHAR;

    shape.attr( shape.type == "rect" ? {width: width_shape*2} : {rx: width_shape} );
    move_text(shape);
  }

  function move_text(shape) {
    var text = shape.data("text"),
        att = shape.type == "rect" ? {x: shape.attrs['x'] + shape.attrs['width']/2, y: shape.attrs['y'] + shape.attrs['height']/2} : {x: shape.attrs['cx'], y: shape.attrs['cy']};

    text.attr(att);
  }
  
}(ProblemTreeClass));
