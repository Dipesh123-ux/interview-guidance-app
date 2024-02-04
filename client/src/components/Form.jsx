// Form.js
import React, { useState, useEffect } from 'react';
import { useHandleForm } from "../hooks/useHandleForm";
import JobRole from './steps/JobRole';
import { motion, useAnimation } from 'framer-motion';
import Industry from './steps/Industry';
import Skills from './steps/Skills';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import Final from './steps/Final';
import Dropdown from './common/Dropdown';

const Form = () => {
    const { step, next, prev, goto } = useHandleForm(["0", "1", "2", "3"]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState("");
    const [displayedResult, setDisplayedResult] = useState("");
    const [selectedOption, setSelectedOption] = useState({ value: 'openai: gpt-3.5-turbo-16k', label: 'openai: gpt-3.5-turbo-16k' });

    const [values, setValues] = useState({
        role: "",
        industry: "",
        skills: ""
    });

    const { role, industry, skills } = values;

    const controls = useAnimation();

    const dropdownOptions = [
        { value: 'openai: gpt-3.5-turbo-16k', label: 'openai: gpt-3.5-turbo-16k' },
        { value: 'openai: gpt-3.5-turbo', label: 'openai: gpt-3.5-turbo' },
        { value: 'openai: gpt-4', label: 'openai: gpt-4' },
        { value: 'openai: gpt-4-0613', label: 'openai: gpt-4-0613' },
        { value: 'openai: gpt-4-1106-preview', label: 'openai: gpt-4-1106-preview' },
        { value: 'openai: gpt-3.5-turbo-1106', label: 'openai: gpt-3.5-turbo-1106' },
        { value: 'anthropic: claude-instant-1', label: 'anthropic: claude-instant-1' },
        { value: 'anthropic: claude-2', label: 'anthropic: claude-2' },
        { value: 'meta-llama: Llama-2-7b-chat-hf', label: 'meta-llama: Llama-2-7b-chat-hf' },
        { value: 'meta-llama: Llama-2-13b-chat-hf', label: 'meta-llama: Llama-2-13b-chat-hf' },
        { value: 'meta-llama: Llama-2-70b-chat-hf', label: 'meta-llama: Llama-2-70b-chat-hf' },
        { value: 'mistralai: Mistral-7B-Instruct-v0.1', label: 'mistralai: Mistral-7B-Instruct-v0.1' },
        { value: 'azure: gpt-4-1106-preview', label: 'azure: gpt-4-1106-preview' },
        { value: 'azure: gpt-3.5-turbo', label: 'azure: gpt-3.5-turbo' },
        { value: 'azure: gpt-3.5-turbo-16k', label: 'azure: gpt-3.5-turbo-16k' },
        { value: 'google: gemini-pro', label: 'google: gemini-pro' }
    ]


    useEffect(() => {
        controls.start({ opacity: 1, x: 0 });
    }, [step]);

    const handleFetch = async () => {
        try {
            setLoading(true);
            const response = await fetch('https://vast-erin-cricket-wear.cyclic.app/api/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', accept: 'application/json' },
                body: JSON.stringify({
                    role,
                    industry,
                    skills,
                    model:selectedOption.value
                })
            });

            const result = await response.json();
            setLoading(false)
            const resultArray = result?.result.split('');
            for (let i = 0; i < resultArray.length; i++) {
                setDisplayedResult((prev) => prev + resultArray[i]);
                await new Promise((resolve) => setTimeout(resolve, 30));
            }

        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleNext = async () => {
        if (step === 0 && values.role === "") {
            setError("Please Enter a role");
            return;
        }
        if (step === 1 && values.industry === "") {
            setError("Please Enter the industry");
            return;
        }
        if (step === 2 && values.skills === "") {
            setError("Please Enter the skills");
            return;
        }
        setError("");

        if (step === 2) {
            next();
            await handleFetch();
            return;
        }

        next();
    };


    return (
        <div className="flex w-screen h-screen">
            <div className="flex h-screen w-1/2 md:w-1/2 rounded-xl flex-col  justify-center">
                <div className="w-1/3 relative bottom-36 left-12 flex flex-col" >
                    <label className="text-lg font-semibold mb-2 block">Select Model:</label>
                    <Dropdown
                        options={dropdownOptions}
                        value={selectedOption}
                        onChange={(selected) => setSelectedOption(selected)}
                    />
                </div>
                {step === 0 && <JobRole values={values} setValues={setValues} />}
                {step === 1 && <Industry values={values} setValues={setValues} />}
                {step === 2 && <Skills values={values} setValues={setValues} />}
                {step === 3 && <Final displayedResult={displayedResult} />}

                {step < 3 && <div className="flex mt-4 mx-auto">
                    <motion.button
                        className="px-4 w-[200px] py-2 mr-2 bg-blue-500 text-white rounded-full focus:outline-none"
                        whileTap={{ scale: 0.95 }}
                        whileHover={{ scale: 1.05 }}
                        initial={{ opacity: 0, x: -500 }}
                        animate={controls}
                        onClick={prev}
                    >
                        Prev
                    </motion.button>
                    <motion.button
                        className="px-4 w-[200px] py-2 bg-green-500 text-white rounded-full focus:outline-none"
                        whileTap={{ scale: 0.95 }}
                        whileHover={{ scale: 1.05 }}
                        initial={{ opacity: 0, x: 500 }}
                        animate={controls}
                        onClick={handleNext}
                    >
                        {step === 2 ? "Generate" : "Next"}
                    </motion.button>
                </div>}
                {error && (
                    <motion.p
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mx-auto mt-5 text-red-500 font-bold text-base"
                    >
                        {error}
                    </motion.p>
                )}
            </div>
            <motion.div className="h-screen w-1/2 flex flex-col bg-gray-300 overflow-y-auto">
                {!loading && !displayedResult && (
                    <div className="flex flex-col items-center justify-center h-full w-full">
                        <motion.h2
                            initial={{ opacity: 0, x: 500 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            className="text-4xl font-black"
                        >
                            GET THE BEST
                        </motion.h2>
                        <motion.h2
                            initial={{ opacity: 0, x: 500 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="text-xl font-bold"
                        >
                            INTERVIEW GUIDANCE
                        </motion.h2>
                        <motion.h2
                            initial={{ opacity: 0, x: 500 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1 }}
                            className="text-base font-bold"
                        >
                            HERE!
                        </motion.h2>
                    </div>
                )}
                {loading && (
                    <SkeletonTheme color="#202020" highlightColor="#807f7f">
                        <p className="p-3" >
                            <Skeleton height={25} width={'100vh'} count={20} duration={2} />
                        </p>
                    </SkeletonTheme>
                )}
                {!loading && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-6 pl-6 pr-2 text-gray-800 font-medium text-lg text-left"
                    >
                        {displayedResult.split('\n').map((line, index) => (
                            <p key={index}>{line}</p>
                        ))}
                    </motion.div>
                )}
            </motion.div>
        </div>
    );
};

export default Form;
