---
title: "We cut date-fns v2 minimal build size down to 300 bytes, and now it's the smallest date library"
description: ""
pubDate: "Jan 11 2019"
---

v2.0.0-alpha.27 is out and along with many fixes and improvements, it brings an important breaking change. From now on functions will accept only dates and numbers as arguments. Strings should be parsed beforehand. This change enabled us to bring the minimal library build down to 300 B which makes date-fns the smallest date library out there (\*). We also introduced a new lightFormat function that allows formatting dates using the most popular tokens, and its size is just 900 B. I hope this will be last alpha version before beta release.

> (\*) I'm actually didn't check every existing JavaScript library, but it's smaller than Day.js and definitely way smaller than Moment.js.

In v1 we relied on new Date() for parsing date strings. Unfortunately, the ECMAScript spec isn't strict about how engines should parse strings, and that resulted in subtle differences between browsers. These differences caused many nasty hard-to-track bugs that made us write our own ISO 8601 parser. That increased minimal library build size up to 1.5 KB. For reference, in v1 addDays was 1 KB in before v2.0.0-alpha.27 it was 1.6 KB. Now it's 385 B. Many choose date-fns because it's lightweight and we have to keep it lean, so we removed the ability to pass strings. If you used ISO 8601 to keep dates, you'd have to parse them new parseISO function:

```js
// Before
addDays("2016-01-01", 1);

// Now
addDays(parseISO("2016-01-01"), 1);
```

Please help us to test this release and tell what you think! See the full change log: [https://git.io/fhZp5](https://git.io/fhZp5)

I with Lesha are going on vacation in Sri Lanka so you won't hear for us in the upcoming two weeks.
