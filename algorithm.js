function start(input, algorithmName) {
  document.querySelector("#keyRandom").innerText = "";
  let encodeResult = "";
  let decodeResult = "";
  if (algorithmName === "Caesar") {
    const key = parseInt(
      prompt("Vui lòng nhập key cho giải thuật này, phải là một số")
    );
    if (Number.isNaN(key)) {
      start(input, algorithmName);
      return;
    }
    encodeResult = caesarAlgorithm(input, key).encodeResult;
    decodeResult = caesarAlgorithm(input, key).decodeResult;
  } else if (algorithmName === "Cipher") {
    encodeResult = cipherAlgorithm(input).encodeResult;
    decodeResult = cipherAlgorithm(input).decodeResult;
  } else if (algorithmName === "Polyalphabetic cipher") {
    const key = prompt("Vui lòng nhập key cho giải thuật này").toLowerCase();
    encodeResult = PolyalphabeticCipher(input, key).encodeResult;
    decodeResult = PolyalphabeticCipher(input, key).decodeResult;
  } else if (algorithmName === "One Time Pad") {
    encodeResult = OneTimePad(input).encodeResult;
    decodeResult = OneTimePad(input).decodeResult;
  } else if (algorithmName === "RC4") {
    const key = prompt("Vui lòng nhập K cho giải thuật này").toLowerCase();
    encodeResult = RC4(input, key).encodeResult;
    decodeResult = RC4(input, key).decodeResult;
  }
  document.getElementById("encode").innerText = encodeResult;
  document.getElementById("decode").innerHTML = decodeResult;
}
function swap(i, j, s) {
  let tmp = s[i];
  s[i] = s[j];
  s[j] = tmp;
}
function compareXOR(binary1, binary2) {
  let result = "";
  for (let i = 0; i < binary1.length; i++) {
    const sum = parseInt(binary1[i]) + parseInt(binary2[i]);
    if (sum == 2) result += "0";
    else result += sum;
  }
  return result;
}
function RC4(input, K) {
  const ascii = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ];
  let inputBinary = [];
  for (let i = 0; i < input.length; i++) {
    // chuyen input to nhi phan
    let binaryI = (ascii.indexOf(input[i]) >>> 0).toString(2);

    while (binaryI.length < 3) binaryI = "0" + binaryI;

    inputBinary.push(binaryI);
  }

  let s = [0, 1, 2, 3, 4, 5, 6, 7];
  let T = K;
  const max = T.length - 1;
  let count = 0;
  while (T.length < s.length) {
    T += T[count];
    count++;
    if (count > max) count = 0;
  }

  let j = 0;
  for (let i = 0; i < T.length; i++) {
    j = (j + s[i] + parseInt(T[i])) % T.length;
    swap(i, j, s);
  }

  // encode

  console.log(s);
  let I = 0,
    J = 0;
  let Ka = [];
  for (let i = 0; i < input.length; i++) {
    I = (I + 1) % s.length;
    J = (J + s[I]) % s.length;
    swap(I, J, s);
    let t = (s[I] + s[J]) % s.length;
    let k = s[t];
    let binaryK = (k >>> 0).toString(2);
    while (binaryK.length < 3) binaryK = "0" + binaryK;
    Ka.push(binaryK);
  }
  let resultEncodeBinary = [];
  for (let i = 0; i < input.length; i++) {
    resultEncodeBinary.push(compareXOR(inputBinary[i], Ka[i]));
  }
  console.log(Ka);
  console.log(inputBinary);
  console.log(resultEncodeBinary);
  let resultEncode = "";
  for (let i = 0; i < resultEncodeBinary.length; i++) {
    resultEncode += ascii[parseInt(resultEncodeBinary[i], 2)];
  }
  return { encodeResult: resultEncode, decodeResult: "kkkk" };
}
function OneTimePad(input) {
  const ascii = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ];
  let letter = [];
  for (let i = 0; i < ascii.length; i++) {
    let letterTMP = [];
    for (let j = 0; j < ascii.length; j++) {
      let index = i + j;
      letterTMP.push(ascii[(index + 26) % 26]);
    }
    letter.push(letterTMP);
  }
  let key = "";

  for (let i = 0; i < input.length; i++)
    key += ascii[Math.floor(Math.random() * 26)];
  document.querySelector("#keyRandom").innerText = `Key : ${key}`; //key random
  let encodeResult = "";
  for (let i = 0; i < input.length; i++) {
    if (input[i] !== " ") {
      const index1 = ascii.indexOf(input[i]);
      const index2 = ascii.indexOf(key[i]);
      encodeResult += letter[index1][index2];
    } else encodeResult = encodeResult + " ";
  }
  let decodeResult = "";
  for (let i = 0; i < key.length; i++) {
    if (encodeResult[i] !== " ") {
      const index1 = ascii.indexOf(key[i]);
      const decodeIndex = letter[index1].indexOf(encodeResult[i]);
      decodeResult = decodeResult + ascii[decodeIndex];
    } else decodeResult += " ";
  }
  return { encodeResult, decodeResult };
}
function PolyalphabeticCipher(input, key) {
  //fix key
  const dev = input.length - key.length;
  let keyFixed = key;
  if (dev > 0)
    for (let i = 0; i < dev; i++) {
      keyFixed = keyFixed + key[i % key.length];
    }
  else if (dev < 0) keyFixed = key.substr(0, input.length + dev);
  const ascii = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ];
  let letter = [];
  for (let i = 0; i < ascii.length; i++) {
    let letterTMP = [];
    for (let j = 0; j < ascii.length; j++) {
      let index = i + j;
      letterTMP.push(ascii[(index + 26) % 26]);
    }
    letter.push(letterTMP);
  }
  let encodeResult = "";
  for (let i = 0; i < input.length; i++) {
    if (input[i] !== " ") {
      const index1 = ascii.indexOf(input[i]);
      const index2 = ascii.indexOf(keyFixed[i]);
      encodeResult += letter[index1][index2];
    } else encodeResult = encodeResult + " ";
  }
  let decodeResult = "";
  for (let i = 0; i < keyFixed.length; i++) {
    if (input[i] !== " ") {
      const index1 = ascii.indexOf(keyFixed[i]);
      const decodeIndex = letter[index1].indexOf(input[i]);
      decodeResult = decodeResult + ascii[decodeIndex];
    } else decodeResult += " ";
  }
  return { encodeResult, decodeResult };
}
function cipherAlgorithm(input) {
  const ascii = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ];
  const asciiExplore = [
    "y",
    "t",
    "z",
    "l",
    "m",
    "d",
    "a",
    "e",
    "f",
    "g",
    "b",
    "h",
    "i",
    "j",
    "k",
    "c",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "u",
    "v",
    "w",
    "x",
  ];
  let encodeResult = "";
  for (let i = 0; i < input.length; i++) {
    if (input[i] !== " ") {
      const index = ascii.indexOf(input[i]); //lay index
      encodeResult = encodeResult + asciiExplore[index];
    } else encodeResult = encodeResult + " ";
  }
  let decodeResult = "";
  for (let i = 0; i < input.length; i++) {
    if (input[i] !== " ") {
      const index = asciiExplore.indexOf(input[i]); //get index
      decodeResult = decodeResult + ascii[index];
    } else decodeResult += " ";
  }
  return { encodeResult, decodeResult };
}
function caesarAlgorithm(input, key) {
  const ascii = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ];

  let encodeResult = "";
  for (let i = 0; i < input.length; i++) {
    if (input[i] !== " ") {
      const index = ascii.indexOf(input[i]); //lay index
      encodeResult = encodeResult + ascii[(index + key + 26) % 26];
    } else encodeResult = encodeResult + " ";
  }
  let decodeResult = "";
  for (let i = 0; i < input.length; i++) {
    if (input[i] !== " ") {
      const index = ascii.indexOf(input[i]);
      const b = index - key;
      if (b >= 0) decodeResult = decodeResult + ascii[b];
      else decodeResult = decodeResult + ascii[26 + (b % 26)];
    } else decodeResult += " ";
  }
  return { encodeResult, decodeResult };
}
