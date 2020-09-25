export default class TarsisSocket{
    /**
     * Socket 实例
     */
    private socket: Laya.Socket
    /**
     * 输出容器
     */
    private output: Laya.Byte
    /**
     * 是否是Protobuf
     */
    private isProtobuf : boolean = false
    /**
     * 是否已经链接
     */
    private isOpen : boolean = false
    /**
     * 链接成功回调
     */
    private onOpen : Function = null
    /**
     * 错误处理回调
     */
    private onError : Function = null
    /**
     * 链接断开回调
     */
    private onClose : Function = null
    /**
     * 消息处理回调
     */
    private onMsg : Function = null
    /**
     * 构造器
     */
    constructor() {}
    /**
     * 初始化对象
     * @param config 初始化配置信息
     */
    public init(config:TarsisSocketConfig){
        this.onOpen = config.onOpen
        this.onClose = config.onClose
        this.onError = config.onError
        this.onMsg = config.onMsg
        this.isProtobuf = config.isProtobuf || false
        this.connect(config.url)
    }
    /**
     * 断开Socket链接
     */
    public close(){
        this.socket.close()
    }
    /**
     * 链接Socket
     * @param url 目标地址
     */
    private connect(url:string): void {
        this.socket = new Laya.Socket()
        this.socket.connectByUrl(url)
        this.output = this.socket.output
        this.socket.on(Laya.Event.OPEN, this, this.onSocketOpen)
        this.socket.on(Laya.Event.CLOSE, this, this.onSocketClose)
        this.socket.on(Laya.Event.MESSAGE, this, this.onMessageReveived)
        this.socket.on(Laya.Event.ERROR, this, this.onConnectError)
    }
    /**
     * 内部链接成功处理
     */
    private onSocketOpen(): void {
        console.log("[SOCKET] Socket Connected")
        this.isOpen = true
        if(this.onOpen) this.onOpen()
    }
    /**
     * 内部链接断开处理
     */
    private onSocketClose(): void {
        console.log("[SOCKET] Socket closed")
        this.isOpen = false
        if(this.onClose) this.onClose()
    }
    /**
     * 内部处理消息
     * @param message 消息体
     */
    private onMessageReveived(message: any): void {
        if(this.isProtobuf){
            if(this.onMsg) this.onMsg(message)
        }else{
            let msg
            if (typeof message == "string") {
                msg = message
            }
            else if (message instanceof ArrayBuffer) {
                console.log(new Laya.Byte(message).readUTFBytes());
                msg = new Laya.Byte(message).readUTFBytes()
            }
            this.socket.input.clear();
            if(this.onMsg) this.onMsg(msg)
        }
    }
    /**
     * 内部错误处理
     * @param e 错误消息
     */
    private onConnectError(e: Event): void {
        console.log("[SOCKET] Error : ")
        console.log(e)
        if(this.onError) this.onError(e)
    }
    /**
     * 发送消息
     * @param msg 发送消息的消息体
     */
    public sendMessge(msg:any){
        if(this.isOpen){
            try {
                if(this.isProtobuf){
                    this.output.writeArrayBuffer(msg);
                    this.socket.send(this.output.buffer);
                    this.output.clear();
                }else{
                    this.socket.send(JSON.stringify(msg))
                }
                
            } catch (error) {
                if(this.onError) this.onError(error)
            }
        }
    }
}
/** 
 * Socket设置配置 
 * @interface
 */
interface TarsisSocketConfig{
    /** 链接地址 */
    url:string,
    /** 链接成功回调 */
    onOpen: Function,
    /** Socket出错回调 */
    onError:Function,
    /** Socket断开回调 */
    onClose:Function,
    /** 消息处理回调 */
    onMsg:Function,
    /** 是否是Protobuf */
    isProtobuf?:boolean
}