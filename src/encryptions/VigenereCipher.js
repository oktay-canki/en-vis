import Output from '../components/Output';
import MyTable from '../components/Table';
import React from 'react';

export const VigenereEncrypt = (text, setOutput, key) => {
    text = text.toLocaleUpperCase('tr-TR');
    var keyArray = [];
    var keyDisplay = [];
    key = key.toLocaleUpperCase('tr-TR');
    keyDisplay.push(key + ' => (');
    for (var i = 0; i < key.length; i++) {
        var l = key.charAt(i);
        var t = getNum(l);
        keyArray.push(t.val);
        var str = t.val;
        if (i !== key.length - 1) {
            str += ", ";
        }
        keyDisplay.push(str);
    }
    keyDisplay.push(')');

    var array = [];
    var keyIndex = 0;
    var step1 = []; // letters to numbers
    var step2 = []; // (x + key[i]) % 29
    var step3 = []; // numbers to letters

    for (var j = 0; j < text.length; j++) {
        var letter = text.charAt(j);
        var temp = getNum(letter);

        if (temp.coded === false) {
            array.push(temp.val);
            if (temp.val === " ") {
                step2.push("space");
                step3.push("space");
            }
            else {
                step2.push(temp.val + " => " + temp.val);
                step3.push(temp.val + " => " + temp.val);
            }
        }
        else {
            var newNum = (temp.val + keyArray[keyIndex]) % 29;
            var newLetter = getLetter(newNum);
            array.push(newLetter);
            step2.push("(" + temp.val + " + " + keyArray[keyIndex] + ") mod 29 => " + newNum);
            step3.push(newNum + " => " + newLetter);
        }

        step1.push(letter + " => " + temp.val);

        keyIndex++;
        if (keyIndex === keyArray.length) {
            keyIndex = 0;
            step2.push('break');
        }
    }

    setOutput(array);

    return (
        <div>
            <MyTable
                title='Encryption Table'
                table={encTable} />

            <Output
                title={'Key'}
                array={keyDisplay} />

            <Output
                title='Letters to numbers'
                array={step1}
                type='pill' />

            <Output
                title='y = (x + key[ i ]) mod 29'
                array={step2}
                type='pill' />

            <Output
                title='Numbers to letters'
                array={step3}
                type='pill' />
        </div>
    )
}

export const VigenereDecrypt = (text, setOutput, key) => {
    text = text.toLocaleUpperCase('tr-TR');
    var keyArray = [];
    var keyDisplay = [];
    key = key.toLocaleUpperCase('tr-TR');
    keyDisplay.push(key + ' => (');
    for (var i = 0; i < key.length; i++) {
        var l = key.charAt(i);
        var t = getNum(l);
        keyArray.push(t.val);
        var str = t.val;
        if (i !== key.length - 1) {
            str += ", ";
        }
        keyDisplay.push(str);
    }
    keyDisplay.push(')');

    var array = [];
    var keyIndex = 0;
    var step1 = []; // letters to numbers
    var step2 = []; // (x + key[i]) % 29
    var step3 = []; // numbers to letters

    for (var j = 0; j < text.length; j++) {
        var letter = text.charAt(j);
        var temp = getNum(letter);

        if (temp.coded === false) {
            array.push(temp.val);
            if (temp.val === " ") {
                step2.push("space");
                step3.push("space");
            }
            else {
                step2.push(temp.val + " => " + temp.val);
                step3.push(temp.val + " => " + temp.val);
            }
        }
        else {
            var realNum = (temp.val - keyArray[keyIndex]);
            if (realNum < 0) {
                realNum += 29;
            }
            else {
                realNum = realNum % 29;
            }
            var realLetter = getLetter(realNum);
            array.push(realLetter);
            step2.push("(" + temp.val + " - " + keyArray[keyIndex] + ") mod 29 => " + realNum);
            step3.push(realNum + " => " + realLetter);
        }

        step1.push(letter + " => " + temp.val);

        keyIndex++;
        if (keyIndex === keyArray.length) {
            keyIndex = 0;
            step2.push('break');
        }
    }

    setOutput(array);

    return (
        <div>
            <MyTable
                title='Decryption Table'
                table={decTable} />

            <Output
                title={'Key'}
                array={keyDisplay} />

            <Output
                title='Letters to numbers'
                array={step1}
                type='pill' />

            <Output
                title='x = (y - key[ i ]) mod 29'
                array={step2}
                type='pill' />

            <Output
                title='Numbers to letters'
                array={step3}
                type='pill' />
        </div>
    )
}

const getNum = (letter) => {
    var keys = Object.keys(encTable);
    for (var i = 0; i < keys.length; i++) {
        if (letter === keys[i]) {
            return { coded: true, val: encTable[keys[i]] };
        }
    }

    return { coded: false, val: letter };
}

const getLetter = (num) => {
    var keys = Object.keys(decTable);
    for (var i = 0; i < keys.length; i++) {
        if (num === i) {
            return decTable[num];
        }
    }

    return num;
}

const encTable = {
    'A': 0, 'B': 1, 'C': 2, 'Ç': 3, 'D': 4, 'E': 5,
    'F': 6, 'G': 7, 'Ğ': 8, 'H': 9, 'I': 10, 'İ': 11,
    'J': 12, 'K': 13, 'L': 14, 'M': 15, 'N': 16, 'O': 17,
    'Ö': 18, 'P': 19, 'R': 20, 'S': 21, 'Ş': 22, 'T': 23,
    'U': 24, 'Ü': 25, 'V': 26, 'Y': 27, 'Z': 28,
}

const decTable = {
    0: 'A', 1: 'B', 2: 'C', 3: 'Ç', 4: 'D', 5: 'E',
    6: 'F', 7: 'G', 8: 'Ğ', 9: 'H', 10: 'I', 11: 'İ',
    12: 'J', 13: 'K', 14: 'L', 15: 'M', 16: 'N', 17: 'O',
    18: 'Ö', 19: 'P', 20: 'R', 21: 'S', 22: 'Ş', 23: 'T',
    24: 'U', 25: 'Ü', 26: 'V', 27: 'Y', 28: 'Z',
}