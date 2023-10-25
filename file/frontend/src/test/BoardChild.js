import React, { useCallback, useEffect, useRef, useState } from "react";

const BoardChild = () => {
    const [length, setLength] = useState(8);
    const [numberAllowed, setNumberAllowed] = useState(false);
    const [charAllowed, setCharAllowed] = useState(false);
    const [password, setPassword] = useState("");

    const passwordRef = useRef(null);

    const passwordGenerator = useCallback(() => {
        let pass = "";
        let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        if (numberAllowed) str += "0123456789";
        if (charAllowed) str += "!@#$%^&*(){}?<>|[]/";

        for (let i = 0; i < length; i++) {
            let char = Math.floor(Math.random() * str.length);
            pass += str.charAt(char);
        }

        setPassword(pass);
    }, [length, numberAllowed, charAllowed]);

    useEffect(() => {
        passwordGenerator();
    }, [length, numberAllowed, charAllowed]);

    const copyPassword = useCallback(() => {
        passwordRef.current.select();
        passwordRef.current.setSelectionRange(0, 20);
        window.navigator.clipboard.writeText(password);
    }, [password]);

    return (
        <div className="container">
            <h1 className="mt-5">Password Generator</h1>
            <div className="form-group">
                <input
                    type="text"
                    value={password}
                    readOnly
                    className="form-control"
                    placeholder="Password"
                    ref={passwordRef}
                />
                <button onClick={copyPassword} className="btn btn-primary mt-2">
                    Copy
                </button>
            </div>
            <div className="form-group">
                <div className="custom-range">
                    <input
                        name=""
                        type="range"
                        id=""
                        value={length}
                        min={6}
                        max={100}
                        className="form-control-range"
                        onChange={(e) => {
                            setLength(e.target.value);
                        }}
                    />
                    <label>Length: {length}</label>
                </div>
                <div className="form-check">
                    <input
                        name=""
                        type="checkbox"
                        defaultChecked={numberAllowed}
                        id="numberInput"
                        className="form-check-input"
                        onChange={() => {
                            setNumberAllowed((prev) => !prev);
                        }}
                    />
                    <label htmlFor="numberInput" className="form-check-label">
                        Include Numbers
                    </label>
                </div>
                <div className="form-check">
                    <input
                        name=""
                        type="checkbox"
                        defaultChecked={charAllowed}
                        id="characterInput"
                        className="form-check-input"
                        onChange={() => {
                            setCharAllowed((prev) => !prev);
                        }}
                    />
                    <label htmlFor="characterInput" className="form-check-label">
                        Include Special Characters
                    </label>
                </div>
            </div>
        </div>
    );
};

export default BoardChild;
