---
title: "Unicode tokens in date-fns v2"
description: ""
pubDate: "Oct 10 2018"
---

In this post, I tell about how and why we switched from Moment.js formatting tokens to [Unicode Technical Standard #35](https://unicode.org/reports/tr35/tr35-dates.html).

> date-fns v2 introduces many new features and breaking changes and this post is a part of a series where we describe in detail most notable ones.

When we worked on the format function, we mimicked Moment.js behavior that we thought would simplify the transition to date-fns. It also didn't make sense to reinvent the wheel, so we decided to stick to its selection of tokens.

In turned out that YYYY and DD (year and day) tokens are misused in Moment.js because [many other languages (Java, C#, Objective-C, etc.) use yyyy and dd for this purpose](https://github.com/date-fns/date-fns/issues/520).

In v2 we decided to improve on consistency and standardization. We worked hard to make date-fns behave like ECMAScript in edge cases and opted to use existing standards over common conventions. So it made sense to follow the proposed specifications from the Unicode Consortium.

Unfortunately, this change caused a flood of issues reporting misbehaving format and parse. Developers kept using YYYY and DD and getting confusing results. To solve this problem, we had to disable confusing tokens D, DD, YY and YYYY and throw an error:

```js
format(Date.now(), "YYYY-MM-DD");
//=> RangeError: `options.awareOfUnicodeTokens` must be set to `true` to use `YYYY` token; see: https://git.io/fxCyr
```

To enable those tokens, you should set the awareOfUnicodeTokens option:

```js
format(Date.now(), "YY-MM-dd", { awareOfUnicodeTokens: true });
//=> '86-04-04'
```

I hope in the future when and if developers get used to the standard we'll remove this option.

---

Happy coding time! Please [support us at Open Collective](https://opencollective.com/date-fns).
