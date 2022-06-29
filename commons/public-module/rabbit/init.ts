import { connect } from 'amqplib';
import { run } from './consumer';
let connection = null;
let isConnection = false;
let reconnectingCount = 0;

export const init = () => {
    connect('amqp://rabbit:rabbit@localhost:5672')
        .then((conn: any) => {
            connection = conn;
            conn.on('error', function (err) {
                reconnecting(err, 'error');
            });
            conn.on('close', function (err) {
                reconnecting(err, 'close');
            });

            console.log('rabbitmq 连接成功');
            isConnection = false;
            reconnectingCount = 0;
            run(connection); // 开启消费者
            return connection;
        })
        .catch((err: any) => {
            isConnection = false;
            reconnecting(err, 'catch');
        });
};

/**
 * 重连
 * @param { Object } err
 */
const reconnecting = (err: any, event: any) => {
    if (!isConnection) {
        isConnection = true;
        reconnectingCount++;
        console.error(
            `Lost connection to RMQ. reconnectingCount: ${reconnectingCount}. Reconnecting in 10 seconds...`,
        );
        console.error('Rabbitmq close: ', event, err);
        // 定时重连
        return setTimeout(init, 10 * 1000);
    }
};
