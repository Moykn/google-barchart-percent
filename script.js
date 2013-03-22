		function addTextNode(attrs, text, _element) {
            var el= document.createElementNS('http://www.w3.org/2000/svg', "text");
            for (var k in attrs){
               el.setAttribute(k, attrs[k]);
            }
			var textNode = document.createTextNode(text);
			el.appendChild(textNode);
	        return el;
        }

    var chart;
      google.load("visualization", "1", {packages:["corechart"]});
      google.setOnLoadCallback(overridesChart);
	
      function overridesChart() {
	      google.visualization.ChartWrapper.prototype._draw = 
	      	google.visualization.ChartWrapper.prototype.draw; 
	      		google.visualization.ChartWrapper.prototype.draw = 
	  				function(){
	  					fnpp = this;
	  					var __chart__ = this;
	  					__chart__._draw(arguments);
	  					
						var __table__ = __chart__.getDataTable().D;
						
						var __bars__ = $("svg > g:nth(2) > g > g:nth(1) > rect",$("#"+ __chart__.dg.id));
						for (var ri = 0,rLen = __table__.length -1 ; ri <= rLen; ri++) {
								var row = __table__[ri].c;
								var _total = 0;
									//calcular a soma dos valores de cada coluna ignorando a primeira que é o label do eixo Y
									_total = getTotal(row);
									//Criar elemento <text> com a porcentagem da coluna
										for (var ci = 1, cj = ri, cLen = row.length - 1; ci <= cLen; ci++, cj+=__bars__.length / cLen) {
											   var _el = __bars__[cj];
											   var _value = formatFloat((row[ci].v / _total) * 100);
											   if(_value <= 0)
											   		continue;

										var pos = {
											x:  (parseFloat($(_el).attr("x")) + parseFloat($(_el).attr("width"))) + 5,
											y:  parseFloat($(_el).attr("y")) + (parseFloat($(_el).attr("height"))/1.1)										
										};
										var __parent__ = $(_el).parent();
										__parent__.append(addTextNode({x:pos.x, y:pos.y, stroke:'none','font-family':"Segoe UI light", fill:'black', 'font-size':12 }, _value + "%", _el))
									};
						};
	  				};

		function formatFloat(n) {
			if(n % 1 !== 0){
				return n.toFixed(1);
			}
		   return n;
		}
		function getTotal(row){
			var _total=0;
			for (var ci = 1, cLen = row.length - 1; ci <= cLen; ci++) {
					_total+=row[ci].v;
				};
			return _total;
		}
		drawChart();
	}
	function drawChart(){
        var data = google.visualization.arrayToDataTable([
          ['Year' , 'Test 1', 'Test 2', 'Test3'],
          ['2004',  1000,      400   ,   100],
          ['2005',  1170,      460   ,   200],
          ['2006',  660,       1120  ,   300],
          ['2007',  1030,      540   ,   400],
          ['2008',  1400,      150   ,   500],
          ['2009',  1400,      0     ,     0],
        ]);
        if(chart){
        	chart.draw(data);
        	return;
        }
        var options = {
          title: 'Company Performance', 
          vAxis: {title: 'Year',  titleTextStyle: {color: 'red'}}
        };

        chart = new google.visualization.ChartWrapper({
				 chartType: 'BarChart',
				 dataTable: data,
				 options: {
					 'title': "Teste",
					 'titleTextStyle': { 'fontSize': 18, 'align': 'center' },
					 'width': 600,
					 'height': 500,
					 'legend': { 'position': 'right', 'textStyle': { 'color': 'blue', 'fontSize': 11} },
					 'chartArea': { 'left': 70, 'height': '70%', 'width': '50%' },
					 'isStacked': 'false',
					 'backgroundColor': 'whitesmoke',
					 'fontSize': '12',
					 'vAxis': {
						 'title': 'Chart Title',
						 'titleTextStyle': { 'fontSize': 18 }
					 },
					 'hAxis': {
						 'title': "Teste",
						 'titleTextStyle': { 'fontSize': 18 }
					 },
					 labels:{


					 }
				},
				containerId: $("#chart_div").get(0)
			});
        chart.draw(data);
      }