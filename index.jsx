// create an equilateral triangle
var eq_triangle = function (top_coordinates/*array of 2*/, side_length/*integer,float*/, opts) {
  var shape, top, left, height;
  
  if (side_length == 0) {
    msg("side_length must not be zero");
  }
  
  var opts = opts || {};
  top = top_coordinates[1];
  left = top_coordinates[0] - side_length/2;
  height = side_length * Math.sin(Math.PI/3);
  // opts['geometricBounds'] = [top, left, top+height, left+side_length];
  
  shape = doc.polygons.add(app.activeDocument.activeLayer, 3, 0, undefined, undefined, opts);
  shape.paths[0].entirePath = [
    top_coordinates, 
    [left, top+height],
    [left+side_length, top+height]
    ]
  return shape;
}

// create a stack of equilateral triangles
var stacked_triangles = function (stack/*integer*/, start_coordinates/*array of 2*/, side_length, opts) {
  if (stack < 1 || (stack-~~stack !== 0)) {
    msg("'stack' must be integer greater than 0");
  }  
  if (start_coordinates.length !== 2) {
    msg("'start_coordinates' must be array of 2 number");
  }

  var stack = stack;
  var side_length = side_length;
  var grp = [];

  for (var i=0; i < stack ; i++) {
    var start = [start_coordinates[0]-(side_length/2)*i, start_coordinates[1]+side_length*i*Math.sin(Math.PI/3)];
    var o = eq_triangle(start, side_length, opts);
    if (stack === 1) {
      return o
    }
    grp.push(o);
    for (var ii = 1; ii < i+1; ii++) {
      grp.push(o.duplicate(undefined, [side_length * ii, 0]));
    }
  };
  return doc.groups.add(grp);
}

var msg = function (message, consolelog/*bool*/) {
  consolelog ? $.writeln(message) : alert(message);
  exit();
  return
}
