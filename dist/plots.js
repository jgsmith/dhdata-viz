(function() {
  var dhdata;

  dhdata = window.dhdata != null ? window.dhdata : window.dhdata = {};

  if (dhdata.viz == null) {
    dhdata.viz = {};
  }

}).call(this);

(function() {
  var _base;

  if ((_base = window.dhdata.viz).plots == null) {
    _base.plots = {};
  }

  window.dhdata.viz.plots.phase2D = function() {
    var data, dataDoubled, delta, drawDots, fx, fy, height, margin, my, svg, width, x, xAxis, y, yAxis;
    margin = {
      top: 20,
      right: 20,
      bottom: 30,
      left: 40
    };
    width = 210 - margin.right - margin.left;
    height = 200 - margin.top - margin.bottom;
    data = [];
    dataDoubled = [];
    delta = 0;
    fx = fy = function(i) {
      return i;
    };
    svg = null;
    x = d3.scale.linear().range([0, width]).domain([-1, 1]).nice();
    y = d3.scale.linear().range([height, 0]).domain([-1, 1]).nice();
    xAxis = d3.svg.axis().ticks(5).scale(x).orient("bottom");
    yAxis = d3.svg.axis().ticks(5).scale(y).orient("left");
    my = function(selection) {
      svg = selection.append("svg").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
      svg.append("g").attr("class", "x axis").attr("transform", "translate(0," + height + ")").call(xAxis);
      return svg.append("g").attr("class", "y axis").call(yAxis);
    };
    drawDots = function() {
      var dots;
      dots = svg.selectAll(".dot").data(d3.zip(data, dataDoubled.slice(delta)));
      dots.transition().duration(100).attr("cx", function(d) {
        return x(fx(d[0]));
      }).attr("cy", function(d) {
        return y(fy(d[1]));
      });
      dots.enter().append("circle").attr("class", "dot").attr("r", 0.25);
      return dots.exit().remove();
    };
    my.data = function(d) {
      if (!arguments.length) {
        return data;
      } else {
        data = d;
        dataDoubled = data.concat(data);
        x.domain(d3.extent(data)).nice();
        y.domain(d3.extent(data)).nice();
        drawDots();
        return my;
      }
    };
    my.delta = function(d) {
      if (!arguments.length) {
        return delta;
      } else {
        delta = d;
        drawDots();
        return my;
      }
    };
    my.width = function(w) {
      if (!arguments.length) {
        return width;
      } else {
        width = w;
        return my;
      }
    };
    my.height = function(h) {
      if (!arguments.length) {
        return height;
      } else {
        height = h;
        return my;
      }
    };
    my.leftMargin = function(lm) {
      if (!arguments.length) {
        return margin.left;
      } else {
        margin.left = lm;
        return my;
      }
    };
    my.rightMargin = function(rm) {
      if (!arguments.length) {
        return margin.right;
      } else {
        margin.right = rm;
        return my;
      }
    };
    my.topMargin = function(tm) {
      if (!arguments.length) {
        return margin.top;
      } else {
        margin.top = tm;
        return my;
      }
    };
    my.bottomMargin = function(bm) {
      if (!arguments.length) {
        return margin.bottom;
      } else {
        margin.bottom = bm;
        return my;
      }
    };
    return my;
  };

}).call(this);
