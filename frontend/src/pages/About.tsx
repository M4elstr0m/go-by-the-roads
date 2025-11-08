import "@/styles/pages/About.css"
import { OpenLink, OpenRepoLink } from '@/../wailsjs/go/app/App';
import logo from '@/assets/images/logo-universal.png';

function About() {
    return (
        <div id="about">
            <img className='absolute hover:scale-105 transition-all' src={logo} id="logo" alt="logo" title='Link to repository' onClick={() => { OpenRepoLink() }}
                style={{
                    height: "15vh",
                    width: "auto",
                }} />

            <h1 className="text-7xl relative title inline-block font-extrabold tracking-tight text-white drop-shadow-md uppercase hover:scale-110 transition-all duration-200">
                ABOUT
            </h1>
            <div className="mt-10 ml-10 w-9/10 text-left">
                <div className="font-semibold ml-2 mb-2">
                    Hey there I'm M4elstr0m!
                </div>
                Meanwhile I hope you are enjoying this software, I have prepared some frequently asked questions just for you, so you can better understand the choices I made during the development of this app.

                <div className="h-62 overflow-y-auto overflow-x-hidden bg-(--palette_GunMetal-100) p-3 mt-5 rounded-xl">
                    <details>
                        <summary className="text-xl font-bold">Why a roadmap app ?</summary>
                        <p>Because I love organizing myself whenever I start a new project.
                            So I was searching for a lightweight tool that could simply create step-by-step to-do lists, and guess what, here it is!</p>
                    </details>
                    <details className="mt-5">
                        <summary className="text-xl font-bold">Why do you call a task a "site"?</summary>
                        <p>Well, when you travel using a map, you have to go through a lot of interesting sites before getting to your destination.
                            To me, all the steps you have to go through during a project are interesting sites: you don't know yet if it will be worth it, you don't even know if you are going to keep it in the final version, but you do it because it is interesting.</p>
                    </details>
                    <details className="mt-5">
                        <summary className="text-xl font-bold">Why completed Sites turn gray instead of green?</summary>
                        <p>Because your eye will first catch the <span className="font-bold text-red-400 text-xl">big colored stuff</span>, two colors would be too much.</p>
                    </details>
                    <details className="mt-5">
                        <summary className="text-xl font-bold">How can I support this project?</summary>
                        <p>Simply <span className="font-extrabold text-amber-300">Star</span> my repository on Github. This is 100% free and you can access my repository by clicking on the Github widget at the bottom right corner of this window. Thank you for your support!</p>
                    </details>
                    <details className="mt-5">
                        <summary className="text-xl font-bold">How can I report a bug or request a feature?</summary>
                        <p>Open an issue on Github, I will answer as soon as I can.</p>
                    </details>
                </div>
            </div>
        </div>
    )
}

export default About