"use client";

import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { isValidChecksumAddress } from 'ethereumjs-util';

interface Token {
    name: string;
    possible_spam: boolean;
}

export default function Main() {
    const [showResult, setShowResult] = useState(false);
    const [result, setResult] = useState<Token[]>([]);
    const [inputValue, setInputValue] = useState("");
    const [inputError, setInputError] = useState("");

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!isValidChecksumAddress(inputValue)) {
            setInputError("Invalid Ethereum address");
            return;
        }

        const inputField = document.querySelector("#inputField") as HTMLInputElement;
        inputField.value = "";
        setInputError(""); // Clear error when input is valid

        try {
            const response = await axios.get<Token[]>("/api/gettokens", {
                params: { address: inputValue },
            });
            setResult(response.data);
            setShowResult(true);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    return (
        <section className="p-4 md:p-6">  {/* More padding on larger screens */}
            <form className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-4" onSubmit={handleSubmit}>
                <label htmlFor="inputField" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Wallet Address</label>
                <input
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="0xcB1C1FdE09f811B294172696404e88E658659905"
                    type="text"
                    id="inputField"
                    name="inputField"
                    maxLength={120}
                    required
                    onChange={handleChange}
                />
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">
                    Submit
                </button>
            </form>

            {inputError && (
                <p className="text-red-500 text-sm mb-2">{inputError}</p> // Error message
            )}

            {showResult && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {result.map((token, i) => (
                        <div className="bg-black p-4 rounded-md shadow-md" key={i}>
                            <h2 className="text-xl font-bold text-white mb-2">{token.name}</h2>
                            <p className={`text-sm ${token.possible_spam ? 'text-red-500' : 'text-green-500'}`}>
                                {token.possible_spam ? "SPAM 👎" : "NO SPAM 👍"}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </section>

    );
}
