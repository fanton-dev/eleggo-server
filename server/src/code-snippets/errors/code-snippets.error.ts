export default class CodeSnippetsError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'CodeSnippetsError';
  }
}
