# Pokédex - Angular Application

A modern Angular application showcasing a Pokédex with filtering and detailed Pokémon information.

## Features

- **Pokémon Listing**: Browse all available Pokémon with beautiful cards
- **Advanced Filtering**: Filter Pokémon by type and search by name
- **Detailed View**: View complete Pokémon stats and information
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Best Practices**: Built with Angular best practices including:
  - Standalone components
  - Proper service architecture
  - Type-safe code with TypeScript
  - Reactive programming with RxJS
  - Smart routing configuration

## Project Structure

```
pokemon-app/
├── src/
│   ├── app/
│   │   ├── models/               # TypeScript interfaces
│   │   ├── services/             # Business logic and data services
│   │   ├── constants/            # App constants (mock data)
│   │   ├── pages/                # Page components
│   │   │   ├── landing/          # Main listing page (+ landing.component.spec.ts)
│   │   │   └── detail/           # Detail page (+ detail.component.spec.ts)
│   │   ├── components/           # Reusable UI components
│   │   ├── app.routes.ts         # Route configuration
│   │   ├── app.component.ts      # Root component
│   │   └── app.component.html
│   ├── test.ts                  # Angular test bootstrap (src/test.ts)
│   ├── main.ts                   # Bootstrap file
│   ├── index.html                # HTML entry point
│   └── styles.css                # Global styles
├── karma.conf.js                 # Karma test runner config
├── tsconfig.spec.json            # TypeScript config for tests
├── package.json
├── tsconfig.json
├── angular.json
└── README.md

Notes:
- Unit tests live alongside components/services in `.spec.ts` files (e.g. `src/app/services/pokemon.service.spec.ts`).
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Navigate to the project directory:
```bash
cd pokemon-app
```

2. Install dependencies:
```bash
npm install
```

### Running the Application

Start the development server:

```bash
npm start
```

The application will be available at `http://localhost:4200/`

### Running Tests

The project includes unit tests using Karma + Jasmine. I added the test bootstrap and configs so tests can be run locally.

- Install dependencies (if not already):
```bash
npm install
```
- Run the full test suite (headless):
```bash
npx ng test pokemon-app --watch=false
```
- Or use the npm script:
```bash
npm test
```

Notes:
- Tests run with `ChromeHeadless` via Karma. Config files added: `karma.conf.js`, `tsconfig.spec.json`, and `src/test.ts`.
- All tests pass locally (15/15) as of 2026-02-03.

### Building for Production

```bash
npm run build
```

The production-ready files will be in the `dist/` directory.

## Technology Stack

- **Angular 18**: Modern web framework
- **TypeScript**: Type-safe JavaScript
- **RxJS**: Reactive programming library
- **CSS3**: Styling and responsive design

## Features Implemented

### Landing Page
- Displays a grid of all Pokémon
- Filter by Pokémon type (Grass, Fire, Water, Electric, etc.)
- Search Pokémon by name
- Click any Pokémon card to view details

### Detail Page
- Full Pokémon information including:
  - Name, ID, and types
  - Physical characteristics (height, weight)
  - Detailed description
  - Complete stats (HP, Attack, Defense, Sp. Atk, Sp. Def, Speed)
  - Visual stat bars with color coding
  - Total stats calculation

## Mock Data

The application uses hardcoded Pokémon data to demonstrate functionality. The service structure allows for easy integration with a real backend API by replacing the hardcoded data with HTTP calls.

## Styling

- Modern gradient backgrounds
- Type-specific color badges
- Responsive grid layouts
- Interactive hover effects
- Loading states and animations

## Future Enhancements

- Integration with PokéAPI for real data
- Favorites/bookmark system
- Advanced filtering options
- Move information
- Ability details

## License

This project is open source and available under the MIT license.
