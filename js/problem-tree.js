
;(function(window, Raphael) {
  var r, fn,
      DEFAULT = {
        WIDTH: 400,
        HEIGHT: 380
      };

  var ProblemTreeClass = window.ProblemTreeClass = function(attrs) {
    var r = Raphael(attrs['idElementHtml'], attrs['width'] || DEFAULT.WIDTH, attrs['height'] || DEFAULT.HEIGHT);

    this.attrs = attrs;
    this.canvas = function() {
      return r;
    };

  }

  fn = ProblemTreeClass.prototype;

}(window, Raphael));
