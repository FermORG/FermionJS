<p align='center'><img height ='100' width='283' src="https://github.com/FermORG/fermorg.github.io/blob/master/assets/images/logo1.png?raw=true" /></p>

<p align='center'>
<img src="https://travis-ci.org/FermORG/FermionJS.svg?branch=master" alt="Build Status" /></a>
<a href="https://travis-ci.org/FermORG/FermionJS">
</p>

# Demo

[demo page](https://fermorg.github.io/fermion/)

# Features

## Manipulation

Fermion is all about ease of use and speed. Drag and drop, resize, and nest your components to prototype your app layout.

<img src="https://raw.githubusercontent.com/FermORG/fermorg.github.io/master/assets/images/manipulation.gif" alt="Fermion Manipulation" />

## Configuration

Configure your components in real-time. Fermion allows you to apply style and add event-handling to your components.

<img src="https://github.com/FermORG/fermorg.github.io/blob/master/assets/images/config.gif?raw=true" alt="Fermion Manipulation" />

## Preview

Fermion leverages webpack to create a live preview of your new prototype. Simply export your project and our simulator will display how your project will look in the browser.

## Exporting

Once you are done prototyping, the real fun begins! Fermion exports your prototype along with all of your configurations as working code so that you can continue to refine your project in the setting of your choice.

## Setup and Run!

```
npm install
npm run dev
```

for yarn users

```
yarn install
yarn dev
```

# How To Use

## Adding Methods

Methods can be added to your prototype using the built in Code Editor. Simply open it up, and begin typing. The Exporter will assume that all of these methods should be attached to the parent component (‘App.js’), and will include them there. It will automatically bind ‘this’ in the constructor, and it will pass that down the props chain to any components that include it in an event handler.

Fermion takes [method definitions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Method_definitions) written in ES6 syntax, and you must following the closing bracket with an ‘@’ character to mark the end of a method.

<img src="https://github.com/FermORG/fermorg.github.io/blob/master/assets/images/methods.png?raw=true" alt="Adding Methods in FermionJS">

## Event Handlers

Event handlers are appended to components by selecting a component, and then opening the ‘Events’ Tab. Enter the Handler’s name in the input box, which should be a valid React Event Handler (e.g. ‘onClick’, ‘onChange’). Then, when the event appears below, simply add your logic to the input on its right (defaults to ‘null’). You may write out a unique function, or add a callback pointing to a method, as shown before. Fermion will automatically detect the method in your callback, and lift it up through the properties chain. No need to worry about passing it down yourself!

<img src="https://github.com/FermORG/fermorg.github.io/blob/master/assets/images/events.png?raw=true" alt="Adding Event Handlers in FermionJS" />

## Adding Props

Props can be added in a similar manner to events. Simply insert them on the props tab, and fermion will lift them up to state when you export your code, and update the props chain accordingly. Apply Props directly to the component that needs them, and Fermion will take care of the rest.

## Adding State

State is applied to App.js, and commingled with any added Props when you export your code. Note that this means that any Props values that share the same key as a State value will overwrite the value in State, as Fermion will decide they are the same and will prefer lifted values to values added directly to State.

# Testing

to run tests

```
npm run test
```

to run tests and generate a code coverage report.

```
npm run test-jest
```
