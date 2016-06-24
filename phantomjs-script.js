var page = require('webpage').create();

var system = require('system');

var consoleTag = "&&consoleTag&&";

if (system.args.length === 1) {
    console.log('调用phantomjs没有参数');
	  phantom.exit(1);
} else {
    var url = system.args[1];
    var selectors = system.args[2];
    var time = system.args[3];
    var log = system.args[4];
}

page.onError = function(msg, trace) {

  // var msgStack = ['ERROR: ' + msg];

  // if (trace && trace.length) {
  //   msgStack.push('TRACE:');
  //   trace.forEach(function(t) {
  //     msgStack.push(' -> ' + t.file + ': ' + t.line + (t.function ? ' (in function "' + t.function +'")' : ''));
  //   });
  // }

  // console.error(msgStack.join('\n'));
  

};

page.onConsoleMessage = function(msg) {
	// 打印页面消息至控制台
  if (msg.indexOf(consoleTag)>-1) {
  	console.log(msg.replace(consoleTag,''));
  } 
  // console.log(msg);
};

page.onResourceRequested = function(requestData, request) {
  if ((/http:\/\/.+?\.((css)|(png)|(jpg))$/gi).test(requestData['url'])) {
    request.abort();
  }   
};

page.open(url, function (s) {
  log||console.log('状态',s);
  if ( s === "success" ) {
  		setTimeout(function() {
	      page.includeJs("http://cdn.bootcss.com/jquery/1.12.3/jquery.min.js", function() {
	          page.evaluate(function(selectors,consoleTag) {

              if (!selectors) {
                // 打印html
                console.log(consoleTag + document.documentElement.outerHTML); 
                
              }else {
                var selectors = selectors.split('|');
                for (var i = 0; i < selectors.length; i++) {
                  try{
                    var el = $(selectors[i]);
                    if (el.length) {
                      console.log(consoleTag + el.html());
                    }else {
                      console.log(consoleTag);
                    }
                  }
                  catch(err){
                    console.log(consoleTag + '元素' +selectors[i] + '抓取异常');
                  }
                }
              }

	          },selectors,consoleTag);
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