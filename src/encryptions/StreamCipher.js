import MyTable from '../components/Table';
import Output from '../components/Output';
import React from 'react';

export const StreamEncrypt = (text, setOutput, k) => {
    var keyDisplay = ['k = ' + k];
    text = text.replaceAll(' ', '').toLocaleUpperCase('tr-TR');
    var n = text.length;
    var array = [];
    var step1 = []; // Letters to numbers
    var step2 = []; // x + key[i] mod29
    var step3 = []; // Numbers to letters
    var nums = [];
    var keyIndex = -1;

    for (var i = 0; i < n; i++) {
        var letter = text.charAt(i);
        var temp = getNum(letter);

        if (temp.coded === false) {
            setOutput(['Unknown Characters!']);
            return (
                <MyTable
                    title='Available Characters'
                    table={encTable} />
            );
        }

        var num = temp.val;
        nums.push(num);
        var newNum;
        if (keyIndex === -1) {
            newNum = (k + num) % 29;
            keyIndex = 0;
        }
        else {
            newNum = (num + nums[keyIndex]) % 29;
            keyIndex++;
        }
        step2.push(num + " => " + newNum);
        step1.push(letter + " => " + temp.val);

        var newLetter = getLetter(newNum);
        step3.push(newNum + " => " + newLetter);
        array.push(newLetter);
    }

    setOutput(array);

    return (
        <div>
            <MyTable
                title='Encryption Table'
                table={encTable} />

            <Output
                title='Key'
                array={keyDisplay} />

            <Output
                title='Letters to numbers'
                array={step1}
                type="pill" />

            <Output
                title='y = (x[i] + x[i-1]) mod29 -------  x[-1] = k'
                array={step2}
                type="pill" />

            <Output
                title='Numbers to letters'
                array={step3}
                type="pill" />
        </div>
    )
}

export const StreamDecrypt = (text, setOutput, k) => {
    var keyDisplay = ['k = ' + k];
    text = text.replaceAll(' ', '').toLocaleUpperCase('tr-TR');
    var n = text.length;
    var array = [];
    var step1 = []; // Letters to numbers
    var step2 = []; // x - key[i] mod29
    var step3 = []; // Numbers to letters
    var nums = [];
    var keyIndex = -1;

    for (var i = 0; i < n; i++) {
        var letter = text.charAt(i);
        var temp = getNum(letter);

        if (temp.coded === false) {
            setOutput(['Unknown Characters!']);
            return (
                <MyTable
                    title='Available Characters'
                    table={encTable} />
            );
        }

        var num = temp.val;
        var newNum;
        if (keyIndex === -1) {
            newNum = (num - k);
            keyIndex = 0;
        }
        else {
            newNum = (num - nums[keyIndex]);
            keyIndex++;
        }

        if (newNum < 0) {
            newNum += 29;
        }

        nums.push(newNum);
        step2.push(num + " => " + newNum);
        step1.push(letter + " => " + temp.val);

        var newLetter = getLetter(newNum);
        step3.push(newNum + " => " + newLetter);
        array.push(newLetter);
    }

    setOutput(array);

    return (
        <div>
            <MyTable
                title='Encryption Table'
                table={encTable} />

            <Output
                title='Key'
                array={keyDisplay} />

            <Output
                title='Letters to numbers'
                array={step1}
                type="pill" />

            <Output
                title='x = (y[i] - x[i-1]) mod29 ------- x[-1] = k'
                array={step2}
                type="pill" />

            <Output
                title='Numbers to letters'
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