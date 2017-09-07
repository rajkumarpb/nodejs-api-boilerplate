class Responder {
  success (message, data) {
    return {
      status: true,
      message,
      data
    }
  }

  error (message, data) {
    return {
      status: false,
      message,
      data: {
        error: data.message
      }
    }
  }
}

const responder = new Responder()
export default responder