function start(input, algorithmName) {
  let encodeResult = "";
  let decodeResult = "";
  if (algorithmName === "Caesar") {
    const key = parseInt(
      prompt("Vui lòng nhập key cho giải thuật này, phải là một số")
    );
    if (Number.isNaN(key)) start(input, algorithmName);
    encodeResult = caesarAlgorithm(input, key).encodeResult;
    decodeResult = caesarAlgorithm(input, key).decodeResult;
  } else if (algorithmName === "Cipher") {
    encodeResult = cipherAlgorithm(input).encodeResult;
    decodeResult = cipherAlgorithm(input).decodeResult;
  }
  document.getElementById("encode").innerText = encodeResult;
  document.getElementById("decode").innerHTML = decodeResult;
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
