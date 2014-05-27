#target "InDesign-7.0"
#include "index.jsx"

if (new File($.fileName).name==$.stack.replace(/[\[\]\n]/g,"")) {
  var doc = app.documents.length == 0 ? app.documents.add() : app.documents[0];
  var doc_h = doc.documentPreferences.pageHeight;
  var doc_w = doc.documentPreferences.pageWidth;

  var opts1 = {fillColor:"Yellow", strokeWeight:0, strokeColor:"None"};
  var opts2 = {fillColor:"None", strokeWeight:3, strokeColor:"Cyan"};  
  
  // eq_triangle([20,40], 0, opts1); // => ERROR
  // eq_triangle(["30pt", "30pt"], 20, opts1) // => yet ERROR
  eq_triangle([20,40], 20, opts1);
  eq_triangle([30,190], -50, opts1); // NO ERROR reflected

  // stacked_triangles(-12, [doc_w/2,30], 12, opts2); // => ERROR
  stacked_triangles(12, [doc_w/2,30], 12, opts2); // => group
  stacked_triangles(1, [doc_w/2,30], 12, opts2); // => not group
}
