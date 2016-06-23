# phantomjs-crawler-demo phantomjs爬虫demo


## 使用方法
```sh
Usage: phantomjs-crawler [options]

Options:
  -u, --url        抓取页面的url                             [string] [required]
  -s, --selectors  jquery选择器,多个以|分割,不传将返回整个html
                                                          [string] [default: ""]
  -t, --time       异步等待时间(秒)             [number] [required] [default: 0]
  -l, --log        是否打印日志            [boolean] [required] [default: false]
  -h, --help       Show help                                           [boolean]

Examples:
  phantomjs-crawler -u https://detail.tmall.com/item.htm?id=527595656123 -t 3
  phantomjs-crawler -u https://baidu.com -s "#lg"
```

## 安装
```javascript 
npm install phantomjs-crawler-demo -g
```
