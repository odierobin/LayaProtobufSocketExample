# Laya Protobuf Socket Example

## 安装全局npm包
```
npm install protobufjs@6.8.4 -g
npm install @egret/protobuf -g
```
## 复制proto文件到protubuf目录的 ```protofile```

## 修改proto文件，在文件首添加
```
package gameProto;
```
```gameProto```为包名，必须添加包名，这个可以修改，需要同时修改接发消息的位置

## 在上级目录（包含protubuf目录）执行
```
pb-egret generate
```
这个会编译Laya可以使用的protobuf消息对象，更新proto文件需要重新生成
## 复制文件
- 复制一次：
  - 复制```protobuf/library/protobuf-library.min.js```到项目```bin/libs```下
  - 复制```protobuf/library/protobuf-library.d.ts```到项目```libs```下
- 每次更新复制：
  - 复制```protobuf/bundles/protobuf-bundles.min.js```到项目```bin/libs```下
  - 复制```protobuf/bundles/rotobuf-bundles.d.ts```到项目```libs```下
## 编辑项目的类库设置
勾选 ```protobuf-library.js``` 和 ```protobuf-bundles.js```

库的顺序一定不能错！！在bin/index.js里查看，要先加载protobuf-library.js，然后再加载protobuf-bundles.js，不然会报错，找不到protobuf.roots初始化对象。

## 配置GameConstant里的Proto消息对象
```
public static MESSAGEPROTOTYPE = {
    HEARTBEAT:{
        type:'HeartBeat',
        id:0,
        action:'-1'
    },
    REQ_LOGIN:{
        type:'Req_Login',
        id:0x0401,
        action:'userAction'
    },
    RESP_LOGIN:{
        type:'Resp_Login',
        id:-0x0401,
        action:'-1'
    }
    //...其他配置
}
```

## 配置GameConstant里的消息结构配置
读写都按配置都数组顺序处理
### 对象结构：
```
{
    type:string,
    write:string,
    read:string,
    constNumber:number,
    costString:string,
    key:string
}
```
### 结构说明
- type: 处理类型
- write: 发送写处理函数
- read: 接受读处理函数
- constNumber: constNumber类型的处理值
- costString: costString类型处理值
- key:默认处理目标字段
### type字段类型说明
- constNumber: 写处理使用constNumber字段，读处理忽略值
- constString: 写处理使用constString字段，读处理忽略值
- keyLength: 写处理使用消息体key字段对应值的length，读处理预先存下lenght，在读取key值内容时候使用
- keyInt: 写处理直接写入key字段对应读值，读处理直接读取值写入输出对象的key值
- key: 写处理直接写入key字段对应读值，读处理使用预存读长度值读取内容写入输出对象的key值
- keyBuffer: 写处理直接写入key字段的对应值的buffer，读处理使用当前容器的pos值和预存的长度值读取内容写入输出对象的key值

### 完整示例
对应的结构
``` 0xabef0101|包体长度|协议号|action长度|action名称|包体内容 ```

```
public static PROTOBUFTEMPLATE = [
    {
        type:'constNumber',
        write:'writeInt32',
        read:'getInt32',
        constNumber:0xabef0101,
        key:'sign'
    },
    {
        type:'keyLength',
        write:'writeInt32',
        read:'getInt32',
        key:'data'
    },
    {
        type:'keyInt',
        write:'writeInt32',
        read:'getInt32',
        key:'id'
    },
    {
        type:'keyLength',
        write:'writeInt32',
        read:'getInt32',
        key:'action'
    },
    {
        type:'key',
        write:'writeUTFBytes',
        read:'getUTFBytes',
        key:'action'
    },
    {
        type:'keyBuffer',
        write:'writeArrayBuffer',
        read:'getUint8Array',
        key:'data'
    }
]
```

## 发出消息
```
msgOut(config:any,msg: any) {
    const T = gameProto[config.type]

    let message : typeof T = new gameProto[config.type]()
    message = {
        ...msg
    }
    const data = new Laya.Byte(gameProto[config.type].encode(message).finish())
    this.postOffice.sendProtoMessage({
        data,
        ...config
    })
}
```

例如 发出登陆消息 protobuf里的```Reg_Login```消息，对应的配置为```GameConstant.MESSAGEPROTOTYPE.REQ_LOGIN```
```
this.msgOut(GameConstant.MESSAGEPROTOTYPE.REQ_LOGIN,{account:'abc',loginType:99})
```

```Postoffice```会按配置处理消息发送```ArrayBuffer```

## 接收消息
```
onMessageCallbck:(message)=>{
    if(GameConstant.PROTOBUFMESSAGEIDLIST[`ID_${message.id}`] != undefined){
        const key = fishingProto[GameConstant.PROTOBUFMESSAGEIDLIST[`ID_${message.id}`]]
        message.obj = key.decode(message.data)
    }else{
        console.log(`Unknow Proto Message ID : ${message.id}`)
    }
    console.log(message)
    switch(message.id){
        case GameConstant.MESSAGEPROTOTYPE.RESP_LOGIN.id:
            console.log(message.obj.desc)
            break
    }
}
```
```message```为```Postoffice```按配置处理后的消息体，protobuf对应的内容在```data```字段，按```id```字段找到protobuf对象，处理后的对象为```message.obj```

## 心跳设置
初始化Postoffice的时候可以设置是否使用心跳

如果使用心跳，start链接的时候要提交心跳方法和失败回调

