import { bootstrap } from '../src/bootstrap';

bootstrap().catch((error) => {
    console.error('Failed to start application:', error);
    process.exit(1);
});