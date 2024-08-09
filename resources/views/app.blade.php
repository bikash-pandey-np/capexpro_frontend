<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>TheCapex.pro</title>
        <link rel="icon" type="image/x-icon" href="https://capex.com/assets/logo/favicon.ico" />

        @viteReactRefresh 
        @routes
        @vite(['resources/css/app.css', 'resources/js/app.jsx'])
        <!-- As you can see, we will use vite with jsx syntax for React-->
        @inertiaHead
    </head>
    <body>
        @inertia
    </body>
</html>