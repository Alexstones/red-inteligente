import { Module } from '@nestjs/common';
import { StockBot } from './stock-bot.service';

@Module({
  providers: [StockBot],
})
export class BotsModule {}
