import Output from '../components/Output';
import MyTable from '../components/Table';
import React from 'react';

export function SubstitutionEncrypt(text, setOutput) {
    text = text.toLocaleLowerCase('tr-TR');
    var array = [];
    var n = text.length;
    var step = [];
    var str;

    for (var i = 0; i < n; i++) {
        var letter = text.charAt(i);
        var newLetter = getEnc(letter);
        array.push(newLetter);
        str = letter + " => " + newLetter;
        step.push(str);
    }

    setOutput(array);

    return (
        <div>
            <MyTable
                title='Encryption Table'
                table={encTable} />

            <Output
                title='Substitution'
                array={step}
                type='pill' />
        </div>
    )
}

export function SubstitutionDecrypt(text, setOutput) {
    text = text.toLocaleUpperCase('tr-TR');
    var array = [];
    var n = text.length;
    var step = [];

    for (var i = 0; i < n; i++) {
        var letter = text.charAt(i);
        var newLetter = getDec(letter);
        array.push(newLetter);
        step.push(letter + " => " + newLetter);
    }

    setOutput(array);

    return (
        <div>
            <MyTable
                title='Decryption Table'
                table={decTable} />

            <Output
                title='Substitution'
                array={step}
                type='pill' />
        </div>
    )
}

const getEnc = (letter) => {
    var keys = Object.keys(encTable);
    for (var i = 0; i < keys.length; i++) {
        if (letter === keys[i]) {
            return encTable[letter];
        }
    }

    return letter.toLocaleUpperCase('tr-TR');
}

const getDec = (letter) => {
    var keys = Object.keys(decTable);
    for (var i = 0; i < keys.length; i++) {
        if (letter === keys[i]) {
            return decTable[letter];
        }
    }

    return letter.toLocaleLowerCase('tr-TR');
}

const encTable = {
    'a': 'C', 'b': 'Ş', 'c': 'Ü', 'ç': 'N',
    'd': 'K', 'e': 'L', 'f': 'E', 'g': 'I',
    'ğ': 'A', 'h': 'Ö', 'ı': 'D', 'i': 'M',
    'j': 'Ğ', 'k': 'İ', 'l': 'Y', 'm': 'O',
    'n': 'J', 'o': 'Ç', 'ö': 'V', 'p': 'Z',
    'r': 'H', 's': 'U', 'ş': 'T', 't': 'S',
    'u': 'F', 'ü': 'P', 'v': 'R', 'y': 'B',
    'z': 'G'
}

const decTable = {
    'A': 'ğ', 'B': 'y', 'C': 'a', 'Ç': 'o',
    'D': 'ı', 'E': 'f', 'F': 'u', 'G': 'z',
    'Ğ': 'j', 'H': 'r', 'I': 'g', 'İ': 'k',
    'J': 'n', 'K': 'd', 'L': 'e', 'M': 'i',
    'N': 'ç', 'O': 'm', 'Ö': 'h', 'P': 'ü',
    'R': 'v', 'S': 't', 'Ş': 'b', 'T': 'ş',
    'U': 's', 'Ü': 'c', 'Y': 'l', 'V': 'ö',
    'Z': 'p',
}