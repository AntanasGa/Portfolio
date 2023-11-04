
export default class RouterError extends Error {
  status: number;

  constructor(message: string, status: number = 404) {
    super(message);
    this.message = message;
    this.name = "RouterError";
    this.status = status;
  }
}