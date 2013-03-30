
;(function(window, Raphael) {
  var r, fn, img_problem_tree,
      DEFAULT = {
        WIDTH: 400,
        HEIGHT: 380,
        IMG_IDENT_X: 10,
        IMG_IDENT_Y: 40
      };

  var ProblemTreeClass = window.ProblemTreeClass = function(attrs) {
    var r = Raphael(attrs['idElementHtml'], attrs['width'] || DEFAULT.WIDTH, attrs['height'] || DEFAULT.HEIGHT),
        img_problem_tree = r.image("img/img-canvas-problem-tree.png", DEFAULT.IMG_IDENT_X, DEFAULT.IMG_IDENT_Y, r.width - DEFAULT.IMG_IDENT_X, r.height - DEFAULT.IMG_IDENT_Y);

    this.attrs = attrs;
    this.canvas = function() {
      return r;
    };

  }

  fn = ProblemTreeClass.prototype;

}(window, Raphael));
