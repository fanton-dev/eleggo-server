export default class NeuralNetworksError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NeuralNetworksError';
  }
}
