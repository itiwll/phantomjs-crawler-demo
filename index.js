#!/usr/bin/env node

var path = require('path')
var childProcess = require('child_process')
var phantomjs = require('phantomjs')
var binPath = phantomjs.path
var fs = require('fs');

var argv = require('yargs')
  .option('u', {
    alias : 'url',
    demand: true,
    describe: '抓取页面的url',
    type: 'string'
  })
  .option('s', {
    alias : 'selectors',
    default: '',
    describe: 'jquery选择器,多个以|分割,不传将返回整个html',
    type: 'string'
  })
  .option('t', {
    alias : 'time',
    demand: true,
    default: 0,
    describe: '异步等待时间(秒)',
    type: 'number'
  })
  .option('l', {
    alias : 'log',
    demand: true,
    default: false,
    describe: '是否打印日志',
    type: 'boolean'
  })
  .usage('Usage: phantomjs-crawler [options]')
  .example('phantomjs-crawler -u https://detail.tmall.com/item.htm?id=527595656123 -t 3')
  .example('phantomjs-crawler -u https://baidu.com -s "#lg"')
  .help('h')
  .alias('h', 'help')
  .epilog('copyright 2016')
  .argv;


!argv.log || console.log('抓取url',argv.url);
!argv.log || console.log('异步等待时间',argv.time);
!argv.log || console.log('选择器',argv.selectors);

var childArgs = [
  path.join(__dirname, 'phantomjs-script.js'),
  argv.url,
  argv.selectors,
  argv.time,
  argv.log
]

!argv.log || console.log('打开phantomjs');
childProcess.execFile(binPath, childArgs, function(err, stdout, stderr) {
	console.log(stdout);
})