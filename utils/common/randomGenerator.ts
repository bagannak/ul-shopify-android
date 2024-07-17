import { faker } from '@faker-js/faker';

export module RandomGenerator {

  export async function generateAlphabets(length: number) {
    let random = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    for (let counter = 0; counter < length; counter += 1) random += possible.charAt(Math.floor(Math.random() * possible.length));
    return random;
  }

  export async function generateNumbers(length: number) {
    return Math.random().toString().slice(2, length);
  }

  /**
   * return random number between range specified
   * @param min
   * @param max
   * @returns
   */
  export async function getRandomInteger(min: number, max: number): Promise<number> {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  export async function generateAlphaNumeric(length: number) {
    let random = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let counter = 0; counter < length; counter += 1) random += possible.charAt(Math.floor(Math.random() * possible.length));
    return random;
  }

  export async function generatePhoneNumber(): Promise<string> {
    const firstDigit: number = faker.datatype.number({ min: 1, max: 5 });
    const restDigits: string = faker.phone.phoneNumber('#'.repeat(9));
    return firstDigit + restDigits;
  }
}
