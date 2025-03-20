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
    <link rel="stylesheet" href="css/page-products.css">
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

                    <div class="navbar no-outline" style="height: 85px; border-bottom: 1px solid #F0F0F0">
                        <div class="navbar-bg bg-color-white"></div>
                        <div class="navbar-inner" style="padding: 0px 30px">
                            <div class="left">
                                <img src="image/logo-orange.svg" alt="">
                            </div>
                            <div class="title">
                                <div class="grid grid-cols-4 grid-gap">
                                    <div style="margin-right: 10px">
                                        <a href="dashboard.php"
                                            class="external font-plusjkt-semi color-text">Dashboard</a>
                                    </div>
                                    <div style="margin-right: 10px">
                                        <a href="orders.php" class="external font-plusjkt-semi color-text">Orders</a>
                                    </div>
                                    <div style="margin-right: 10px">
                                        <a href="products.php"
                                            class="external font-plusjkt-semi nav-active text-color-black">Products</a>
                                    </div>
                                    <div style="margin-right: 10px">
                                        <a href="newsletter.php"
                                            class="external font-plusjkt-semi color-text">Newsletter</a>
                                    </div>
                                </div>
                            </div>
                            <div class="right">
                                <a href="#" class="link btn-logout" data-popover=".popover-dashboard">
                                    <img src="image/btn-settings.svg" width="140" alt="">
                                </a>
                            </div>
                        </div>
                    </div>

                    <div style="padding: 50px 120px">

                        <div class="grid grid-cols-2">
                            <div>
                                <a href="products.php" class="link back color1 external">
                                    <i class="icon icon-back"></i>
                                    <span>Back</span>
                                </a>

                                <h1 class="color1 font-plusjkt-bold">Edit Product</h1>
                                <h3 class="font-inter-regular" style="color: #666666; margin-top: -10px">please fill out
                                    the
                                    form below to continue.
                                </h3>

                                <p class="font-inter-regular" style="color: #979797; font-size: 13px; margin-top: 35px">
                                    Product Type</p>

                                <div class="dropdown-wrapper disabled">
                                    <select placeholder="Please choose..." class="dropdown-forms dropdown-type">
                                        <option value="visa" selected>Visa</option>
                                    </select>
                                    <div class="dropdown-icon"></div>
                                </div>

                                <div class="form-visa">
                                    <p class="font-inter-regular"
                                        style="color: #979797; font-size: 13px; margin-top: 35px">
                                        Country</p>
                                    <input id="input-country" class="input-forms font-plusjkt-medium"
                                        placeholder="type here" type="text" required />

                                    <p class="font-inter-regular"
                                        style="color: #979797; font-size: 13px; margin-top: 35px">
                                        Visa Type</p>
                                    <input id="input-vtype" class="input-forms font-plusjkt-medium"
                                        placeholder="type here" type="text" required />
                                </div>



                            </div>
                            <div style="margin-top: -15px">

                                <div class="form-visa">
                                    <p class="font-inter-medium"
                                        style="color: #979797; font-size: 13px; margin-top: 35px">
                                        Entry</p>
                                    <input id="input-entry" class="input-forms font-plusjkt-medium"
                                        placeholder="type here" type="text" required />

                                    <p class="font-inter-medium"
                                        style="color: #979797; font-size: 13px; margin-top: 35px">
                                        Price</p>
                                    <input id="input-vprice" class="input-forms font-plusjkt-medium"
                                        placeholder="type here" type="text" required />

                                    <p class="font-inter-medium"
                                        style="color: #979797; font-size: 13px; margin-top: 35px">
                                        Remarks</p>
                                    <input id="input-remarks" class="input-forms font-plusjkt-medium"
                                        placeholder="type here" type="text" required />

                                    <a href="#" style="margin-top: 35px"
                                        class="btn-circle bg-color1 text-color-white font-plusjkt-semi submit-visa">Submit
                                        Product</a>
                                </div>

                            </div>
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
    <script src="js/check-token.js"></script>
    <script src="js/edit-product-visa.js"></script>

</body>

</html>