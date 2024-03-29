"use strict";

document.body.setAttribute("style", "white-space: pre;");

const labelParseResult = document.querySelector(".parse--result");

const sheetLink =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vTazuZXRFiO0J51-vooSGwX4wmcXHgsV-t6I67WiITjIm8jlWilikbw8cxTzXAqCT-nfg0VWkdJtI6J/pub?gid=0&single=true&output=csv";
const fallBackLanguage = "en";
const languageCodes = [
  "en-US",
  "ar",
  "bn-BD",
  "cs-CZ",
  "da-DK",
  "de-DE",
  "el-GR",
  "en-AU",
  "en-CA",
  "en-GB",
  "en-IN",
  "en-SG",
  "en-ZA",
  "es-419",
  "es-ES",
  "es-US",
  "et",
  "fa",
  "fi-FI",
  "fil",
  "fr-CA",
  "fr-FR",
  "hi-IN",
  "hr",
  "hu-HU",
  "id",
  "is-IS",
  "it-IT",
  "iw-IL",
  "ja-JP",
  "ko-KR",
  "lv",
  "ms",
  "ms-MY",
  "nl-NL",
  "no-NO",
  "pa",
  "pl-PL",
  "pt-BR",
  "pt-PT",
  "ro",
  "ru-RU",
  "sk",
  "sr",
  "sv-SE",
  "th",
  "tr-TR",
  "uk",
  "ur",
  "vi",
  "zh-CN",
  "zh-HK",
  "zh-TW",
];

let originalNotes = {};
let resultNotes = [];

Papa.parse(sheetLink, {
  download: true,
  header: true,
  delimiter: ",",
  newline: "\r\n",
  complete: (res) => handleParsedFile.call(Papa, res),
  error: (err) => console.log("ERROR", err),
});

function handleParsedFile(parsedFile) {
  originalNotes = parsedFile.data[0];
  formatNotes(originalNotes);

  resultNotes.forEach((note) => {
    document.body.appendChild(document.createTextNode(note));
  });

  document.body.removeChild(labelParseResult);

  console.log(resultNotes);
}

function formatNotes(notes) {
  languageCodes.forEach((code) => {
    resultNotes.push(
      formatNoteToLanguage(tryGetNoteForCode(notes, code), code)
    );
  });
}

function formatNoteToLanguage(note, code) {
  return `<${code}>\n${note}\n</${code}>\n`;
}

function tryGetNoteForCode(notes, code) {
  if (code in notes && notes[code]) {
    return notes[code];
  }

  const shortCode = code.slice(0, 2);

  if (shortCode in notes && notes[shortCode]) {
    return notes[shortCode];
  }

  return notes[fallBackLanguage];
}
