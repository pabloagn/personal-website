# -*- coding: utf-8 -*-
"""
Created on Wed Jan 18 19:23:00 2023
@author: Pablo Aguirre
GitHub: https://github.com/pabloagn
Website: https://pabloagn.com
Contact: https://pabloagn.com/contact
Part of Blog Article: what-are-github-gists-and-how-to-use-them
"""

# Using sys.version (includes tags and build)
import sys

print('Current Python version:', sys.version)

# Using python_version() (does not include tags and build)
from platform import python_version

print('Current Python version:', python_version())