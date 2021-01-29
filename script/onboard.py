from jinja2 import Environment, FileSystemLoader
import sys

# file_loader = FileSystemLoader('./')
# env = Environment(loader=file_loader)

# template = env.get_template('script/onboardTemplate')
# users = [{
#     "url": "url",
#     "username": "test"
# }]
# output = template.render(users)
# print(output)

def Generate_HTML(title, codePR, triggerPR, submitURL, customizeURL):
  file_loader = FileSystemLoader('./')
  env = Environment(loader=file_loader)
  template = env.get_template('script/onboardTemplate')
  output = template.render(title=title, codePR=codePR, triggerPR=triggerPR, submitURL=submitURL, customizeURL=customizeURL);
  print(output)
  return output


if __name__ == "__main__":
#   print(f"Arguments count: {len(sys.argv)}")
  if sys.argv[1] == "--help":
    print("usage: python script/emailsender.py [title] [codePR] [triggerPR] [submitURL] [customizeURL]")
    
#   for i, arg in enumerate(sys.argv):
#     print(f"Argument {i:>6}: {arg}")
  title = sys.argv[1]
  codePR = sys.argv[2]
  triggerPR = sys.argv[3]
  submitURL = sys.argv[4]

  customizeURL = sys.argv[5]

  Generate_HTML(title, codePR, triggerPR, submitURL, customizeURL)