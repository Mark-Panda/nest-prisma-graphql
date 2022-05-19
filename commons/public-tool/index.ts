import { join, resolve } from 'path';

/**
 * 根目录
 */
export const rootPath = resolve(process.cwd());
export const uploadDir = join(rootPath, 'uploadResource/appResource');

export * from './bootstrap';
export * from './prisma';
export * from './all.exception.filter';
export * from './transform.interceptor';
export * from './data';
export * from './redis';
export * from './config';
