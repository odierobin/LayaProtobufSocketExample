var $protobuf = window.protobuf;
$protobuf.roots.default=window;
// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.gameProto = (function() {

    /**
     * Namespace gameProto.
     * @exports gameProto
     * @namespace
     */
    var gameProto = {};

    gameProto.Req_Login = (function() {

        /**
         * Properties of a Req_Login.
         * @memberof gameProto
         * @interface IReq_Login
         * @property {string|null} [account] Req_Login account
         * @property {number|null} [loginType] Req_Login loginType
         */

        /**
         * Constructs a new Req_Login.
         * @memberof gameProto
         * @classdesc Represents a Req_Login.
         * @implements IReq_Login
         * @constructor
         * @param {gameProto.IReq_Login=} [properties] Properties to set
         */
        function Req_Login(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Req_Login account.
         * @member {string} account
         * @memberof gameProto.Req_Login
         * @instance
         */
        Req_Login.prototype.account = "";

        /**
         * Req_Login loginType.
         * @member {number} loginType
         * @memberof gameProto.Req_Login
         * @instance
         */
        Req_Login.prototype.loginType = 0;

        /**
         * Creates a new Req_Login instance using the specified properties.
         * @function create
         * @memberof gameProto.Req_Login
         * @static
         * @param {gameProto.IReq_Login=} [properties] Properties to set
         * @returns {gameProto.Req_Login} Req_Login instance
         */
        Req_Login.create = function create(properties) {
            return new Req_Login(properties);
        };

        /**
         * Encodes the specified Req_Login message. Does not implicitly {@link gameProto.Req_Login.verify|verify} messages.
         * @function encode
         * @memberof gameProto.Req_Login
         * @static
         * @param {gameProto.IReq_Login} message Req_Login message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Req_Login.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.account != null && message.hasOwnProperty("account"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.account);
            if (message.loginType != null && message.hasOwnProperty("loginType"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.loginType);
            return writer;
        };

        /**
         * Encodes the specified Req_Login message, length delimited. Does not implicitly {@link gameProto.Req_Login.verify|verify} messages.
         * @function encodeDelimited
         * @memberof gameProto.Req_Login
         * @static
         * @param {gameProto.IReq_Login} message Req_Login message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Req_Login.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Req_Login message from the specified reader or buffer.
         * @function decode
         * @memberof gameProto.Req_Login
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {gameProto.Req_Login} Req_Login
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Req_Login.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.gameProto.Req_Login();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.account = reader.string();
                    break;
                case 2:
                    message.loginType = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Req_Login message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof gameProto.Req_Login
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {gameProto.Req_Login} Req_Login
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Req_Login.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Req_Login message.
         * @function verify
         * @memberof gameProto.Req_Login
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Req_Login.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.account != null && message.hasOwnProperty("account"))
                if (!$util.isString(message.account))
                    return "account: string expected";
            if (message.loginType != null && message.hasOwnProperty("loginType"))
                if (!$util.isInteger(message.loginType))
                    return "loginType: integer expected";
            return null;
        };

        return Req_Login;
    })();

    gameProto.Resp_Login = (function() {

        /**
         * Properties of a Resp_Login.
         * @memberof gameProto
         * @interface IResp_Login
         * @property {number|null} [state] Resp_Login state
         * @property {string|null} [uid] Resp_Login uid
         * @property {string|null} [desc] Resp_Login desc
         * @property {string|null} [account] Resp_Login account
         */

        /**
         * Constructs a new Resp_Login.
         * @memberof gameProto
         * @classdesc Represents a Resp_Login.
         * @implements IResp_Login
         * @constructor
         * @param {gameProto.IResp_Login=} [properties] Properties to set
         */
        function Resp_Login(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Resp_Login state.
         * @member {number} state
         * @memberof gameProto.Resp_Login
         * @instance
         */
        Resp_Login.prototype.state = 0;

        /**
         * Resp_Login uid.
         * @member {string} uid
         * @memberof gameProto.Resp_Login
         * @instance
         */
        Resp_Login.prototype.uid = "";

        /**
         * Resp_Login desc.
         * @member {string} desc
         * @memberof gameProto.Resp_Login
         * @instance
         */
        Resp_Login.prototype.desc = "";

        /**
         * Resp_Login account.
         * @member {string} account
         * @memberof gameProto.Resp_Login
         * @instance
         */
        Resp_Login.prototype.account = "";

        /**
         * Creates a new Resp_Login instance using the specified properties.
         * @function create
         * @memberof gameProto.Resp_Login
         * @static
         * @param {gameProto.IResp_Login=} [properties] Properties to set
         * @returns {gameProto.Resp_Login} Resp_Login instance
         */
        Resp_Login.create = function create(properties) {
            return new Resp_Login(properties);
        };

        /**
         * Encodes the specified Resp_Login message. Does not implicitly {@link gameProto.Resp_Login.verify|verify} messages.
         * @function encode
         * @memberof gameProto.Resp_Login
         * @static
         * @param {gameProto.IResp_Login} message Resp_Login message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Resp_Login.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.state != null && message.hasOwnProperty("state"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.state);
            if (message.uid != null && message.hasOwnProperty("uid"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.uid);
            if (message.desc != null && message.hasOwnProperty("desc"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.desc);
            if (message.account != null && message.hasOwnProperty("account"))
                writer.uint32(/* id 5, wireType 2 =*/42).string(message.account);
            return writer;
        };

        /**
         * Encodes the specified Resp_Login message, length delimited. Does not implicitly {@link gameProto.Resp_Login.verify|verify} messages.
         * @function encodeDelimited
         * @memberof gameProto.Resp_Login
         * @static
         * @param {gameProto.IResp_Login} message Resp_Login message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Resp_Login.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Resp_Login message from the specified reader or buffer.
         * @function decode
         * @memberof gameProto.Resp_Login
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {gameProto.Resp_Login} Resp_Login
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Resp_Login.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.gameProto.Resp_Login();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.state = reader.int32();
                    break;
                case 2:
                    message.uid = reader.string();
                    break;
                case 4:
                    message.desc = reader.string();
                    break;
                case 5:
                    message.account = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Resp_Login message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof gameProto.Resp_Login
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {gameProto.Resp_Login} Resp_Login
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Resp_Login.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Resp_Login message.
         * @function verify
         * @memberof gameProto.Resp_Login
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Resp_Login.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.state != null && message.hasOwnProperty("state"))
                if (!$util.isInteger(message.state))
                    return "state: integer expected";
            if (message.uid != null && message.hasOwnProperty("uid"))
                if (!$util.isString(message.uid))
                    return "uid: string expected";
            if (message.desc != null && message.hasOwnProperty("desc"))
                if (!$util.isString(message.desc))
                    return "desc: string expected";
            if (message.account != null && message.hasOwnProperty("account"))
                if (!$util.isString(message.account))
                    return "account: string expected";
            return null;
        };

        return Resp_Login;
    })();

    gameProto.Req_UserExit = (function() {

        /**
         * Properties of a Req_UserExit.
         * @memberof gameProto
         * @interface IReq_UserExit
         * @property {string|null} [uid] Req_UserExit uid
         */

        /**
         * Constructs a new Req_UserExit.
         * @memberof gameProto
         * @classdesc Represents a Req_UserExit.
         * @implements IReq_UserExit
         * @constructor
         * @param {gameProto.IReq_UserExit=} [properties] Properties to set
         */
        function Req_UserExit(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Req_UserExit uid.
         * @member {string} uid
         * @memberof gameProto.Req_UserExit
         * @instance
         */
        Req_UserExit.prototype.uid = "";

        /**
         * Creates a new Req_UserExit instance using the specified properties.
         * @function create
         * @memberof gameProto.Req_UserExit
         * @static
         * @param {gameProto.IReq_UserExit=} [properties] Properties to set
         * @returns {gameProto.Req_UserExit} Req_UserExit instance
         */
        Req_UserExit.create = function create(properties) {
            return new Req_UserExit(properties);
        };

        /**
         * Encodes the specified Req_UserExit message. Does not implicitly {@link gameProto.Req_UserExit.verify|verify} messages.
         * @function encode
         * @memberof gameProto.Req_UserExit
         * @static
         * @param {gameProto.IReq_UserExit} message Req_UserExit message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Req_UserExit.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.uid != null && message.hasOwnProperty("uid"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.uid);
            return writer;
        };

        /**
         * Encodes the specified Req_UserExit message, length delimited. Does not implicitly {@link gameProto.Req_UserExit.verify|verify} messages.
         * @function encodeDelimited
         * @memberof gameProto.Req_UserExit
         * @static
         * @param {gameProto.IReq_UserExit} message Req_UserExit message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Req_UserExit.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Req_UserExit message from the specified reader or buffer.
         * @function decode
         * @memberof gameProto.Req_UserExit
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {gameProto.Req_UserExit} Req_UserExit
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Req_UserExit.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.gameProto.Req_UserExit();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.uid = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Req_UserExit message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof gameProto.Req_UserExit
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {gameProto.Req_UserExit} Req_UserExit
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Req_UserExit.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Req_UserExit message.
         * @function verify
         * @memberof gameProto.Req_UserExit
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Req_UserExit.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.uid != null && message.hasOwnProperty("uid"))
                if (!$util.isString(message.uid))
                    return "uid: string expected";
            return null;
        };

        return Req_UserExit;
    })();

    gameProto.Resp_UserExit = (function() {

        /**
         * Properties of a Resp_UserExit.
         * @memberof gameProto
         * @interface IResp_UserExit
         * @property {string|null} [uid] Resp_UserExit uid
         * @property {number|null} [state] Resp_UserExit state
         */

        /**
         * Constructs a new Resp_UserExit.
         * @memberof gameProto
         * @classdesc Represents a Resp_UserExit.
         * @implements IResp_UserExit
         * @constructor
         * @param {gameProto.IResp_UserExit=} [properties] Properties to set
         */
        function Resp_UserExit(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Resp_UserExit uid.
         * @member {string} uid
         * @memberof gameProto.Resp_UserExit
         * @instance
         */
        Resp_UserExit.prototype.uid = "";

        /**
         * Resp_UserExit state.
         * @member {number} state
         * @memberof gameProto.Resp_UserExit
         * @instance
         */
        Resp_UserExit.prototype.state = 0;

        /**
         * Creates a new Resp_UserExit instance using the specified properties.
         * @function create
         * @memberof gameProto.Resp_UserExit
         * @static
         * @param {gameProto.IResp_UserExit=} [properties] Properties to set
         * @returns {gameProto.Resp_UserExit} Resp_UserExit instance
         */
        Resp_UserExit.create = function create(properties) {
            return new Resp_UserExit(properties);
        };

        /**
         * Encodes the specified Resp_UserExit message. Does not implicitly {@link gameProto.Resp_UserExit.verify|verify} messages.
         * @function encode
         * @memberof gameProto.Resp_UserExit
         * @static
         * @param {gameProto.IResp_UserExit} message Resp_UserExit message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Resp_UserExit.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.uid != null && message.hasOwnProperty("uid"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.uid);
            if (message.state != null && message.hasOwnProperty("state"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.state);
            return writer;
        };

        /**
         * Encodes the specified Resp_UserExit message, length delimited. Does not implicitly {@link gameProto.Resp_UserExit.verify|verify} messages.
         * @function encodeDelimited
         * @memberof gameProto.Resp_UserExit
         * @static
         * @param {gameProto.IResp_UserExit} message Resp_UserExit message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Resp_UserExit.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Resp_UserExit message from the specified reader or buffer.
         * @function decode
         * @memberof gameProto.Resp_UserExit
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {gameProto.Resp_UserExit} Resp_UserExit
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Resp_UserExit.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.gameProto.Resp_UserExit();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.uid = reader.string();
                    break;
                case 2:
                    message.state = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Resp_UserExit message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof gameProto.Resp_UserExit
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {gameProto.Resp_UserExit} Resp_UserExit
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Resp_UserExit.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Resp_UserExit message.
         * @function verify
         * @memberof gameProto.Resp_UserExit
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Resp_UserExit.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.uid != null && message.hasOwnProperty("uid"))
                if (!$util.isString(message.uid))
                    return "uid: string expected";
            if (message.state != null && message.hasOwnProperty("state"))
                if (!$util.isInteger(message.state))
                    return "state: integer expected";
            return null;
        };

        return Resp_UserExit;
    })();

    gameProto.Req_UserInfo = (function() {

        /**
         * Properties of a Req_UserInfo.
         * @memberof gameProto
         * @interface IReq_UserInfo
         */

        /**
         * Constructs a new Req_UserInfo.
         * @memberof gameProto
         * @classdesc Represents a Req_UserInfo.
         * @implements IReq_UserInfo
         * @constructor
         * @param {gameProto.IReq_UserInfo=} [properties] Properties to set
         */
        function Req_UserInfo(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new Req_UserInfo instance using the specified properties.
         * @function create
         * @memberof gameProto.Req_UserInfo
         * @static
         * @param {gameProto.IReq_UserInfo=} [properties] Properties to set
         * @returns {gameProto.Req_UserInfo} Req_UserInfo instance
         */
        Req_UserInfo.create = function create(properties) {
            return new Req_UserInfo(properties);
        };

        /**
         * Encodes the specified Req_UserInfo message. Does not implicitly {@link gameProto.Req_UserInfo.verify|verify} messages.
         * @function encode
         * @memberof gameProto.Req_UserInfo
         * @static
         * @param {gameProto.IReq_UserInfo} message Req_UserInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Req_UserInfo.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified Req_UserInfo message, length delimited. Does not implicitly {@link gameProto.Req_UserInfo.verify|verify} messages.
         * @function encodeDelimited
         * @memberof gameProto.Req_UserInfo
         * @static
         * @param {gameProto.IReq_UserInfo} message Req_UserInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Req_UserInfo.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Req_UserInfo message from the specified reader or buffer.
         * @function decode
         * @memberof gameProto.Req_UserInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {gameProto.Req_UserInfo} Req_UserInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Req_UserInfo.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.gameProto.Req_UserInfo();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Req_UserInfo message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof gameProto.Req_UserInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {gameProto.Req_UserInfo} Req_UserInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Req_UserInfo.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Req_UserInfo message.
         * @function verify
         * @memberof gameProto.Req_UserInfo
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Req_UserInfo.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        return Req_UserInfo;
    })();

    gameProto.Resp_UserInfo = (function() {

        /**
         * Properties of a Resp_UserInfo.
         * @memberof gameProto
         * @interface IResp_UserInfo
         * @property {string|null} [uid] Resp_UserInfo uid
         * @property {string|null} [nickName] Resp_UserInfo nickName
         * @property {number|Long|null} [coin] Resp_UserInfo coin
         * @property {number|Long|null} [diamond] Resp_UserInfo diamond
         */

        /**
         * Constructs a new Resp_UserInfo.
         * @memberof gameProto
         * @classdesc Represents a Resp_UserInfo.
         * @implements IResp_UserInfo
         * @constructor
         * @param {gameProto.IResp_UserInfo=} [properties] Properties to set
         */
        function Resp_UserInfo(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Resp_UserInfo uid.
         * @member {string} uid
         * @memberof gameProto.Resp_UserInfo
         * @instance
         */
        Resp_UserInfo.prototype.uid = "";

        /**
         * Resp_UserInfo nickName.
         * @member {string} nickName
         * @memberof gameProto.Resp_UserInfo
         * @instance
         */
        Resp_UserInfo.prototype.nickName = "";

        /**
         * Resp_UserInfo coin.
         * @member {number|Long} coin
         * @memberof gameProto.Resp_UserInfo
         * @instance
         */
        Resp_UserInfo.prototype.coin = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Resp_UserInfo diamond.
         * @member {number|Long} diamond
         * @memberof gameProto.Resp_UserInfo
         * @instance
         */
        Resp_UserInfo.prototype.diamond = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Creates a new Resp_UserInfo instance using the specified properties.
         * @function create
         * @memberof gameProto.Resp_UserInfo
         * @static
         * @param {gameProto.IResp_UserInfo=} [properties] Properties to set
         * @returns {gameProto.Resp_UserInfo} Resp_UserInfo instance
         */
        Resp_UserInfo.create = function create(properties) {
            return new Resp_UserInfo(properties);
        };

        /**
         * Encodes the specified Resp_UserInfo message. Does not implicitly {@link gameProto.Resp_UserInfo.verify|verify} messages.
         * @function encode
         * @memberof gameProto.Resp_UserInfo
         * @static
         * @param {gameProto.IResp_UserInfo} message Resp_UserInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Resp_UserInfo.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.uid != null && message.hasOwnProperty("uid"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.uid);
            if (message.nickName != null && message.hasOwnProperty("nickName"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.nickName);
            if (message.coin != null && message.hasOwnProperty("coin"))
                writer.uint32(/* id 3, wireType 0 =*/24).int64(message.coin);
            if (message.diamond != null && message.hasOwnProperty("diamond"))
                writer.uint32(/* id 4, wireType 0 =*/32).int64(message.diamond);
            return writer;
        };

        /**
         * Encodes the specified Resp_UserInfo message, length delimited. Does not implicitly {@link gameProto.Resp_UserInfo.verify|verify} messages.
         * @function encodeDelimited
         * @memberof gameProto.Resp_UserInfo
         * @static
         * @param {gameProto.IResp_UserInfo} message Resp_UserInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Resp_UserInfo.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Resp_UserInfo message from the specified reader or buffer.
         * @function decode
         * @memberof gameProto.Resp_UserInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {gameProto.Resp_UserInfo} Resp_UserInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Resp_UserInfo.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.gameProto.Resp_UserInfo();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.uid = reader.string();
                    break;
                case 2:
                    message.nickName = reader.string();
                    break;
                case 3:
                    message.coin = reader.int64();
                    break;
                case 4:
                    message.diamond = reader.int64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Resp_UserInfo message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof gameProto.Resp_UserInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {gameProto.Resp_UserInfo} Resp_UserInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Resp_UserInfo.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Resp_UserInfo message.
         * @function verify
         * @memberof gameProto.Resp_UserInfo
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Resp_UserInfo.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.uid != null && message.hasOwnProperty("uid"))
                if (!$util.isString(message.uid))
                    return "uid: string expected";
            if (message.nickName != null && message.hasOwnProperty("nickName"))
                if (!$util.isString(message.nickName))
                    return "nickName: string expected";
            if (message.coin != null && message.hasOwnProperty("coin"))
                if (!$util.isInteger(message.coin) && !(message.coin && $util.isInteger(message.coin.low) && $util.isInteger(message.coin.high)))
                    return "coin: integer|Long expected";
            if (message.diamond != null && message.hasOwnProperty("diamond"))
                if (!$util.isInteger(message.diamond) && !(message.diamond && $util.isInteger(message.diamond.low) && $util.isInteger(message.diamond.high)))
                    return "diamond: integer|Long expected";
            return null;
        };

        return Resp_UserInfo;
    })();

    return gameProto;
})();