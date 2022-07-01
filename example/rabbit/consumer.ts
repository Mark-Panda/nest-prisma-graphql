async function consumer(
    { testExchangeDLX, testQueueDLX, testRoutingKeyDLX, connection },
    cb: any,
) {
    const ch = await connection.createChannel();
    // 声明一个交换机
    await ch.assertExchange(testExchangeDLX, 'direct', {
        durable: true,
    });
    // 声明一个队列
    const queueResult = await ch.assertQueue(testQueueDLX, {
        exclusive: false,
    });
    // 绑定关系（队列、交换机、路由键）
    await ch.bindQueue(queueResult.queue, testExchangeDLX, testRoutingKeyDLX);
    // 消费
    await ch.consume(
        queueResult.queue,
        (msg: any) => {
            cb(msg, ch);
        },
        { noAck: false },
    );
}
export const run = (connection: any) => {
    consumer(
        {
            testExchangeDLX: 'first-ExDLX',
            testQueueDLX: 'first-QueueDLX',
            testRoutingKeyDLX: 'first-RoutingKeyDLX',
            connection,
        },
        async function (msg: any, ch: any) {
            const data = msg.content.toString();
            console.info(
                `${new Date().getMinutes()}:${new Date().getSeconds()} consumer msg：%j`,
                data,
            );
            // 业务逻辑
            return setTimeout(function () {
                try {
                    // 手动确认
                    ch.ack(msg);
                } catch (err) {
                    console.error('消息 Ack Error：', err);
                }
            }, 5000);
        },
    );
};

// /**
//  * 消费一个死信队列
//  * @param { Object } connnection
//  */
// export const consumerRun = async (connnection: any) => {
//     const allCacheQueue = [
//         {
//             testQueueDLX: 'first-QueueDLX',
//             testExchangeDLX: 'first-ExDLX',
//             testRoutingKeyDLX: 'first-RoutingKeyDLX',
//         },
//         {
//             testQueueDLX: 'second-QueueDLX',
//             testExchangeDLX: 'second-ExDLX',
//             testRoutingKeyDLX: 'second-RoutingKeyDLX',
//         },
//         {
//             testQueueDLX: 'third-QueueDLX',
//             testExchangeDLX: 'third-ExDLX',
//             testRoutingKeyDLX: 'third-RoutingKeyDLX',
//         },
//     ];
//     const ch = await connnection.createChannel();
//     for (const item of allCacheQueue) {
//         // 声明一个交换机
//         await ch.assertExchange(item.testExchangeDLX, 'direct', {
//             durable: true,
//         });
//         // 声明一个队列
//         const queueResult = await ch.assertQueue(item.testQueueDLX, {
//             exclusive: false,
//         });
//         // 绑定关系（队列、交换机、路由键）
//         await ch.bindQueue(
//             queueResult.queue,
//             item.testExchangeDLX,
//             item.testRoutingKeyDLX,
//         );
//         // 消费
//         await ch.consume(
//             queueResult.queue,
//             (msg: any) => {
//                 console.log(
//                     '消费者 msg：' + item.testQueueDLX,
//                     msg.content.toString(),
//                 );
//             },
//             { noAck: true },
//         );
//     }
//     // const testExchangeDLX = 'testExDLX';
//     // const testRoutingKeyDLX = 'testRoutingKeyDLX';
//     // const testQueueDLX = 'testQueueDLX';
//     // // 2. 获取通道
//     // const ch = await connnection.createChannel();
//     // // 声明一个交换机
//     // await ch.assertExchange(testExchangeDLX, 'direct', { durable: true });
//     // // 声明一个队列
//     // const queueResult = await ch.assertQueue(testQueueDLX, {
//     //     exclusive: false,
//     // });
//     // // 绑定关系（队列、交换机、路由键）
//     // await ch.bindQueue(queueResult.queue, testExchangeDLX, testRoutingKeyDLX);
//     // // 消费
//     // await ch.consume(
//     //     queueResult.queue,
//     //     (msg) => {
//     //         console.log('consumer msg：', msg.content.toString());
//     //     },
//     //     { noAck: true },
//     // );
// };
