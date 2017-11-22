Contributing to Wanna
====

Welcome, contributor. Let's make the world of open source a better place! :rocket: :rocket:  
Wanna welcomes contributions of different types. There are a lot of work to do, and you can help us get them done.  

Types of contribution
----
There are multiple kinds of contributions we seek for, ranging from effortless ones like feature suggestion, to harder ones like
app development. Below comes the list of contribution types. Please make sure you have satisfied prerequisties of each contribution type before reading its guidelines, otherwise you may do redundant work.  

### Feature requests :bulb:
#### Prerequisties:
* Install and use the app

Feature requests are the easiest type of contribution in Wanna. If you think a feature will make Wanna better, inform us!  
To do so, follow these steps:  
1. Search issues and see if anyone has suggested a feature like your one.
2. If nobody has suggested such a feature, open a new issue and start its title with `[Feature Request] ` (i.e. `[Feature Request] Add support for Persian language`).
3. Expalain exactly what you are looking for. Provide additional links, images, etc. if needed.

We may label your issue as `Needs-check`, or we may directly add `idea` or `new-feature` label to your issue, indicating your issue is approved.

### Bug reports :beetle:
#### Prerequisties:
* Install and use the app

If you find a bug when you use the app, you can contribute to Wanna as a bug reporter. To do so, follow these steps which are almost the same as steps for feature requests:
1. Search issues and see if somebody has reported the same bug.
2. If the bug is not reported, open an issue and explain about the bug.

If your issue is labeled as `bug`, we will fix it in the next versions of the app. It may also be labeled as `duplicate` if your issue is a duplicate.

### Beginner code contribution :baby:
#### Prerequisties:
* Install and use the app
* Know enough HTML, CSS and basic Javascript
* Familiar with ReactJS and JSX
* Know enough Git and GitHub

If you want to get started with coding in Wanna, go to the [issues](https://github.com/mkermani144/wanna/issues) and look for the ones labeled `Help-Wanted`. These are usually minor bugfixes or enhancements and you don't need to know full structure of the app to fix them. Usually, they only need basic web development knowledge. To start code contribution, follow these steps:
1. Look for the issues labeled `Help-Wanted` and choose one.
2. Comment on the issue indicating you are working on it.
3. Fork the repo and update your fork code.
4. After fixing the issue, make a pull request.

We will review your code. If everything is OK, your PR will be accepted.

Styleguides
----
Although we welcome contributors (and we highly need contributions, certainly), we have some style guides we are very strict about. If a PR does not meet these guidelines, its review will not be approved and we would send you some change requests. So be careful about these guides.

### Git
1. Write short commit messages. GitHub suggests maximum of 50 characters for them. There is some conditions, however, in which you need to write longer messages.
2. Commit often. Don't put a lot of work in one commit. (If you are using "and" word in your message, you are probably putting a lot of work in your commit!)
3. Write imperative commit messages (i.e. `Add a feature` instead of `Added a feature`, `Adding a feature`, etc.)
4. If you are a collaborator, choose appropriate branch names. Use `enhancement/something` when you are adding a new feature, `bugfix/#xyz` when fixing issue `#xyz`, `wip/someLongWorkInProgress` for the works that take a lot of time to complete, etc.

### Javascript
1. Fulfill all of [Airbnb javascript styleguide](https://github.com/airbnb/javascript) (unless we overwrite a rule in `.eslintrc.json` file). We use `eslint-config-airbnb` package to do so. Ideally, config your editor/IDE to help you with this. From their style guides:
    * Use semicolons.
    * Use 2 spaces for indentation.
    * Don't use `var`. Use `const` wherever possible.
    * Use signle quotes for strings.
2. Write functional, declarative code as much as possible. As an example, favor
    ```js
    const double = x => x * 2;
    const data = [1, 2, 3];
    const result = data.map(double);
    ```
    over
    ```js
    const data = [1,2,3];
    const data = [];
    for (let i = 0; i < data.length; i++) {
      result.push(data[i] * 2);
    }
    ```
    The first coding styles tells you (the reader of the code) _what_ those lines of code want to do. The second styles, in contrast, tells you _how_ to do that job. It's not the case how to double elements of an array here, however; We just want to do the doubling task.  
3. Embrace ES6 (and the next versions, too). ES6 is the new JS standard. Wanna uses it everywhere.
### Project directory structure
We mostly use feature-based project structure in Wanna, meaning we group files based on the feature, not the job they do. For example, we group the files in `Task`, `Idea`, `Settings`, etc. directories instead of `ActionCreators`, `Components`, `Containers`.

Testing
----
If you are code contributing in Wanna, do not forget about tests. Tests are vital for every non-trivial software, and Wanna is not an exception here. Next, comes some very brief guidelines about testing, based on our experience.

### Unit testing
The first type of testing you have to care about is unit testing. In unit tests, the most important thing to remember is to **test that unit as a black box**. That is, the only thing you have access to when testing a unit (in other words, its input) is its **public API**. (In other words, what you `export` from a javascript module.) You can do everything with that public API, and see if the results are the expected ones. But never, ever access the code inside that unit in your unit tests. The only thing you should use in your unit tests is the public API.  
Some general guidelines:
1. Embrace TDD. Write tests first, and let them drive your development.
2. Test only one thing. Try to limit your assertions/expectations to one, if possible.
3. Make the tests as simple as possible. Don't test complex scenarios in unit tests.
4. Make the tests as small as possible. Use functions to hide details, and focus on actual and expected values in the tests.
5. Write clear, short unit test messages.
6. Watch the test fail. An initially-passed test is not so useful.

#### Unit testing React components
The most challenging units for testing are React components, based on our experience in Wanna development. So carefully read about how to test these units.  
As we said earlier, the only thing you have access to when testing a unit is its public API. But what is the public API of a React component?  
If you think about it, all of the following are part of a React component public API:
* Its `props`. It is so clear.
* The callable `props` of its children. Those `props` are not related to the component implementation details at all. They are accessible to the outside world of the component as a public API.
* And... its `state`. Yes, the `state` is somehow a public API, **but totally indirectly**. The most important thing is that you never change state manually (i.e. using enzyme `setState()`). **You change state using the public API** (the two previous ones). So it's better to say `state` is not a public API itself, but it can be changed using the public API. (Pay close attention to this. If there are some `state` in the component that is changed *only inside the component itself*, it is an implementation detail and we do not care about it in our test.) But because a React component output is subject to `state` changes, this one is worth to be mentioned as the third way you can change a component input. (As we suggested as a general guideline, unit tests should be as simple as possible. Therefore don't implement multiple `state` transition in the unit tests. At most, you should have one `state` transition in your unit tests. Complicated `state` transitions shouldn't be unit tested.)

So, when you want to unit test a React component, you set different `props`, call its children callable `props` or change its `state` using its `props` or calling its children `props`, and check if the result is as expected.   

These are all anti-patterns:
* Using enzyme `wrapper.instance()`
* Calling the functions inside components that are not accessible from the outside (If you need to unit test these functions, put them in a separate module and test that module instead)
* Using enzyme `setState()`
* Having multiple `expect`s in a unit test

### e2e testing
The second type of tests we use in Wanna are e2e tests. As we said earlier, complex scenarios should not be tested using unit tests; instead, e2e tests are the tool to do that job. An e2e test simulates interaction of the user with the app (e.g. mouse clicks, keyboard inputs, etc.). We use `selenium-webdriver` (without any wrapper library) in our e2e tests.  

Some general guidelines:
1. Test only one scenario (e.g. only test app settings functionality in an individual e2e test).
2. Divide the test into multiple sub-scenarios, and check if the result in the end of each sub-scenario is as expected.
3. Don't repeat yourself. There are some tasks (like mouse clicks, keyboard inputs, etc.) that are used again and again in your tests. Separate these kinds of tasks in another module and make the test more readable.
4. Run the test yourself, and watch it in action.
5. Use large timeouts in the tests. Don't assume the tests are run as fast as your computer. Some e2e tests may take several minutes to complete, while the same ones may run in half a minute in your computer.
6. Wait often. If the test fails and your code is correct (and you don't know why, as the famous meme suggests :joy:), you may need to wait between two lines of your e2e test.
7. Use appropriate `class`es and `id`s in your React components to simplify CSS selectors in your e2e tests.

Misc
---

### Dates
We have our own tiny module for manipulating dates. This module is located in `src/lib/date.js`. Try to use its apis for all kinds of date and time manipulations.  
Except `parse` function, which exactly does the same thing as `Date.parse`, all other exported functions in this module use unix times as input (if any) and return unix times as output, too. Javascript date objects are neither provided as inputs to these functions nor returned as their output.
