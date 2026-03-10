---
title: Settings
description: Configuration options available in the ÆRIS simulator.
---

# Settings

The settings panel allows users to configure various aspects of the simulator environment.  
These options control editor behavior, display preferences, and execution settings.

Settings are applied immediately and are typically stored locally in the browser so that they persist across sessions.

---

## Editor Settings

These settings affect how the code editor behaves.

### Tab Size

Controls how many spaces are inserted when the Tab key is pressed.

Common values include:

- 2 spaces
- 4 spaces
- 8 spaces

Changing the tab size affects indentation but does not modify the program semantics.

### Word Wrap

When enabled, long lines of code wrap within the editor instead of extending horizontally.

This can make code easier to read on smaller screens.

### Auto Save

When auto save is enabled, the contents of the editor are stored automatically in the browser.

If the page is refreshed or reopened, the last program written in the editor is restored.

---

## Simulator Settings

These options control how the simulated processor executes programs.

### Execution Speed

Controls how quickly instructions execute when the program is running continuously.

Lower speeds allow users to observe changes more clearly, while higher speeds allow programs to complete faster.

### Step Mode

Step execution allows the user to run programs one instruction at a time.

This mode is useful when studying how individual instructions affect registers and memory.

---

## Display Settings

Display settings affect how information is shown in the simulator interface.

### Theme

The simulator may provide different visual themes such as:

- light theme
- dark theme

Changing the theme affects only the appearance of the interface.

### Numeric Display

Values shown in registers and memory may be displayed in different formats such as:

- hexadecimal
- decimal

This allows users to inspect program state using the representation they prefer.

---

## Persistence

Most settings are stored locally in the browser.

This means:

- preferences remain after refreshing the page
- settings persist across browser sessions
- no external configuration files are required

If the browser storage is cleared, the simulator will return to its default configuration.
