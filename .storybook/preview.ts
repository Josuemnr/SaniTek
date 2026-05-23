/// <reference types="vite/client" />
import type { Preview } from '@storybook/react-vite'
import '../src/index.css'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: 'todo',
    },
    backgrounds: {
      default: 'light-gray',
      values: [
        { name: 'light-gray', value: '#f3f4f6' },
        { name: 'white',      value: '#ffffff' },
        { name: 'dark',       value: '#1f2937' },
      ],
    },
  },
};

export default preview;
