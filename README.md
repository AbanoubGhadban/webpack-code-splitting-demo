# Webpack Code Splitting Demo

This project demonstrates how Webpack's code splitting capabilities allow JavaScript bundles to be safely loaded in any order and in an asynchronous manner without race conditions or dependency issues.

## Project Structure

```
webpack-code-splitting-demo/
├── src/
│   ├── index.js       # Main entry point
│   ├── moduleA.js     # Feature module A
│   └── moduleB.js     # Feature module B
├── index.html         # HTML entry point with dynamic loading buttons
├── webpack.config.js  # Webpack configuration with code splitting
├── package.json       # Project dependencies
└── .gitignore         # Git ignore file
```

## How It Works

1. The application is split into three main parts:
   - Main entry file (`index.js`)
   - Module A (`moduleA.js`)
   - Module B (`moduleB.js`)

2. Webpack's `splitChunks` optimization is configured to create separate bundles for each module.

3. The HTML page includes buttons to dynamically load each module by adding script tags to the page.

4. When a module is loaded:
   - Webpack's runtime keeps track of which modules are loaded
   - A module will not execute until all of its dependencies are loaded
   - This prevents race conditions and ensures proper execution order regardless of loading sequence

## Technical Implementation

The webpack configuration uses the `splitChunks` optimization with custom `cacheGroups` to explicitly define which modules should be separated into their own chunks:

```javascript
optimization: {
  splitChunks: {
    chunks: 'all',
    minSize: 1,
    cacheGroups: {
      moduleA: {
        test: /[\\/]src[\\/]moduleA\.js/,
        name: 'moduleA',
        chunks: 'all',
      },
      moduleB: {
        test: /[\\/]src[\\/]moduleB\.js/,
        name: 'moduleB',
        chunks: 'all',
      },
    },
  },
},
```

The HTML file includes a simple script that dynamically loads the bundles when buttons are clicked:

```javascript
function loadModule(moduleName) {
  const script = document.createElement('script');
  script.src = `dist/${moduleName}.bundle.js`;
  script.async = true;
  document.head.appendChild(script);
}
```

## Running the Demo

> [!Note]  
> The JavaScript bundles are already pre-built in the `dist` directory, so you can run **Live Server** directly without additional setup. However, if you plan to modify the code and rebuild the bundles, follow the steps below.

1. Install dependencies:
   ```
   npm install
   ```

2. Build the project:
   ```
   npm run build
   ```

3. Start the development server:
   ```
   npm start
   ```

4. Open your browser and click the different buttons to load modules in any order.

## Testing the Dependency Behavior

You can observe how Webpack handles dependencies by trying the following:

1. Notice that `index.js` (main bundle) depends on both `moduleA` and `moduleB` to work properly.

2. Click the "Load Main" button first - you'll notice that no code executes yet, even though the script is loaded.

3. Then click "Load Module A" and "Load Module B" buttons - only after all three modules are loaded will the code in the main bundle execute.

4. Try loading the modules in different orders (e.g., Module B → Module A → Main, or Module A → Module B → Main) - you'll see that regardless of the loading sequence, the code will only execute after all required dependencies are available.

This demonstrates that Webpack's runtime doesn't immediately execute a module when loaded. Instead, it waits until all dependencies of a module are loaded before executing it, preventing any race conditions or dependency issues.

## Key Takeaways

- Webpack handles dependencies between chunks automatically
- Modules can be loaded in any order and in an asynchronous manner without causing errors
- A module will not execute until all of its dependencies are loaded
