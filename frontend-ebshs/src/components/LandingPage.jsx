import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import smartHomeVideo from '../assets/smart-home-bg.mp4';  // Your background video
import Navbar from './Navbar'; 

const LandingPage = () => {
    const [darkMode, setDarkMode] = useState(true);
    const navigate = useNavigate(); // Initialize useNavigate

    // Enable dark mode by default
    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [darkMode]);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    const handleGetStarted = () => {
        navigate('/register');
    };

    return (
        <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} transition-colors duration-500`}>
            {/* Navigation Bar */}
            <Navbar toggleDarkMode={toggleDarkMode} darkMode={darkMode} handleGetStarted={handleGetStarted} />

            {/* Main Section */}
            <section className="flex flex-col items-center justify-center min-h-screen px-8 text-center space-y-8">
                <h1 className="text-5xl md:text-7xl font-extrabold leading-tight animate-fade-in-up">
                    Welcome to the Future of <br /> <span className="text-blue-500">Smart Living</span>
                </h1>
                <p className="text-xl md:text-2xl max-w-3xl leading-relaxed animate-fade-in-up">
                    Our system uses <span className="text-blue-500">emotional recognition</span> technology to personalize your smart home experience.
                </p>
                <button onClick={handleGetStarted} className="relative px-8 py-4 bg-blue-500 text-white rounded-full text-lg font-bold transition-transform hover:scale-105 group">
                    Get Started
                    <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-700 opacity-50 rounded-full transition-transform scale-125 group-hover:scale-150 duration-500"></span>
                </button>
            </section>

            {/* Features Section - Bento Grid */}
            <section className="py-24 sm:py-32">
                <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} transition-colors duration-500`}>
                    <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
                        <h2 className="text-center text-base/7 font-semibold text-indigo-600">Deploy faster</h2>
                        <p className="mx-auto mt-2 max-w-lg text-pretty text-center text-4xl font-medium tracking-tight sm:text-5xl">
                            Everything you need to deploy your app.
                        </p>
                        <div className="mt-10 grid gap-4 sm:mt-16 lg:grid-cols-3 lg:grid-rows-2">
                            
                            {/* Card 1 */}
                            <div className="relative lg:row-span-2 transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                                <div className={`absolute inset-px rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} lg:rounded-l-[2rem]`}></div>
                                <div className={`relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] lg:rounded-l-[calc(2rem+1px)]`}>
                                    <div className="px-8 pb-3 pt-8 sm:px-10 sm:pb-0 sm:pt-10">
                                        <p className="mt-2 text-lg/7 font-medium tracking-tight max-lg:text-center">{darkMode ? 'Mobile friendly' : 'Mobile friendly'}</p>
                                        <p className={`mt-2 max-w-lg text-sm/6 ${darkMode ? 'text-gray-400' : 'text-gray-600'} max-lg:text-center`}>
                                            Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo.
                                        </p>
                                    </div>
                                    <div className="relative min-h-[30rem] w-full grow [container-type:inline-size] max-lg:mx-auto max-lg:max-w-sm">
                                        <div className="absolute inset-x-10 bottom-0 top-10 overflow-hidden rounded-t-[12cqw] border-x-[3cqw] border-t-[3cqw] border-gray-700 bg-gray-900 shadow-2xl">
                                            <img
                                                className="size-full object-cover object-top"
                                                src="https://tailwindui.com/plus/img/component-images/bento-03-mobile-friendly.png"
                                                alt=""
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 lg:rounded-l-[2rem]"></div>
                            </div>

                            {/* Card 2 */}
                            <div className="relative max-lg:row-start-1 transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                                <div className={`absolute inset-px rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} max-lg:rounded-t-[2rem]`}></div>
                                <div className={`relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)]`}>
                                    <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                                        <p className="mt-2 text-lg/7 font-medium tracking-tight max-lg:text-center">Performance</p>
                                        <p className={`mt-2 max-w-lg text-sm/6 ${darkMode ? 'text-gray-400' : 'text-gray-600'} max-lg:text-center`}>
                                            Lorem ipsum, dolor sit amet consectetur adipisicing elit maiores impedit.
                                        </p>
                                    </div>
                                    <div className="flex flex-1 items-center justify-center px-8 max-lg:pb-12 max-lg:pt-10 sm:px-10 lg:pb-2">
                                        <img
                                            className="w-full max-lg:max-w-xs"
                                            src="https://tailwindui.com/plus/img/component-images/bento-03-performance.png"
                                            alt=""
                                        />
                                    </div>
                                </div>
                                <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 max-lg:rounded-t-[2rem]"></div>
                            </div>

                            {/* Card 3 */}
                            <div className="relative max-lg:row-start-3 lg:col-start-2 lg:row-start-2 transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                                <div className={`absolute inset-px rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}></div>
                                <div className={`relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)]`}>
                                    <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                                        <p className="mt-2 text-lg/7 font-medium tracking-tight max-lg:text-center">Security</p>
                                        <p className={`mt-2 max-w-lg text-sm/6 ${darkMode ? 'text-gray-400' : 'text-gray-600'} max-lg:text-center`}>
                                            Morbi viverra dui mi arcu sed. Tellus semper adipiscing suspendisse semper morbi.
                                        </p>
                                    </div>
                                    <div className="flex flex-1 items-center [container-type:inline-size] max-lg:py-6 lg:pb-2">
                                        <img
                                            className="h-[min(152px,40cqw)] object-cover object-center"
                                            src="https://tailwindui.com/plus/img/component-images/bento-03-security.png"
                                            alt=""
                                        />
                                    </div>
                                </div>
                                <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5"></div>
                            </div>

                            {/* Card 4 */}
                            <div className="relative lg:row-span-2 transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                                <div className={`absolute inset-px rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} max-lg:rounded-b-[2rem] lg:rounded-r-[2rem]`}></div>
                                <div className={`relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] max-lg:rounded-b-[calc(2rem+1px)] lg:rounded-r-[calc(2rem+1px)]`}>
                                    <div className="px-8 pb-3 pt-8 sm:px-10 sm:pb-0 sm:pt-10">
                                        <p className="mt-2 text-lg/7 font-medium tracking-tight max-lg:text-center">Powerful APIs</p>
                                        <p className={`mt-2 max-w-lg text-sm/6 ${darkMode ? 'text-gray-400' : 'text-gray-600'} max-lg:text-center`}>
                                            Sit quis amet rutrum tellus ullamcorper ultricies libero dolor eget sem sodales gravida.
                                        </p>
                                    </div>
                                    <div className="relative min-h-[30rem] w-full grow">
                                        <div className="absolute bottom-0 left-10 right-0 top-10 overflow-hidden rounded-tl-xl bg-gray-900 shadow-2xl">
                                            <div className="flex bg-gray-800/40 ring-1 ring-white/5">
                                                <div className="-mb-px flex text-sm font-medium leading-6 text-gray-400">
                                                    <img
                                                        className="size-full object-cover object-top"
                                                        src="https://tailwindui.com/plus/img/component-images/bento-03-mobile-friendly.png"
                                                        alt=""
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 max-lg:rounded-b-[2rem] lg:rounded-r-[2rem]"></div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>

            {/* Heading Section */}
            <section className={`py-8 text-center ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} transition-colors duration-500`}>
                <p className="mx-auto mt-2 max-w-lg text-pretty text-center text-4xl font-medium tracking-tight sm:text-5xl">
                    Make your life smart <span className="text-blue-600">with your emotions</span>
                </p>
            </section>

            {/* Cinematic Video Section */}
            <section className={`py-16 px-8 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} sm:flex sm:items-center sm:justify-center transition-colors duration-500`}>
                <div className="flex flex-col sm:flex-row sm:space-x-8 max-w-7xl mx-auto"> {/* Increased max-w here */}
                    <div className="w-full sm:w-2/3 relative overflow-hidden rounded-lg shadow-lg"> {/* Increased width for the video */}
                        <video autoPlay loop muted className="w-full h-[450px] rounded-lg opacity-90 hover:opacity-100 transition-opacity duration-500"> {/* Ensure video fills the space */}
                            <source src={smartHomeVideo} type="video/mp4" />
                        </video>
                    </div>
                    <div className="w-full sm:w-1/3 mt-8 sm:mt-0 flex items-center">
                        <blockquote className={`text-xl font-medium italic leading-relaxed ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                            "Technology, at its best, is a bridge between dreams and reality. Experience the future of living."
                        </blockquote>
                    </div>
                </div>
            </section>

            {/* Try something really different right now.  */}
            {/* <section class="bg-white dark:bg-gray-900">
                <div class="container flex flex-col items-center px-4 py-12 mx-auto text-center">
                    <h2 class="text-2xl font-bold tracking-tight text-gray-800 xl:text-3xl dark:text-white">
                        Try something really different right now.
                    </h2>

                    <p class="block max-w-4xl mt-4 text-gray-500 dark:text-gray-300">
                        You can scan your own face and see what is <span className="text-blue-600">your emotions</span> now based of your facial expression. 
                    </p>

                    <div class="mt-6">
                        <a href="#" class="inline-flex items-center justify-center w-full px-4 py-2.5 overflow-hidden text-sm text-white transition-colors duration-300 bg-gray-900 rounded-lg shadow sm:w-auto sm:mx-2 hover:bg-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 focus:ring focus:ring-gray-300 focus:ring-opacity-80">
                            <svg class="w-5 h-5 mx-2 fill-current" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" xml:space="preserve">
                                <g>
                                    <g>
                                        <path d="M407,0H105C47.103,0,0,47.103,0,105v302c0,57.897,47.103,105,105,105h302c57.897,0,105-47.103,105-105V105C512,47.103,464.897,0,407,0z M482,407c0,41.355-33.645,75-75,75H105c-41.355,0-75-33.645-75-75V105c0-41.355,33.645-75,75-75h302c41.355,0,75,33.645,75,75V407z"></path>
                                    </g>
                                </g>
                                <g>
                                    <g>
                                        <path d="M305.646,123.531c-1.729-6.45-5.865-11.842-11.648-15.18c-11.936-6.892-27.256-2.789-34.15,9.151L256,124.166l-3.848-6.665c-6.893-11.937-22.212-16.042-34.15-9.151h-0.001c-11.938,6.893-16.042,22.212-9.15,34.151l18.281,31.664L159.678,291H110.5c-13.785,0-25,11.215-25,25c0,13.785,11.215,25,25,25h189.86l-28.868-50h-54.079l85.735-148.498C306.487,136.719,307.375,129.981,305.646,123.531z"></path>
                                    </g>
                                </g>
                                <g>
                                    <g>
                                        <path d="M401.5,291h-49.178l-55.907-96.834l-28.867,50l86.804,150.348c3.339,5.784,8.729,9.921,15.181,11.65c2.154,0.577,4.339,0.863,6.511,0.863c4.332,0,8.608-1.136,12.461-3.361c11.938-6.893,16.042-22.213,9.149-34.15L381.189,341H401.5c13.785,0,25-11.215,25-25C426.5,302.215,415.285,291,401.5,291z"></path>
                                    </g>
                                </g>
                                <g>
                                    <g>
                                        <path d="M119.264,361l-4.917,8.516c-6.892,11.938-2.787,27.258,9.151,34.15c3.927,2.267,8.219,3.345,12.458,3.344c8.646,0,17.067-4.484,21.693-12.495L176.999,361H119.264z"></path>
                                    </g>
                                </g>
                            </svg>

                            <span class="mx-2">
                                Login
                            </span>
                        </a>

                        <a href="#"
                            class="inline-flex items-center justify-center w-full px-4 py-2.5 mt-4 overflow-hidden text-sm text-white transition-colors duration-300 bg-blue-600 rounded-lg shadow sm:w-auto sm:mx-2 sm:mt-0 hover:bg-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-80">
                            <svg class="w-5 h-5 mx-2 fill-current" viewBox="-28 0 512 512.00075" xmlns="http://www.w3.org/2000/svg">
                                <path d="m432.320312 215.121094-361.515624-208.722656c-14.777344-8.53125-32.421876-8.53125-47.203126 0-.121093.070312-.230468.148437-.351562.21875-.210938.125-.421875.253906-.628906.390624-14.175782 8.636719-22.621094 23.59375-22.621094 40.269532v417.445312c0 17.066406 8.824219 32.347656 23.601562 40.878906 7.390626 4.265626 15.496094 6.398438 23.601563 6.398438s16.214844-2.132812 23.601563-6.398438l361.519531-208.722656c14.777343-8.53125 23.601562-23.8125 23.601562-40.878906s-8.824219-32.347656-23.605469-40.878906zm-401.941406 253.152344c-.21875-1.097657-.351562-2.273438-.351562-3.550782v-417.445312c0-2.246094.378906-4.203125.984375-5.90625l204.324219 213.121094zm43.824219-425.242188 234.21875 135.226562-52.285156 54.539063zm-6.480469 429.679688 188.410156-196.527344 54.152344 56.484375zm349.585938-201.835938-80.25 46.332031-60.125-62.714843 58.261718-60.773438 82.113282 47.40625c7.75 4.476562 8.589844 11.894531 8.589844 14.875s-.839844 10.398438-8.589844 14.875zm0 0">
                                </path>
                            </svg>

                            <span class="mx-2">
                                Register
                            </span>
                        </a>
                    </div>
                </div>
            </section> */}

            {/* Check user emotion */}
            <section class="bg-white dark:bg-gray-900">
                <div class="container flex flex-col items-center px-4 py-12 mx-auto xl:flex-row">
                    <div class="flex justify-center xl:w-1/2">
                        <img class="h-80 w-80 sm:w-[28rem] sm:h-[28rem] flex-shrink-0 object-cover rounded-full" src="https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80" alt=""/>
                    </div>

                    <div class="flex flex-col items-center mt-6 xl:items-start xl:w-1/2 xl:mt-0">
                        <h2 class="text-2xl font-semibold tracking-tight text-gray-800 xl:text-3xl dark:text-white">
                            Check your <span className="text-blue-500">emotions</span>
                        </h2>

                        <p class="block max-w-2xl mt-4 text-gray-500 dark:text-gray-300">
                            
                        </p>

                        <div class="mt-6 sm:-mx-2">
                            <a href="#" class="inline-flex items-center justify-center w-full px-4 text-sm py-2.5 overflow-hidden text-white transition-colors duration-300 bg-gray-900 rounded-lg shadow sm:w-auto sm:mx-2 hover:bg-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 focus:ring focus:ring-gray-300 focus:ring-opacity-80">
                                <svg class="w-5 h-5 mx-2 fill-current" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" xml:space="preserve">
                                    <g>
                                        <g>
                                            <path d="M407,0H105C47.103,0,0,47.103,0,105v302c0,57.897,47.103,105,105,105h302c57.897,0,105-47.103,105-105V105C512,47.103,464.897,0,407,0z M482,407c0,41.355-33.645,75-75,75H105c-41.355,0-75-33.645-75-75V105c0-41.355,33.645-75,75-75h302c41.355,0,75,33.645,75,75V407z"></path>
                                        </g>
                                    </g>
                                    <g>
                                        <g>
                                            <path d="M305.646,123.531c-1.729-6.45-5.865-11.842-11.648-15.18c-11.936-6.892-27.256-2.789-34.15,9.151L256,124.166l-3.848-6.665c-6.893-11.937-22.212-16.042-34.15-9.151h-0.001c-11.938,6.893-16.042,22.212-9.15,34.151l18.281,31.664L159.678,291H110.5c-13.785,0-25,11.215-25,25c0,13.785,11.215,25,25,25h189.86l-28.868-50h-54.079l85.735-148.498C306.487,136.719,307.375,129.981,305.646,123.531z"></path>
                                        </g>
                                    </g>
                                    <g>
                                        <g>
                                            <path d="M401.5,291h-49.178l-55.907-96.834l-28.867,50l86.804,150.348c3.339,5.784,8.729,9.921,15.181,11.65c2.154,0.577,4.339,0.863,6.511,0.863c4.332,0,8.608-1.136,12.461-3.361c11.938-6.893,16.042-22.213,9.149-34.15L381.189,341H401.5c13.785,0,25-11.215,25-25C426.5,302.215,415.285,291,401.5,291z"></path>
                                        </g>
                                    </g>
                                    <g>
                                        <g>
                                            <path d="M119.264,361l-4.917,8.516c-6.892,11.938-2.787,27.258,9.151,34.15c3.927,2.267,8.219,3.345,12.458,3.344c8.646,0,17.067-4.484,21.693-12.495L176.999,361H119.264z"></path>
                                        </g>
                                    </g>
                                </svg>

                                <span class="mx-2">
                                    Get it on the App Store
                                </span>
                            </a>

                            <a href="#"
                                class="inline-flex items-center justify-center w-full px-4 text-sm py-2.5 mt-4 overflow-hidden text-white transition-colors duration-300 bg-blue-600 rounded-lg shadow sm:w-auto sm:mx-2 sm:mt-0 hover:bg-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-80">
                                <svg class="w-5 h-5 mx-2 fill-current" viewBox="-28 0 512 512.00075" xmlns="http://www.w3.org/2000/svg">
                                    <path d="m432.320312 215.121094-361.515624-208.722656c-14.777344-8.53125-32.421876-8.53125-47.203126 0-.121093.070312-.230468.148437-.351562.21875-.210938.125-.421875.253906-.628906.390624-14.175782 8.636719-22.621094 23.59375-22.621094 40.269532v417.445312c0 17.066406 8.824219 32.347656 23.601562 40.878906 7.390626 4.265626 15.496094 6.398438 23.601563 6.398438s16.214844-2.132812 23.601563-6.398438l361.519531-208.722656c14.777343-8.53125 23.601562-23.8125 23.601562-40.878906s-8.824219-32.347656-23.605469-40.878906zm-401.941406 253.152344c-.21875-1.097657-.351562-2.273438-.351562-3.550782v-417.445312c0-2.246094.378906-4.203125.984375-5.90625l204.324219 213.121094zm43.824219-425.242188 234.21875 135.226562-52.285156 54.539063zm-6.480469 429.679688 188.410156-196.527344 54.152344 56.484375zm349.585938-201.835938-80.25 46.332031-60.125-62.714843 58.261718-60.773438 82.113282 47.40625c7.75 4.476562 8.589844 11.894531 8.589844 14.875s-.839844 10.398438-8.589844 14.875zm0 0">
                                    </path>
                                </svg>

                                <span class="mx-2">
                                    Get it on Google Play
                                </span>
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Us */}
            <section class="bg-white dark:bg-gray-900">
                <div class="container px-6 py-12 mx-auto">
                    <div>
                        <p class="font-medium text-blue-500 dark:text-blue-400">Contact us</p>

                        <h1 class="mt-2 text-2xl font-semibold text-gray-800 md:text-3xl dark:text-white">Chat to our friendly team</h1>

                        <p class="mt-3 text-gray-500 dark:text-gray-400">We’d love to hear from you. Please fill out this form or shoot us an email.</p>
                    </div>

                    <div class="grid grid-cols-1 gap-12 mt-10 lg:grid-cols-2">
                        <div class="grid grid-cols-1 gap-12 md:grid-cols-2">
                            <div>
                                <span class="inline-block p-3 text-blue-500 rounded-full bg-blue-100/80 dark:bg-gray-800">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                                    </svg>
                                </span>

                                <h2 class="mt-4 text-base font-medium text-gray-800 dark:text-white">Email</h2>
                                <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">Our friendly team is here to help.</p>
                                <p class="mt-2 text-sm text-blue-500 dark:text-blue-400">ashenshandeepoffl@gmail.com</p>
                            </div>

                            <div>
                                <span class="inline-block p-3 text-blue-500 rounded-full bg-blue-100/80 dark:bg-gray-800">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                                    </svg>
                                </span>
                                
                                <h2 class="mt-4 text-base font-medium text-gray-800 dark:text-white">Live chat</h2>
                                <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">Our friendly team is here to help.</p>
                                <p class="mt-2 text-sm text-blue-500 dark:text-blue-400">Start new chat</p>
                            </div>

                            <div>
                                <span class="inline-block p-3 text-blue-500 rounded-full bg-blue-100/80 dark:bg-gray-800">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                                    </svg>
                                </span>
                                
                                <h2 class="mt-4 text-base font-medium text-gray-800 dark:text-white">Office</h2>
                                <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">Come say hello at our office HQ.</p>
                                <p class="mt-2 text-sm text-blue-500 dark:text-blue-400">180 A Horape Ragama</p>
                            </div>

                            <div>
                                <span class="inline-block p-3 text-blue-500 rounded-full bg-blue-100/80 dark:bg-gray-800">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                                    </svg>
                                </span>
                                
                                <h2 class="mt-4 text-base font-medium text-gray-800 dark:text-white">Phone</h2>
                                <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">Mon-Fri from 8am to 5pm.</p>
                                <p class="mt-2 text-sm text-blue-500 dark:text-blue-400">+94 77 401 6146</p>
                            </div>
                        </div>

                        <div class="p-4 py-6 rounded-lg bg-gray-50 dark:bg-gray-800 md:p-8">
                            <form>
                                <div class="-mx-2 md:items-center md:flex">
                                    <div class="flex-1 px-2">
                                        <label class="block mb-2 text-sm text-gray-600 dark:text-gray-200">First Name</label>
                                        <input type="text" placeholder="John " class="block w-full px-5 py-2.5 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                                    </div>

                                    <div class="flex-1 px-2 mt-4 md:mt-0">
                                        <label class="block mb-2 text-sm text-gray-600 dark:text-gray-200">Last Name</label>
                                        <input type="text" placeholder="Doe" class="block w-full px-5 py-2.5 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                                    </div>
                                </div>

                                <div class="mt-4">
                                    <label class="block mb-2 text-sm text-gray-600 dark:text-gray-200">Email address</label>
                                    <input type="email" placeholder="johndoe@example.com" class="block w-full px-5 py-2.5 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                                </div>

                                <div class="w-full mt-4">
                                    <label class="block mb-2 text-sm text-gray-600 dark:text-gray-200">Message</label>
                                    <textarea class="block w-full h-32 px-5 py-2.5 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg md:h-56 dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Message"></textarea>
                                </div>

                                <button class="w-full px-6 py-3 mt-4 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                                    Send message
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
            
            {/* Footer */}
            <footer class="bg-white dark:bg-gray-900">
                <div class="container flex flex-col items-center justify-between p-6 mx-auto space-y-4 sm:space-y-0 sm:flex-row">
                    <a href="#">
                        <img class="w-auto h-7" src="https://merakiui.com/images/full-logo.svg" alt=""/>
                    </a>

                    <p class="text-sm text-gray-600 dark:text-gray-300">© Copyright 2024. All Rights Reserved.</p>

                    <div class="flex -mx-2">
                        {/* <a href="#" class="mx-2 text-gray-600 transition-colors duration-300 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400" aria-label="Reddit">
                            <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C21.9939 17.5203 17.5203 21.9939 12 22ZM6.807 10.543C6.20862 10.5433 5.67102 10.9088 5.45054 11.465C5.23006 12.0213 5.37133 12.6558 5.807 13.066C5.92217 13.1751 6.05463 13.2643 6.199 13.33C6.18644 13.4761 6.18644 13.6229 6.199 13.769C6.199 16.009 8.814 17.831 12.028 17.831C15.242 17.831 17.858 16.009 17.858 13.769C17.8696 13.6229 17.8696 13.4761 17.858 13.33C18.4649 13.0351 18.786 12.3585 18.6305 11.7019C18.475 11.0453 17.8847 10.5844 17.21 10.593H17.157C16.7988 10.6062 16.458 10.7512 16.2 11C15.0625 10.2265 13.7252 9.79927 12.35 9.77L13 6.65L15.138 7.1C15.1931 7.60706 15.621 7.99141 16.131 7.992C16.1674 7.99196 16.2038 7.98995 16.24 7.986C16.7702 7.93278 17.1655 7.47314 17.1389 6.94094C17.1122 6.40873 16.6729 5.991 16.14 5.991C16.1022 5.99191 16.0645 5.99491 16.027 6C15.71 6.03367 15.4281 6.21641 15.268 6.492L12.82 6C12.7983 5.99535 12.7762 5.993 12.754 5.993C12.6094 5.99472 12.4851 6.09583 12.454 6.237L11.706 9.71C10.3138 9.7297 8.95795 10.157 7.806 10.939C7.53601 10.6839 7.17843 10.5422 6.807 10.543ZM12.18 16.524C12.124 16.524 12.067 16.524 12.011 16.524C11.955 16.524 11.898 16.524 11.842 16.524C11.0121 16.5208 10.2054 16.2497 9.542 15.751C9.49626 15.6958 9.47445 15.6246 9.4814 15.5533C9.48834 15.482 9.52348 15.4163 9.579 15.371C9.62737 15.3318 9.68771 15.3102 9.75 15.31C9.81233 15.31 9.87275 15.3315 9.921 15.371C10.4816 15.7818 11.159 16.0022 11.854 16C11.9027 16 11.9513 16 12 16C12.059 16 12.119 16 12.178 16C12.864 16.0011 13.5329 15.7863 14.09 15.386C14.1427 15.3322 14.2147 15.302 14.29 15.302C14.3653 15.302 14.4373 15.3322 14.49 15.386C14.5985 15.4981 14.5962 15.6767 14.485 15.786V15.746C13.8213 16.2481 13.0123 16.5208 12.18 16.523V16.524ZM14.307 14.08H14.291L14.299 14.041C13.8591 14.011 13.4994 13.6789 13.4343 13.2429C13.3691 12.8068 13.6162 12.3842 14.028 12.2269C14.4399 12.0697 14.9058 12.2202 15.1478 12.5887C15.3899 12.9572 15.3429 13.4445 15.035 13.76C14.856 13.9554 14.6059 14.0707 14.341 14.08H14.306H14.307ZM9.67 14C9.11772 14 8.67 13.5523 8.67 13C8.67 12.4477 9.11772 12 9.67 12C10.2223 12 10.67 12.4477 10.67 13C10.67 13.5523 10.2223 14 9.67 14Z">
                                </path>
                            </svg>
                        </a> */}

                        {/* <a href="#" class="mx-2 text-gray-600 transition-colors duration-300 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400" aria-label="Facebook">
                            <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M2.00195 12.002C2.00312 16.9214 5.58036 21.1101 10.439 21.881V14.892H7.90195V12.002H10.442V9.80204C10.3284 8.75958 10.6845 7.72064 11.4136 6.96698C12.1427 6.21332 13.1693 5.82306 14.215 5.90204C14.9655 5.91417 15.7141 5.98101 16.455 6.10205V8.56104H15.191C14.7558 8.50405 14.3183 8.64777 14.0017 8.95171C13.6851 9.25566 13.5237 9.68693 13.563 10.124V12.002H16.334L15.891 14.893H13.563V21.881C18.8174 21.0506 22.502 16.2518 21.9475 10.9611C21.3929 5.67041 16.7932 1.73997 11.4808 2.01722C6.16831 2.29447 2.0028 6.68235 2.00195 12.002Z">
                                </path>
                            </svg>
                        </a> */}

                        <a href="https://github.com/ashenshandeepoffl" class="mx-2 text-gray-600 transition-colors duration-300 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400" aria-label="Github">
                            <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M12.026 2C7.13295 1.99937 2.96183 5.54799 2.17842 10.3779C1.395 15.2079 4.23061 19.893 8.87302 21.439C9.37302 21.529 9.55202 21.222 9.55202 20.958C9.55202 20.721 9.54402 20.093 9.54102 19.258C6.76602 19.858 6.18002 17.92 6.18002 17.92C5.99733 17.317 5.60459 16.7993 5.07302 16.461C4.17302 15.842 5.14202 15.856 5.14202 15.856C5.78269 15.9438 6.34657 16.3235 6.66902 16.884C6.94195 17.3803 7.40177 17.747 7.94632 17.9026C8.49087 18.0583 9.07503 17.99 9.56902 17.713C9.61544 17.207 9.84055 16.7341 10.204 16.379C7.99002 16.128 5.66202 15.272 5.66202 11.449C5.64973 10.4602 6.01691 9.5043 6.68802 8.778C6.38437 7.91731 6.42013 6.97325 6.78802 6.138C6.78802 6.138 7.62502 5.869 9.53002 7.159C11.1639 6.71101 12.8882 6.71101 14.522 7.159C16.428 5.868 17.264 6.138 17.264 6.138C17.6336 6.97286 17.6694 7.91757 17.364 8.778C18.0376 9.50423 18.4045 10.4626 18.388 11.453C18.388 15.286 16.058 16.128 13.836 16.375C14.3153 16.8651 14.5612 17.5373 14.511 18.221C14.511 19.555 14.499 20.631 14.499 20.958C14.499 21.225 14.677 21.535 15.186 21.437C19.8265 19.8884 22.6591 15.203 21.874 10.3743C21.089 5.54565 16.9181 1.99888 12.026 2Z">
                                </path>
                            </svg>
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
