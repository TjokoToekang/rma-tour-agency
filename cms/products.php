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
                                <div class="grid grid-cols-3 grid-gap">
                                    <div style="margin-right: 10px">
                                        <a href="dashboard.php"
                                            class="external font-plusjkt-semi color-text">Dashboard</a>
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



                    <center>
                        <br>
                        <h1 class="color1 font-plusjkt-bold">Product</h1>
                        <h3 class="font-inter-regular" style="color: #666666; margin-top: -10px">view product list
                        </h3>

                        <div class="toolbar toolbar-bottom tabbar no-outline"
                            style="width: 480px; border-radius: 100px; margin-top: 30px">
                            <div class="toolbar-inner">
                                <a href="#tab-1" class="tab-link tab-link-active font-plusjkt-medium">Tour Packages</a>
                                <a href="#tab-2" class="tab-link font-plusjkt-medium">Visa Product</a>
                            </div>
                        </div>

                        <div class="tabs-animated-wrap">
                            <div class="tabs tabs-top">
                                <div id="tab-1" class="page-content tab tab-active">
                                    <div class="bg-order" style="margin-top: 0px">
                                        <div style="display: flex; justify-content: space-between;">
                                            <div style="padding: 20px 40px">
                                                <h3 style="font-size: 18px; margin-top: 11px"
                                                    class="color1 font-plusjkt-semi">Total
                                                    Products</h3>
                                                <p style="margin-top: -10px; font-size: 12px; color: #666666"
                                                    class="font-plusjkt-regular"><b class="tproduct"></b>
                                                    item
                                                </p>
                                            </div>
                                            <a href="add-product.php"
                                                style="margin: 32px 30px; width: 150px; height: 20px; padding: 9px"
                                                class="btn-addprd external font-plusjkt-semi">Add Product</a>
                                        </div>

                                        <div class="table-container">
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <th class="font-plusjkt-semi">#</th>
                                                        <th class="font-plusjkt-semi">Name</th>
                                                        <th class="font-plusjkt-semi">Price</th>
                                                        <th class="font-plusjkt-semi">Is Popular</th>
                                                        <th class="font-plusjkt-semi">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody id="listProduct">

                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                <div id="tab-2" class="page-content tab">
                                    <div class="bg-order" style="margin-top: 0px">
                                        <div style="display: flex; justify-content: space-between;">
                                            <div style="padding: 20px 40px">
                                                <h3 style="font-size: 18px; margin-top: 11px"
                                                    class="color1 font-plusjkt-semi">Total
                                                    Products</h3>
                                                <p style="margin-top: -10px; font-size: 12px; color: #666666"
                                                    class="font-plusjkt-regular"><b class="tproduct-visa"></b>
                                                    item
                                                </p>
                                            </div>
                                            <a href="add-product.php"
                                                style="margin: 32px 30px; width: 150px; height: 20px; padding: 9px"
                                                class="btn-addprd external font-plusjkt-semi">Add Product</a>
                                        </div>

                                        <div class="table-container">
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <th class="font-plusjkt-semi">#</th>
                                                        <th class="font-plusjkt-semi">Country</th>
                                                        <th class="font-plusjkt-semi">Visa Type</th>
                                                        <th class="font-plusjkt-semi">Entry</th>
                                                        <th class="font-plusjkt-semi">Price</th>
                                                        <th class="font-plusjkt-semi">Remarks</th>
                                                        <th class="font-plusjkt-semi">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody id="listVisa">

                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </center>

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
    <script src="js/page-produk.js"></script>
    <script src="js/page-visa.js"></script>
</body>

</html>