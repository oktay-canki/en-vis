import MyTable from '../components/Table';
import Output from '../components/Output';
import React from 'react';

export function ShiftEncrypt(text, k, setOutput) {
    var display = ['k = ' + k];
    text = text.toLocaleUpperCase('tr-TR');
    var array = []; // answer array
    var step1 = []; // letter to number
    var step2 = []; // (number + k) % 29
    var step3 = []; // number to letter

    for (var i = 0; i < text.length; i++) {
        var letter = text.charAt(i);
        var temp = getNum(letter);

        var str = letter + " => " + temp.val;
        step1.push(str);

        var str2 = '';
        if (temp.coded === false) {
            array.push(temp.val);
            str2 = temp.val + " => " + temp.val;
            step2.push(str2);
            step3.push(str2);
        }
        else {
            var newVal = (temp.val + k) % 29;
            var newLetter = getLetter(newVal);
            array.push(newLetter);
            str2 = temp.val + " => " + newVal;
            step2.push(str2);

            var str3 = newVal + " => " + newLetter;
            step3.push(str3);
        }
    }

    setOutput(array);

    return (
        <div>
            <MyTable
                title='Encryption Table'
                table={encTable} />

            <Output
                title='Variables'
                array={display} />

            <Output
                title='Letters to numbers'
                array={step1}
                type="pill" />
            <Output
                title='New number = (number + k) mod 29'
                array={step2}
                type="pill" />
            <Output
                title='Numbers to letters'
                array={step3}
                type="pill" />
        </div>
    )
}

export function ShiftDecrypt(text, k, setOutput) {
    var display = ['k = ' + k];
    text = text.toLocaleUpperCase('tr-TR');
    var array = [];
    var step1 = []; // letters to numbers
    var step2 = []; // (number - k) % 29
    var step3 = []; // numbers to letters

    for (var i = 0; i < text.length; i++) {
        var letter = text.charAt(i);
        var temp = getNum(letter);

        var str1 = letter + " => " + temp.val;
        step1.push(str1);

        var str2 = '';
        if (temp.coded === false) {
            array.push(temp.val);
            str2 = temp.val + " => " + temp.val;
            step2.push(str2);
            step3.push(str2);
        }
        else {
            var newVal;
            var dif = (temp.val - k);
            if (dif < 0) {
                newVal = 29 + dif;
            }
            else {
                newVal = dif % 29;
            }
            str2 = temp.val + " => " + newVal;
            step2.push(str2);
            var newLetter = getLetter(newVal);
            array.push(newLetter);

            var str3 = newVal + " => " + newLetter;
            step3.push(str3);
        }
    }

    setOutput(array);

    return (
        <div>
            <MyTable
                title='Decryption Table'
                table={decTable} />

            <Output
                title='Variables'
                array={display} />

            <Output
                title="Letters to numbers"
                array={step1}
                type="pill" />
            <Output
                title="Real number = (number - k) mod 29"
                array={step2}
                type="pill" />
            <Output
                title="Numbers to letters"
                array={step3}
                type="pill" />
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