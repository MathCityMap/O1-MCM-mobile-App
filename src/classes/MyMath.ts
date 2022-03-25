
export class MyMath {
  constructor() {}

  static mod(n: number, m: number): number {
    if (n > 0) {
      return n % m
    }

    let nn = n
    while (nn < 0) {
      nn += m
    }

    return nn
  }
}