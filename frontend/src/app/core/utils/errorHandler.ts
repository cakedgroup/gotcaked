export function errorHandler(error: any): string {
  if (error.error.errors) {
    if (error.error.errors[0].msg.includes('string') || error.error.errors[0].msg.includes('numeric')) {
      return error.error.errors[1].msg;
    } else {
      return error.error.errors[0].msg;
    }
  } else {
    return error.error.message;
  }
}
