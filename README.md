Wanna
====
[![Build Status](https://img.shields.io/travis/mkermani144/wanna.svg)](https://travis-ci.org/mkermani144/wanna)
[![Downloads](https://img.shields.io/github/downloads/mkermani144/wanna/total.svg)]()
[![Release](https://img.shields.io/github/release/mkermani144/wanna.svg)]()
[![Issues](https://img.shields.io/github/issues-raw/mkermani144/wanna.svg)]()
[![Pull requests](https://img.shields.io/github/issues-pr-raw/mkermani144/wanna.svg)]()
[![Wannachat](https://badges.gitter.im/wannachat/Lobby.svg)](https://gitter.im/wannachat/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

Table of contents
----
- [Introduction](#introduction)
- [Installation](#installation)
- [Tutorials](#tutorials)
- [Community](#community)
- [Contributing](#contributing)
- [Issues and bug reports](#issues-and-bug-reports)
- [Technologies and libraries](#technologies-and-libraries)
- [Philosophy](#philosophy)
- [Workflow](#workflow)
- [License](#license)

Introduction
----
Wanna is an implementation of a 21st-century to-do list app. It introduces a [new workflow](#workflow) and has its own [philosophy](#philosophy) which makes it different from other to-do list apps.

Installation
----
Wanna is under active development. You can see a list of its releases [here](https://github.com/mkermani144/wanna/releases). At this time, the only release of the app is [Beta release for Linux](https://github.com/mkermani144/wanna/releases/tag/beta). However, you can easily download the repo's source code and build a version suitable for your own platform with just a bit of effort. In the near future, other platforms will be officially supported.  
You can also clone the repository to see development version of the app in action:
```
git clone https://github.com/mkermani144/wanna.git
cd wanna/desktop
yarn && yarn electron # Or `npm i && npm electron`
```

Tutorials
----
_Tutorials will be added soon._

Community
----
Join [Wannachat](https://gitter.im/wannachat/Lobby) on Gitter!

Contributing
----
Wanna welcomes contributors! Please see [contribution guidelines](CONTRIBUTING.md) for more information.

Issues and bug reports
----
See [contributing guidelines](CONTRIBUTING.md).

Technologies and libraries
----
Like the other apps and libraries, Wanna stands on the shoulders of giants. This is a list of mostly used awesome technologies and libraries that power Wanna:  
- [Electron](https://electron.atom.io)
- [React.js](https://facebook.github.io/react/)
- [Material-UI](www.material-ui.com)
- [Create-react-app](https://github.com/facebookincubator/create-react-app)
- [React-Router](https://github.com/ReactTraining/react-router)
- [Redux](http://redux.js.org)
- [Eslint](http://eslint.org)

Philosophy
----
[Every time one builds a to-do list app, a puppy dies.](https://medium.freecodecamp.com/every-time-you-build-a-to-do-list-app-a-puppy-dies-505b54637a5d) So why should Wanna exist?  
There are many to-do list apps out there. All have pros and cons and may or may not work for you. But nearly all of them lack one critical feature: they are just a digital version of paper to-do lists. You throw some tasks into them, and then, whether you complete the task or not, nothing great happens: The app is somehow passive.  
Wanna _tries_ to add some features that make it more active. It tries to award you in some manner if you complete your tasks. It helps you get back to your work if you fail. It attempts to motivate you to be productive. It keeps a bank of your ideas. In essence, __Wanna tries to be smart and react to your activities.__ (Note that these features are not entirely available in Wanna hitherto, but it will evolve and get better gradually.)

(Don't forget: Wanna is not magic. It's just an application. As a human, if you don't want to improve, if you don't want to get your tasks done, you can easily cheat the app (and yourself), and Wanna cannot help you anyway.)

Workflow
----
Wanna workflow is dead simple; in brief, an idea comes to your mind, you save it in Wanna, convert it to some tasks and finally do it:

1. An idea occurs to you. It can be any type of idea; listening to a great music, doing your school homework, plan for running, reading a book, learning a new programming language, trying always to smile, launching a small party with your family and friends or watching a TED talk are some examples.

2. You add the idea to your ideas list. You don't need to care about when to do it. It's just an idea, not a task.

3. Now you have a mess of ideas. You can scroll up and down and pick one of them out of your list.

4. Once you selected the idea, it's time to convert it to some tasks. You have to set a period of time in which each task should be done. Moreover, you have to estimate the time that task will take. (Note that you can skip the previous three sections and directly add a task.)

5. Having your tasks added to your list, Wanna shows each task with a colorful status circle. The more this color tends to become red, the closer the task due date is. Don't let those circles turn red!

License
----
MIT license, copyright (c) 2017 Mohammad Kermani
