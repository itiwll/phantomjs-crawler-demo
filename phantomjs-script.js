var page = require('webpage').create();

var system = require('system');

if (system.args.length === 1) {
    console.log('调用phantomjs没有参数');
	  phantom.exit(1);
} else {
    var url = system.args[1];
    var time = system.args[2];
}

page.onConsoleMessage = function(msg) {
	// 打印页面消息至控制台
	console.log(msg);
};

page.onResourceRequested = function(requestData, request) {
  if ((/http:\/\/.+?\.((css)|(png)|(jpg))$/gi).test(requestData['url'])) {
    request.abort();
  }   
};

page.open(url, function (s) {
  console.log('状态',s);
  if ( s === "success" ) {
  		console.log("success");
  		setTimeout(function() {
	      page.includeJs("http://cdn.bootcss.com/jquery/1.12.3/jquery.min.js", function() {
	          page.evaluate(function() {
	          		// 打印html
	              console.log("$(\"body\").text() -> " + $("body").html()); 
	          });
					  setTimeout(function() {
					  	phantom.exit();
					  }, 100);
	      });
  		}, time*1000);
  }else {
  	console.error("未加载成功");
	  phantom.exit(1);
  }
});