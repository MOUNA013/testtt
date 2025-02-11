<!DOCTYPE html>
<html>
<head>
    <title>{{ $message}}</title>
    <!-- Bootstrap css -->
    <link href="../../assets/plugins/bootstrap/css/bootstrap.css" rel="stylesheet" />

    <!-- Style css -->
    <link href="../../assets/css/style.css?v=1.2" rel="stylesheet" />

    <!-- Font-awesome  css -->
    <link href="../../assets/css/icons.css" rel="stylesheet" />

    <!-- Color Skin css -->
    <link id="theme" rel="stylesheet" type="text/css" media="all" href="../../assets/color-skins/color.css" />

    <!-- Custom css -->
    <link href="../../assets/css/admin-custom.css" rel="stylesheet" />
    <style>
        body {
            font-family: Arial, sans-serif;
            text-align: center;
            padding: 40px;
            background: #f7f7f7;
            height: 90vh;
            display: flex;
            justify-content: center;
            align-items: center;
            overflow: hidden;
        }
        .error-container {
            max-width: 600px;
            margin: 0 auto;
            background: white;
            padding: 40px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        p {
            color: #666;
            line-height: 1.6;
        }

        .error-container a {
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <div class="error-container">
        <div class="d-flex flex-row gap-2 justify-content-between align-items-center">
            <img src="../../assets/images/brand/logo.svg" class="mx-auto" alt="YOOL EDUCATION" style="width: 150px; margin-bottom: 30px;">
            {{-- <h1>YOOL EDUCATION</h1> --}}
        </div>
        <p>{{ $message}}</p>
        <p>Veuillez vérifier et essayer quand la session est disponible</p>
        <a href="{{ url('/') }}">Retour à l'accueil</a>
    </div>
</body>
</html>