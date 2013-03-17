
;(function(window, Raphael) {
  var r, fn;

  var ProblemTreeClass = window.ProblemTreeClass = function(attrs) {
    var r = Raphael(attrs['idElementHtml'], attrs['width'], attrs['height']);

    this.attrs = attrs;
    this.canvas = function() {
      return r;
    };

  }

  fn = ProblemTreeClass.prototype;

}(window, Raphael));
