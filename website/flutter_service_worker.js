'use strict';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "assets/2336.jpg": "7704004bdcb7b87f84ba6962c2a3a589",
"assets/AssetManifest.json": "f34b9caf23d3206e10f6a11c6c61e04b",
"assets/astore.png": "4d430867a9a2292c75240513c31c3dff",
"assets/codeNinja.jpg": "bc16c571ae4706b3b7549b3b7fa8bbd2",
"assets/codingRocket2.png": "44356756960785ee7aa6ce1e2d950290",
"assets/dartLogo.png": "a2292b8c9422d5be494e950cd0bb10c7",
"assets/fileStructure.png": "e466810164349e9fad6e666d9c2d9380",
"assets/flutterLogo.png": "c9ed69e2a222a5917d773b376c70366c",
"assets/FontManifest.json": "f7161631e25fbd47f3180eae84053a51",
"assets/fonts/MaterialIcons-Regular.ttf": "56d3ffdef7a25659eab6a68a3fbfaf16",
"assets/geibr.gif": "2407b512f6f2eec61cd2f3136242a025",
"assets/github.png": "89c2c0674bdba3d61daf6b1b1e5e82b5",
"assets/gplay.png": "14ed7874b63b0ba9734b47e7dd2f0ff2",
"assets/homePagePic.jpg": "308717db0dc2c89c874b6f374fa7c7b3",
"assets/kross.jpg": "8d87e028349ca4c91203c1df02532741",
"assets/LICENSE": "e3f4c2004a88324f34dc2f224cae8299",
"assets/load.gif": "ed23685339ada1b6d88008cbe1a11e98",
"assets/meeting.jpg": "b5b0366d0ab2b2c453fb5503caf72bd4",
"assets/myzipic.png": "4bc1ffb1bf841f88d81dc6b3866f7669",
"assets/nodetuts.png": "b1aa081aee3b8382c3a78deae3a49276",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "115e937bb829a890521f72d2e664b632",
"assets/packages/flutter_markdown/assets/logo.png": "67642a0b80f3d50277c44cde8f450e50",
"assets/programmer.jpeg": "5c6577d3b9ce0bdbf0ebce205beec847",
"assets/puzzle.jpg": "ea8e9032a2d15ab23fff8803600ac771",
"assets/secure.png": "e6d12775e9fc2e2e3c80ccd386ed9dd1",
"assets/spin.gif": "58e4a4e4fa041a11f796a2014b1bcfa4",
"assets/study_desk.jpg": "1917bccc1de0e7d5c33a867fb14c0900",
"assets/tch.png": "c46b94ce7d9dfe616e186e6b57f4d6f8",
"assets/twitter.png": "626225432d60cb081b98687d324e6736",
"assets/web/favicon.ico": "00f60d999e16e77adbffd7a2f74508ff",
"assets/web/index.html": "22642fabe28949d18988b9d963a4650e",
"/": "22642fabe28949d18988b9d963a4650e",
"assets/youtube.png": "fc36174c988eb3c628c7d4267d498efd",
"favicon.ico": "00f60d999e16e77adbffd7a2f74508ff",
"index.html": "22642fabe28949d18988b9d963a4650e",
"main.dart.js": "cbb40a8add33819779c3fdda5a4e13b0"
};

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheName) {
      return caches.delete(cacheName);
    }).then(function (_) {
      return caches.open(CACHE_NAME);
    }).then(function (cache) {
      return cache.addAll(Object.keys(RESOURCES));
    })
  );
});

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request)
      .then(function (response) {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});
