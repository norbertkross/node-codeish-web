'use strict';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "assets/2336.jpg": "204cf3b90c271a18575a81f69ce0f4fa",
"assets/AssetManifest.json": "f34b9caf23d3206e10f6a11c6c61e04b",
"assets/astore.png": "9fef0094f21dc756d50d570b0f371790",
"assets/codeNinja.jpg": "ea579a11d6c862421a5e03b0081a08a3",
"assets/codingRocket2.png": "82739ba18121cff86805e24001f926e1",
"assets/dartLogo.png": "a2292b8c9422d5be494e950cd0bb10c7",
"assets/fileStructure.png": "e466810164349e9fad6e666d9c2d9380",
"assets/flutterLogo.png": "4d83a901dfe6d64ac2956667dd19069a",
"assets/FontManifest.json": "f7161631e25fbd47f3180eae84053a51",
"assets/fonts/MaterialIcons-Regular.ttf": "56d3ffdef7a25659eab6a68a3fbfaf16",
"assets/geibr.gif": "2407b512f6f2eec61cd2f3136242a025",
"assets/github.png": "89c2c0674bdba3d61daf6b1b1e5e82b5",
"assets/gplay.png": "14ed7874b63b0ba9734b47e7dd2f0ff2",
"assets/homePagePic.jpg": "8ce44eb70abee0ed889c607004077bdb",
"assets/kross.jpg": "ae1d7d0cecb19c78e9ebb5b48a09b2d0",
"assets/LICENSE": "e3f4c2004a88324f34dc2f224cae8299",
"assets/load.gif": "ed23685339ada1b6d88008cbe1a11e98",
"assets/meeting.jpg": "75c7d37c4ebb5c0aefe51e7235d7c855",
"assets/myzipic.png": "4bc1ffb1bf841f88d81dc6b3866f7669",
"assets/nodetuts.png": "40aef24f8cf3f4dc6af90c7a946308a3",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "115e937bb829a890521f72d2e664b632",
"assets/packages/flutter_markdown/assets/logo.png": "67642a0b80f3d50277c44cde8f450e50",
"assets/programmer.jpeg": "3f1666be4f8576587292be9cc01ac2f7",
"assets/puzzle.jpg": "841cc5ba46525fa5d64bca15d6201491",
"assets/secure.png": "c718ce003b164acdf4371bdd9b42acf8",
"assets/slack.png": "f5f36ee1268a77884847617b09bbe1a7",
"assets/spin.gif": "58e4a4e4fa041a11f796a2014b1bcfa4",
"assets/study_desk.jpg": "db88c5824393d20222087e6f2a15175b",
"assets/tch.png": "c46b94ce7d9dfe616e186e6b57f4d6f8",
"assets/twitter.png": "6918db95c0f5675ee30e5f6f3445daa6",
"assets/web/favicon.ico": "00f60d999e16e77adbffd7a2f74508ff",
"assets/web/index.html": "22642fabe28949d18988b9d963a4650e",
"/": "22642fabe28949d18988b9d963a4650e",
"assets/youtube.png": "fc36174c988eb3c628c7d4267d498efd",
"favicon.ico": "00f60d999e16e77adbffd7a2f74508ff",
"index.html": "22642fabe28949d18988b9d963a4650e",
"main.dart.js": "1306c4ee58dfdbf051aca77ee08b1f7c"
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
