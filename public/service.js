//@ts-nocheck

self.addEventListener('push', async (event) => {
    if (event.data) {
        const eventData = await event.data.json()
        console.log(eventData)
        showLocalNotification(eventData.title, eventData.body, eventData.url, eventData.tag, self.registration)
    }
})

self.addEventListener('notificationclick', function (event) {
    event.notification.close();
    event.waitUntil(
        clients.openWindow(event.notification.data.url)
    );
})

const showLocalNotification = (title, body, url, tag, swRegistration) => {
    swRegistration.showNotification(title, {
        body,
        tag,
        icon: '/static/icons/icon-192x192.png',
        data: {
            url: url
        }
    })
}