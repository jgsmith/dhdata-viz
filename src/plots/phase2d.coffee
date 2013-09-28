window.dhdata.viz.plots ?= {}

window.dhdata.viz.plots.phase2D = ->
  margin = 
    top: 20
    right: 20
    bottom: 30
    left: 40
  width = 210 - margin.right - margin.left
  height = 200 - margin.top - margin.bottom
  data = []
  dataDoubled = []
  delta = 0
  fx = fy = (i) -> i
  svg = null

  x = d3.scale.linear().range([0, width]).domain([-1,1]).nice()
  y = d3.scale.linear().range([height, 0]).domain([-1,1]).nice()
  xAxis = d3.svg.axis().ticks(5).scale(x).orient("bottom")
  yAxis = d3.svg.axis().ticks(5).scale(y).orient("left")

  my = (selection) ->
    svg = selection.append("svg").
          attr("width", width + margin.left + margin.right).
          attr("height", height + margin.top + margin.bottom).
          append("g").
          attr("transform", "translate(#{margin.left},#{margin.top})")

    svg.append("g").
       attr("class", "x axis").
       attr("transform", "translate(0," + height + ")").
       call(xAxis)

    svg.append("g").
       attr("class", "y axis").
       call(yAxis)

  drawDots = ->
    dots = svg.selectAll(".dot").data(d3.zip(data,dataDoubled.slice(delta)))
    dots.transition().duration(100).
         attr("cx", (d) -> x(fx(d[0]))).
         attr("cy", (d) -> y(fy(d[1])))
    dots.enter().
         append("circle").
         attr("class", "dot").
         attr("r", 0.25)
    dots.exit().remove()

  my.data = (d) ->
    if not arguments.length
      data
    else
      data = d
      dataDoubled = data.concat(data)
      x.domain(d3.extent(data)).nice()
      y.domain(d3.extent(data)).nice()
      drawDots()
      my

  my.delta = (d) ->
    if not arguments.length
      delta
    else
      delta = d
      drawDots()
      my

  my.width = (w) ->
    if not arguments.length
      width
    else
      width = w
      my

  my.height = (h) ->
    if not arguments.length
      height
    else
      height = h
      my

  my.leftMargin = (lm) ->
    if not arguments.length
      margin.left
    else
      margin.left = lm
      my

  my.rightMargin = (rm) ->
    if not arguments.length
      margin.right
    else
      margin.right = rm
      my

  my.topMargin = (tm) ->
    if not arguments.length
      margin.top
    else
      margin.top = tm
      my

  my.bottomMargin = (bm) ->
    if not arguments.length
      margin.bottom
    else
      margin.bottom = bm
      my

  my
