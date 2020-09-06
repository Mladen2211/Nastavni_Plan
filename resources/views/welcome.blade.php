<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Laravel</title>

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet">
        <link href="/css/app.css" rel="stylesheet">

        <!-- Vue import -->


    </head>
    <body>
        <div id="app">
            <app-main></app-main>
        </div>
    <script src="{{mix('/js/app.js')}}"></script>
    </body>

</html>
