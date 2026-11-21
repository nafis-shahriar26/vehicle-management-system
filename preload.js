const { contextBridge } = require("electron");

contextBridge.exposeInMainWorld("rentalApp", {
  appName: "EasyRent Vehicle Rental"
});