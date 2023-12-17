---
title: "date-fns v2 goals and values"
description: ""
pubDate: "Nov 15 2018"
---

One of the most important changes in v2 is the new API design. We carefully refined every function to make date-fns consistent, predictable and reliable. In this post, I tell about goals and values that helped us to design simple API that is pleasant to use.

> date-fns v2 introduces many new features and breaking changes and this post is a part of a series where we describe in detail most notable ones.

When we just started working on date-fns, our only goal was to build a library for working with dates in functional style. For years we were adding more and more functions, often copying and adapting Moment.js API without second look on it.

After a while, we realized that our API and behavior is not as consistent as we want them to be. Arguments in functions doing a similar job were not always in the same order and had a different naming scheme. Sometimes functions were throwing exceptions where they shouldn't and weren't throwing when they should. I'm not talking about coercion logic; it was behind even our understanding.

The need for changes was obvious, but first, we had to define goals and values, that would help us make decisions in ambiguous cases.

**Stick to JavaScript behavior whenever possible**. We want date-fns to be an extension of the language and its standard library but not a substitute. We believe that it will ensure a long life of the library in the rapidly changing ecosystem.

**Stick to existing standards**. Instead of reinventing the wheel and relying on our subjective opinion we decided to look for current standards and well-established practices. That will provide the best compatibility with other languages and save us from mistakes that others made years if not decades ago.

**Consistency**. We want date-fns to be as predictable and easy to understand as possible. Function names, the order of arguments and the behavior must be consistent across the whole library.

**Explicitness**. date-fns should prefer explicitness over implicitness. Sometimes the latter helps to make code look cleaner. You know that feeling when a library does what you wanted it to do without saying a word. But more often it causes bugs that are hard to debug or even worse to notice.

**Convenience**. We want date-fns to be pleasant to use. We should help developers to avoid mistakes.

---

In the next posts, I'll elaborate every point and tell more about the related changes in the API.
