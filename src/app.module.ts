import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AutomapperModule } from '@automapper/nestjs'
import { classes } from '@automapper/classes'


@Module({
	imports: [
    	MongooseModule.forRoot('mongodb+srv://database-service:0sBt4BU7nvopeCza@database-service.hrregsw.mongodb.net/?retryWrites=true&w=majority'),
    	UsersModule,
    	AutomapperModule.forRoot({
      		strategyInitializer: classes()
    	})
	],
  	controllers: [AppController],
  	providers: [AppService],
})
export class AppModule {}
