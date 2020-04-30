'use strict';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "/assets/AssetManifest.json": "f34b9caf23d3206e10f6a11c6c61e04b",
"/assets/astore.png": "9fef0094f21dc756d50d570b0f371790",
"/assets/buildIll.png": "675289cf0a92dcd521ede000d649797e",
"/assets/codeNinja.jpg": "ea579a11d6c862421a5e03b0081a08a3",
"/assets/codingRocket2.png": "82739ba18121cff86805e24001f926e1",
"/assets/dartLogo.png": "a2292b8c9422d5be494e950cd0bb10c7",
"/assets/fileStructure.png": "e466810164349e9fad6e666d9c2d9380",
"/assets/flutterLogo.png": "4d83a901dfe6d64ac2956667dd19069a",
"/assets/FontManifest.json": "f7161631e25fbd47f3180eae84053a51",
"/assets/fonts/MaterialIcons-Regular.ttf": "56d3ffdef7a25659eab6a68a3fbfaf16",
"/assets/geibr.gif": "2407b512f6f2eec61cd2f3136242a025",
"/assets/github.png": "89c2c0674bdba3d61daf6b1b1e5e82b5",
"/assets/gplay.png": "14ed7874b63b0ba9734b47e7dd2f0ff2",
"/assets/homePagePic.jpg": "f722d851e7dd6773f600d7556153d19f",
"/assets/kross.jpg": "ae1d7d0cecb19c78e9ebb5b48a09b2d0",
"/assets/LICENSE": "2edba5722e0adfada8d94c9ea6c21925",
"/assets/load.gif": "ed23685339ada1b6d88008cbe1a11e98",
"/assets/meeting.jpg": "75c7d37c4ebb5c0aefe51e7235d7c855",
"/assets/myzipic.png": "4bc1ffb1bf841f88d81dc6b3866f7669",
"/assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "115e937bb829a890521f72d2e664b632",
"/assets/packages/flutter_markdown/assets/logo.png": "67642a0b80f3d50277c44cde8f450e50",
"/assets/programmer.jpeg": "3f1666be4f8576587292be9cc01ac2f7",
"/assets/programmerBuild.jpg": "4e1460caf549e83fa0be6e0392e3470f",
"/assets/puzzle.jpg": "b0968dd998f121c2116244cec1d8d282",
"/assets/slack.png": "f5f36ee1268a77884847617b09bbe1a7",
"/assets/spin.gif": "58e4a4e4fa041a11f796a2014b1bcfa4",
"/assets/study_desk.jpg": "199e346a9c5fd8e020839052076a5978",
"/assets/tch.png": "c46b94ce7d9dfe616e186e6b57f4d6f8",
"/assets/twitter.png": "6918db95c0f5675ee30e5f6f3445daa6",
"/assets/uidesign.jpg": "4e1460caf549e83fa0be6e0392e3470f",
"/assets/web/favicon.ico": "00f60d999e16e77adbffd7a2f74508ff",
"/assets/web/index.html": "22642fabe28949d18988b9d963a4650e",
"/assets/youtube.png": "fc36174c988eb3c628c7d4267d498efd",
"/favicon.ico": "00f60d999e16e77adbffd7a2f74508ff",
"/index.html": "22642fabe28949d18988b9d963a4650e",
"/main.dart.js": "18eae3b479b91dce98243e7d63a41923"
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
