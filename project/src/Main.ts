import GameConfig from "./GameConfig";
import GameConstant from "./GameConstant";
import PostOffice from "./PostOffice";
class Main {
	postOffice : PostOffice
	constructor() {
		//根据IDE设置初始化引擎		
		if (window["Laya3D"]) Laya3D.init(GameConfig.width, GameConfig.height);
		else Laya.init(GameConfig.width, GameConfig.height, Laya["WebGL"]);
		Laya["Physics"] && Laya["Physics"].enable();
		Laya["DebugPanel"] && Laya["DebugPanel"].enable();
		Laya.stage.scaleMode = GameConfig.scaleMode;
		Laya.stage.screenMode = GameConfig.screenMode;
		Laya.stage.alignV = GameConfig.alignV;
		Laya.stage.alignH = GameConfig.alignH;
		//兼容微信不支持加载scene后缀场景
		Laya.URL.exportSceneToJson = GameConfig.exportSceneToJson;

		//打开调试面板（通过IDE设置调试模式，或者url地址增加debug=true参数，均可打开调试面板）
		if (GameConfig.debug || Laya.Utils.getQueryString("debug") == "true") Laya.enableDebugPanel();
		if (GameConfig.physicsDebug && Laya["PhysicsDebugDraw"]) Laya["PhysicsDebugDraw"].enable();
		if (GameConfig.stat) Laya.Stat.show();
		Laya.alertGlobalError(true);

		//激活资源版本控制，version.json由IDE发布功能自动生成，如果没有也不影响后续流程
		Laya.ResourceVersion.enable("version.json", Laya.Handler.create(this, this.onVersionLoaded), Laya.ResourceVersion.FILENAME_VERSION);
	}

	onVersionLoaded(): void {
		//激活大小图映射，加载小图的时候，如果发现小图在大图合集里面，则优先加载大图合集，而不是小图
		Laya.AtlasInfoManager.enable("fileconfig.json", Laya.Handler.create(this, this.onConfigLoaded));
	}

	onConfigLoaded(): void {
		// Socket 测试地址
		const socketAddress = 'ws:192.168.0.100:5052'

		// 处理消息ID与消息配置对应表，接收消息时候处理结果
		let protoIdList = {}
		Object.keys(GameConstant.MESSAGEPROTOTYPE).forEach(key => {
			const config = GameConstant.MESSAGEPROTOTYPE[key]
			protoIdList[`ID_${config.id}`] = config.type
		})
		GameConstant.PROTOBUFMESSAGEIDLIST = protoIdList

		// 初始化消息中间件
		this.postOffice = new PostOffice({
			showInMessage:false,
			showOutMessage:false,
			isProtobuf:true,
			protobufTemplate:GameConstant.PROTOBUFTEMPLATE,
			heartMessageSign:0,
			isSupportHeartBeatMessage:true
		})

		// 消息中间件开始链接Socket
		this.postOffice.startNet({
			socketAddress:socketAddress,
			onHeartBeat:()=>{
				const strByte = new Laya.Byte()
                strByte.writeUTFBytes(`ping`)
                this.postOffice.sendProtoMessage({
                    data:strByte,
                    ...GameConstant.MESSAGEPROTOTYPE.HEARTBEAT
                })
			},
			onHeartFail:()=>{
				console.log(`socket heart fail`)
			},
			onOpenCallback:()=>{
				this.msgOut(GameConstant.MESSAGEPROTOTYPE.REQ_LOGIN,{account:'abc',loginType:99})
			},
			onSocetError:(e)=>{
				console.log(e)
			},
			onMessageCallbck:(message)=>{
				if(GameConstant.PROTOBUFMESSAGEIDLIST[`ID_${message.id}`] != undefined){
                    const key = gameProto[GameConstant.PROTOBUFMESSAGEIDLIST[`ID_${message.id}`]]
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
		})

		//加载IDE指定的场景
		GameConfig.startScene && Laya.Scene.open(GameConfig.startScene);
	}
	/**
	 * 消息发送方法
	 * @function
	 * @param config 消息结构配置 GameConst预先配置
	 * @param msg 消息对象，会转换为protobuf对象
	 */
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
}
//激活启动类
new Main();
