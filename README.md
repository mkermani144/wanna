wanna
====



Description
----
Wanna is an alternative to the boring traditional to-do list apps.
It makes you highly flexible, help you manage your time, suggest suitable tasks to do based on your mood, and more.

I hope you enjoy it. Just wait until beta release.


Installation and usage
----
The desktop version of the project is under development at this time and there is no release of the app yet. Everyone can, however, clone the project to see what's going on in the project:
```
git clone https://github.com/mkermani144/wanna.git
```
In order to start the app, you should have `electron` installed on your platform. Then you can easily start the app:
```
cd wanna/desktop
npm install
electron .
```
__Note: The app probably has a mobile version, but it is not ready yet and it's development is not started. My focus is on desktop version at this time.__


Ideas and features to-do
----
Ideas and features to be developed after [beta version](https://github.com/mkermani144/wanna/milestone/1) (sorted based on importance):
- [ ] Recurring tasks
- [ ] Idea bank
- [ ] One-day tasks
- [ ] Timer
- [ ] Moods
- [ ] Job type
- [ ] Daily treshold
- [ ] Time guess
- [ ] Day of thing
- [ ] Projects
- [ ] App icon


Known bugs
----
- There are some problems in running the app in Ubuntu 16.04 because of lack of support in one of the project dependency packages(`node-sass` package). That problem will probably be resolved in future versions of `node-sass`; in addition, the project may leave using `node-sass` and use an alternative.
