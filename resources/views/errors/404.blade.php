<!DOCTYPE html>
<html class="h-full bg-gray-100">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>TheCapex.pro</title>
        <link rel="icon" type="image/x-icon" href="https://capex.com/assets/logo/favicon.ico" />

        @viteReactRefresh 
        @routes
        @vite(['resources/css/app.css', 'resources/js/app.jsx'])
        <!-- As you can see, we will use vite with jsx syntax for React-->
    </head>
    <body class="h-full flex items-center justify-center bg-gray-200">
        <div class="text-center p-4 rounded-lg shadow-lg bg-white max-w-sm p-8">
            <h1 class="text-2xl font-bold text-gray-800">404 - Page Not Found</h1>
            <p class="mt-4 mb-4 text-gray-600">Oops! The page you are looking for does not exist.</p>
            <a href="{{ route('homepage') }}" class="mt-4 inline-block bg-blue-500 text-white text-sm py-2 px-4 rounded hover:bg-blue-600 transition duration-300">Go Home</a>
        </div>
    </body>
</html>