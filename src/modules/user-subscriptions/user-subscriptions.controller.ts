import {
    Body,
    Controller,
    Post,
    Get,
    Param,
    Put,
    Delete,
    Req,
    UseGuards,
  } from '@nestjs/common';
  import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
  import { AuthGuard } from 'src/common/guards/jwt-auth.guards.ts';
  import { SubscriptionUserCreateDto } from './dto/user-subscription.dto';
  import { Request } from 'express';
  import { RolesGuard } from 'src/common/guards/role.guard';
import { UserSubscriptionsService } from './user-subscriptions.service';
  
  @ApiTags('User Subscriptions')
  @Controller('subscriptions')
  export class UserSubscriptionsController {
    constructor(private readonly userSubscriptionService: UserSubscriptionsService) {}
  
    @ApiBearerAuth()
    @UseGuards(AuthGuard, RolesGuard)
    @Post('purchase')
    @ApiOperation({ summary: 'Obuna sotib olish' })
    purchasePlan(@Req() req: Request, @Body() dto: SubscriptionUserCreateDto) {
      return this.userSubscriptionService.purchasePlan(req['user'].id, dto);
    }
  
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Get()
    @ApiOperation({ summary: 'Foydalanuvchining barcha obunalari' })
    getAll(@Req() req: Request) {
      return this.userSubscriptionService.getUserSubscriptions(req['user'].id);
    }
  
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Put(':id')
    @ApiOperation({ summary: 'Obunani toliq yangilash' })
    update(
      @Param('id') subscriptionId: string,
      @Req() req: Request,
      @Body() dto: SubscriptionUserCreateDto
    ) {
      return this.userSubscriptionService.updateSubscription(req['user'].id, subscriptionId, dto);
    }
  
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Delete(':id')
    @ApiOperation({ summary: 'Obunani ochirish' })
    remove(@Param('id') id: string, @Req() req: Request) {
      return this.userSubscriptionService.removeSubscription(req['user'].id, id);
    }
  }
  