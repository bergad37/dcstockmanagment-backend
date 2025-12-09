import app from './app';
import prisma from './utils/database';

const PORT = process.env.PORT || 3000;

// eslint-disable-next-line no-console
const startServer = async (): Promise<void> => {
  try {
    // Test database connection
    if (!prisma) {
      throw new Error('Prisma client not initialized');
    }
    await prisma.$connect();
    console.log('✅ Database connected successfully');

    // Start HTTP server
    app.listen(PORT, () => {
      console.log('\n🚀 Server Information:');
      console.log(`   - Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`   - URL: http://localhost:${PORT}`);
      console.log(`\n📚 Documentation:`);
      console.log(`   - Swagger UI: http://localhost:${PORT}/api-docs`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

const gracefulShutdown = async (signal: string): Promise<void> => {
  console.log(`\n${signal} received. Closing gracefully...`);

  try {
    if (prisma) {
      await prisma.$disconnect();
    }
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

process.on('SIGINT', () => {
  void gracefulShutdown('SIGINT');
});
process.on('SIGTERM', () => {
  void gracefulShutdown('SIGTERM');
});

// Start the server
void startServer();
