import { connect } from 'amqplib';
export const producerDLX = async ({
    testExchange,
    testQueue,
    testExchangeDLX,
    testRoutingKeyDLX,
}) => {
    try {
        const connection = await connect('amqp://rabbit:rabbit@localhost:5672');
        const ch = await connection.createChannel();
        await ch.assertExchange(testExchange, 'direct', { durable: true });
        const queueResult = await ch.assertQueue(testQueue, {
            exclusive: false,
            // 设置 DLX，当正常队列的消息成为死信后会被路由到 DLX 中
            deadLetterExchange: testExchangeDLX,
            // 设置 DLX 指定的路由键
            deadLetterRoutingKey: testRoutingKeyDLX,
        });
        // 绑定队列
        await ch.bindQueue(queueResult.queue, testExchange, 'direct');
        const msg = 'hello world!';
        console.log('生产者 msg：', testQueue + msg);
        // 发送到队列
        await ch.sendToQueue(queueResult.queue, Buffer.from(msg), {
            expiration: '10000',
        });
        ch.close();
    } catch (error) {
        console.error('生产消息 Error：', error);
    }
};

export const run = () => {
    producerDLX({
        testExchange: 'first-Ex',
        testQueue: 'first-Queue',
        testExchangeDLX: 'first-ExDLX',
        testRoutingKeyDLX: 'first-RoutingKeyDLX',
    });
};
