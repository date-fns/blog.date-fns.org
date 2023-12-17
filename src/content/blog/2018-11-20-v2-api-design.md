---
title: "v2 API design: Stick to JavaScript behavior whenever possible"
description: ""
pubDate: "Nov 20 2018"
---

One of the most important changes in v2 is the new API design. We carefully refined every function to make date-fns consistent, predictable and reliable. This post is the second post on API design where I tell about our decision to stick to JavaScript behavior and related changes.

[Read the previous post](/v2-goals-and-values/).

> date-fns v2 introduces many new features and breaking changes and this post is a part of a series where we describe in detail most notable ones.

## Why

The initial idea of the library was to create a set of helpers that will work with the native Date object. We avoided introducing functionality that already existed in the standard library and named functions as they are part of it. In v2 we decided to go further and made date-fns behave like JavaScript in every aspect.

JavaScript and its behavior is often a subject of just critique. Because of the need for backward compatibility over the years, it accumulated nuances that nowadays considered as a bad language design. Yes, I'm talking about its coercion rules, NaN, null and so on.

However, behind every strange looking behavior stands logic consistent across the language. It might be covering weak parts of JavaScript, but it's consistent and if you learn it once it starts making sense.

## Exceptions

In v2 we made date-fns throw `TypeError` and `RangeError` in cases when standard JavaScript functions do it.

Whenever an argument is required, JavaScript throws `TypeError`:

```js
window.fetch();
//=> TypeError: 1 argument required, but only 0 present.
```

From now all functions check if the passed number of arguments is less than the number of required arguments and throw `TypeError` exception if so:

```js
import { addDays } from "date-fns";
addDays();
//=> TypeError: 2 arguments required, but only 0 present
```

Whenever an argument value is not in the set or range of allowed values, JavaScript throws `RangeError`:

```js
(42).toFixed(-1);
//=> RangeError: toFixed() digits argument must be between 0 and 100
```

From now on functions throw `RangeError` if optional values passed to options are not undefined or have expected values:

```js
import { formatDistanceStrict } from "date-fns";
formatDistanceStrict(new Date(2014, 6, 2), new Date(2015, 0, 1), {
  roundingMethod: "qwe",
});
//=> RangeError: roundingMethod must be 'floor', 'ceil' or 'round'
```

**Coercion**.

Just like JavaScript date-fns coerce passed arguments to the expected type.

```js
import { addDays } from "date-fns";
addDays(new Date(1987, 1, 11), "42");
//=> Wed Mar 25 1987 00:00:00 GMT+0530 (+0530)
```

Despite being the most hated aspect of the language, coercion is quite straightforward and consistent, although it leads to unexpected results in combination with arithmetic operators.

Here are the rules that we use to coerce the arguments:

![](/public/posts/2018-11-20-v2-api-design-table.jpeg)

Here, the columns are what type we expect the argument to be and the rows what we actually supply as an argument — for example, in addDays the first argument will be transformed by the rules from the “date” column, and the second argument by the rules from the “number” column, so `addDays(1, '1')` is equivalent to `addDays(new Date(1), 1)`.

## Invalid date

Date internally represented by a number so just like with Number, incorrect operations on dates results in `Invalid Date` (an invalid date is a date which time value is `NaN`):

```js
const date = new Date();

date.setHours("nope");
//=> NaN

date;
//=> Invalid Date
```

date-fns reflects this behavior and will return Invalid Date when you pass unconvertable values:

```js
import { addDays } from "date-fns/addDays";
addDays(new Date(), "nope");
//=> Invalid Date
```

This was one of the trade-offs that were particularly hard to make:

On the one hand, we would expect to have an exception when an argument has a wrong value. On the other hand, the exception would force us to wrap every function call into try-catch blocks that is bad developer experience. The standard JavaScript's approach to the problem is to expect the developer to be responsible for validating the user input. In the worst case scenario, the application will print `Invalid Date` and keep working that wouldn't happen if we'd throw exceptions.

## Ongoing work

While writing the post, I found an inconsistency that we didn't consider. While toString called on an invalid date returns `Invalid Date`, toISOString as well as Intl API throws `RangeError`:

```js
date.toString();
//=> 'Invalid Date'

date.toISOString();
//=> RangeError: Invalid time value

new Intl.DateTimeFormat("en-US").format(date);
//=> RangeError: Invalid time value
```

We incorrectly applied toString behavior to format:

```js
import { format } from "date-fns";

const date = new Date();
date.setHours("nope");

format(date, "yyyy-MM-dd");
//=> 'Invalid Date'
```

I've opened an issue that we plan to fix before [the first beta release](https://github.com/date-fns/date-fns/issues/987).

---

In the next posts, I'll continue overview of the v2 API design decisions and changes
