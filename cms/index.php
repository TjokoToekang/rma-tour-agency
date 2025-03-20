<!DOCTYPE html>
<html>

<head>
    <!-- Required meta tags-->
    <meta charset="utf-8">
    <meta name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no, viewport-fit=cover">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <!-- Color theme for statusbar (Android only) -->
    <meta name="theme-color" content="#345cb2">
    <!-- Your app title -->
    <title>RMA Tour Organizer</title>
    <link rel="shortcut icon" href="image/favicon.png" type="image/x-icon">
    <!-- Path to Framework7 Library Bundle CSS -->
    <link rel="stylesheet" href="css/framework7.css">
    <link rel="stylesheet" href="css/font-color.css">
    <link rel="stylesheet" href="css/default.css">
</head>

<body>
    <!-- App root element -->
    <div id="app">
        <!-- Your main view, should have "view-main" class -->
        <div class="view view-main">
            <!-- Initial Page, "data-name" contains page name -->
            <div data-name="home" class="page bg-color-white">
                <!-- Scrollable page content -->
                <div class="page-content">

                    <div class="navbar navbar-transparent" style="margin-top: 20px;">
                        <div class="navbar-bg"></div>
                        <div class="navbar-inner" style="padding: 0px 120px">
                            <div class="left text-color-white">
                                <img src="image/logo-orange.svg" alt="">
                            </div>
                            <div class="right text-color-black date-nav"></div>
                        </div>
                    </div>

                    <div class="form-dashboard">
                        <div style="margin-top: 150px; text-align: center;">
                            <div style="display: inline-block; text-align: left;">
                                <h2 class="font-plusjkt-semi color1">Welcome back 👋🏻</h2>
                                <p class="font-inter-regular" style="color: #666; margin-top: -7px">please login first
                                </p>
                                <p class="font-inter-regular" style="color: #979797; font-size: 13px; margin-top: 35px">
                                    Email</p>
                                <input id="input-email" class="input-forms font-plusjkt-medium" placeholder="type here"
                                    type="email" required />
                                <p class="font-inter-regular" style="color: #979797; font-size: 13px; margin-top: 35px">
                                    Password</p>
                                <input id="input-password" class="input-forms font-plusjkt-medium"
                                    placeholder="type here" type="password" required />
                            </div>
                            <center>
                                <a href="#" class="btn-circle text-color-white font-plusjkt-semi cont-dash bg-color1"
                                    style="margin-top: 50px;">Continue</a>
                            </center>
                        </div>
                    </div>

                    <div class="form-otp" style="display: none">
                        <div style="margin-top: 150px; text-align: center;">
                            <div style="display: inline-block; text-align: left;">
                                <a href="#" class="link back color1 form-back">
                                    <i class="icon icon-back"></i>
                                    <span>Back</span>
                                </a>
                                <h2 class="font-plusjkt-semi color1">Input OTP</h2>
                                <p class="font-inter-regular" style="color: #666; margin-top: -7px">check telegram for
                                    access code</p>

                                <p class="font-inter-regular" style="color: #979797; font-size: 13px; margin-top: 35px">
                                    Access Code</p>
                                <input id="input-otp" class="input-forms font-plusjkt-medium" placeholder="type here"
                                    type="text" required />
                            </div>
                            <center>
                                <a href="#" class="btn-circle text-color-white font-plusjkt-semi cont-otp bg-color1"
                                    style="margin-top: 50px;">Confirm</a>
                            </center>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
    <script type="text/javascript" src="js/jquery.min.js"></script>
    <!-- Path to Framework7 Library Bundle JS-->
    <script type="text/javascript" src="js/framework7.js"></script>
    <!-- Path to your app js-->
    <script type="text/javascript" src="js/app.js"></script>
    <script type="text/javascript" src="js/moment.js"></script>
    <script src="js/page-welcome.js"></script>
</body>

</html>