# Creating a Flutter Contact List App

Project developed at Santander Bootcamp 2023 - Mobile with Flutter, under the guidance of specialist [Danilo Perez](https://github.com/perez-danilo "Danilo Perez").

The goal of the challenge is to leverage external packages to enhance Flutter applications by building a contact list app that displays contact information - including photos - in a list format.

**Challenge Checklist**:

- Create a Flutter application.
- Create a database / Back4App.
- Implement user registration with a profile photo.
- Save only the image path to the database.
- Display a list of people with their respective photos.
- Use other components learned.

## Features

- **Dark-first theme** with toggle (moon / sun icon)
- **Multilanguage UI**: `en-US` (default), `pt-BR`, `es-ES`
- **Add contact** with name, phone, and optional profile photo (stored as Data URL)
- **Search** contacts by name or phone
- **Delete single contact** or **clear all**
- **Semantic HTML** and ARIA attributes for accessibility
- **Responsive layout** for desktop, tablet, and mobile

## Tecnologies used

- **Dart (Flutter)**: build the mobile application UI, manage state, and integrate with Back4App for data persistence.
- **AI (Assistive)**: provide development assistance, intelligent suggestions, and accessibility improvements during the project.

## Additional technologies

- **HTML**: main markup (semantic and accessible)
- **CSS**: theme variables, responsive layout, focus states
- **JavaScript**: logic for contacts, i18n, theme, and storage

## How to run

1. Open `index.html` in your browser (no server required).
2. For development, you can use a simple static server (optional):

```bash
# using Python 3
python -m http.server 8000
# then open http://localhost:8000
```

![Contact List](assets/Contact_List.png)

## Accessibility notes

- All interactive controls have keyboard focus styles.
- Form fields include labels and ``aria-*`` attributes where appropriate.
- Live regions (``aria-live``) announce feedback and list updates to assistive technologies.
- Color contrast is considered for dark-first design; test with your target audience and tools.

## Data persistence

Contacts are saved in ``localStorage`` under the key ``contacts_v1``. Images are stored as Data URLs in the same storage. This is convenient for a demo but not suitable for large-scale or cross-device sync.

## Improvements you can add

- Upload images to a remote storage and save URLs for cross-device access.
- Add edit contact functionality and validation improvements.
- Add pagination or virtualized list for large contact sets.
- Add export/import (JSON) for backup and restore.
- Add unit tests and automated accessibility checks.

[LICENSE](./LICENSE)
