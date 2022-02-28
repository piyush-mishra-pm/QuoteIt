class ErrorObject extends Error {
    constructor(message, errorCode) {
        // Add a "message" property
        super(message);
        // Adds a "code" property
        this.code = errorCode;
    }
}

module.exports = ErrorObject;
