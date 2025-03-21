[![CI](https://github.com/morewings/react-library-template/actions/workflows/merge-jobs.yml/badge.svg)](https://github.com/MuhammadHadiofficial/aweber_assessment/actions/workflows/merge-jobs.yml)
[![Storybook deploy](https://github.com/morewings/react-library-template/actions/workflows/pages.yml/badge.svg)](https://github.com/MuhammadHadiofficial/aweber_assessment/actions/workflows/pages.yml)

# AWeber Password Validation Assessment

## Features

- Supports **Typescript** and **Javascript**.
- Bundles `commonjs` and `es` module formats.
- [pnpm](https://pnpm.io/) for blazing fast package management.
- [Vite](https://vitejs.dev/) for speedy bundling
- [Husky](https://github.com/typicode/husky) for git hooks.
- [Eslint](https://eslint.org/) and [stylelint](https://stylelint.io/).
- [Rollup](https://rollupjs.org/guide/en/) for bundling.
- [Jest](https://jestjs.io/) and [react-testing-library](https://testing-library.com/docs/react-testing-library/intro) for testing.
- [Storybook](https://storybook.js.org/) for documentation and demo.
- Optional [Tailwind CSS](https://tailwindcss.com/) support.

## Quickstart

### Prerequisites

1. Install **Node** >= 20.x.
2. Install **pnpm**. E.g. `corepack prepare pnpm@latest --activate`.


### Installation

Manually clone repo or use `degit`.

```shell script
# With CSS Modules config
git clone git@github.com:MuhammadHadiofficial/aweber_assessment.git
cd ./my-library
pnpm i
```

DEV SERVER
```
pnpm run dev

```
Storybook

```
pnpm run start:docs
```
T


## Implementation Thought Process
![image](https://github.com/user-attachments/assets/5adf8026-8fa6-4fc5-982b-0a5a0fddecda)

- I followed how Formik handles forms
- Created a context shared between form components
- Track states, like touched, blur, changed etc.
- Validation rules and error messages are pluggable during initialization
- A validation summary component is added
- There are 4 Examples in this project
  -  Example 1: Ready to use single PasswordForm container plug it in your existing form and pass a callback to extract password and password validation state to integrate with existing external form
  -  Example 2: Password form with seperate password and confirm password input, it shows how each component alone can be utilized, we offer other components like **validation summary, submit button, Requirements, and password strength meter**
  - Example 3: Shows Live validation meaning as you type it validates password. Showing how flexible our library is to use
  - Example 4: We show a full form example showing how our password validation form library can be integrated with any form component or library flexibly. WE show a customer signup form with name, email and password component.
