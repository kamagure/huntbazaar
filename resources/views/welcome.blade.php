<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <meta name="theme-color" content="#000000" />
        <link rel="shortcut icon" href="./assets/img/favicon.ico" />
        <link rel="apple-touch-icon" sizes="76x76" href="./img/apple-icon.png" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.3/Chart.min.css" />
        <link rel="stylesheet" href="{{ asset('vendor/@fontawesome/fontawesome-free/css/all.min.css') }}" />
        <link rel="stylesheet" href="{{ asset('css/app.css') }}" />
        <link rel="stylesheet" href="{{ asset('css/custom.css') }}">

        <title>{{ env('APP_NAME') }}</title>

    </head>
    <body>
       <div id="app"></div>
       <script src="{{asset('js/app.js')}}"></script>

       <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.3/Chart.min.js" charset="utf-8"></script>
       <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js" charset="utf-8"></script>
    </body>
</html>
