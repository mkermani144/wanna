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
Let's know what each part means:

#### Text
Text part of task query is the description of the job you want to do. Everything you type as task query is counted as text, unless it comes after the last `@` character. Imperative sentenses  are suggested form for task text (i.e. _"go gym"_ is preferred over _"going gym"_). 
