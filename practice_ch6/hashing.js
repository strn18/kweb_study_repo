const util = require('util');
const crypto = require('crypto');

const pbkdf2 = util.promisify(crypto.pbkdf2);

const encrypt = async text => {
  const ALGO = 'sha512';
  const KEY_LEN = 64;
  const digest = await pbkdf2(text, '', 1, KEY_LEN, ALGO); 
  // pbkdf2 함수의 인자는 다음과 같다. 
  // (password(암호화할 문자열), salt, iterations(반복횟수), key length(byte 단위의 key 길이), algorithm(암호화할 알고리즘))
  // console.log(digest.byteLength); // 64바이트
  console.log(`${text} | ${digest.toString('base64')}`);
};

// (async () => await encrypt('samplepassword'))();

(async () => {
  await encrypt('samplepasswordsamplepasswordsamplepasswordsamplepasswordsample');
  await encrypt('samplepasswordsamplepastwordsamplepasswordsamplepasswordsample');
})();
  