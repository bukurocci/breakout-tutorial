class Vector2 {
  /*
   * 二つのベクトルの内積を求める
   */
  static dot(v1, v2) {
    return v1.x * v2.x + v1.y * v2.y;
  }

  /*
   * 逆ベクトルを求める
   */
  static negate(v) {
    const ret = v.clone();
    ret.scale(-1);
    return ret;
  }

  /*
   * ベクトルの長さを求める
   */
  get length() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  /*
   * ベクトルを正規化する
   */
  normalize() {
    this.scale(1 / this.length);
  }

  /*
   * 与えられたベクトルを足す
   */
  add(v) {
    this.x += v.x;
    this.y += v.y;
  }

  /*
   * 与えられたベクトルを引く
   */
  subtract(v) {
    this.x -= v.x;
    this.y -= v.y;
  }

  /*
   * ベクトルをスカラー倍する
   */
  scale(n) {
    this.x *= n;
    this.y *= n;
  }

  /*
   * 与えられたベクトルと等しいかどうか
   */
  equals(v) {
    return v.x === this.x && v.y === this.y;
  }

  /*
   * ベクトルを複製する
   */
  clone() {
    return new Vector2(this.x, this.y);
  }
}

export default Vector2;
