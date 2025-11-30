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
      console.log(`   - Port: ${PORT}`);
      console.log(`   - URL: http://localhost:${PORT}`);
      console.log(`\n📚 Documentation:`);
      console.log(`   - Swagger UI: http://localhost:${PORT}/api-docs`);
      console.log(`   - Health Check: http://localhost:${PORT}/health`);
      console.log(`\n✨ Server is ready to accept connections\n`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

// Graceful Shutdown
// eslint-disable-next-line no-console
const gracefulShutdown = async (signal: string): Promise<void> => {
  console.log(`\n${signal} received. Closing gracefully...`);

  try {
    if (prisma) {
      await prisma.$disconnect();
    }
    console.log('✅ Database disconnected');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error during shutdown:', error);
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
