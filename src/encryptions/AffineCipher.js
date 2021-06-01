import Output from '../components/Output';
import MyTable from '../components/Table';
import React from 'react';

export const AffineEncrypt = (text, setOutput, a, b) => {
    var display = [
        "a = " + a,
        "b = " + b
    ];
    text = text.toLocaleUpperCase('tr-TR');
    var n = text.length;
    var array = [];
    var step1 = []; // Letters to numbers
    var step2 = []; // (ax + b) % 29
    var step3 = []; // Numbers to letters

    for (var i = 0; i < n; i++) {
        var letter = text.charAt(i);
        var temp = getNum(letter);
        if (temp.coded === false) {
            array.push(temp.val);
            step2.push(temp.val + " => " + temp.val);
            step3.push(temp.val + " => " + temp.val);
        }
        else {
            var newNum = ((temp.val * a) + b) % 29;
            var newLetter = getLetter(newNum);
            array.push(newLetter);
            step2.push(temp.val + " => " + newNum);
            step3.push(newNum + " => " + newLetter);
        }
        step1.push(letter + " => " + temp.val);
    }

    setOutput(array);

    return (
        <div>
            <MyTable
                title='Encryption Table'
                table={encTable} />
            <Output
                title='Variables'
                array={display}
                type="pill" />
            <Output
                title='Letters to numbers'
                array={step1}
                type='pill' />
            <Output
                title='(ax + b) mod 29'
                array={step2}
                type='pill' />
            <Output
                title='Numbers to letters'
                array={step3}
                type='pill' />
        </div>
    )
}

export const AffineDecrypt = (text, setOutput, a_, b) => {
    var display = [
        "a^-1 = " + a_,
        "b = " + b
    ];
    text = text.toLocaleUpperCase('tr-TR');
    var n = text.length;
    var array = [];
    var step1 = []; // Letters to numbers
    var step2 = []; // (y - b)*a^-1 % 29
    var step3 = []; // Numbers to letters

    for (var i = 0; i < n; i++) {
        var letter = text.charAt(i);
        var temp = getNum(letter);
        if (temp.coded === false) {
            array.push(temp.val);
            step2.push(temp.val + " => " + temp.val);
            step3.push(temp.val + " => " + temp.val);
        }
        else {
            var realNum = (temp.val - b) * a_;
            if (realNum < 0) {
                while (realNum < 0) {
                    realNum += 29;
                }
            }
            else {
                realNum = realNum % 29;
            }
            var newLetter = getLetter(realNum);
            array.push(newLetter);
            step2.push(temp.val + " => " + realNum);
            step3.push(realNum + " => " + newLetter);
        }
        step1.push(letter + " => " + temp.val);
    }

    setOutput(array);

    return (
        <div>
            <MyTable
                title='Decryption Table'
                table={decTable} />
            <Output
                title='Variables'
                array={display}
                type="pill" />
            <Output
                title='Letters to numbers'
                array={step1}
                type='pill' />
            <Output
                title='((y - b) * a^-1) mod 29'
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
            return { coded: true, val: encTable[letter] };
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