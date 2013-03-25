google._setOnLoadCallback = google.setOnLoadCallback;
  google.setOnLoadCallback = function(callback){
  		function __overrides_chart_draw(){
	      google.visualization.ChartWrapper.prototype._draw = 
	      	google.visualization.ChartWrapper.prototype.draw; 
	      		google.visualization.ChartWrapper.prototype.draw = 
	  				function() {
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

		function addTextNode(attrs, text, _element) {
	        var el= document.createElementNS('http://www.w3.org/2000/svg', "text");
	        for (var k in attrs){
	           el.setAttribute(k, attrs[k]);
	        }
			var textNode = document.createTextNode(text);
			el.appendChild(textNode);
	        return el;
	    }
	    callback.call();
	}
	    google._setOnLoadCallback(__overrides_chart_draw);
}