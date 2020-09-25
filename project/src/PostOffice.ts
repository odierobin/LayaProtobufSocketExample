import TarsisSocket from "./TarsisSocket"

/**
 * 消息处理中间件，Protobuf通过模板生成或解析ArrayBuffer
 * Template类型结构：
 * {type:string,write:string,read:string,constNumber:number,costString:string,key:string}
 * type:处理类型，write:发送写处理函数，read:接受读处理函数，constNumber:constNumber类型的处理值，costString:costString类型处理值，key:默认处理目标字段
 * type字段类型列表:
 * constNumber:写处理使用constNumber字段，读处理忽略值
 * constString:写处理使用constString字段，读处理忽略值
 * keyLength:写处理使用消息体key字段对应值的length，读处理预先存下lenght，在读取key值内容时候使用
 * keyInt:写处理直接写入key字段对应读值，读处理直接读取值写入输出对象的key值
 * key:写处理直接写入key字段对应读值，读处理使用预存读长度值读取内容写入输出对象的key值
 * keyBuffer:写处理直接写入key字段的对应值的buffer，读处理使用当前容器的pos值和预存的长度值读取内容写入输出对象的key值
 */
export default class PostOffice{
    /**
     * 配置信息
     */
    private settings : IPostofficeSettings = {
        showOutMessage:false,   
        showInMessage:false,
        heartMessageType:'ping',
        heartMessageSign:0,
        isProtobuf:false,
        protobufTemplate:[],
        endian:Laya.Byte.BIG_ENDIAN,
        isSupportHeartBeatMessage:true
    }
    /**
     * Socket实例
     */
    public socket : TarsisSocket
    /**
     * Socket状态
     */
    public isSocketOpen : boolean = false
    /**
     * 处理进入的Protobuf到容器
     */
    private input : Laya.Byte
    /**
     * 处理发出的Protobuf到容器
     */
    private output : Laya.Byte
    /**
     * 心跳失败处理
     */
    private onHeartFail : Function = null
    /**
     * 心跳函数
     */
    private onHeartBeat : Function = null
    /**
     * 构造器
     * @param settings 配置信息
     */
    constructor (settings?:IPostofficeSettings){
        this.settings = {
            ...this.settings,
            ...settings
        }
        this.input = new Laya.Byte()
        this.input.endian = this.settings.endian
        this.output = new Laya.Byte()
        this.output.endian = this.settings.endian
    }
    /**
     * 启动Postoffice，实例Socket，链接URL，配置回调
     * @param config Postoffice启动配置信息
     */
    public startNet(config:IPostofficeStart){
        this.socket = new TarsisSocket()
        this.onHeartBeat = config.onHeartBeat
        this.onHeartFail = config.onHeartFail
        this.socket.init({
            url:config.socketAddress,
            onOpen:()=>{
                this.onOpen()
                if(config.onOpenCallback){
                    config.onOpenCallback()
                }
            },
            onError:(e)=>{
                this.onError(e)
                if(config.onSocetError){
                    config.onSocetError(e)
                }
            },
            onClose:()=>{
                this.onClose()
            },
            onMsg:(data)=>{
                this.onMessage(data,config.onMessageCallbck)
            },
            isProtobuf:this.settings.isProtobuf
        })
    }
    /**
     * 非Protobuf发送消息
     * @param msg 消息体，对象，类型在type字段
     */
    public sendMessage(msg:any){
        if(this.isSocketOpen){
            if(this.settings.showOutMessage){
                if(msg.type !== this.settings.heartMessageType){
                    console.log(`Msg Out : ${JSON.stringify(msg)}`)
                }
            }
            
            this.socket.sendMessge(msg)
        }
    }
    /**
     * Protobuf模式发送消息
     * @param msg 消息体，消息模板对象，消息内容在data字段
     */
    public sendProtoMessage(msg:any){
        if(this.isSocketOpen){
            // 清空发送ArrayBuffer容器
            this.output.clear()
            // 重置位置
            this.output.pos = 0
            // 根据settings.protobufTemplate按顺序生成消息
            this.settings.protobufTemplate.forEach(config => {
                switch(config.type){
                    case 'constNumber':
                        this.output[config.write](config.constNumber)
                        break
                    case 'keyLength':
                        this.output[config.write](msg[config.key].length)
                        break
                    case 'key':
                        this.output[config.write](msg[config.key])
                        break
                    case 'keyInt':
                        this.output[config.write](msg[config.key])
                        break
                    case 'keyBuffer':
                        this.output[config.write](msg[config.key].buffer)
                        break
                }
            })
            // 使用Socket实例发送消息(ArrayBuffer)
            this.socket.sendMessge(this.output.buffer)
        }
    }
    /**
     * 内部链接成功处理
     */
    private onOpen(){
        this.isSocketOpen = true
        if(this.settings.isSupportHeartBeatMessage){
            Laya.timer.loop(5000,this,this.heartBeat)
        }
    }
    /**
     * 内部Socket报错处理
     * @param e 错误信息
     */
    private onError(e:any){
        console.log(`Socket On Error :: ${e}`)
    }
    /**
     * 内部消息处理
     * @param msg 消息内容
     * @param onMessageCallbck 外部回调
     */
    private onMessage(msg:any,onMessageCallbck:Function = null){
        //Protobuf处理
        if(this.settings.isProtobuf){
            // 标记需要长度到字段到长度值
            let length : any = {}
            // 消息处理结果
            let message : any = {}
            // 清空ArrayBuffer容器
            this.input.clear()
            // 载入消息
            this.input.writeArrayBuffer(msg)
            // 初始化位置为0
            this.input.pos = 0
            // 根据settings.protobufTemplate按顺序读取消息
            this.settings.protobufTemplate.forEach(config => {
                switch(config.type){
                    case 'constNumber':
                        const _c = this.input[config.read]()
                        break
                    case 'keyLength':
                        length[config.key] = this.input[config.read]()
                        break
                    case 'keyInt':
                        message[config.key] = this.input[config.read]()
                        break
                    case 'key': 
                        if(length[config.key]){
                            message[config.key] = this.input[config.read](length[config.key])
                        }
                        break
                    case 'keyBuffer':
                        if(length[config.key]){
                            message[config.key] = this.input[config.read](this.input.pos,length[config.key])
                        }
                        break
                }
            })
            // 判断是否为Heartbeat消息
            if(message.id == this.settings.heartMessageSign){
                Laya.timer.clear(this,this.heartBeatFail)
            }else{
                if(onMessageCallbck){
                    onMessageCallbck(message)
                }
            }
        }else{
            // 处理普通字符串消息
            let message = JSON.parse(msg)
            // 判断是否为心跳消息(type字段)
            if(message.type == this.settings.heartMessageType){
                Laya.timer.clear(this,this.heartBeatFail)
                return
            }else{
                if(onMessageCallbck){
                    onMessageCallbck(message)
                }
            }
        }
    }
    /**
     * 内部断开处理
     */
    private onClose(){
        this.isSocketOpen = false
        Laya.timer.clear(this,this.heartBeat)
        if(this.onHeartFail){
            this.onHeartFail()
        }
    }
    /**
     * 内部心跳函数
     */
    private heartBeat(){
        if(this.isSocketOpen && this.onHeartBeat){
            this.onHeartBeat()
            Laya.timer.once(4000,this,this.heartBeatFail)
        }
    }
    /**
     * 内部心跳失败处理
     */
    private heartBeatFail(){
        this.socket.close()
        if(this.onHeartFail){
            this.onHeartFail()
        }
    }
}
/**
 * Postoffice配置接口
 * @interface
 */
interface IPostofficeSettings{
    /** 打印发出到消息 */
    showOutMessage?:boolean, 
    /** 打印进入到消息 */
    showInMessage?:boolean,
    /** 心跳控制 非Protobuf类型的消息ID (type字段)*/
    heartMessageType?:string,
    /** 心跳控制 Protobuf类型的消息ID   (id字段)*/
    heartMessageSign?:number,
    /** 是否使用Protobuf */
    isProtobuf?:boolean,
    /** Protobuf配置信息 生成或解析消息体 */
    protobufTemplate?:any[],
    /** Protobuf的Byte大小端定义 */
    endian?:string,
    /** 是否需要处理心跳 */
    isSupportHeartBeatMessage?:boolean
}
/**
 * Postoffice启动接口
 * @interface
 */
interface IPostofficeStart{
    /** 链接地址 */
    socketAddress :string,
    /** 链接成功回调 */
    onOpenCallback? :Function,
    /** 收消息回调 */
    onMessageCallbck? :Function,
    /** 错误处理会带哦 */
    onSocetError? :Function,
    /** 心跳失败回调 */
    onHeartFail? : Function,
    /** 外部提供的心跳函数 */
    onHeartBeat? : Function
}