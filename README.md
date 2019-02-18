# offline-first-outgoing

## Running the project

It is needed to run the production build in order to thest the PWA capabilities

```
npm run build
npm start
```

1. Open Network tab at Chrome Dev Tools
1. Click on *Create Gist* button
1. Notice that service respond with 401 and a popup is displayed
1. Disconnect the LAN cable or disable your network
1. Notice that the green indicator turned red to let know that app is on offline mode
1. Click on *Create Gist* button
1. Notice there are an error response
1. Connecet LAN cable or enable network
1. Notice that the failed request will redo
1. Notice that the green indicator turned green to let know that app is on online mode
1. Notice that service respond with 401 and a popup is displayed

## References

- https://www.blog.plint-sites.nl/progressive-web-app-using-vue-cli-3/
- https://developers.google.com/web/tools/workbox/modules/workbox-background-sync
- https://github.com/GoogleChrome/workbox/issues/1637
