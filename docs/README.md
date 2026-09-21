# Creating a Flutter Contact List App

Project developed during the Santander Bootcamp 2023 - Mobile with Flutter, under the guidance of [Danilo Perez](https://github.com).

This project implements a contact list application that serves as a web prototype/container designed to simulate and map the requirements of a Flutter mobile application integrated with Back4App.

## Challenge Checklist

- Create a Flutter application layout / workflow.
- Structure database modeling (Back4App architecture).
- Implement contact registration with a profile photo.
- Save image paths/references for optimized data transfer.
- Display a list of people with their respective photos.

## Features

- **Multi-language UI**: Support for English (en-US), Portuguese (pt-BR), and Spanish (es-ES) with runtime switching.
- **Dark-First Theme**: Modern dark theme by default with a quick toggle (moon/sun icon).
- **Contact Management**: Add contacts with names, phones, and profile photos (stored as Data URLs), with single delete or clear-all options.
- **Search Filter**: Real-time filtering by name or phone number.
- **Accessibility**: Semantic layout, ARIA attributes, keyboard navigation, and live region feedback.
- **Responsive Layout**: Fluid UI optimized for mobile viewports, tablets, and desktop.

## Tech Stack

### Core Architecture
- **Dart / Flutter (Concept)**: UI workflow modeling, state management logic, and Back4App database design.
- **AI Assistive Tech**: Simulated assistance for smart contextual suggestions and accessibility UX improvements.

### Web Delivery & Mock Interface
- **HTML5**: Semantic markup, accessible controls, and ARIA integration.
- **CSS3**: Core variables for dark/light themes, responsive layout, and focus states.
- **JavaScript**: Core logic for contact filtering, i18n translation engine, and local state management.

## How to Run

1. Open `index.html` directly in any modern browser.
2. *(Optional)* For a better development experience, spin up a local static server:

```bash
# Using Python 3
python -m http.server 8000
# Then navigate to http://localhost:8000
```

## Data Persistence & Notes

- **Storage**: Contacts and profile images (as Data URLs) are saved locally in `localStorage` under the key `contacts_v1` for demo purposes.
- **Production Scaling**: In a production environment, local storage should be replaced by remote cloud storage (like Back4App/Parse Server) to handle cross-device synchronization and large image assets.

## Accessibility Details

- Visible focus outlines on all interactive elements for keyboard-only navigation.
- `aria-live` regions to announce dynamic list updates and feedback to screen readers.

## Future Improvements

- Connect the interface to a live Back4App/Parse Server backend.
- Add contact editing functionality and input field validation.
- Implement virtualized lists or pagination for handling large datasets.

![Contact List Preview](assets/Contact_List.png)

[LICENSE](./LICENSE)
