var app = new Framework7({
  // App root element
  el: "#app",
  // App Name
  name: "RMA Tour Organizer",
  // App id
  id: "com.rma.tour",
  theme: "ios",
  // iosTranslucentBars: false,
  // Enable swipe panel
  panel: {
    swipe: true,
  },
  // ... other parameters
});

var mainView = app.views.create(".view-main");
