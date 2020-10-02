Dashup Module Form
&middot;
[![Latest Github release](https://img.shields.io/github/release/dashup/module-form.svg)](https://github.com/dashup/module-form/releases/latest)
=====

A connect interface for form on [dashup](https://dashup.io).

## Contents
* [Get Started](#get-started)
* [Connect interface](#connect)

## Get Started

This form connector adds forms functionality to Dashup forms:

```json
{
  "url" : "https://dashup.io",
  "key" : "[dashup module key here]"
}
```

To start the connection to dashup:

`npm run start`

## Deployment

1. `docker build -t dashup/module-form .`
2. `docker run -d -v /path/to/.dashup.json:/usr/src/module/.dashup.json dashup/module-form`