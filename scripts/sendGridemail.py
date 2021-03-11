import argparse
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
import codecs

parser = argparse.ArgumentParser()
parser.add_argument("contentfile", help="email content")
parser.add_argument("email", help="mail list")
parser.add_argument("subject", help="mail subject")
# parser.add_argument("release_version", help="release version")
parser.add_argument("api_key", help="sendgrid api key")
args = parser.parse_args()

from_email = 'codegen@azure-devex-tools.com'
to_emails = args.email.split(';')
subject = args.subject
f = codecs.open(args.contentfile, 'r')
html_content = f.read()
print(html_content)
# subject = 'Onboading ' + args.release_version + ' is Released'
# f = codecs.open(args.template, 'r')
# html_content = f.read()
# html_content = html_content.replace("trenton_version", args.release_version)

message = Mail(
    from_email=from_email,
    to_emails=to_emails,
    subject=subject,
    html_content=html_content)
try:
    sg = SendGridAPIClient(api_key=args.api_key)
    response = sg.send(message)
    print(response.status_code)
    print(response.body)
    print(response.headers)
except Exception as e:
    print(e.message)