var ProblemTree = {
  idElementHtml: 'holder',
  width: 640,
  height: 480
};


ProblemTree = (function(ProblemTree, Raphael) {
  var r;

  (function init() {
    r = Raphael(ProblemTree['idElementHtml'], ProblemTree['width'], ProblemTree['height']);
  })();

  ProblemTree.canvas = function() {
    return r;
  };


  return ProblemTree

}(ProblemTree || {}, Raphael) );
