import re
import json

with open('LineIcons.css', 'r') as cssFile:
  icons = []
  for line in cssFile:
    matched = re.search(r'\.lni-(.*?)::before', line)
    if matched is not None:
      icons.append(matched.group(1))
  with open('iconList.json', 'w') as listFile:
    json.dump(icons, listFile)