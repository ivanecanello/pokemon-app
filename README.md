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
│   │   ├── models/          # TypeScript interfaces
│   │   ├── services/        # Business logic and data services
│   │   ├── pages/           # Page components
│   │   │   ├── landing/     # Main listing page
│   │   │   └── detail/      # Detail page
│   │   ├── app.routes.ts    # Route configuration
│   │   ├── app.component.ts # Root component
│   │   └── app.component.html
│   ├── main.ts              # Bootstrap file
│   ├── index.html           # HTML entry point
│   └── styles.css           # Global styles
├── package.json
├── tsconfig.json
└── angular.json
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
- Pokémon comparison feature
- Favorites/bookmark system
- Advanced filtering options
- Pokémon evolution chains
- Move information
- Ability details

## License

This project is open source and available under the MIT license.
