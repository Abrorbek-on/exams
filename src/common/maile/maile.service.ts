import { Injectable } from "@nestjs/common";
import { MailerService as NestMailerService } from "@nestjs-modules/mailer";
@Injectable()
export class MailerService {
    constructor(private readonly nestMailerService: NestMailerService) {}
    async sendConfigurationMailer(userEmail: string, subject: string, code: number) {
        await this.nestMailerService.sendMail({
            to:userEmail,
            subject,
            template: "index",
            context: {
                code
            }
        })
    }
}