(function () {
    'use strict';

    var Scene = Laya.Scene;
    var REG = Laya.ClassUtils.regClass;
    var ui;
    (function (ui) {
        var test;
        (function (test) {
            class TestSceneUI extends Scene {
                constructor() { super(); }
                createChildren() {
                    super.createChildren();
                    this.loadScene("test/TestScene");
                }
            }
            test.TestSceneUI = TestSceneUI;
            REG("ui.test.TestSceneUI", TestSceneUI);
        })(test = ui.test || (ui.test = {}));
    })(ui || (ui = {}));

    class GameControl extends Laya.Script {
        constructor() {
            super();
            this.createBoxInterval = 1000;
            this._time = 0;
            this._started = false;
        }
        onEnable() {
            this._time = Date.now();
            this._gameBox = this.owner.getChildByName("gameBox");
        }
        onUpdate() {
            let now = Date.now();
            if (now - this._time > this.createBoxInterval && this._started) {
                this._time = now;
                this.createBox();
            }
        }
        createBox() {
            let box = Laya.Pool.getItemByCreateFun("dropBox", this.dropBox.create, this.dropBox);
            box.pos(Math.random() * (Laya.stage.width - 100), -100);
            this._gameBox.addChild(box);
        }
        onStageClick(e) {
            e.stopPropagation();
            let flyer = Laya.Pool.getItemByCreateFun("bullet", this.bullet.create, this.bullet);
            flyer.pos(Laya.stage.mouseX, Laya.stage.mouseY);
            this._gameBox.addChild(flyer);
        }
        startGame() {
            if (!this._started) {
                this._started = true;
                this.enabled = true;
            }
        }
        stopGame() {
            this._started = false;
            this.enabled = false;
            this.createBoxInterval = 1000;
            this._gameBox.removeChildren();
        }
    }

    class GameUI extends ui.test.TestSceneUI {
        constructor() {
            super();
            GameUI.instance = this;
            Laya.MouseManager.multiTouchEnabled = false;
        }
        onEnable() {
            this._control = this.getComponent(GameControl);
            this.tipLbll.on(Laya.Event.CLICK, this, this.onTipClick);
        }
        onTipClick(e) {
            this.tipLbll.visible = false;
            this._score = 0;
            this.scoreLbl.text = "";
            this._control.startGame();
        }
        addScore(value = 1) {
            this._score += value;
            this.scoreLbl.changeText("分数：" + this._score);
            if (this._control.createBoxInterval > 600 && this._score % 20 == 0)
                this._control.createBoxInterval -= 20;
        }
        stopGame() {
            this.tipLbll.visible = true;
            this.tipLbll.text = "游戏结束了，点击屏幕重新开始";
            this._control.stopGame();
        }
    }

    class Bullet extends Laya.Script {
        constructor() { super(); }
        onEnable() {
            var rig = this.owner.getComponent(Laya.RigidBody);
            rig.setVelocity({ x: 0, y: -10 });
        }
        onTriggerEnter(other, self, contact) {
            this.owner.removeSelf();
        }
        onUpdate() {
            if (this.owner.y < -10) {
                this.owner.removeSelf();
            }
        }
        onDisable() {
            Laya.Pool.recover("bullet", this.owner);
        }
    }

    class DropBox extends Laya.Script {
        constructor() {
            super();
            this.level = 1;
        }
        onEnable() {
            this._rig = this.owner.getComponent(Laya.RigidBody);
            this.level = Math.round(Math.random() * 5) + 1;
            this._text = this.owner.getChildByName("levelTxt");
            this._text.text = this.level + "";
        }
        onUpdate() {
            this.owner.rotation++;
        }
        onTriggerEnter(other, self, contact) {
            var owner = this.owner;
            if (other.label === "buttle") {
                if (this.level > 1) {
                    this.level--;
                    this._text.changeText(this.level + "");
                    owner.getComponent(Laya.RigidBody).setVelocity({ x: 0, y: -10 });
                    Laya.SoundManager.playSound("sound/hit.wav");
                }
                else {
                    if (owner.parent) {
                        let effect = Laya.Pool.getItemByCreateFun("effect", this.createEffect, this);
                        effect.pos(owner.x, owner.y);
                        owner.parent.addChild(effect);
                        effect.play(0, true);
                        owner.removeSelf();
                        Laya.SoundManager.playSound("sound/destroy.wav");
                    }
                }
                GameUI.instance.addScore(1);
            }
            else if (other.label === "ground") {
                owner.removeSelf();
                GameUI.instance.stopGame();
            }
        }
        createEffect() {
            let ani = new Laya.Animation();
            ani.loadAnimation("test/TestAni.ani");
            ani.on(Laya.Event.COMPLETE, null, recover);
            function recover() {
                ani.removeSelf();
                Laya.Pool.recover("effect", ani);
            }
            return ani;
        }
        onDisable() {
            Laya.Pool.recover("dropBox", this.owner);
        }
    }

    class GameConfig {
        constructor() {
        }
        static init() {
            var reg = Laya.ClassUtils.regClass;
            reg("script/GameUI.ts", GameUI);
            reg("script/GameControl.ts", GameControl);
            reg("script/Bullet.ts", Bullet);
            reg("script/DropBox.ts", DropBox);
        }
    }
    GameConfig.width = 640;
    GameConfig.height = 1136;
    GameConfig.scaleMode = "fixedwidth";
    GameConfig.screenMode = "none";
    GameConfig.alignV = "top";
    GameConfig.alignH = "left";
    GameConfig.startScene = "test/TestScene.scene";
    GameConfig.sceneRoot = "";
    GameConfig.debug = false;
    GameConfig.stat = false;
    GameConfig.physicsDebug = false;
    GameConfig.exportSceneToJson = true;
    GameConfig.init();

    class GameConstant {
    }
    GameConstant.MESSAGEPROTOTYPE = {
        HEARTBEAT: {
            type: 'HeartBeat',
            id: 0,
            action: '-1'
        },
        REQ_LOGIN: {
            type: 'Req_Login',
            id: 0x0401,
            action: 'userAction'
        },
        RESP_LOGIN: {
            type: 'Resp_Login',
            id: -0x0401,
            action: '-1'
        },
        REQ_USEREXIT: {
            type: 'Req_UserExit',
            id: 0x0402,
            action: '-1'
        },
        RESP_USEREXIT: {
            type: 'Resp_UserExit',
            id: -0x0402,
            action: '-1'
        },
        REQ_USERINFO: {
            type: 'Req_UserInfo',
            id: 0x0403,
            action: 'userAction'
        },
        RESP_USERINFO: {
            type: 'Resp_UserInfo',
            id: -0x0403,
            action: '-1'
        },
        REQ_ROOMCONFIG: {
            type: 'Req_RoomConfig',
            id: 0x0404,
            action: 'roomAction'
        },
        RESP_ROOMCONFIG: {
            type: 'Resp_RoomConfig',
            id: -0x0404,
            action: '-1'
        },
        REQ_JOINROOM: {
            type: 'Req_JoinRoom',
            id: 0x0405,
            action: 'roomAction'
        },
        RESP_JOINROOM: {
            type: 'Resp_JoinRoom',
            id: -0x0405,
            action: '-1'
        },
        REQ_LEFTROOM: {
            type: 'Req_LeftRoom',
            id: 0x0801,
            action: '-1'
        },
        RESP_LEFTROOM: {
            type: 'Resp_LeftRoom',
            id: -0x0801,
            action: '-1'
        },
        RESP_FLUSHFISH: {
            type: 'Resp_flushFish',
            id: -0x0802,
            action: '-1'
        }
    };
    GameConstant.PROTOBUFTEMPLATE = [
        {
            type: 'constNumber',
            write: 'writeInt32',
            read: 'getInt32',
            constNumber: 0xabef0101,
            key: 'sign'
        },
        {
            type: 'keyLength',
            write: 'writeInt32',
            read: 'getInt32',
            key: 'data'
        },
        {
            type: 'keyInt',
            write: 'writeInt32',
            read: 'getInt32',
            key: 'id'
        },
        {
            type: 'keyLength',
            write: 'writeInt32',
            read: 'getInt32',
            key: 'action'
        },
        {
            type: 'key',
            write: 'writeUTFBytes',
            read: 'getUTFBytes',
            key: 'action'
        },
        {
            type: 'keyBuffer',
            write: 'writeArrayBuffer',
            read: 'getUint8Array',
            key: 'data'
        }
    ];
    GameConstant.PROTOBUFMESSAGEIDLIST = {};

    class TarsisSocket {
        constructor() {
            this.isProtobuf = false;
            this.isOpen = false;
            this.onOpen = null;
            this.onError = null;
            this.onClose = null;
            this.onMsg = null;
        }
        init(config) {
            this.onOpen = config.onOpen;
            this.onClose = config.onClose;
            this.onError = config.onError;
            this.onMsg = config.onMsg;
            this.isProtobuf = config.isProtobuf || false;
            this.connect(config.url);
        }
        close() {
            this.socket.close();
        }
        connect(url) {
            this.socket = new Laya.Socket();
            this.socket.connectByUrl(url);
            this.output = this.socket.output;
            this.socket.on(Laya.Event.OPEN, this, this.onSocketOpen);
            this.socket.on(Laya.Event.CLOSE, this, this.onSocketClose);
            this.socket.on(Laya.Event.MESSAGE, this, this.onMessageReveived);
            this.socket.on(Laya.Event.ERROR, this, this.onConnectError);
        }
        onSocketOpen() {
            console.log("[SOCKET] Socket Connected");
            this.isOpen = true;
            if (this.onOpen)
                this.onOpen();
        }
        onSocketClose() {
            console.log("[SOCKET] Socket closed");
            this.isOpen = false;
            if (this.onClose)
                this.onClose();
        }
        onMessageReveived(message) {
            if (this.isProtobuf) {
                if (this.onMsg)
                    this.onMsg(message);
            }
            else {
                let msg;
                if (typeof message == "string") {
                    msg = message;
                }
                else if (message instanceof ArrayBuffer) {
                    console.log(new Laya.Byte(message).readUTFBytes());
                    msg = new Laya.Byte(message).readUTFBytes();
                }
                this.socket.input.clear();
                if (this.onMsg)
                    this.onMsg(msg);
            }
        }
        onConnectError(e) {
            console.log("[SOCKET] Error : ");
            console.log(e);
            if (this.onError)
                this.onError(e);
        }
        sendMessge(msg) {
            if (this.isOpen) {
                try {
                    if (this.isProtobuf) {
                        this.output.writeArrayBuffer(msg);
                        this.socket.send(this.output.buffer);
                        this.output.clear();
                    }
                    else {
                        this.socket.send(JSON.stringify(msg));
                    }
                }
                catch (error) {
                    if (this.onError)
                        this.onError(error);
                }
            }
        }
    }

    class PostOffice {
        constructor(settings) {
            this.settings = {
                showOutMessage: false,
                showInMessage: false,
                heartMessageType: 'ping',
                heartMessageSign: 0,
                isProtobuf: false,
                protobufTemplate: [],
                endian: Laya.Byte.BIG_ENDIAN,
                isSupportHeartBeatMessage: true
            };
            this.isSocketOpen = false;
            this.onHeartFail = null;
            this.onHeartBeat = null;
            this.settings = Object.assign(Object.assign({}, this.settings), settings);
            this.input = new Laya.Byte();
            this.input.endian = this.settings.endian;
            this.output = new Laya.Byte();
            this.output.endian = this.settings.endian;
        }
        startNet(config) {
            this.socket = new TarsisSocket();
            this.onHeartBeat = config.onHeartBeat;
            this.onHeartFail = config.onHeartFail;
            this.socket.init({
                url: config.socketAddress,
                onOpen: () => {
                    this.onOpen();
                    if (config.onOpenCallback) {
                        config.onOpenCallback();
                    }
                },
                onError: (e) => {
                    this.onError(e);
                    if (config.onSocetError) {
                        config.onSocetError(e);
                    }
                },
                onClose: () => {
                    this.onClose();
                },
                onMsg: (data) => {
                    this.onMessage(data, config.onMessageCallbck);
                },
                isProtobuf: this.settings.isProtobuf
            });
        }
        sendMessage(msg) {
            if (this.isSocketOpen) {
                if (this.settings.showOutMessage) {
                    if (msg.type !== this.settings.heartMessageType) {
                        console.log(`Msg Out : ${JSON.stringify(msg)}`);
                    }
                }
                this.socket.sendMessge(msg);
            }
        }
        sendProtoMessage(msg) {
            if (this.isSocketOpen) {
                this.output.clear();
                this.output.pos = 0;
                this.settings.protobufTemplate.forEach(config => {
                    switch (config.type) {
                        case 'constNumber':
                            this.output[config.write](config.constNumber);
                            break;
                        case 'keyLength':
                            this.output[config.write](msg[config.key].length);
                            break;
                        case 'key':
                            this.output[config.write](msg[config.key]);
                            break;
                        case 'keyInt':
                            this.output[config.write](msg[config.key]);
                            break;
                        case 'keyBuffer':
                            this.output[config.write](msg[config.key].buffer);
                            break;
                    }
                });
                this.socket.sendMessge(this.output.buffer);
            }
        }
        onOpen() {
            this.isSocketOpen = true;
            if (this.settings.isSupportHeartBeatMessage) {
                Laya.timer.loop(5000, this, this.heartBeat);
            }
        }
        onError(e) {
            console.log(`Socket On Error :: ${e}`);
        }
        onMessage(msg, onMessageCallbck = null) {
            if (this.settings.isProtobuf) {
                let length = {};
                let message = {};
                this.input.clear();
                this.input.writeArrayBuffer(msg);
                this.input.pos = 0;
                this.settings.protobufTemplate.forEach(config => {
                    switch (config.type) {
                        case 'constNumber':
                            const _c = this.input[config.read]();
                            break;
                        case 'keyLength':
                            length[config.key] = this.input[config.read]();
                            break;
                        case 'keyInt':
                            message[config.key] = this.input[config.read]();
                            break;
                        case 'key':
                            if (length[config.key]) {
                                message[config.key] = this.input[config.read](length[config.key]);
                            }
                            break;
                        case 'keyBuffer':
                            if (length[config.key]) {
                                message[config.key] = this.input[config.read](this.input.pos, length[config.key]);
                            }
                            break;
                    }
                });
                if (message.id == this.settings.heartMessageSign) {
                    Laya.timer.clear(this, this.heartBeatFail);
                }
                else {
                    if (onMessageCallbck) {
                        onMessageCallbck(message);
                    }
                }
            }
            else {
                let message = JSON.parse(msg);
                if (message.type == this.settings.heartMessageType) {
                    Laya.timer.clear(this, this.heartBeatFail);
                    return;
                }
                else {
                    if (onMessageCallbck) {
                        onMessageCallbck(message);
                    }
                }
            }
        }
        onClose() {
            this.isSocketOpen = false;
            Laya.timer.clear(this, this.heartBeat);
            if (this.onHeartFail) {
                this.onHeartFail();
            }
        }
        heartBeat() {
            if (this.isSocketOpen && this.onHeartBeat) {
                this.onHeartBeat();
                Laya.timer.once(4000, this, this.heartBeatFail);
            }
        }
        heartBeatFail() {
            this.socket.close();
            if (this.onHeartFail) {
                this.onHeartFail();
            }
        }
    }

    class Main {
        constructor() {
            if (window["Laya3D"])
                Laya3D.init(GameConfig.width, GameConfig.height);
            else
                Laya.init(GameConfig.width, GameConfig.height, Laya["WebGL"]);
            Laya["Physics"] && Laya["Physics"].enable();
            Laya["DebugPanel"] && Laya["DebugPanel"].enable();
            Laya.stage.scaleMode = GameConfig.scaleMode;
            Laya.stage.screenMode = GameConfig.screenMode;
            Laya.stage.alignV = GameConfig.alignV;
            Laya.stage.alignH = GameConfig.alignH;
            Laya.URL.exportSceneToJson = GameConfig.exportSceneToJson;
            if (GameConfig.debug || Laya.Utils.getQueryString("debug") == "true")
                Laya.enableDebugPanel();
            if (GameConfig.physicsDebug && Laya["PhysicsDebugDraw"])
                Laya["PhysicsDebugDraw"].enable();
            if (GameConfig.stat)
                Laya.Stat.show();
            Laya.alertGlobalError(true);
            Laya.ResourceVersion.enable("version.json", Laya.Handler.create(this, this.onVersionLoaded), Laya.ResourceVersion.FILENAME_VERSION);
        }
        onVersionLoaded() {
            Laya.AtlasInfoManager.enable("fileconfig.json", Laya.Handler.create(this, this.onConfigLoaded));
        }
        onConfigLoaded() {
            const socketAddress = 'ws:192.168.0.100:5052';
            let protoIdList = {};
            Object.keys(GameConstant.MESSAGEPROTOTYPE).forEach(key => {
                const config = GameConstant.MESSAGEPROTOTYPE[key];
                protoIdList[`ID_${config.id}`] = config.type;
            });
            GameConstant.PROTOBUFMESSAGEIDLIST = protoIdList;
            this.postOffice = new PostOffice({
                showInMessage: false,
                showOutMessage: false,
                isProtobuf: true,
                protobufTemplate: GameConstant.PROTOBUFTEMPLATE,
                heartMessageSign: 0,
                isSupportHeartBeatMessage: true
            });
            this.postOffice.startNet({
                socketAddress: socketAddress,
                onHeartBeat: () => {
                    const strByte = new Laya.Byte();
                    strByte.writeUTFBytes(`ping`);
                    this.postOffice.sendProtoMessage(Object.assign({ data: strByte }, GameConstant.MESSAGEPROTOTYPE.HEARTBEAT));
                },
                onHeartFail: () => {
                    console.log(`socket heart fail`);
                },
                onOpenCallback: () => {
                    this.msgOut(GameConstant.MESSAGEPROTOTYPE.REQ_LOGIN, { account: 'abc', loginType: 99 });
                },
                onSocetError: (e) => {
                    console.log(e);
                },
                onMessageCallbck: (message) => {
                    if (GameConstant.PROTOBUFMESSAGEIDLIST[`ID_${message.id}`] != undefined) {
                        const key = gameProto[GameConstant.PROTOBUFMESSAGEIDLIST[`ID_${message.id}`]];
                        message.obj = key.decode(message.data);
                    }
                    else {
                        console.log(`Unknow Proto Message ID : ${message.id}`);
                    }
                    console.log(message);
                    switch (message.id) {
                        case GameConstant.MESSAGEPROTOTYPE.RESP_LOGIN.id:
                            console.log(message.obj.desc);
                            break;
                    }
                }
            });
            GameConfig.startScene && Laya.Scene.open(GameConfig.startScene);
        }
        msgOut(config, msg) {
            const T = gameProto[config.type];
            let message = new gameProto[config.type]();
            message = Object.assign({}, msg);
            const data = new Laya.Byte(gameProto[config.type].encode(message).finish());
            this.postOffice.sendProtoMessage(Object.assign({ data }, config));
        }
    }
    new Main();

}());
