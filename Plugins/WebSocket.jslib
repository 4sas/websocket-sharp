mergeInto(LibraryManager.library, {
    WebSocketConnect: function(url, onOpen, onMessage, onClose, onError) {
        const webSocket = new WebSocket(UTF8ToString(url));

        webSocket.onopen = function() {
            Module.dynCall_v(onOpen);
        };
        webSocket.onmessage = function(event) {
            const message = event.data;
            const length = lengthBytesUTF8(message) + 1;
            const messagePtr = _malloc(length);
            stringToUTF8(message, messagePtr, length);
            Module.dynCall_vi(onMessage, messagePtr);
        };
        webSocket.onclose = function() {
            Module.dynCall_v(onClose);
        };
        webSocket.onerror = function(event) {
            const message = event.data;
            const length = lengthBytesUTF8(message) + 1;
            const messagePtr = _malloc(length);
            stringToUTF8(message, messagePtr, length);
            Module.dynCall_vi(onError, messagePtr);
        };

        window.WebSocketObject = webSocket;
    },
    WebSocketSend: function(messagePtr) {
        const message = UTF8ToString(messagePtr);
        if (window.WebSocketObject) {
            window.WebSocketObject.send(message);
        }
    },
    WebSocketClose: function() {
        if (window.WebSocketObject) {
            window.WebSocketObject.close();
        }
    }
});
