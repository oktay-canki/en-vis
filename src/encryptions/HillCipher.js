import MyTable from '../components/Table';
import Output from '../components/Output';
import React from 'react';

export const HillEncrypt = (text, setOutput) => {
    var display = [
        '[' + matrix[0][0] + ', ' + matrix[0][1] + ']', <br />,
        '[ ' + matrix[1][0] + ', ' + matrix[1][1] + ']'
    ];
    text = text.replaceAll(' ', '').toLocaleUpperCase('tr-TR');
    var n = text.length;
    var array = [];
    var step1 = []; // Divide into 2 letter pairs
    var step2 = []; // Letters to numbers
    var step3 = []; // ((a, b) * matrix) mod29
    var step4 = []; // Numbers to letters

    for (var i = 0; i < n && i + 1 < n; i += 2) {
        var letter1 = text.charAt(i);
        var letter2 = text.charAt(i + 1);

        var str1 = letter1 + letter2;
        step1.push(str1);

        var temp1 = getNum(letter1);
        var temp2 = getNum(letter2);

        if (temp1.coded === false || temp2.coded === false) { // Karakterlerden en az 1'i alfabede yok ise, şifreleme yapma
            array.push(letter1);
            array.push(letter2);
            step2.push(str1);
            step3.push(str1);
            step4.push(str1);
        }
        else {
            var num1 = temp1.val;
            var num2 = temp2.val;

            var str2 = "(" + num1 + ", " + num2 + ")";
            step2.push(str1 + " => " + str2);

            var newNum1 = (num1 * matrix[0][0] + num2 * matrix[1][0]) % 29;
            var newNum2 = (num1 * matrix[0][1] + num2 * matrix[1][1]) % 29;

            var str3 = "(" + newNum1 + ", " + newNum2 + ")";
            step3.push(str2 + " => " + str3);

            var newLet1 = getLetter(newNum1);
            var newLet2 = getLetter(newNum2);
            array.push(newLet1);
            array.push(newLet2);

            step4.push(str3 + " => " + newLet1 + newLet2);
        }
    }

    // Tek sayılı ise son harfi ekle
    if (n % 2 === 1) {
        var lastChar = text.charAt(n - 1);
        array.push(lastChar);
        step1.push(lastChar + "_");
        step2.push(lastChar + "_");
        step3.push(lastChar + "_");
        step4.push(lastChar + "_");
    }

    setOutput(array);

    return (
        <div>
            <MyTable
                title='Encryption Table'
                table={encTable} />

            <Output
                title='Matrix'
                array={display} />

            <Output
                title='Make 2 letter pairs'
                array={step1}
                type='pill' />

            <Output
                title='Letters to numbers'
                array={step2}
                type='pill' />

            <Output
                title='((a,b) * matrix) mod29'
                array={step3}
                type='pill' />

            <Output
                title='Numbers to letters'
                array={step4}
                type='pill' />
                
            <Output
                title='Additional Info'
                array={[
                    '(a,b) * matrix = ',
                    '(a * matrix[0][0] + b * matrix[1][0], a * matrix[0][1] + b * matrix[1][1])'
                ]} />
        </div>
    )
}

export const HillDecrypt = (text, setOutput) => {
    var display = [
        '[' + matrix_[0][0] + ', ' + matrix_[0][1] + ']', <br />,
        '[ ' + matrix_[1][0] + ', ' + matrix_[1][1] + ']'
    ];
    text = text.replaceAll(' ', '').toLocaleUpperCase('tr-TR');
    var n = text.length;
    var array = [];
    var step1 = []; // Divide into 2 letter pairs
    var step2 = []; // Letters to numbers
    var step3 = []; // ((a, b) * matrix^-1) mod29
    var step4 = []; // Numbers to letters

    for (var i = 0; i < n && i + 1 < n; i += 2) {
        var letter1 = text.charAt(i);
        var letter2 = text.charAt(i + 1);

        var str1 = letter1 + letter2;
        step1.push(str1);

        var temp1 = getNum(letter1);
        var temp2 = getNum(letter2);

        if (temp1.coded === false || temp2.coded === false) { // Karakterlerden en az 1'i alfabede yok ise, şifre çözme yapma
            array.push(letter1);
            array.push(letter2);
            step2.push(str1 + " => " + str1);
            step3.push(str1 + " => " + str1);
            step4.push(str1 + " => " + str1);
        }
        else {
            var num1 = temp1.val;
            var num2 = temp2.val;

            var str2 = "(" + num1 + ", " + num2 + ")";
            step2.push(str1 + " => " + str2);

            var newNum1 = (num1 * matrix_[0][0] + num2 * matrix_[1][0]) % 29;
            var newNum2 = (num1 * matrix_[0][1] + num2 * matrix_[1][1]) % 29;

            var str3 = "(" + newNum1 + ", " + newNum2 + ")";
            step3.push(str2 + " => " + str3);

            var newLet1 = getLetter(newNum1);
            var newLet2 = getLetter(newNum2);

            array.push(newLet1);
            array.push(newLet2);

            step4.push(str3 + " => " + newLet1 + newLet2);
        }
    }

    // Tek sayılı ise son harfi ekle
    if (n % 2 === 1) {
        var lastChar = text.charAt(n - 1);
        array.push(lastChar);
        step1.push(lastChar + "_");
        step2.push(lastChar + "_");
        step3.push(lastChar + "_");
        step4.push(lastChar + "_");
    }

    setOutput(array);

    return (
        <div>
            <MyTable
                title='Decryption Table'
                table={decTable} />

            <Output
                title='Matrix^-1'
                array={display} />

            <Output
                title='Make 2 letter pairs'
                array={step1}
                type='pill' />

            <Output
                title='Letters to numbers'
                array={step2}
                type='pill' />

            <Output
                title='((a,b) * matrix^-1) mod29'
                array={step3}
                type='pill' />

            <Output
                title='Numbers to letters'
                array={step4}
                type='pill' />
            <Output
                title='Additional Info'
                array={[
                    '(a,b) * matrix = ',
                    '(a * matrix[0][0] + b * matrix[1][0], a * matrix[0][1] + b * matrix[1][1])'
                ]} />
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

const matrix = [
    [11, 8],
    [3, 7]
]

const matrix_ = [
    [16, 19],
    [18, 21]
]

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