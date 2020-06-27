---
title: Introduction
description: Explains the library and introduces its main features.
meta:
  - name: keywords
    content: vue values vue-values wrapper component store stored synchronized persist persistence introduction
---

# Introduction

## _Value components_
**Vue-values** is a library —clearly influenced by [react-values](https://github.com/ianstormtaylor/react-values)— that allows you to manage simple state values directly within your template without any other scaffolding. That’s perfect for toggles, modals, tooltips, lists, etc. In addition, it provides a simple way to interconnect different _“stored values”_ to keep them synchronized along your whole app but uncoupled.

In short, any _Value component_ handles its own value —you only need to declare its _initial/default_ value— and exposes its current value together with some helper functions to mutate it:
- `value`
- `set(newValue)`
- `clear()`: sets the value to the corresponding “empty value” (_undefined, {}, [], new Set() or new Map()_)
- `reset()`: resets the value to its corresponding _initial/default_ value.

There are the following Value components with some of their corresponding helper functions:
- `Value`
- `BooleanValue`: toggle.
- `NumberValue`: increment, decrement.
- `StringValue`: append, prepend, replace, substring...
- `ArrayValue`: append, prepend, remove, splice, reverse, sort...
- `SetValue`: add, remove, toggle.
- `ObjectValue`: add, remove.
- `MapValue`: add, remove.

::: tip Note
It’s important to mention that every helper function guarantees the correct reactivity of the _Value component_ itself. That means all of them will set the inner “data” value with a new derived one —and then they never mutate directly the current value—. As an example, the `ArrayValue`’s reverse function generates a reversed copy of the original one and set the current value with it. So you can use any helper function without worry about reactivity issues.

That’s the reason almost every helper is a function to mutate the value.
:::

## _Stored_ and synchronized values

As it’s mentioned at the beginning, you can keep _Value components_ synchronized with the same common value and even can easily persist them. That is done with the companion _StoredValue components_. Each _Value component_ has its own equivalent `StoredValue` (you just add the _“Stored”_ prefix). They behave exactly the same (same props, scoped props and events), but they require a `uid` —unique identifier— to identify them.

## Is this library a substitute of Vuex?
No way! **_Vuex_** is extremely more powerful, well known and robust. The objective of _Vue Values_ is simply to experiment different ways to manage simple values when using _Vuex_ is not necessary.

## Then, when should I use it?
Well... there are some common circumstances this library can help you:
- When you need a simple auxiliary value within your template (for modals, toggles, tooltips, counters, paginators...).
- When you need some simple auxiliar value that is present in multiple points of your app. Then it can be useful to keep everything simple and uncoupled but synchronized and even persisted.
