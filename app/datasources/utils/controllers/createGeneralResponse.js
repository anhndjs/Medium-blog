function createGeneralResponse(isSuccess, message) {
  return {
    isSuccess,
    message,
  };
}

module.exports = createGeneralResponse;
