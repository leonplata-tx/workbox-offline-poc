workbox.routing.registerRoute(
  /.*\/api\/v2\/pokemon\/.*/,
  workbox.strategies.networkFirst(),
  'GET',
);

const queueDidReplay = async (storableRequestArray) => {
  console.log('queueDidReplay', storableRequestArray);
  const clients = await self.clients.matchAll();
  clients.forEach(async (client) => {
    client.postMessage({
      name: 'queueDidReplay',
      transactions: await Promise.all(storableRequestArray.map(({ request, response }) => {
        return {
          url: request.url,
          status: response.status,
        };
      })),
    });
  });
};

const bgSyncPlugin = new workbox.backgroundSync.Plugin('myQueueName', {
  maxRetentionTime: 24 * 60, // Retry for max of 24 Hours
  callbacks: {
    requestWillEnqueue: (storableRequest) => {
      console.log('requestWillEnqueue', storableRequest.toObject());
    },
    requestWillReplay: (storableRequest) => {
      console.log('requestWillReplay', storableRequest.toObject());
    },
    queueDidReplay,
  },
});

workbox.routing.registerRoute(
  /.*\/api.github.com\/gists$/,
  workbox.strategies.networkOnly({
    plugins: [bgSyncPlugin],
  }),
  'POST',
);
