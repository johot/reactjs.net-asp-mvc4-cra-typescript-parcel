# Servicer + Client side React components in Asp.NET MVC 4 using Create-React-App and Parcel

Getting started guide: https://reactjs.net/getting-started/aspnet.html

## Steps

### In MVC project:

1. Install `React.Web.Mvc4` from NuGet
   > The file: `App_Start\ReactConfig.cs` will be created.
2. Install `JavaScriptEngineSwitcher.V8`, `JavaScriptEngineSwitcher.V8.Native.win-x64` and `JavaScriptEngineSwitcher.V8.Native.win-x86` from NuGet
   > Note: The official guide doesn't mention x86 but I could not make it work without it, perhaps you need to install a C++ redistributable (it's mentioned when installing the x64 package)
3. Change `ReactConfig.cs` to include:

   ```cs
   ReactSiteConfiguration.Configuration
            .SetLoadReact(false) // This makes it so that ReactJS.net uses the bundles version of React which I determined was required to make hooks etc work (https://github.com/reactjs/React.NET/issues/718)
            .SetLoadBabel(false)
            .AddScriptWithoutTransform("~/Scripts/bundle.server.js");

    JsEngineSwitcher.Current.DefaultEngineName = V8JsEngine.EngineName;
    JsEngineSwitcher.Current.EngineFactories.AddV8();
   ```

4. In a view add:

   ```cs
   @Html.React("HelloWorld", new { message = "Hello from C#!" })
   ```

5. To enable client side interactions: In the view that contains the `<html>` etc tags (for example `_Layout.cshtml`) add the following

   1. In the `<head>` add: `<script src="@Url.Content("~/Scripts/bundle.server.js")"></script>`

   2. Just before `</body>` (end of document) add:

   ```cs
   @Html.ReactInitJavaScript()

   // Note: No need for the <scripts> tags since we include React, ReactDom etc in the bundle
   ```

### In the Create-React-App project:

1.  Install parcel globally `npm install -g parcel-bundler`
2.  Create a file called `server.ts`.
    It should add any component you want to use in MVC to the `global` object. Sample `server.ts`:

```ts
import React from "react";
import ReactDOM from "react-dom";
import ReactDOMServer from "react-dom/server";
import { HelloWorld } from "./HelloWorld";

// Needed when we want to bundle React ourselves, also make sure to use SetLoadReact(false) in the ReactConfig.cs file
(global as any).React = React;
(global as any).ReactDOM = ReactDOM;
(global as any).ReactDOMServer = ReactDOMServer;

// Components to expose
(global as any).HelloWorld = HelloWorld;
```

3.  Now create a bundle using parcel: `parcel build src/server.ts --out-file bundle.server.js`

    > Tip: Add to this `package.json` scripts: `"bl": "rm -rf dist && parcel build src/server.ts --out-file bundle.server.js"`.
    >
    > Now you can write `npm run bl` (build library)

4.  Copy `dist/bundle.server.js` to the `Scripts` folder in MVC project.

### Test

Run the MVC project, hopefully everything is working :)
