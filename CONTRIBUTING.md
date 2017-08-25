# Contributing to Wanna

Welcome, contributor. Let's make the world of open source a better place! :rocket: :rocket:  
Wanna welcomes contributions of different types. There are a lot of work to do, and you can help us get them done.  

## Types of contribution
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

## Styleguides
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
