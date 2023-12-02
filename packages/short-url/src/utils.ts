import * as base62 from 'base62/lib/ascii';

/**
 * 1. 用递增 id + base62 作为压缩码，可以保证唯一，但是容易被人拿到其它短码，不安全。
 * 2. 用 url 做 hash 之后取一部分然后 base62 做为压缩码，有碰撞的可能，不唯一。
 * 3 随机生成字符串再查表检测是否重复，可以保证唯一且不连续，但是性能不好。用提前批量生成的方式可以解决。
 */
export function generateRandomStr(len: number) {
  let str = '';
  for (let i = 0; i < len; i++) {
    const num = Math.floor(Math.random() * 62);
    str += base62.encode(num);
  }
  return str;
}
