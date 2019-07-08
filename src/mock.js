// 引入mockjs
const Mock = require("mockjs");
// 获取 mock.Random 对象
const Random = Mock.Random;
// mock一组数据
const produceNewsData = function() {
  let articles = [];
  for (let i = 0; i < 10; i++) {
    let newArticleObject = {
      title: Random.csentence(5, 30), //  Random.csentence( min, max )
      thumbnail_pic_s: Random.dataImage("300x250", "mock的图片1"), // Random.dataImage( size, text ) 生成一段随机的 Base64 图片编码
      author_name: Random.cname(), // Random.cname() 随机生成一个常见的中文姓名
      date: Random.date() + " " + Random.time() // Random.date()指示生成的日期字符串的格式,默认为yyyy-MM-dd；Random.time() 返回一个随机的时间字符串
    };
    articles.push(newArticleObject);
  }
  return {
    code: 0,
    data: {
      articles: articles
    }
  };
};
Mock.toJSONSchema(produceNewsData);
// Mock.mock( url, post/get , 返回的数据)；
Mock.mock("/news/index", "get", produceNewsData);

// mock一组数据
const newdetail = function() {
  let articles = [];
  for (let i = 0; i < 10; i++) {
    let newArticleObject = {
      title: Random.csentence(5, 30), //  Random.csentence( min, max )
      thumbnail_pic_s: Random.dataImage("300x250", "mock的图片1"), // Random.dataImage( size, text ) 生成一段随机的 Base64 图片编码
      author_name: Random.cname(), // Random.cname() 随机生成一个常见的中文姓名
      date: Random.date() + " " + Random.time() // Random.date()指示生成的日期字符串的格式,默认为yyyy-MM-dd；Random.time() 返回一个随机的时间字符串
    };
    articles.push(newArticleObject);
  }

  return {
    code: 0,
    data: {
      content: Random.cparagraph(1, 100)
    }
  };
};
Mock.mock("/news/detail", "get", newdetail);

// 使用 Mock
Mock.mock("/getUserInfo", {
  "ticketCount|1-99999": 1,
  "name|": () => {
    return Random.cname();
  },
  "qq|9999-9999999999": 1,
  "tel|9999999999999-999999999999999": 1,
  "post|": () => {
    return Random.zip();
  },
  "address|": () => {
    return Random.county(true);
  }
});

Random.extend({
  constellation: function(date) {
    var constellations = [
      "白羊座",
      "金牛座",
      "双子座",
      "巨蟹座",
      "狮子座",
      "处女座",
      "天秤座",
      "天蝎座",
      "射手座",
      "摩羯座",
      "水瓶座",
      "双鱼座"
    ];
    return this.pick(constellations);
  }
});
Random.constellation();
console.log(Random.email());
Mock.mock("/test", "get", {
  boo1: "@boolean", //随机获取boolean值
  img: "@image", //随机获取图片路径
  name: "@name", //随机获取名字
  "winner|": () => {
    return Random.cname();
  }
});

//                                                                 生成规则的具体案例 DTD

// 1)属性值是字符串
// 'name|min-max':'value'
Mock.mock("/testString", "get", {
  "demo1|1-10": "*", // 'name|min-max': 'value'   通过重复'value' 生成一个字符串，重复次数大雨等于min，小于等于max
  "demo2|4": "#" // 'name|count': 'value' ：通过重复 'value' 生成一个字符串，重复次数等于 count
});

// 2)属性值是数值
// 'name|min-max':value
Mock.mock("/testNumber", "get", {
  "demo1|1-100": 100, // 'name|min-max':value ：生成一个大于等于min，小于等于max的整数，属性值value只用来确定类型
  "list|5": [
    {
      "id|+1": 1 // 'name|+step':value ：属性值自动加step，初始值为value
    }
  ],
  "demo3|1-100.1-10": 100, //'name|min-max.dmin-dmax':value 生成一个浮点数，整数部分大雨等于min，大于等于max，小数部分保留dmin-dmax
  "demo6|1-100.1": 1, // 'name|min-max.dcount':value 生成一个浮点数，整数部分大于等于min，小于等于max，小数部分保留dcount
  "demo7|23.1-10": 100 // 'name|count.dmin-dmax':value 生成一个浮点数，整数部分为count，小数部分保留dmin-dmax
});

// 3)属性值是布尔值  Boolean
Mock.mock("/testBoolean", "get", {
  "demo|3": true, // 'name|count':value ：随机生成一个布尔值，值为value的概率为count/(1+count)，值不为value的概率为1/(1+count)
  "demo2|1-10": true // 'name|min-max':value ：随机生成一个布尔值，值为value的概率是min/(min+max)，值不为value的概率是max/(min+max)
});

// 4)属性值是对象 Object
Mock.mock("/testObject", "get", {
  // 'name|min-max':{} ：从属性值 { } 中随机选取min-max个属性
  "demo11|2-4": {
    "110000": "北京市",
    "120000": "天津市",
    "130000": "河北省",
    "140000": "山西省",
    "150000": "宁夏省",
    "160000": "陕西省"
  },
  //'name|count'{} ：从属性值 { } 中随机选取count个属性
  "demo12|2": {
    姓名: "张三",
    性别: "男",
    年龄: "32",
    爱好: "敲代码"
  }
});

// 5)属性值是数组Array
Mock.mock("/testArray", "get", {
  "demo13|1": ["AMD", "CMD", "UMD"], // 'name|1':[' ', ' ' ...]或 'name|1':[{}, {} ...]
  "demo15|3": ["AMD", "CMD", "UMD"], //'name|count': [' ', ' ' ...]              或           'name|count': [{}, {} ...]通过重复属性值 [ ] 生成一个新数组，重复次数为count次
  "demo16|1-1": ["AMD", "CMD", "UMD"] //'name|min-max':[' ', ' ' ...]  或  'name|min-max':[{}, {} ...]通过重复属性值[]生成一个新数组，重复次数为min-max次
});

// 6)属性值是函数Function
Mock.mock("/testFunction", "get", {
  foo: "Demo", // 执行函数 function，取其返回值作为最终的属性值，函数的上下文为属性 'name' 所在的对象。
  demo17: function() {
    return this.foo;
  }
});

// 7)属性值是正则表达式RegExp
Mock.mock("/testRegExp", "get", {
  regexp1: /[a-z][A-Z][0-9]/,
  regexp2: /\w\W\s\S\d\D/,
  regexp3: /\d{5,10}/
});

// 8)属性值是路径
Mock.mock("/testPath", "get", {
  foo: "hello",
  nested: {
    a: {
      b: {
        c: "Mock.js"
      }
    }
  },
  demo21: "@/foo @/nested/a/b/c"
});

//                                                                 生成规则的具体案例 DPD

//基本方法 String integer date
Mock.mock("/testBasic", "get", {
  "list|10": [
    {
      "id|+1": 1,
      name: "@string",
      point: "@integer",
      birthday: "@date"
    }
  ]
});
// 拓展方法
Random.extend({
  weekday: function(date) {
    var weekdays = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
    return this.pick(weekdays);
  },
  sex: function(date) {
    var sexes = ["男", "女", "中性", "未知"];
    return this.pick(sexes);
  }
});
console.log(Random.weekday());
//                                                                 Mock.mock的具体案例

// 新增一条备注

let stest = "新增一条语句";

let stest2 = "新增的另外一条语句";
