import pix from "../../assets/Dash2.png";

import { UnLazyImage } from "@unlazy/react";

const ABetter = () => {
  return (
    <div className="pt-20 w-full flex justify-center items-center">
      <div className="relative w-full isolate overflow-hidden bg-white px-0 py-14 sm:py-14 lg:overflow-visible lg:px-0">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <svg
            className="absolute left-[max(50%,25rem)] top-0 h-[64rem] w-[128rem] -translate-x-1/2 stroke-gray-200 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]"
            aria-hidden="true"
          >
            <defs>
              <pattern
                id="e813992c-7d03-4cc4-a2bd-151760b470a0"
                width="200"
                height="200"
                x="50%"
                y="-1"
                patternUnits="userSpaceOnUse"
              >
                <path d="M100 200V.5M.5 .5H200" fill="none" />
              </pattern>
            </defs>
            <svg x="50%" y="-1" className="overflow-visible fill-gray-50">
              <path
                d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
                stroke-width="0"
              />
            </svg>
            <rect
              width="100%"
              height="100%"
              stroke-width="0"
              fill="url(#e813992c-7d03-4cc4-a2bd-151760b470a0)"
            />
          </svg>
        </div>
        <div className="mx-5 md:mx-20 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
          <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
            <div className="lg:pr-4">
              <div className="lg:max-w-lg">
                <p className=" font-semibold leading-tight mb-10 text-[20px] text-blue-950">
                  Your all-in-one answers to school
                  <br /> administration problems
                </p>
                <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  Seamless workflow
                </h1>
                <p className="mt-6 text-xl leading-8 text-gray-700">
                  Dive into Next's virtual hub where you (admin & teachers) can
                  effortlessly manage student information. From academic
                  performances to writing articles and CBTs to rating teachers
                  and lessons taught and to attendance records.{" "}
                </p>
              </div>
            </div>
          </div>
          <div className="-ml-12 -mt-12 p-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
            <UnLazyImage
              // blurhash="LKO2:N%2Tw=w]~RBVZRi};RPxuwH"
              // srcSet="image-320w.jpg 320w, image-640w.jpg 640w"

              thumbhash="1QcSHQRnh493V4dIh4eXh1h4kJUI"
              src={pix}
              autoSizes
              className="w-[48rem] max-w-none rounded-xl bg-gray-900 shadow-xl ring-1 ring-gray-400/10 sm:w-[60rem] "
            />
          </div>
          <div className="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
            <div className="lg:pr-4">
              <div className="max-w-xl text-base leading-7 text-gray-700 lg:max-w-lg">
                <p>
                  So imagine this awesome digital tool like a Swiss Army Knife{" "}
                  <i>(which contains various tools in one compact package)</i>{" "}
                  that is our EdTech in a nutshell. It's all about making life
                  easier for everyone involved in running a school, from the
                  Principal to the teachers, students and even the VP-folks in
                  the office.
                </p>
                <ul role="list" className="mt-8 space-y-8 text-gray-600">
                  <li className="flex gap-x-3">
                    {/* <svg className="mt-1 h-5 w-5 flex-none text-indigo-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M5.5 17a4.5 4.5 0 01-1.44-8.765 4.5 4.5 0 018.302-3.046 3.5 3.5 0 014.504 4.272A4 4 0 0115 17H5.5zm3.75-2.75a.75.75 0 001.5 0V9.66l1.95 2.1a.75.75 0 101.1-1.02l-3.25-3.5a.75.75 0 00-1.1 0l-3.25 3.5a.75.75 0 101.1 1.02l1.95-2.1v4.59z" clip-rule="evenodd" />
              </svg> */}{" "}
                    ●
                    <span>
                      <strong className="font-semibold text-gray-900 mr-2">
                        User-Friendly Orbit 🚀 :
                      </strong>
                      We've cracked the code for simplicity. Our user-friendly
                      interface makes navigation a breeze for administrators,
                      teachers, parents, and students alike.
                    </span>
                  </li>
                  <li className="flex gap-x-3">
                    {/* <svg className="mt-1 h-5 w-5 flex-none text-indigo-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clip-rule="evenodd" />
              </svg> */}{" "}
                    ●
                    <span>
                      <strong className="font-semibold text-gray-90 mr-2">
                        Advanced Security 💪:
                      </strong>{" "}
                      Rest easy knowing that your school's sensitive data is
                      secure with our robust security features. Your school's
                      secrets are safe with us.
                    </span>
                  </li>
                  <li className="flex gap-x-3">
                    {/* <svg className="mt-1 h-5 w-5 flex-none text-indigo-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path d="M4.632 3.533A2 2 0 016.577 2h6.846a2 2 0 011.945 1.533l1.976 8.234A3.489 3.489 0 0016 11.5H4c-.476 0-.93.095-1.344.267l1.976-8.234z" />
                <path fill-rule="evenodd" d="M4 13a2 2 0 100 4h12a2 2 0 100-4H4zm11.24 2a.75.75 0 01.75-.75H16a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75h-.01a.75.75 0 01-.75-.75V15zm-2.25-.75a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75H13a.75.75 0 00.75-.75V15a.75.75 0 00-.75-.75h-.01z" clip-rule="evenodd" />
              </svg> */}{" "}
                    ●
                    <span>
                      <strong className="font-semibold text-gray-900 mr-3">
                        Time Tamer 🧐:
                      </strong>
                      Say goodbye to scheduling chaos. Our system turns the
                      complex task of timetable creation into a breeze, ensuring
                      classes, exams, and events run like a well-oiled machine.
                    </span>
                  </li>
                </ul>
                <p className="mt-8">
                  So there you have it - NEXT's management system in it's hidden
                  glory. Like having a Personal Assistant for not only your
                  school admin tasks, but also teaching and lesson note jobs and
                  other students features. With it's help, keeping an eye on
                  your teacher, students and running a school is smoother, more
                  efficient and a whole lot less stressful.{" "}
                </p>
                <b className="text-blue-950 text-[21px]">
                  How awesome is that?!
                </b>
                <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">
                  No paper? No problem.
                </h2>
                <p className="mt-6">
                  Missed school for some days and got lots and lots of
                  paperworks on your desk and you don't know where to start
                  from? Be glad, because papers are getting automated now. Work
                  online with your device or laptop and still do all the complex
                  things you want to. <b className="text-blue-950">Next</b> is
                  here and was built for you. Dive into an endless world of
                  easiness at doing admnistrative tasks
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ABetter;
