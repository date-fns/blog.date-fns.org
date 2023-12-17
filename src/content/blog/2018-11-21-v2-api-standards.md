---
title: "v2 API design: Stick to existing standards"
description: ""
pubDate: "Nov 21 2018"
---

One of the most important changes in v2 is the new API design. We carefully refined every function to make date-fns consistent, predictable and reliable. This post is the third post on API design where I tell about our decision to stick to existing standards.

[Read the opening post](https://blog.date-fns.org/post/date-fns-v2-goals-and-values-3q4uj0mon4lhp/).

> date-fns v2 introduces many new features and breaking changes, and this post is a part of a series where we describe in detail most notable ones.

v2 started with the change of the filenames naming scheme. I come from the Ruby world, so I thought it's a good idea to have file names in underscore format. JavaScript renaissance just started, so there wasn't a common standard. Initially, it was irritating to see so many JavaScript'ers using the camel case format for files. But eventually, I accepted the difference and decided to prioritize common practices over personal taste and adopted camel case as well.

```js
// v1
const addDays = require("date-fns/add_days");
// v2
const addDays = require("date-fns/addDays");
```

This breaking change was a turning point that allowed us to abstract from our points of views and habits and embrace existing standards and well-established practices.

One of the most significant changes was adopting Unicode Technical Standard #35 for format and parse. It caused a lot of confusion, but I believe it's worth it. You can [read about that in a dedicated post](/v2-unicode-tokens).

Another standard that caused us to revisit naming schema was ISO 8601. Starting with isWithinRange function we used the word "range" for time spans:

```js
const isWithinRange = require("date-fns/is_within_range");
isWithinRange(
  new Date(2014, 0, 3), // the date to check
  new Date(2014, 0, 1), // start
  new Date(2014, 0, 7) // end
);
//=> true
```

It turned out that ISO 8601:2004 defines term "interval":

> time interval: part of the time axis limited by two instants

We adopted this terminology and made interval a separate entity:

```js
import { isWithinInterval } from "date-fns";
isWithinInterval(new Date(2014, 0, 3), {
  start: new Date(2014, 0, 1),
  end: new Date(2014, 0, 7),
});
```

It also made the code easier to read!

When a string is passed to new Date(), the JavaScript engine tries to do its best parsing it. In v1 we relied on the mechanism but then quickly learned that different browsers have different parsers and it leads to bugs that hard to find.

Starting with v2, whenever a string represents a date it must be a valid ISO 8601 string overwise you'll get Invalid Date.

---

In the next posts, I'll continue overview of the v2 API design decisions and changes
