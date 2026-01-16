# github-calendar

A Vue 3 custom element that renders a GitHub-style contributions calendar.

- Built as a web component so it can be used in any framework or plain HTML.
- Inspired by [react-github-calendar](https://github.com/grubersjoe/react-github-calendar)

## Install

```bash
# npm
npm install github-calendar

# yarn
yarn add github-calendar

# pnpm
pnpm add github-calendar
```

## Usage

### Register the custom element

```ts
import { defineGitHubCalendar } from 'github-calendar';

defineGitHubCalendar();
```

This registers `<github-calendar>`.

### Basic HTML

```html
<github-calendar username="michaelcozzolino" 
                 from="2025"
/>
```

### Set the date range

The `from` prop accepts either a year (`number`) or a `Date` object:

- If `from` is a year, the calendar shows January 1st to December 31st of that year.
- If `from` is a `Date`, the calendar shows a full year starting from that date.

### Vue usage

Tell Vue to treat `github-calendar` as a custom element by configuring it in `vite.config.ts`:

```ts
// vite.config.ts
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag === 'github-calendar',
        },
      },
    }),
  ],
});
```

Then register the element once at startup:

```ts
// main.ts
import { createApp } from 'vue';
import App from './App.vue';
import { defineGitHubCalendar } from 'github-calendar';

defineGitHubCalendar();

createApp(App).mount('#app');
```

## API

### Props

- `username` (string, required): GitHub username.
- `from` (number | Date, required): Start of the one-year range.
