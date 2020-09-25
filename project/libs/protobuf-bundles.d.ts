type Long = protobuf.Long;

/** Namespace gameProto. */
declare namespace gameProto {

    /** Properties of a Req_Login. */
    interface IReq_Login {

        /** Req_Login account */
        account?: (string|null);

        /** Req_Login loginType */
        loginType?: (number|null);
    }

    /** Represents a Req_Login. */
    class Req_Login implements IReq_Login {

        /**
         * Constructs a new Req_Login.
         * @param [properties] Properties to set
         */
        constructor(properties?: gameProto.IReq_Login);

        /** Req_Login account. */
        public account: string;

        /** Req_Login loginType. */
        public loginType: number;

        /**
         * Creates a new Req_Login instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Req_Login instance
         */
        public static create(properties?: gameProto.IReq_Login): gameProto.Req_Login;

        /**
         * Encodes the specified Req_Login message. Does not implicitly {@link gameProto.Req_Login.verify|verify} messages.
         * @param message Req_Login message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: gameProto.IReq_Login, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified Req_Login message, length delimited. Does not implicitly {@link gameProto.Req_Login.verify|verify} messages.
         * @param message Req_Login message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: gameProto.IReq_Login, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a Req_Login message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Req_Login
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): gameProto.Req_Login;

        /**
         * Decodes a Req_Login message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Req_Login
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): gameProto.Req_Login;

        /**
         * Verifies a Req_Login message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);
    }

    /** Properties of a Resp_Login. */
    interface IResp_Login {

        /** Resp_Login state */
        state?: (number|null);

        /** Resp_Login uid */
        uid?: (string|null);

        /** Resp_Login desc */
        desc?: (string|null);

        /** Resp_Login account */
        account?: (string|null);
    }

    /** Represents a Resp_Login. */
    class Resp_Login implements IResp_Login {

        /**
         * Constructs a new Resp_Login.
         * @param [properties] Properties to set
         */
        constructor(properties?: gameProto.IResp_Login);

        /** Resp_Login state. */
        public state: number;

        /** Resp_Login uid. */
        public uid: string;

        /** Resp_Login desc. */
        public desc: string;

        /** Resp_Login account. */
        public account: string;

        /**
         * Creates a new Resp_Login instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Resp_Login instance
         */
        public static create(properties?: gameProto.IResp_Login): gameProto.Resp_Login;

        /**
         * Encodes the specified Resp_Login message. Does not implicitly {@link gameProto.Resp_Login.verify|verify} messages.
         * @param message Resp_Login message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: gameProto.IResp_Login, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified Resp_Login message, length delimited. Does not implicitly {@link gameProto.Resp_Login.verify|verify} messages.
         * @param message Resp_Login message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: gameProto.IResp_Login, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a Resp_Login message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Resp_Login
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): gameProto.Resp_Login;

        /**
         * Decodes a Resp_Login message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Resp_Login
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): gameProto.Resp_Login;

        /**
         * Verifies a Resp_Login message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);
    }

    /** Properties of a Req_UserExit. */
    interface IReq_UserExit {

        /** Req_UserExit uid */
        uid?: (string|null);
    }

    /** Represents a Req_UserExit. */
    class Req_UserExit implements IReq_UserExit {

        /**
         * Constructs a new Req_UserExit.
         * @param [properties] Properties to set
         */
        constructor(properties?: gameProto.IReq_UserExit);

        /** Req_UserExit uid. */
        public uid: string;

        /**
         * Creates a new Req_UserExit instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Req_UserExit instance
         */
        public static create(properties?: gameProto.IReq_UserExit): gameProto.Req_UserExit;

        /**
         * Encodes the specified Req_UserExit message. Does not implicitly {@link gameProto.Req_UserExit.verify|verify} messages.
         * @param message Req_UserExit message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: gameProto.IReq_UserExit, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified Req_UserExit message, length delimited. Does not implicitly {@link gameProto.Req_UserExit.verify|verify} messages.
         * @param message Req_UserExit message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: gameProto.IReq_UserExit, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a Req_UserExit message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Req_UserExit
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): gameProto.Req_UserExit;

        /**
         * Decodes a Req_UserExit message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Req_UserExit
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): gameProto.Req_UserExit;

        /**
         * Verifies a Req_UserExit message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);
    }

    /** Properties of a Resp_UserExit. */
    interface IResp_UserExit {

        /** Resp_UserExit uid */
        uid?: (string|null);

        /** Resp_UserExit state */
        state?: (number|null);
    }

    /** Represents a Resp_UserExit. */
    class Resp_UserExit implements IResp_UserExit {

        /**
         * Constructs a new Resp_UserExit.
         * @param [properties] Properties to set
         */
        constructor(properties?: gameProto.IResp_UserExit);

        /** Resp_UserExit uid. */
        public uid: string;

        /** Resp_UserExit state. */
        public state: number;

        /**
         * Creates a new Resp_UserExit instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Resp_UserExit instance
         */
        public static create(properties?: gameProto.IResp_UserExit): gameProto.Resp_UserExit;

        /**
         * Encodes the specified Resp_UserExit message. Does not implicitly {@link gameProto.Resp_UserExit.verify|verify} messages.
         * @param message Resp_UserExit message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: gameProto.IResp_UserExit, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified Resp_UserExit message, length delimited. Does not implicitly {@link gameProto.Resp_UserExit.verify|verify} messages.
         * @param message Resp_UserExit message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: gameProto.IResp_UserExit, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a Resp_UserExit message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Resp_UserExit
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): gameProto.Resp_UserExit;

        /**
         * Decodes a Resp_UserExit message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Resp_UserExit
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): gameProto.Resp_UserExit;

        /**
         * Verifies a Resp_UserExit message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);
    }

    /** Properties of a Req_UserInfo. */
    interface IReq_UserInfo {
    }

    /** Represents a Req_UserInfo. */
    class Req_UserInfo implements IReq_UserInfo {

        /**
         * Constructs a new Req_UserInfo.
         * @param [properties] Properties to set
         */
        constructor(properties?: gameProto.IReq_UserInfo);

        /**
         * Creates a new Req_UserInfo instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Req_UserInfo instance
         */
        public static create(properties?: gameProto.IReq_UserInfo): gameProto.Req_UserInfo;

        /**
         * Encodes the specified Req_UserInfo message. Does not implicitly {@link gameProto.Req_UserInfo.verify|verify} messages.
         * @param message Req_UserInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: gameProto.IReq_UserInfo, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified Req_UserInfo message, length delimited. Does not implicitly {@link gameProto.Req_UserInfo.verify|verify} messages.
         * @param message Req_UserInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: gameProto.IReq_UserInfo, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a Req_UserInfo message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Req_UserInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): gameProto.Req_UserInfo;

        /**
         * Decodes a Req_UserInfo message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Req_UserInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): gameProto.Req_UserInfo;

        /**
         * Verifies a Req_UserInfo message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);
    }

    /** Properties of a Resp_UserInfo. */
    interface IResp_UserInfo {

        /** Resp_UserInfo uid */
        uid?: (string|null);

        /** Resp_UserInfo nickName */
        nickName?: (string|null);

        /** Resp_UserInfo coin */
        coin?: (number|Long|null);

        /** Resp_UserInfo diamond */
        diamond?: (number|Long|null);
    }

    /** Represents a Resp_UserInfo. */
    class Resp_UserInfo implements IResp_UserInfo {

        /**
         * Constructs a new Resp_UserInfo.
         * @param [properties] Properties to set
         */
        constructor(properties?: gameProto.IResp_UserInfo);

        /** Resp_UserInfo uid. */
        public uid: string;

        /** Resp_UserInfo nickName. */
        public nickName: string;

        /** Resp_UserInfo coin. */
        public coin: (number|Long);

        /** Resp_UserInfo diamond. */
        public diamond: (number|Long);

        /**
         * Creates a new Resp_UserInfo instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Resp_UserInfo instance
         */
        public static create(properties?: gameProto.IResp_UserInfo): gameProto.Resp_UserInfo;

        /**
         * Encodes the specified Resp_UserInfo message. Does not implicitly {@link gameProto.Resp_UserInfo.verify|verify} messages.
         * @param message Resp_UserInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: gameProto.IResp_UserInfo, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified Resp_UserInfo message, length delimited. Does not implicitly {@link gameProto.Resp_UserInfo.verify|verify} messages.
         * @param message Resp_UserInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: gameProto.IResp_UserInfo, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a Resp_UserInfo message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Resp_UserInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): gameProto.Resp_UserInfo;

        /**
         * Decodes a Resp_UserInfo message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Resp_UserInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): gameProto.Resp_UserInfo;

        /**
         * Verifies a Resp_UserInfo message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);
    }
}
