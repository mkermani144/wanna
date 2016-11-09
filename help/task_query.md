Task query
====


When you want to add a task, you do it via _task queries_. A task query is nothing
more than a string, consisting task text and other info about task.

Task query has a [regex](https://en.wikipedia.org/wiki/Regular_expression) like this:
```
.+ @([1-9]\d*)?[dwmDWM]?(\+(\d+)([dwmDWM]?))?\s?(~[1-9]\d*[hHmM]?)(\s?ev[1-9]\d*[dwmDWM]?)?$
```
In simpler words, task query is something like this:
```
text @period+start ~units evRepeatitionPeriod
```
For example:
```
Go gym @1w+2d ~2h ev1w
```
Let's know what each part means: (Note that these parts must come respectively)

#### Text
Text part of task query is the description of the task you want to do. Everything you type as task query is counted as text, unless it comes after the last `@` character. Imperative sentenses  are suggested form for task text (i.e. _"go gym"_ is preferred over _"going gym"_). 

#### Period
Period part of task query determines period of time in which you want to do the task. It should come exactly after the last `@` character in task query. Period is composed of a number, and optionally one of the characters `d`, `w` or `m` indicating day, week and month respectively. If you don't specify any of the characters, `d` is selected by default. If you specify neither the number nor the character, `1d` is chosen as period. Such a task (with period of one day) is called one-day task.    
So, for example, in `Go gym @ ~2h` period is 1 day, in `Call Joseph @5 ~2` period is 5 days and in `Read 10 pages of book X @5w ~20` period is 5 weeks.

#### Starting point
Next part is starting point. Starting point should come exactly after the plus (`+`) sign which comes after period part. This part determines when the task period will start. It has a format quite like period. If you don't specify starting point, today will be chosen by default.  
So, for instance, in `Go gym @+3 ~2h` starting point is 3 days from now.

#### Units
In wanna, the time a task consumes is called units. Units part, which comes after `~` character is a number and one of the characters `m` or `h` indicating minute(s) or hour(s) respectively. If you don't specify `m` or `h`, `m` will be selected by default. You must specify units number yourself and there is no default value for it.
As an example, in `Go gym @ ~2` units is 2 minutes.
