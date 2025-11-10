import { Resend } from 'resend';

export class MailerService {
  private readonly mailer: Resend;
  constructor() {
    this.mailer = new Resend(process.env.RESEND_API_KEY);
  }

  async sendCreatedAccountEmail({
    recipient,
    firstname,
  }: {
    recipient: string;
    firstname: string;
  }) {
    try {
      const data = await this.mailer.emails.send({
        from: 'Abdelhadi <abdelhadi@resend.dev>',
        to: [recipient],
        subject: 'Bienvenue sur la plateforme',
        html: `Bonjour ${firstname}, et bienvenue sur NestJS Chat ! Nous sommes <strong>heureux</strong> de vous avoir parmi nous.`,
      });

      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }

  async sendRequestedPasswordEmail({
    recipient,
    firstname,
    token,
  }: {
    recipient: string;
    firstname: string;
    token: string;
  }) {
    try {
      const link = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;
      const data = await this.mailer.emails.send({
        from: 'Abdelhadi <abdelhadi@resend.dev>',
        to: [recipient],
        subject: 'Pour réinitialiser votre mot de passe ...',
        html: `Bonjour ${firstname}, voici votre lien de réinitialisation de mot de passe : ${link}`,
      });

      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }
}