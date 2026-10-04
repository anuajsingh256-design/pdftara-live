/* 🛡️ PDFTara - The Unstoppable Service Worker */
if (typeof window === 'undefined') {
    self.addEventListener("install", () => self.skipWaiting());
    self.addEventListener("activate", (event) => event.waitUntil(self.clients.claim()));

    self.addEventListener("fetch", (event) => {
        const url = event.request.url;

        // 🚨 एड्स और गूगल की किसी भी चीज को मत छुओ
        if (url.includes("google") || url.includes("ads") || url.includes("doubleclick") || url.includes("googlesyndication") || url.includes("sodar")) {
            return; 
        }

        event.respondWith(
            fetch(event.request).then((response) => {
                if (response.status === 0) return response;

                const newHeaders = new Headers(response.headers);
                
                // सिर्फ अपनी फाइलों के लिए Headers लगाओ
                newHeaders.set("Cross-Origin-Embedder-Policy", "credentialless");
                newHeaders.set("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
                newHeaders.set("Cross-Origin-Resource-Policy", "cross-origin");

                return new Response(response.body, {
                    status: response.status,
                    statusText: response.statusText,
                    headers: newHeaders,
                });
            }).catch(() => fetch(event.request))
        );
    });
}