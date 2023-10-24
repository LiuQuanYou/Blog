module.exports = {
  secretKey: 'FFFF',
  stateCode: {
    success: 200,
    error: 500
  },
  /**
   * 接口错误信息反馈提示
   * @param {提示内容} errorMsg
   * @returns
   */
  apiError: function (errorMsg) {
    return {
      code: 500,
      message: errorMsg
    }
  }
}
