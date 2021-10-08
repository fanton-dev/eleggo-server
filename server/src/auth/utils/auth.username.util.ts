import { Injectable } from '@nestjs/common';

@Injectable()
export class UsernameUtil {
  private alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  addRandomSequence(username: string, length = 6) {
    let randomSegment = '';
    for (let i = 0; i < length; ++i) {
      const randomLetterIndex = Math.floor(
        Math.random() * this.alphabet.length,
      );
      randomSegment += this.alphabet[randomLetterIndex];
    }
    return `${username}-${randomSegment}`;
  }
}
