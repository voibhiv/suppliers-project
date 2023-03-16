import { HelloWorldController } from '@src/controllers/hello-world-controller';
import express from 'express';

const HelloWorldRouter = express.Router();
const helloWorldController = new HelloWorldController();

HelloWorldRouter.get('/hello-world', helloWorldController.messageHelloWorld);

export default HelloWorldRouter;
