from django_cron import CronJobBase, Schedule
from django.core.mail import send_mail
from .models import Quotes
from django.contrib.auth.models import User

class SendDataEmails(CronJobBase):
    RUN_EVERY_MINS = 2
    schedule = Schedule(run_every_mins=RUN_EVERY_MINS)
    code = 'your_app.send_data_emails'  # Change 'your_app' to your app name

    def do(self):
        selected_data = Quotes.objects.all()[:5]
        email_content = '\n'.join([f'{data.title}: {data.description}' for data in selected_data])

        users = User.objects.all()
        sender_email = 'mishalabdullah@protonmail.com'

        for user in users:
            print(f"Sending email to: {user.email}")  # Check recipient email
            result = send_mail(
                'Selected Data',
                email_content,
                sender_email, 
                [user.email],
                fail_silently=False,
            )
            print("Email sent:", result)
