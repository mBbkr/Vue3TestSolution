--------- MEHDI BOUBAKER - TEST SOLUTION ----------

---- INSTALL & RUN ----

1- npm install
2- npm run dev

3- npx cypress open
4- npx jest

----- HOW I DID IT -----

-- Problem Analysis & Strategy --

Having already dealt with HTML inputs for other projects in Vue 2, 3, and Nuxt, I know that handling them as-is for this kind of processing is extremely complicated. The trick is not to use them and set up a workaround using a "fake input". Here, I'm using a span with contenteditable.
As for the rest, I first analyzed the available package.json. 
I didn't see Jest or Cypress and add them to be production ready with units and integrations tests.
I designed a flexible, reactive, and reusable component.

-- My Environment --
Windows 11 / VS Code + Vue 3 plugins / Brave Browser. Also tested on Edge.

-- Challenges --

a- Cursor Management:
When using a contenteditable and performing processing operations with each input, precise cursor management is necessary. In my component, you can navigate the input as you like and add entries wherever and whenever you want (mouse navigation, arrow navigation, simple input, fast input, batch input via copy/paste, etc.). I addressed each of these challenges.

b- Fast Text Entry with the "Debounce" Function:
WARNING: The following method is optional and managed by the "useDebounce" attribute sent to the component and modifiable from App.vue. Simply set it to false to disable it and have correct display with normal speed text input. True by default.
Since there is processing with each input, entering values into the input very (very) quickly can generate cursor management errors. To address this (minimal but still present) issue, I implemented a debounce function to slightly slow down processing. However, the side effect is that if you type forbidden characters, you will see them briefly (125ms). But there will hardly ever be processing errors with this method. Remove this feature using the useDebounce attribute, and the visual effect will be better.

-- Implementation of Key Features --

a- Input Validation: I used regular expressions to validate user input. The first regex /[^\d]|^0+/gu filters non-numeric characters and removes insignificant zeros at the beginning of the string. The second regex /\B(?=(\d{3})+(?!\d))/gu adds a space between every group of three digits.

b- Dynamic Width Adaptation: The width of the input field is dynamically adjusted in real-time based on the length of the input content in CSS using Tailwind and the use of a span.

c- Reusability: The component was designed to be reusable in different parts of the application, making integration and future evolution easier.

-- Realization --

a- Time Spent: 4 hours on the topic, mainly due to challenges related to cursor management to achieve something conclusive regardless of the problem.

b- AI: Yes, only for regex :)
