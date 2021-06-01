import MyTable from '../components/Table';
import Output from '../components/Output';
import React from 'react';

export const PermutationEncrypt = (text, setOutput) => {
    text = text.toLocaleUpperCase('tr-TR').replaceAll(' ', '');
    var array = [];
    var parts = getParts(text);
    var lastStep = []; // Switch step

    for (var i = 0; i < parts.length; i++) {
        var part = parts[i];
        if (part.length !== 6) {
            array.push(part);
            lastStep.push(part);
        }
        else {
            var newPart = part;
            newPart = replaceAt(newPart, 0, part.charAt(parseInt(pi['1']) - 1));
            newPart = replaceAt(newPart, 1, part.charAt(parseInt(pi['2']) - 1));
            newPart = replaceAt(newPart, 2, part.charAt(parseInt(pi['3']) - 1));
            newPart = replaceAt(newPart, 3, part.charAt(parseInt(pi['4']) - 1));
            newPart = replaceAt(newPart, 4, part.charAt(parseInt(pi['5']) - 1));
            newPart = replaceAt(newPart, 5, part.charAt(parseInt(pi['6']) - 1));
            array.push(newPart);
            lastStep.push(part + " => " + newPart);
        }
    }

    setOutput(array);

    return (
        <div>
            <MyTable
                title='Encryption Table'
                table={pi} />

            <Output
                title='Make sub parts with length of 6'
                array={parts}
                type='pill' />

            <Output
                title='Replace characters according to the table'
                array={lastStep}
                type='pill' />
        </div>
    )
}

export const PermutationDecrypt = (text, setOutput) => {
    text = text.toLocaleUpperCase('tr-TR').replaceAll(' ', '');
    var array = [];
    var parts = getParts(text);
    var lastStep = []; // Switch step

    for (var i = 0; i < parts.length; i++) {
        var part = parts[i];
        if (part.length !== 6) {
            array.push(part);
            lastStep.push(part);
        }
        else {
            var newPart = part;
            newPart = replaceAt(newPart, 0, part.charAt(parseInt(pi_['1']) - 1));
            newPart = replaceAt(newPart, 1, part.charAt(parseInt(pi_['2']) - 1));
            newPart = replaceAt(newPart, 2, part.charAt(parseInt(pi_['3']) - 1));
            newPart = replaceAt(newPart, 3, part.charAt(parseInt(pi_['4']) - 1));
            newPart = replaceAt(newPart, 4, part.charAt(parseInt(pi_['5']) - 1));
            newPart = replaceAt(newPart, 5, part.charAt(parseInt(pi_['6']) - 1));
            array.push(newPart);
            lastStep.push(part + " => " + newPart);
        }
    }

    setOutput(array);

    return (
        <div>
            <MyTable
                title='Decryption Table'
                table={pi_} />

            <Output
                title='Make sub parts with length of 6'
                array={parts}
                type='pill' />

            <Output
                title='Replace characters according to the table'
                array={lastStep}
                type='pill' />
        </div>
    )
}

const getParts = (text) => {
    var n = text.length;
    var parts = [];
    var part = '';
    var index = 0;

    while (n > 0) {
        part += text.charAt(index);
        index++;
        n--;

        if (part.length === 6 || n === 0) {
            parts.push(part);
            part = '';
        }
    }

    return parts;
}

const pi = {
    '1': '3', '2': '6', '3': '1', '4': '5', '5': '2', '6': '4',
}

const pi_ = {
    '1': '3', '2': '5', '3': '1', '4': '6', '5': '4', '6': '2',
}

const replaceAt = (string, index, replacement) => {
    return string.substr(0, index) + replacement + string.substr(index + replacement.length);
}