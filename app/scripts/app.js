/** @jsx React.DOM */

var React = window.React = require('react'),
    SearchApp = require("./components/searchApp"),
    mountNode = document.getElementById("app");


React.renderComponent(<SearchApp />, mountNode);