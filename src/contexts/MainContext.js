import React, { createContext, useState } from 'react';
import { AffineDecrypt, AffineEncrypt } from '../encryptions/AffineCipher';
import { ShiftDecrypt, ShiftEncrypt } from '../encryptions/ShiftCipher';
import { SubstitutionEncrypt, SubstitutionDecrypt } from '../encryptions/SubstitutionCipher';
import { VigenereEncrypt, VigenereDecrypt } from '../encryptions/VigenereCipher';
import { HillEncrypt, HillDecrypt } from '../encryptions/HillCipher';
import { PermutationEncrypt, PermutationDecrypt } from '../encryptions/PermutationCipher';
import { StreamEncrypt, StreamDecrypt } from '../encryptions/StreamCipher';

export const MainContext = createContext();

const MainContextProvider = (props) => {

    const [text, setText] = useState('');
    const [output, setOutput] = useState([]);
    const [encType, setEncType] = useState(null);
    const [result, setResult] = useState(null);

    const act = (action) => {

        if(!text.trim().length || encType === null){
            return;
        }

        setText(text.trim());

        if(action === 'enc'){
            encrypt();
        }
        else if(action === 'dec'){
            decrypt();
        }
        else{
            console.log('WRONG ACTION TYPE');
        }
    }

    const encrypt = () => {
        if(encType === 'The Shift Cipher'){
            setResult(ShiftEncrypt(text, 11, setOutput));
        }
        else if(encType === 'The Substitution Cipher'){
            setResult(SubstitutionEncrypt(text, setOutput));
        }
        else if(encType === 'The Affine Cipher'){
            setResult(AffineEncrypt(text, setOutput, 7, 3));
        }
        else if(encType === 'The Vigenere Cipher'){
            setResult(VigenereEncrypt(text, setOutput, 'ANAHTAR'));
        }
        else if(encType === 'The Hill Cipher'){
            setResult(HillEncrypt(text, setOutput));
        }
        else if(encType === 'The Permutation Cipher'){
            setResult(PermutationEncrypt(text, setOutput));
        }
        else if(encType === 'The Stream Cipher'){
            setResult(StreamEncrypt(text, setOutput, 8));
        }
    }

    const decrypt = () => {
        if(encType === 'The Shift Cipher'){
            setResult(ShiftDecrypt(text, 11, setOutput));
        }
        else if(encType === 'The Substitution Cipher'){
            setResult(SubstitutionDecrypt(text, setOutput));
        }
        else if(encType === 'The Affine Cipher'){
            setResult(AffineDecrypt(text, setOutput, 25, 3));
        }
        else if(encType === 'The Vigenere Cipher'){
            setResult(VigenereDecrypt(text, setOutput, 'ANAHTAR'));
        }
        else if(encType === 'The Hill Cipher'){
            setResult(HillDecrypt(text, setOutput));
        }
        else if(encType === 'The Permutation Cipher'){
            setResult(PermutationDecrypt(text, setOutput));
        }
        else if(encType === 'The Stream Cipher'){
            setResult(StreamDecrypt(text, setOutput, 8));
        }
    }

    return (
        <MainContext.Provider value={{
            text, setText, encType, setEncType,
            result, setResult, act, output, setOutput
        }}>
            { props.children }
        </MainContext.Provider>
    )
}

export default MainContextProvider;